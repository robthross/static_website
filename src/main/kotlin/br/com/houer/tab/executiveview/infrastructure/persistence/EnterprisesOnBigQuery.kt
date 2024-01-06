package br.com.houer.tab.executiveview.infrastructure.persistence

import br.com.houer.tab.executiveview.application.representations.EnterpriseSearchDTO
import br.com.houer.tab.executiveview.domain.exceptions.NotFoundException
import br.com.houer.tab.executiveview.domain.model.Enterprise
import br.com.houer.tab.executiveview.domain.repository.EnterprisesRepository
import com.google.cloud.bigquery.FieldValue
import com.google.cloud.bigquery.FieldValueList
import com.google.cloud.bigquery.QueryJobConfiguration
import io.micronaut.context.annotation.Value
import jakarta.inject.Singleton

@Singleton
class EnterprisesOnBigQuery(@Value("\${bigquery.dataset}") private val dataset: String, private val clientBigQuery: ClientBigQuery) : EnterprisesRepository {
    override fun findAll(): List<Enterprise> {
        // Build the SQL query to retrieve the distinct values of the column
        val query = """
            SELECT Localizador,Empreendimento FROM `$dataset.GERENCIAMENTO` WHERE Status <> '18 - Cancelado
        """.trimIndent()

        val queryConfig = QueryJobConfiguration.newBuilder(query).build()

        // Execute the query and retrieve the results
        val results = clientBigQuery.bigQuery.query(queryConfig)

        // Create a set to store the distinct values
        val enterprises = mutableListOf<Enterprise>()

        // Iterate over the results and add the values to the set
        for (row in results.values) {
            if (!row.get("Localizador").isNull && !row.get("Empreendimento").isNull) {
                val id = row.get("Localizador").stringValue
                val name = row.get("Empreendimento").stringValue
                enterprises.add(Enterprise(id = id, name = name))
            }
        }
        // Return the distinct values as a set
        return enterprises
    }

    override fun findById(id: String): Enterprise {
        val query = """
            SELECT * FROM `$dataset.GERENCIAMENTO` WHERE Localizador = $id
        """.trimIndent()

        val queryConfig = QueryJobConfiguration.newBuilder(query).build()

        val results = clientBigQuery.bigQuery.query(queryConfig)

        val enterpriseRow = results.values.elementAtOrNull(0)
        if (enterpriseRow.isNullOrEmpty()) throw NotFoundException("Enterprise not found")
        return Enterprise(
            id = enterpriseRow.get("Localizador").stringValue,
            name = enterpriseRow.get("Empreendimento").stringValue,
            program = getStringProperty(enterpriseRow.get("Programa")),
            subProgram = getStringProperty(enterpriseRow.get("Sub_Programa")),
            road = getStringProperty(enterpriseRow.get("Rodovia")),
            extension = getDoubleProperty(enterpriseRow.get("Extens__o__km_")).toString(),
            status = getStringProperty(enterpriseRow.get("Status")),
            filterStatus = getStringProperty(enterpriseRow.get("Status"))?.let {
                StatusFilterMapper.byColumnValue(it)?.name ?: "UNDEFINED"
            },
            startedAt = getStringProperty(enterpriseRow.get("Ordem_de_In__cio")),
            amountDone = getStringProperty(enterpriseRow.get("__Executado_sobre_o_valor_medido__Obra_")),
            totalEstimated = getDoubleProperty(enterpriseRow.get("Total_Geral_do_empreendimento")).toString(),
            resourcesToBeAvailable = (
                getDoubleProperty(enterpriseRow.get("Total_Geral_do_empreendimento")) -
                    getDoubleProperty(enterpriseRow.get("Disponibilidade_negociada_22_02_2022"))
                ).toString(),
            dueAt = getStringProperty(enterpriseRow.get("Conclus__o_OBRA__PROJETO_Previsto")),
            cities = getStringProperty(enterpriseRow.get("Cidades_Beneficiadas")),
            enterprises = getStringProperty(enterpriseRow.get("Empresa_Contratada_OBRA")),
            riskWork = getStringProperty(enterpriseRow.get("Riscos__Problemas_Obra")),
            riskEnvironment = getStringProperty(enterpriseRow.get("Riscos__Problemas_Meio_Ambiente")),
            riskExpropriation = getStringProperty(enterpriseRow.get("Riscos__Problemas_Desapropria____o")),
            directJobs = getStringProperty(enterpriseRow.getOrNull(97)),
            indirectJobs = getStringProperty(enterpriseRow.getOrNull(98))
        )
    }

    override fun findBy(
        program: String?,
        subProgram: String?,
        status: String?,
        mesoRegion: String?,
        enterprise: String?,
        id: List<String>?
    ): List<Enterprise> {
        var query = """
            SELECT * FROM `$dataset.GERENCIAMENTO` WHERE Status <> '18 - Cancelado'
        """.trimIndent()
        program?.let { query = "$query AND Programa LIKE '%$it%'" }
        subProgram?.let { query = "$query AND Sub_Programa LIKE '%$it%'" }
        status?.let { query = "$query AND ${StatusFilterMapper.byDomainName(it)?.getSQL()}" }
        mesoRegion?.let { query = "$query AND Mesoregi__o LIKE '%$it%'" }
        enterprise?.let { query = "$query AND Empreendimento LIKE'%$it%'" }
        id?.let { query = "$query AND Localizador IN (${it.reduce { acc, s -> "$acc,$s" }})" }

        val queryConfig = QueryJobConfiguration.newBuilder(query).build()

        val results = clientBigQuery.bigQuery.query(queryConfig)

        val enterprises = mutableListOf<Enterprise>()

        // Iterate over the results and add the values to the set
        for (row in results.values) {
            if (!row.get("Localizador").isNull && !row.get("Empreendimento").isNull) {
                val enterpriseFound = mapRowToEnterprise(row)
                enterprises.add(enterpriseFound)
            }
        }
        return enterprises
    }

    private fun mapRowToEnterprise(row: FieldValueList): Enterprise {
        return Enterprise(
            id = row.get("Localizador").stringValue,
            name = row.get("Empreendimento").stringValue,
            program = getStringProperty(row.get("Programa")),
            subProgram = getStringProperty(row.get("Sub_Programa")),
            road = getStringProperty(row.get("Rodovia")),
            extension = getDoubleProperty(row.get("Extens__o__km_")).toString(),
            status = getStringProperty(row.get("Status")),
            filterStatus = getStringProperty(row.get("Status"))?.let {
                StatusFilterMapper.byColumnValue(it)?.name ?: "UNDEFINED"
            },
            startedAt = getStringProperty(row.get("Ordem_de_In__cio")),
            amountDone = getStringProperty(row.get("__Executado_sobre_o_valor_medido__Obra_")),
            totalEstimated = getDoubleProperty(row.get("Total_Geral_do_empreendimento")).toString(),
            resourcesToBeAvailable = (
                getDoubleProperty(row.get("Total_Geral_do_empreendimento")) -
                    getDoubleProperty(row.get("Disponibilidade_negociada_22_02_2022"))
                ).toString(),
            resourcesAvailable = getDoubleProperty(row.get("Disponibilidade_negociada_22_02_2022")).toString(),
            dueAt = getStringProperty(row.get("Conclus__o_OBRA__PROJETO_Previsto")),
            cities = getStringProperty(row.get("Cidades_Beneficiadas")),
            enterprises = getStringProperty(row.get("Empresa_Contratada_OBRA")),
            riskWork = getStringProperty(row.get("Riscos__Problemas_Obra")),
            riskEnvironment = getStringProperty(row.get("Riscos__Problemas_Meio_Ambiente")),
            riskExpropriation = getStringProperty(row.get("Riscos__Problemas_Desapropria____o")),
            directJobs = getStringProperty(row.getOrNull(97)),
            indirectJobs = getStringProperty(row.getOrNull(98))
        )
    }

    override fun searchEntereprises(enterpriseSearchDTO: EnterpriseSearchDTO): List<Enterprise> {
        var query = """
            SELECT * FROM `$dataset.GERENCIAMENTO` WHERE Status <> '18 - Cancelado'
        """.trim()
        enterpriseSearchDTO.program?.let { query = "$query AND Programa LIKE '%$it%'" }
        enterpriseSearchDTO.subProgram?.let { query = "$query AND Sub_Programa LIKE '%$it%'" }
        enterpriseSearchDTO.status?.let { query = "$query AND ${StatusFilterMapper.byDomainName(it)?.getSQL()}" }
        enterpriseSearchDTO.enterprise?.let { query = "$query AND Empreendimento LIKE'%$it%'" }
        enterpriseSearchDTO.id?.let { query = "$query AND Localizador IN (${it.reduce { acc, s -> "$acc,$s" }})" }
        enterpriseSearchDTO.mesoRegion.let { mesoregions ->
            if (mesoregions != null) {
                query = "$query AND Mesoregi__o IN (${mesoregions.joinToString(", ") { "'$it'" }});"
            }
        }

        val queryConfig = QueryJobConfiguration.newBuilder(query).build()

        val results = clientBigQuery.bigQuery.query(queryConfig)

        var enterprises = mutableListOf<Enterprise>()

        for (row in results.values) {
            if (!row.get("Localizador").isNull && !row.get("Empreendimento").isNull) {
                val enterpriseFound = mapRowToEnterprise(row)
                enterprises.add(enterpriseFound)
            }
        }

        return enterprises
    }

    private fun getStringProperty(field: FieldValue?): String? {
        if (field == null) { return null }
        return with(field) { if (this.isNull) null else this.stringValue }
    }

    private fun getDoubleProperty(field: FieldValue): Double {
        return with(field) {
            if (this.isNull) {
                0.0
            } else {
                var doubleString = this.stringValue.trim()
                doubleString = doubleString.replace(".", "")
                doubleString = doubleString.replace(",", ".")
                if (!doubleString.matches(Regex("\\d*\\.\\d*"))) 0.0 else doubleString.toDouble()
            }
        }
    }
}
