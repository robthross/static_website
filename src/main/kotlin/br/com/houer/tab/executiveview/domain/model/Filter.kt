package br.com.houer.tab.executiveview.domain.model

data class Filter(val type: FilterType, val options: List<String>)

data class EnterpriseFilter(val id: Int, val enterpriseId: Double, val enterpriseName: String)
