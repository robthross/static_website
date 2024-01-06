package br.com.houer.tab.executiveview.application.representations

import br.com.houer.tab.executiveview.domain.model.ActionPlans
import br.com.houer.tab.executiveview.domain.model.Enterprise
import br.com.houer.tab.executiveview.domain.model.InspectionReport
import br.com.houer.tab.executiveview.domain.model.Planning

data class ReportDTO(
    val enterprise: Enterprise,
    val planning: Planning?,
    val actionPlans: ActionPlans?,
    val inspections: List<InspectionReport>?
)
