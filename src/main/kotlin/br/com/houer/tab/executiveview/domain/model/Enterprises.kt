package br.com.houer.tab.executiveview.domain.model

data class Enterprises(val enterprises: List<Enterprise>) {
    val total: Int = enterprises.count()
    val totalAmount: String =
        String.format(Formatting.FLOAT_1F_MI, enterprises.sumOf { it.totalEstimated?.toDouble() ?: 0.0 } / 1000000)
    val resourcesAvailable: String =
        String.format(Formatting.FLOAT_1F_MI, enterprises.sumOf { it.resourcesAvailable?.toDouble() ?: 0.0 } / 1000000)
    val redLight: Int = enterprises.count { it.semaphore.uppercase() == "VERMELHO" }
    val greenLight: Int = enterprises.count { it.semaphore.uppercase() == "VERDE" }
    val yellowLight: Int = enterprises.count { it.semaphore.uppercase() == "AMARELO" }
    val mileage: String = String.format(Formatting.FLOAT_1F_KM, enterprises.sumOf { it.extension?.toDouble() ?: 0.0 })
    val mileageByToStart: String = String.format(
        Formatting.FLOAT_1F_KM,
        enterprises.filter { StatusFilter.TO_START.name == it.filterStatus }
            .sumOf { it.extension?.toDouble() ?: 0.0 }
    )
    val mileageByExecuting: String = String.format(
        Formatting.FLOAT_1F_KM,
        enterprises.filter { StatusFilter.EXECUTING.name == it.filterStatus }
            .sumOf { it.extension?.toDouble() ?: 0.0 }
    )
    val mileageByPaused: String = String.format(
        Formatting.FLOAT_1F_KM,
        enterprises.filter { StatusFilter.PAUSED.name == it.filterStatus }
            .sumOf { it.extension?.toDouble() ?: 0.0 }
    )
    val mileageByCompleted: String = String.format(
        Formatting.FLOAT_1F_KM,
        enterprises.filter { StatusFilter.COMPLETED.name == it.filterStatus }
            .sumOf { it.extension?.toDouble() ?: 0.0 }
    )
}

object Formatting {
    const val FLOAT_1F_MI = "%.1f mi"
    const val FLOAT_1F_KM = "%.1f km"
}
