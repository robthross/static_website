package br.com.houer.tab.executiveview.domain.service

import br.com.houer.tab.executiveview.application.representations.EnterpriseSearchDTO
import br.com.houer.tab.executiveview.domain.model.Enterprise
import br.com.houer.tab.executiveview.domain.model.Enterprises

interface EnterprisesService {

    fun findById(id: String): Enterprise

    fun findBy(
        program: String?,
        subProgram: String?,
        status: String?,
        mesoRegion: String?,
        enterprise: String?,
        id: List<String>?,
        semaphore: String?
    ): Enterprises

    fun searchEnterprises(mesoregions: EnterpriseSearchDTO): Enterprises
}
