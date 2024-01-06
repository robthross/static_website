package br.com.houer.tab.executiveview.domain.service

import br.com.houer.tab.executiveview.domain.model.ActionPlans
interface ActionPlansService {

    fun findBy(
        id: String
    ): ActionPlans
}
