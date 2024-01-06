package br.com.houer.tab.executiveview.infrastructure.persistence

import com.google.cloud.bigquery.QueryJobConfiguration
import io.micronaut.context.annotation.Value
import jakarta.inject.Singleton

@Singleton
class IbgeBigQuery(
    @Value("\${bigquery.dataset}") private val dataset: String,
    private val clientBigQuery: ClientBigQuery
) {

    fun getPopulation(city: String, state: String): Long? {
        val query = """
            SELECT * FROM `$dataset.IBGE_BY_CITY` WHERE city = `$city` AND state = `$state`
        """.trimIndent()

        val queryConfig = QueryJobConfiguration.newBuilder(query).build()

        val results = clientBigQuery.bigQuery.query(queryConfig)

        val cityDetails = results.values.elementAtOrNull(0)

        if (cityDetails.isNullOrEmpty()) return null
        return if (cityDetails.get("population").isNull) null else cityDetails.get("population").longValue
    }

    fun getPopulation(cities: List<String>, state: String): Map<String, Long> {
        if (cities.isEmpty()) return mapOf()

        val citiesQuery = StringBuffer("'${cities[0].trim()}'")
        cities.forEach { it -> citiesQuery.append(", '${it.trim()}'") }
        val query = """
            SELECT NOME_CIDADE, POPULACAO FROM `$dataset.IBGE_CIDADES` WHERE NOME_CIDADE in ($citiesQuery) AND NOME_ESTADO = '$state'
        """.trimIndent()

        val queryConfig = QueryJobConfiguration.newBuilder(query).build()

        val results = clientBigQuery.bigQuery.query(queryConfig)

        val citiesDetails = results.values

        return citiesDetails.associate { it.get("NOME_CIDADE").stringValue to it.get("POPULACAO").longValue }
    }

    fun savePopulation(city: String, state: String, population: Long) {
        val row = mapOf(
            "id" to city + state,
            "NOME_CIDADE" to city,
            "NOME_ESTADO" to state,
            "POPULACAO" to population
        )

        clientBigQuery.insertData(dataset, "IBGE_CIDADES", row)
    }
}
