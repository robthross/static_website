package br.com.houer.tab.executiveview.infrastructure.persistence

enum class FilterTypeMapping(val column: String) {
    PROGRAM("Programa"),
    SUBPROGRAM("Sub_Programa"),
    STATUS("Status"),
    REGION("Mesoregi__o"),
    ENTERPRISE("Empreendimento")
}
