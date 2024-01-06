package br.com.houer.tab.executiveview.application.controllers

import br.com.houer.tab.executiveview.domain.model.EnterpriseFilter
import br.com.houer.tab.executiveview.domain.model.Filter
import br.com.houer.tab.executiveview.domain.service.FiltersService
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get

@Controller("/filters")
class FiltersController(private val filtersService: FiltersService) {
    @Get
    fun getFilters(): List<Filter> {
        return filtersService.getFilters()
    }

    @Get("/enterprises")
    fun getEnterprisesFilters(): List<EnterpriseFilter> {
        return filtersService.getEnterprisesFilters().sortedBy { it.id }
    }
}
