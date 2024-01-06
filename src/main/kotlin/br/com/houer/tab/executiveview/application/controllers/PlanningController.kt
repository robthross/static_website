package br.com.houer.tab.executiveview.application.controllers

import br.com.houer.tab.executiveview.domain.model.Planning
import br.com.houer.tab.executiveview.domain.service.PlanningsService
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.PathVariable

@Controller("/plannings")
class PlanningController(private val planning: PlanningsService) {

    @Get("/{id}")
    fun getPlanning(@PathVariable id: String): Planning? {
        return planning.findBy(id)
    }
}
