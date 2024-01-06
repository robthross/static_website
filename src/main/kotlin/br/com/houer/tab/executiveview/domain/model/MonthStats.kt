package br.com.houer.tab.executiveview.domain.model

data class MonthStats(
    val month: Int,
    val year: Int,
    val planned: Double,
    val plannedAcc: Double,
    val executed: Double,
    val executedAcc: Double
)
