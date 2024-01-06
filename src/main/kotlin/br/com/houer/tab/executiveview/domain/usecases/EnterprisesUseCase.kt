package br.com.houer.tab.executiveview.domain.usecases

import br.com.houer.tab.executiveview.application.representations.EnterpriseSearchDTO
import br.com.houer.tab.executiveview.domain.exceptions.NotFoundException
import br.com.houer.tab.executiveview.domain.model.Enterprise
import br.com.houer.tab.executiveview.domain.model.Enterprises
import br.com.houer.tab.executiveview.domain.repository.EnterprisesRepository
import br.com.houer.tab.executiveview.domain.repository.PlanningsRepository
import br.com.houer.tab.executiveview.domain.service.EnterprisesService
import br.com.houer.tab.executiveview.domain.service.PopulationService
import jakarta.inject.Singleton
import org.slf4j.Logger
import org.slf4j.LoggerFactory

@Singleton
class EnterprisesUseCase(
    private val enterprisesRepository: EnterprisesRepository,
    private val ibge: PopulationService,
    private val planningsRepository: PlanningsRepository
) : EnterprisesService {

    private val logger: Logger = LoggerFactory.getLogger(EnterprisesUseCase::class.java)

    override fun findById(id: String): Enterprise {
        val enterprise = enterprisesRepository.findById(id)
        val cities: List<String> = enterprise.cities?.split(',') ?: mutableListOf()
        enterprise.populationEstimated = ibge.getPopulation(cities, "MG")
        try {
            enterprise.iap = planningsRepository.findBy(id)?.currentIAP
        } catch (e: NotFoundException) {
            logger.warn("Data not found for IAP on data source", e)
        }
        return enterprise
    }

    override fun findBy(
        program: String?,
        subProgram: String?,
        status: String?,
        mesoRegion: String?,
        enterprise: String?,
        id: List<String>?,
        semaphore: String?
    ): Enterprises {
        var enterprises = enterprisesRepository.findBy(program, subProgram, status, mesoRegion, enterprise, id)
        val enterprisesIAP = planningsRepository.getAllIAP()
        enterprises.forEach { it.iap = enterprisesIAP.find { iap -> iap.id == it.id }?.currentIAP }
        semaphore?.let { enterprises = enterprises.filter { it.semaphore == semaphore } }
        return Enterprises(enterprises)
    }

    override fun searchEnterprises(mesoregions: EnterpriseSearchDTO): Enterprises {
        var enterprises = enterprisesRepository.searchEntereprises(mesoregions)
        val enterprisesIAP = planningsRepository.getAllIAP()
        enterprises.forEach { it.iap = enterprisesIAP.find { iap -> iap.id == it.id }?.currentIAP }
        mesoregions.semaphore?.let { semaphore -> enterprises = enterprises.filter { it.semaphore == semaphore } }
        return Enterprises(enterprises)
    }
}
