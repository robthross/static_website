package br.com.houer.tab.executiveview.application.controllers

import br.com.houer.tab.executiveview.application.representations.ReportRequestDTO
import br.com.houer.tab.executiveview.domain.service.ReportsService
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Post
import io.swagger.v3.oas.annotations.parameters.RequestBody

@Controller("/reports")
class ReportsController(private val reportsService: ReportsService) {

    @Post("/bulk")
    fun getPlanning(@RequestBody dto: ReportRequestDTO): Any? {
        return reportsService.getReports(dto)
    }
}
