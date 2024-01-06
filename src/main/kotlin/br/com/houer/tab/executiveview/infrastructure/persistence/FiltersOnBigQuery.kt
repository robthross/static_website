package br.com.houer.tab.executiveview.infrastructure.persistence

import br.com.houer.tab.executiveview.domain.model.EnterpriseFilter
import br.com.houer.tab.executiveview.domain.model.Filter
import br.com.houer.tab.executiveview.domain.model.FilterType
import br.com.houer.tab.executiveview.domain.repository.FilterRepository
import com.google.cloud.bigquery.FieldValue
import com.google.cloud.bigquery.QueryJobConfiguration
import com.google.cloud.bigquery.TableResult
import io.micronaut.context.annotation.Value
import jakarta.inject.Singleton

@Singleton
class FiltersOnBigQuery(
    @Value("\${bigquery.dataset}") private val dataset: String,
    private val clientBigQuery: ClientBigQuery
) : FilterRepository {

    override fun findAllOptions(): List<Filter> {
        // Build the SQL query to retrieve the distinct values of the column

        val query = """
                SELECT  Programa, Sub_Programa, Status, Mesoregi__o, Empreendimento, Localizador FROM `$dataset.GERENCIAMENTO` WHERE Status <> '18 - Cancelado';
        """.trimIndent()

        val queryConfig = QueryJobConfiguration.newBuilder(query).build()

        // Execute the query and retrieve the results
        val results = clientBigQuery.bigQuery.query(queryConfig)

        // Create a set to store the distinct values
        val filters = mutableListOf<Filter>()
        for (filterEnum in FilterTypeMapping.values()) {
            val distinctValues = HashSet<String>()
            if (filterEnum == FilterTypeMapping.STATUS) {
                getStatus(results, filterEnum, distinctValues)
            } else if (filterEnum == FilterTypeMapping.ENTERPRISE) {
                getEnterprisesWithId(results, filterEnum, distinctValues)
            } else {
                // Iterate over the results and add the values to the sets
                getFilterOptions(results, filterEnum, distinctValues)
            }
            val filter = Filter(FilterType.valueOf(filterEnum.name), distinctValues.toList())

            filters.add(filter)
        }
        return filters
    }

    override fun findEnterpriseOptions(): HashSet<EnterpriseFilter> {
        val query = """
                SELECT Empreendimento, Localizador FROM `$dataset.GERENCIAMENTO` WHERE Status <> '18 - Cancelado';
        """.trimIndent()

        val queryConfig = QueryJobConfiguration.newBuilder(query).build()

        val results = clientBigQuery.bigQuery.query(queryConfig)
        val distinctValues = hashSetOf<EnterpriseFilter>()
        for (i in 0 until results.values.count()) {
            val row = results.values.elementAt(i)
            if (!row.get("Localizador").isNull) {
                val enterpriseId = row.get("Localizador").doubleValue
                val enterpriseName = getStringProperty(row.get("Empreendimento"))
                val enterpriseFilter = EnterpriseFilter(i, enterpriseId, enterpriseName)
                distinctValues.add(enterpriseFilter)
            }
        }
        return distinctValues
    }

    private fun getFilterOptions(
        results: TableResult,
        filterEnum: FilterTypeMapping,
        distinctValues: HashSet<String>
    ) {
        for (row in results.values) {
            if (!row.get(filterEnum.column).isNull) {
                val values = row.get(filterEnum.column).stringValue.split(';')
                for (value in values) {
                    distinctValues.add(value.trim())
                }
            }
        }
    }

    private fun getEnterprisesWithId(
        results: TableResult,
        filterEnum: FilterTypeMapping,
        distinctValues: HashSet<String>
    ) {
        for (row in results.values) {
            if (!row.get(filterEnum.column).isNull && !row.get("Localizador").isNull) {
                val enterpriseId = row.get("Localizador").stringValue
                val enterpriseName = row.get(filterEnum.column).stringValue
                distinctValues.add("${enterpriseId.trim()} - ${enterpriseName.trim()}")
            }
        }
    }

    private fun getStatus(
        results: TableResult,
        filterEnum: FilterTypeMapping,
        distinctValues: HashSet<String>
    ) {
        for (row in results.values) {
            if (!row.get(filterEnum.column).isNull) {
                val status = row.get(filterEnum.column).stringValue
                StatusFilterMapper.byColumnValue(status)?.getDomainStatus()?.let { distinctValues.add(it) }
            }
        }
    }

    private fun getStringProperty(field: FieldValue): String {
        return with(field) { if (this.isNull) "" else this.stringValue.replace("\n", "") }
    }
}
