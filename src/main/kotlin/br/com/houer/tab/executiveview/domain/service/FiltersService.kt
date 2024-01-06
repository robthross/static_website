package br.com.houer.tab.executiveview.domain.service

import br.com.houer.tab.executiveview.domain.model.EnterpriseFilter
import br.com.houer.tab.executiveview.domain.model.Filter

interface FiltersService {

    fun getFilters(): List<Filter>
    fun getEnterprisesFilters(): HashSet<EnterpriseFilter>
}
