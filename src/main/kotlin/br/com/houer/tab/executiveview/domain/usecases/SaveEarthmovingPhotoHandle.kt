package br.com.houer.tab.executiveview.domain.usecases

import br.com.houer.tab.executiveview.domain.model.InspectionReport
import br.com.houer.tab.executiveview.domain.service.BaseInspectionReportHandler
import jakarta.inject.Singleton

@Singleton
class SaveEarthmovingPhotoHandle(private val downloadAndSaveMediaUseCase: DownloadAndSaveMediaUseCase) :
    BaseInspectionReportHandler() {

    override fun handleReport(report: InspectionReport) {
        val earthmovingPhotoURL = report.earthmovingPhoto?.let {
            downloadAndSaveMediaUseCase.downloadImageAndUploadToStorage(
                report.enterpriseId,
                report.dateTime,
                it.substringAfterLast("/")
            )
        }
        super.handleReport(report.copy(earthmovingPhoto = earthmovingPhotoURL))
    }
}
