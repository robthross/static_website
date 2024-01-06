package br.com.houer.tab.executiveview.domain.usecases

import br.com.houer.tab.executiveview.domain.service.DownloadInspectionReportMedia
import br.com.houer.tab.executiveview.domain.service.InspectionReportMediaStorage
import jakarta.inject.Singleton
import java.time.LocalDateTime

@Singleton
class DownloadAndSaveMediaUseCase(
    private val downloadInspectionReportMedia: DownloadInspectionReportMedia,
    private val inspectionReportMediaStorage: InspectionReportMediaStorage
) {

    fun downloadImageAndUploadToStorage(
        enterpriseId: Double,
        dateTime: LocalDateTime,
        imageName: String
    ): String {
        val imageBytes: ByteArray = downloadInspectionReportMedia.downloadPhoto(imageName)
        return inspectionReportMediaStorage.uploadJpegImage(enterpriseId, dateTime, imageName, imageBytes)
    }

    fun downloadVideoAndUploadToStorage(
        enterpriseId: Double,
        dateTime: LocalDateTime,
        videoName: String
    ): String {
        val videoBytes: ByteArray = downloadInspectionReportMedia.downloadVideo(videoName)
        return inspectionReportMediaStorage.uploadMp4Video(enterpriseId, dateTime, videoName, videoBytes)
    }
}
