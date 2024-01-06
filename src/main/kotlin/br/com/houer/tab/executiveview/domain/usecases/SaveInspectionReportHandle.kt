package br.com.houer.tab.executiveview.domain.usecases

import br.com.houer.tab.executiveview.domain.model.InspectionReport
import br.com.houer.tab.executiveview.domain.repository.InspectionRepository
import br.com.houer.tab.executiveview.domain.service.BaseInspectionReportHandler
import jakarta.inject.Singleton

@Singleton
class SaveInspectionReportHandle(private val inspectionRepository: InspectionRepository) :
    BaseInspectionReportHandler() {
    override fun handleReport(report: InspectionReport) {
        inspectionRepository.add(report)
        super.handleReport(report)
    }
}
