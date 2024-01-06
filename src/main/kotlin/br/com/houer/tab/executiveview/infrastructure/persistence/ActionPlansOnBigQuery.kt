package br.com.houer.tab.executiveview.infrastructure.persistence

import br.com.houer.tab.executiveview.domain.exceptions.NotFoundException
import br.com.houer.tab.executiveview.domain.model.ActionPlan
import br.com.houer.tab.executiveview.domain.model.ActionPlans
import br.com.houer.tab.executiveview.domain.repository.ActionPlansRepository
import com.google.cloud.bigquery.FieldValue
import com.google.cloud.bigquery.QueryJobConfiguration
import io.micronaut.context.annotation.Value
import jakarta.inject.Singleton

@Singleton
class ActionPlansOnBigQuery(
    @Value("\${bigquery.dataset}") private val dataset: String,
    private val clientBigQuery: ClientBigQuery
) : ActionPlansRepository {

    override fun findBy(id: String): ActionPlans {
        val query = """
            SELECT * FROM `$dataset.PLANO_DE_ACAO` WHERE ID = $id
        """.trimIndent()
        val queryConfig = QueryJobConfiguration.newBuilder(query).build()
        val results = clientBigQuery.bigQuery.query(queryConfig)

        if (results.totalRows < 1) throw NotFoundException("Action Plans not found")

        val actionPlans = mutableListOf<ActionPlan>()
        for (row in results.values) {
            actionPlans.add(
                ActionPlan(
                    action = row.get("A____o").stringValue,
                    responsible = getStringProperty(row.get("Respons__vel")),
                    deadline = getStringProperty(row.get("Prazo")),
                    status = getStringProperty(row.get("Status"))
                )
            )
        }

        return ActionPlans(
            id = results.values.elementAt(0).get("ID").stringValue,
            name = results.values.elementAt(0).get("Empreendimento").stringValue,
            actionPlans = actionPlans
        )
    }

    private fun getStringProperty(field: FieldValue): String? {
        return with(field) { if (this.isNull) null else this.stringValue }
    }
}
