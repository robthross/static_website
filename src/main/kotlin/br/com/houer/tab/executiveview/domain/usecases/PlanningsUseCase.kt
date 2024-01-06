package br.com.houer.tab.executiveview.domain.usecases

import br.com.houer.tab.executiveview.domain.model.Planning
import br.com.houer.tab.executiveview.domain.repository.PlanningsRepository
import br.com.houer.tab.executiveview.domain.service.PlanningsService
import jakarta.inject.Singleton

@Singleton
class PlanningsUseCase(private val planningsRepository: PlanningsRepository) : PlanningsService {

    override fun findBy(
        id: String
    ): Planning? {
        return planningsRepository.findBy(id)
    }
}
