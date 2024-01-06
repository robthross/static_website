package br.com.houer.tab.executiveview.domain.usecases

import br.com.houer.tab.executiveview.domain.model.InspectionReport
import br.com.houer.tab.executiveview.domain.service.BaseInspectionReportHandler
import jakarta.inject.Singleton

@Singleton
class SaveGeneralVideoHandle(private val downloadAndSaveMediaUseCase: DownloadAndSaveMediaUseCase) :
    BaseInspectionReportHandler() {

    override fun handleReport(report: InspectionReport) {
        val generalVideoURL = report.generalVideo?.let {
            downloadAndSaveMediaUseCase.downloadVideoAndUploadToStorage(
                report.enterpriseId,
                report.dateTime,
                it.substringAfterLast("/")
            )
        }
        super.handleReport(report.copy(generalVideo = generalVideoURL))
    }
}
