package br.com.houer.tab.executiveview.domain.repository

import br.com.houer.tab.executiveview.domain.model.Planning

interface PlanningsRepository {

    fun findBy(
        id: String
    ): Planning?

    fun getAllIAP(): List<Planning>
}
