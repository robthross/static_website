package br.com.houer.tab.executiveview.domain.model

enum class StatusFilter(val description: String) {
    EXECUTING("Obra em Execução"),
    COMPLETED("Obra Concluída"),
    PAUSED("Obra Paralisada"),
    TO_START("Obra à Iniciar")
}
