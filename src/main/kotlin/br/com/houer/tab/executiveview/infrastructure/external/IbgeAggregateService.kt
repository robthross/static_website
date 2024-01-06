package br.com.houer.tab.executiveview.infrastructure.external

import br.com.houer.tab.executiveview.domain.service.PopulationService
import br.com.houer.tab.executiveview.infrastructure.persistence.IbgeBigQuery
import jakarta.inject.Singleton

@Singleton
class IbgeAggregateService(private val ibgeClient: IbgeClient, private val ibgeBigQuery: IbgeBigQuery) :
    PopulationService {

    private fun getPopulationOnIBGE(city: String, state: String): Long {
        val cityId = ibgeClient.getCityByState().firstOrNull { it.nome == city }?.id
        return if (cityId != null) {
            val population =
                ibgeClient.getPopulationByCity("N6[$cityId]")[0].resultados[0].series[0].serie["2021"]?.toLong() ?: 0L
            ibgeBigQuery.savePopulation(city, state, population)
            return population
        } else {
            0
        }
    }

    override fun getPopulation(cities: List<String>, state: String): Long {
        val population = ibgeBigQuery.getPopulation(cities, state)
        return cities.sumOf { population.getOrElse(it.trim()) { getPopulationOnIBGE(it.trim(), state) } }
    }
}
