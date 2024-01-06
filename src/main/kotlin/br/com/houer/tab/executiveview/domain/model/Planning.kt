package br.com.houer.tab.executiveview.domain.model

data class Planning(
    val id: String,
    val name: String,
    val status: String? = null,
    val startOrder: String? = null,
    val workDeadline: String? = null,
    val sCurve: List<MonthStats>? = null,
    val currentIAP: Double? = null
)
