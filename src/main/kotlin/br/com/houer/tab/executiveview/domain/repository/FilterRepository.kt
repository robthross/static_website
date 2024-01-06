package br.com.houer.tab.executiveview.domain.repository

import br.com.houer.tab.executiveview.domain.model.EnterpriseFilter
import br.com.houer.tab.executiveview.domain.model.Filter

interface FilterRepository {

    fun findAllOptions(): List<Filter>

    fun findEnterpriseOptions(): HashSet<EnterpriseFilter>
}
