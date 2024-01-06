package br.com.houer.tab.executiveview.domain.usecases

import br.com.houer.tab.executiveview.application.representations.ReportDTO
import br.com.houer.tab.executiveview.application.representations.ReportRequestDTO
import br.com.houer.tab.executiveview.domain.exceptions.NotFoundException
import br.com.houer.tab.executiveview.domain.model.ActionPlans
import br.com.houer.tab.executiveview.domain.model.Enterprise
import br.com.houer.tab.executiveview.domain.model.InspectionReport
import br.com.houer.tab.executiveview.domain.model.Planning
import br.com.houer.tab.executiveview.domain.service.ReportsService
import jakarta.inject.Singleton

@Singleton
class GetReportsUseCase(
    private val enterprisesUseCase: EnterprisesUseCase,
    private val planningsUseCase: PlanningsUseCase,
    private val actionPlansUseCase: ActionPlansUseCase,
    private val inspectionUseCase: InspectionUseCase
) : ReportsService {
    override fun getReports(dto: ReportRequestDTO): MutableMap<String, ReportDTO> {
        val results = mutableMapOf<String, ReportDTO>()

        dto.ids.forEach { id ->
            var enterprise: Enterprise
            var planning: Planning? = null
            var actionPlans: ActionPlans? = null
            var inspectionReports: List<InspectionReport>? = null

            try {
                enterprise = enterprisesUseCase.findById(id)
            } catch (ex: NotFoundException) {
                // log
                return@forEach
            }

            try {
                planning = planningsUseCase.findBy(id)
            } catch (ex: NotFoundException) {
                // log
            }

            try {
                actionPlans = actionPlansUseCase.findBy(id)
            } catch (ex: NotFoundException) {
                // log
            }

            try {
                inspectionReports = inspectionUseCase.findByEnterpriseId(id)
            } catch (ex: NotFoundException) {
                // log
            }

            results.put(id, ReportDTO(enterprise, planning, actionPlans, inspectionReports))
        }

        return results
    }
}
