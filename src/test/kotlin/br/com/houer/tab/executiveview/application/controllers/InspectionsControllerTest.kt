package br.com.houer.tab.executiveview.application.controllers

import br.com.houer.tab.executiveview.application.representations.DataInspectionRequest
import br.com.houer.tab.executiveview.application.representations.InfoInspectionRequest
import br.com.houer.tab.executiveview.application.representations.InputDataInspectionRequest
import br.com.houer.tab.executiveview.application.representations.InspectionRequest
import br.com.houer.tab.executiveview.domain.exceptions.NotFoundException
import br.com.houer.tab.executiveview.domain.model.EnterpriseFilter
import br.com.houer.tab.executiveview.domain.model.InspectionReport
import br.com.houer.tab.executiveview.domain.service.InspectionService
import io.mockk.every
import io.mockk.impl.annotations.RelaxedMockK
import io.mockk.junit5.MockKExtension
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import java.time.LocalDateTime

@ExtendWith(MockKExtension::class)
class InspectionsControllerTest {

    @RelaxedMockK
    lateinit var inspectionService: InspectionService

    private lateinit var inspectionsController: InspectionsController

    @BeforeEach
    fun setUp() {
        inspectionsController = InspectionsController(inspectionService, listOf("64ac4e5aed5fb23ccf591458", "2"))
    }

    @Test
    fun `should not add the inspection because inspection form id is invalid`() {
        val inspectionRequest = inspectionRequest(formId = "invalid form id")

        val result = inspectionsController.addInspection(inspectionRequest)

        assertEquals(200, result.status.code)
        assertEquals("Data will not be processed! Form not found or not valid.", result.body())
    }

    @Test
    fun `should add the inspection with only mandatory values`() {
        val inspectionRequest = inspectionRequest()

        val result = inspectionsController.addInspection(inspectionRequest)

        assertEquals(202, result.status.code)
    }

    @Test
    fun `should add the inspection with all values`() {
        val inspectionRequest = InspectionRequest(
            data = DataInspectionRequest(
                data = InputDataInspectionRequest(
                    id = EnterpriseFilter(enterpriseId = 1.1, enterpriseName = "teste", id = 1),
                    dateTime = LocalDateTime.now(),
                    drainageExecuted = 1.1,
                    drainagePhoto = "drainagePhoto",
                    earthmovingExecuted = 1.1,
                    earthmovingPhoto = "earthmovingPhoto",
                    pavingExecuted = 1.1,
                    pavingPhoto = "pavingPhoto",
                    generalVideo = "generalVideo",
                    location = "location",
                    riskComments = "riskComments",
                    signalingExecuted = 1.1,
                    signalingPhoto = "signalingPhoto",
                    signature = "signature"
                ),
                info = InfoInspectionRequest(
                    userId = "userId",
                    formId = "64ac4e5aed5fb23ccf591458",
                    formName = "Acompanhamento obra DER/MG"
                )
            )
        )

        val result = inspectionsController.addInspection(inspectionRequest)

        assertEquals(202, result.status.code)
    }

    @Test
    fun `should find the inspection`() {
        val inspectionReport =
            InspectionReport(dateTime = LocalDateTime.now(), inspector = "inspector", enterpriseId = 1.0)
        every { inspectionService.findByEnterpriseId("id") } returns listOf(inspectionReport)

        val result = inspectionsController.getInspections("id")

        assertTrue(result.isNotEmpty())
    }

    @Test
    fun `should not find the inspection`() {
        every { inspectionService.findByEnterpriseId("invalid id") } throws NotFoundException("not found")

        val exception = Assertions.assertThrows(NotFoundException::class.java) {
            inspectionsController.getInspections("invalid id")
        }

        assertEquals("not found", exception.message)
    }

    @Test
    fun `should receive HTTPStatus NotFound`() {
        val result = inspectionsController.notFoundHandler()
        assertEquals(404, result.status.code)
    }

    private fun inspectionRequest(
        formId: String = "64ac4e5aed5fb23ccf591458",
        formName: String = "Acompanhamento obra DER/MG"
    ) = InspectionRequest(
        data = DataInspectionRequest(
            data = InputDataInspectionRequest(
                id = EnterpriseFilter(enterpriseId = 1.1, enterpriseName = "teste", id = 1),
                dateTime = LocalDateTime.now()
            ),
            info = InfoInspectionRequest(
                userId = "userId",
                formId = formId,
                formName = formName
            )
        )
    )
}
