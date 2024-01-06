package br.com.houer.tab.executiveview.domain.repository

import br.com.houer.tab.executiveview.domain.model.ActionPlans

interface ActionPlansRepository {

    fun findBy(
        id: String
    ): ActionPlans
}
