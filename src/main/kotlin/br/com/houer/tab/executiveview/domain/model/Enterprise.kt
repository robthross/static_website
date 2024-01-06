package br.com.houer.tab.executiveview.domain.model

data class Enterprise(
    val id: String,
    val name: String,
    val program: String? = null,
    val subProgram: String? = null,
    val road: String? = null,
    val extension: String? = null,
    val status: String? = null,
    val filterStatus: String? = null,
    val startedAt: String? = null,
    val amountDone: String? = null,
    val totalEstimated: String? = null,
    val resourcesAvailable: String? = null,
    val resourcesToBeAvailable: String? = null,
    val dueAt: String? = null,
    val cities: String? = null,
    val enterprises: String? = null,

    val riskWork: String? = null,
    val riskEnvironment: String? = null,
    val riskExpropriation: String? = null,
    var populationEstimated: Long = 0,
    var iap: Double? = null,
    var directJobs: String? = null,
    var indirectJobs: String? = null
) {
    val semaphore: String
        get() = if (iap == null) {
            "N/A"
        } else if (iap!! <= 0.5) {
            "VERMELHO"
        } else if (iap!! < 0.75) {
            "AMARELO"
        } else {
            "VERDE"
        }
}
