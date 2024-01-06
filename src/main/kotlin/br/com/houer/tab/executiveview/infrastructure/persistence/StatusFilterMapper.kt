package br.com.houer.tab.executiveview.infrastructure.persistence

enum class StatusFilterMapper(val columnValue: String, val domainStatusName: String) {
    EXECUTING("15 - Obra em execução", "Obra em Execução") {
        override fun getSQL(): String {
            return " STATUS = '15 - Obra em execução' "
        }

        override fun getDomainStatus(): String {
            return "Obra em Execução"
        }
    },
    COMPLETED("16 - Obra Concluída", "Obra Concluída") {
        override fun getSQL(): String {
            return " STATUS = '16 - Obra Concluída' "
        }

        override fun getDomainStatus(): String {
            return "Obra Concluída"
        }
    },
    PAUSED("17 - Obra Paralisada", "Obra Paralisada") {
        override fun getSQL(): String {
            return " STATUS = '17 - Obra Paralisada' "
        }

        override fun getDomainStatus(): String {
            return "Obra Paralisada"
        }
    },
    TO_START(
        "00 - Convênio, 01 - Projeto a licitar,02 - Projeto a revisar,03 - Projeto em revisão," +
            "04 - Projeto em licitação,04.1 - P: a homologar,04.2 - P: aguardando empenho,05 - Projeto a iniciar/ executar," +
            "06 - Projeto em execução,07 - Projeto concluído,08 - P: Paralisado,09 - Obra em orçamento," +
            "10 - Obra a licitar,11 - Obra em licitação,12 - Obra a homologar,13 - Obra aguardando empenho," +
            "14 - Obra a iniciar",
        "Obra à Iniciar"
    ) {
        override fun getSQL(): String {
            return " STATUS IN ('00 - Convênio','01 - Projeto a licitar','02 - Projeto a revisar','03 - Projeto em revisão'," +
                "'04 - Projeto em licitação', '04.1 - P: a homologar', '04.2 - P: aguardando empenho', '05 - Projeto a iniciar/ executar'," +
                "'06 - Projeto em execução', '07 - Projeto concluído', '08 - P: Paralisado', '09 - Obra em orçamento', " +
                "'10 - Obra a licitar', '11 - Obra em licitação', '12 - Obra a homologar', '13 - Obra aguardando empenho', " +
                "'14 - Obra a iniciar') "
        }

        override fun getDomainStatus(): String {
            return "Obra à Iniciar"
        }
    };

    companion object {
        fun byColumnValue(input: String): StatusFilterMapper? {
            return values().firstOrNull { status -> status.columnValue.split(',').any { it.uppercase().trim() == input.uppercase().trim() } }
        }

        fun byDomainName(input: String): StatusFilterMapper? {
            return values().firstOrNull { it.domainStatusName.equals(input, true) }
        }
    }

    abstract fun getSQL(): String
    abstract fun getDomainStatus(): String
}
