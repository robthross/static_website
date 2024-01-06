package br.com.houer.tab.executiveview.domain.usecases

import br.com.houer.tab.executiveview.domain.model.InspectionReport
import br.com.houer.tab.executiveview.domain.repository.InspectionRepository
import io.mockk.impl.annotations.RelaxedMockK
import io.mockk.junit5.MockKExtension
import io.mockk.verify
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import java.time.LocalDateTime

@ExtendWith(MockKExtension::class)
class InspectionUseCaseTest {

    @RelaxedMockK
    lateinit var inspectionRepository: InspectionRepository

    @RelaxedMockK
    lateinit var saveDrainagePhotoHandle: SaveDrainagePhotoHandle

    @RelaxedMockK
    lateinit var saveEarthmovingPhotoHandle: SaveEarthmovingPhotoHandle

    @RelaxedMockK
    lateinit var savePavingPhotoHandle: SavePavingPhotoHandle

    @RelaxedMockK
    lateinit var saveSignalingPhotoHandle: SaveSignalingPhotoHandle

    @RelaxedMockK
    lateinit var saveInspectionReportHandle: SaveInspectionReportHandle

    @RelaxedMockK
    lateinit var saveGeneralVideoHandle: SaveGeneralVideoHandle

    private lateinit var inspectionUseCase: InspectionUseCase

    @BeforeEach
    fun setUp() {
        inspectionUseCase = InspectionUseCase(
            inspectionRepository,
            saveInspectionReportHandle,
            saveDrainagePhotoHandle,
            saveEarthmovingPhotoHandle,
            savePavingPhotoHandle,
            saveSignalingPhotoHandle,
            saveGeneralVideoHandle
        )
    }

    @Test
    fun add() {
        val inspectionReport = InspectionReport(
            enterpriseId = 1.1,
            dateTime = LocalDateTime.now(),
            inspector = "inspector"
        )
        inspectionUseCase.add(inspectionReport)

        verify(exactly = 1) { saveDrainagePhotoHandle.handleReport(any()) }
    }

    @Test
    fun findByEnterpriseId() {
        inspectionUseCase.findByEnterpriseId("1.1")
        verify { inspectionRepository.findByEnterpriseId(any()) }
    }
}
