package br.com.houer.tab.executiveview.domain.service

import br.com.houer.tab.executiveview.domain.model.Planning

interface PlanningsService {

    fun findBy(
        id: String
    ): Planning?
}
