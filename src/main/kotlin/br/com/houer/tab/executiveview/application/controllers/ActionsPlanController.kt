package br.com.houer.tab.executiveview.application.controllers

import br.com.houer.tab.executiveview.domain.model.ActionPlans
import br.com.houer.tab.executiveview.domain.service.ActionPlansService
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.PathVariable
@Controller("/action-plans")
class ActionsPlanController(private val actionPlansService: ActionPlansService) {

    @Get("/{id}")
    fun getActionPlans(@PathVariable id: String): ActionPlans {
        return actionPlansService.findBy(id)
    }
}
