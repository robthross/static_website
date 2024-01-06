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
class SaveInspectionReportHandleTest {

    @RelaxedMockK
    lateinit var inspectionRepository: InspectionRepository

    private lateinit var saveInspectionReportHandle: SaveInspectionReportHandle

    @BeforeEach
    fun setUp() {
        saveInspectionReportHandle = SaveInspectionReportHandle(inspectionRepository)
    }

    @Test
    fun handleReport() {
        val report = InspectionReport(
            enterpriseId = 1.1,
            dateTime = LocalDateTime.now(),
            inspector = "inspector"
        )
        saveInspectionReportHandle.handleReport(report)

        verify(exactly = 1) { inspectionRepository.add(any()) }
    }
}
