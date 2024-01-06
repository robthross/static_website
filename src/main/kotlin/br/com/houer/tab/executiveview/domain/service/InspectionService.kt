package br.com.houer.tab.executiveview.domain.service

import br.com.houer.tab.executiveview.domain.model.InspectionReport

interface InspectionService {

    fun add(inspectionReport: InspectionReport)
    fun findByEnterpriseId(enterpriseId: String): List<InspectionReport>
}
