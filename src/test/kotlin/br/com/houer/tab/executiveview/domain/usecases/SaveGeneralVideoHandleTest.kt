package br.com.houer.tab.executiveview.domain.usecases

import br.com.houer.tab.executiveview.domain.model.InspectionReport
import io.mockk.impl.annotations.RelaxedMockK
import io.mockk.junit5.MockKExtension
import io.mockk.verify
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import java.time.LocalDateTime

@ExtendWith(MockKExtension::class)
class SaveGeneralVideoHandleTest {

    @RelaxedMockK
    lateinit var downloadAndSaveMediaUseCase: DownloadAndSaveMediaUseCase

    private lateinit var saveGeneralVideoHandle: SaveGeneralVideoHandle

    @BeforeEach
    fun setUp() {
        saveGeneralVideoHandle = SaveGeneralVideoHandle(downloadAndSaveMediaUseCase)
    }

    @Test
    fun `should not handle this report due to empty drainagePhoto url`() {
        val report = InspectionReport(
            enterpriseId = 1.1,
            dateTime = LocalDateTime.now(),
            inspector = "inspector"
        )
        saveGeneralVideoHandle.handleReport(report)

        verify(exactly = 0) { downloadAndSaveMediaUseCase.downloadVideoAndUploadToStorage(any(), any(), any()) }
    }

    @Test
    fun `should handle this report`() {
        val report = InspectionReport(
            enterpriseId = 1.1,
            dateTime = LocalDateTime.now(),
            inspector = "inspector",
            generalVideo = "https://teste/teste/id"
        )
        saveGeneralVideoHandle.handleReport(report)

        verify(exactly = 1) { downloadAndSaveMediaUseCase.downloadVideoAndUploadToStorage(any(), any(), any()) }
    }
}
