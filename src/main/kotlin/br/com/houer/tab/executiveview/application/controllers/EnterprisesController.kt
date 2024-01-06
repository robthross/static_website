package br.com.houer.tab.executiveview.application.controllers

import br.com.houer.tab.executiveview.application.representations.EnterpriseSearchDTO
import br.com.houer.tab.executiveview.domain.model.Enterprise
import br.com.houer.tab.executiveview.domain.model.Enterprises
import br.com.houer.tab.executiveview.domain.service.EnterprisesService
import io.micronaut.http.annotation.Body
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.PathVariable
import io.micronaut.http.annotation.Post

@Controller("/enterprises")
class EnterprisesController(private val enterprisesService: EnterprisesService) {
    @Get
    fun getEnterprises(
        program: String?,
        subProgram: String?,
        status: String?,
        mesoRegion: String?,
        enterprise: String?,
        id: List<String>?,
        semaphore: String?
    ): Enterprises {
        return enterprisesService.findBy(program, subProgram, status, mesoRegion, enterprise, id, semaphore)
    }

    @Get("/{id}")
    fun getEnterprise(@PathVariable id: String): Enterprise {
        return enterprisesService.findById(id)
    }

    @Post("/search")
    fun searchEnterprises(@Body dto: EnterpriseSearchDTO): Enterprises {
        return enterprisesService.searchEnterprises(dto)
    }
}
