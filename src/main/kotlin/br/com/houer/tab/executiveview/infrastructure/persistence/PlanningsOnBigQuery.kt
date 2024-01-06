package br.com.houer.tab.executiveview.infrastructure.persistence

import br.com.houer.tab.executiveview.domain.exceptions.NotFoundException
import br.com.houer.tab.executiveview.domain.model.MonthStats
import br.com.houer.tab.executiveview.domain.model.Planning
import br.com.houer.tab.executiveview.domain.repository.PlanningsRepository
import com.google.cloud.bigquery.FieldValue
import com.google.cloud.bigquery.FieldValueList
import com.google.cloud.bigquery.QueryJobConfiguration
import io.micronaut.context.annotation.Value
import jakarta.inject.Singleton
import java.time.LocalDate

@Singleton
class PlanningsOnBigQuery(
    @Value("\${bigquery.dataset}") private val dataset: String,
    private val clientBigQuery: ClientBigQuery
) : PlanningsRepository {

    override fun findBy(id: String): Planning? {
        val query = """
            SELECT * FROM `$dataset.PLANEJAMENTO_TAB` WHERE ID = $id
        """.trimIndent()

        val queryConfig = QueryJobConfiguration.newBuilder(query).build()

        val results = clientBigQuery.bigQuery.query(queryConfig)

        val rowPlanned = results.values.elementAtOrNull(0)
        val rowExecuted = results.values.elementAtOrNull(1)
        val rowIAP = results.values.elementAtOrNull(2)

        if (rowPlanned.isNullOrEmpty()) throw NotFoundException("Planning not found")
        if (rowExecuted.isNullOrEmpty()) throw NotFoundException("Execution not found")
        if (rowIAP.isNullOrEmpty()) throw NotFoundException("IAP not found")

        val iap = rowIAP.findLast { !it.isNull }?.stringValue
        val doubleIAP = iap?.toDoubleOrNull()

        val sCurve = buildSCurve(rowPlanned, rowExecuted)
        return Planning(
            id = rowPlanned.get("ID").stringValue,
            name = rowPlanned.get("Empreendimento").stringValue,
            status = rowPlanned.get("Status").stringValue,
            startOrder = rowPlanned.get("Ordem_de_In__cio").stringValue,
            workDeadline = rowPlanned.get("Prazo_de_Obra").stringValue,
            sCurve = sCurve,
            currentIAP = doubleIAP
        )
    }

    override fun getAllIAP(): List<Planning> {
        val query = """
            SELECT * FROM `$dataset.PLANEJAMENTO_TAB` WHERE Planejado_x_Executado LIKE '%IAP%'
        """.trimIndent()

        val queryConfig = QueryJobConfiguration.newBuilder(query).build()

        val results = clientBigQuery.bigQuery.query(queryConfig)

        val plannings = mutableListOf<Planning>()
        for (row in results.values) {
            val iap = row.findLast { !it.isNull }?.stringValue
            val doubleIAP = iap?.toDoubleOrNull()
            plannings.add(
                Planning(
                    id = row.get("ID").stringValue,
                    name = row.get("Empreendimento").stringValue,
                    currentIAP = doubleIAP
                )
            )
        }
        return plannings
    }

    private fun buildSCurve(
        rowPlanned: FieldValueList,
        rowExecuted: FieldValueList
    ): MutableList<MonthStats> {
        var planned = 0.0
        var executed = 0.0
        val sCurve = mutableListOf<MonthStats>()
        for (i in 1..32) {
            var plannedAcc = getPercentProperty(rowPlanned.get("Mes_$i"))
            var executedAcc = getPercentProperty(rowExecuted.get("Mes_$i"))
            if (plannedAcc > 0 || executedAcc > 0) {
                if (plannedAcc == 0.0) plannedAcc = 1.0
                planned = plannedAcc - planned
                if (executedAcc == 0.0) {
                    executed = 0.0
                } else { executed = executedAcc - executed }
                val startOrder = LocalDate.parse(rowPlanned.get("Ordem_de_In__cio").stringValue)
                val monthStat = MonthStats(
                    month = startOrder.plusMonths((i - 1).toLong()).monthValue,
                    year = startOrder.plusMonths((i - 1).toLong()).year,
                    planned = planned,
                    executed = executed,
                    plannedAcc = plannedAcc,
                    executedAcc = executedAcc
                )
                sCurve.add(monthStat)
                planned = plannedAcc
                executed = executedAcc
            }
        }
        return sCurve
    }

    private fun getPercentProperty(field: FieldValue): Double {
        return with(field) {
            if (this.isNull) {
                0.0
            } else {
                this.stringValue.trim().toDouble()
            }
        }
    }
}
