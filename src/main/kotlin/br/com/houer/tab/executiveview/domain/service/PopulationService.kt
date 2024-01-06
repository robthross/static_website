package br.com.houer.tab.executiveview.domain.service

interface PopulationService {
    fun getPopulation(cities: List<String>, state: String): Long
}
