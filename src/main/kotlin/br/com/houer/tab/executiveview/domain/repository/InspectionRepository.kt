package br.com.houer.tab.executiveview.domain.repository

import br.com.houer.tab.executiveview.domain.model.InspectionReport

interface InspectionRepository {

    fun add(inspectionReport: InspectionReport)
    fun findByEnterpriseId(enterpriseId: String): List<InspectionReport>
}
