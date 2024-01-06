package br.com.houer.tab.executiveview.application.representations

data class EnterpriseSearchDTO(
    val program: String?,
    val subProgram: String?,
    val status: String?,
    val mesoRegion: List<String>?,
    val enterprise: String?,
    val id: List<String>?,
    val semaphore: String?
)
