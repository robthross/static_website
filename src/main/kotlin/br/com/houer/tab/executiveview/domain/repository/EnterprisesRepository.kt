package br.com.houer.tab.executiveview.domain.repository

import br.com.houer.tab.executiveview.application.representations.EnterpriseSearchDTO
import br.com.houer.tab.executiveview.domain.model.Enterprise

interface EnterprisesRepository {

    fun findAll(): List<Enterprise>
    fun findById(id: String): Enterprise
    fun findBy(
        program: String?,
        subProgram: String?,
        status: String?,
        mesoRegion: String?,
        enterprise: String?,
        id: List<String>?
    ): List<Enterprise>

    fun searchEntereprises(mesoregions: EnterpriseSearchDTO): List<Enterprise>
}
