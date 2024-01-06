package br.com.houer.tab.executiveview.domain.usecases

import br.com.houer.tab.executiveview.domain.model.EnterpriseFilter
import br.com.houer.tab.executiveview.domain.model.Filter
import br.com.houer.tab.executiveview.domain.repository.FilterRepository
import br.com.houer.tab.executiveview.domain.service.FiltersService
import jakarta.inject.Singleton

@Singleton
class FilterServiceUseCase(private val repository: FilterRepository) : FiltersService {
    override fun getFilters(): List<Filter> {
        return repository.findAllOptions()
    }

    override fun getEnterprisesFilters(): HashSet<EnterpriseFilter> {
        return repository.findEnterpriseOptions()
    }
}
