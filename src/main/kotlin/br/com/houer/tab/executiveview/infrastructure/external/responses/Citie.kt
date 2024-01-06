package br.com.houer.tab.executiveview.infrastructure.external.responses

data class IBGEAggregate(val id: String, val resultados: List<IBGEResults>)

data class IBGEResults(val series: List<IBGESeries>)

data class IBGESeries(val serie: Map<String, String>)

data class City(val id: String, val nome: String)
