package br.com.houer.tab.executiveview.domain.usecases

import br.com.houer.tab.executiveview.domain.service.DownloadInspectionReportMedia
import br.com.houer.tab.executiveview.domain.service.InspectionReportMediaStorage
import io.mockk.impl.annotations.RelaxedMockK
import io.mockk.junit5.MockKExtension
import io.mockk.verify
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import java.time.LocalDateTime

@ExtendWith(MockKExtension::class)
class DownloadAndSaveMediaUseCaseTest {

    @RelaxedMockK
    lateinit var downloadInspectionReportMedia: DownloadInspectionReportMedia

    @RelaxedMockK
    lateinit var inspectionReportMediaStorage: InspectionReportMediaStorage

    lateinit var downloadAndSaveMediaUseCase: DownloadAndSaveMediaUseCase

    @BeforeEach
    fun setUp() {
        downloadAndSaveMediaUseCase = DownloadAndSaveMediaUseCase(
            inspectionReportMediaStorage = inspectionReportMediaStorage,
            downloadInspectionReportMedia = downloadInspectionReportMedia
        )
    }

    @Test
    fun downloadImageAndUploadToStorage() {
        downloadAndSaveMediaUseCase.downloadImageAndUploadToStorage(
            enterpriseId = 1.1,
            dateTime = LocalDateTime.now(),
            imageName = "teste"
        )

        verify { downloadInspectionReportMedia.downloadPhoto(any()) }
        verify { inspectionReportMediaStorage.uploadJpegImage(any(), any(), any(), any()) }
    }

    @Test
    fun downloadVideoAndUploadToStorage() {
        downloadAndSaveMediaUseCase.downloadVideoAndUploadToStorage(
            enterpriseId = 1.1,
            dateTime = LocalDateTime.now(),
            videoName = "teste"
        )

        verify { downloadInspectionReportMedia.downloadVideo(any()) }
        verify { inspectionReportMediaStorage.uploadMp4Video(any(), any(), any(), any()) }
    }
}
