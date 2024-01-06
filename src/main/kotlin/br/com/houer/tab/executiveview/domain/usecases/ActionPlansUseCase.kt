package br.com.houer.tab.executiveview.domain.usecases

import br.com.houer.tab.executiveview.domain.model.ActionPlans
import br.com.houer.tab.executiveview.domain.repository.ActionPlansRepository
import br.com.houer.tab.executiveview.domain.service.ActionPlansService
import jakarta.inject.Singleton

@Singleton
class ActionPlansUseCase(private val actionPlansRepository: ActionPlansRepository) : ActionPlansService {
    override fun findBy(id: String): ActionPlans {
        return actionPlansRepository.findBy(id)
    }
}
