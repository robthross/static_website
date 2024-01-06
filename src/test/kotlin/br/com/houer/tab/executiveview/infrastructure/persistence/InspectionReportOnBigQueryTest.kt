package br.com.houer.tab.executiveview.infrastructure.persistence

import br.com.houer.tab.executiveview.Toolbox
import br.com.houer.tab.executiveview.domain.exceptions.NotFoundException
import br.com.houer.tab.executiveview.domain.model.InspectionReport
import com.google.cloud.bigquery.TableResult
import io.mockk.every
import io.mockk.impl.annotations.RelaxedMockK
import io.mockk.junit5.MockKExtension
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Assertions.assertThrows
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import java.io.FileNotFoundException
import java.time.LocalDateTime
import java.util.*

@ExtendWith(MockKExtension::class)
class InspectionReportOnBigQueryTest {

    val dataset: String = "houer_dev"

    @RelaxedMockK
    lateinit var clientBigQuery: ClientBigQuery

    private lateinit var inspectionOnBigQuery: InspectionOnBigQuery

    @RelaxedMockK
    lateinit var utils: Toolbox

    var queryReponse = Properties()

    var queryReponseRef = "query.properties"

    @BeforeEach
    fun setUp() {
        val `is` = javaClass.classLoader.getResourceAsStream(queryReponseRef)

        if (`is` != null) {
            queryReponse.load(`is`)
        } else {
            throw FileNotFoundException("Query Property file not in classpath")
        }

        every { utils.runQuery(any()) } answers { getResponse(it.invocation.args[0]) }
        inspectionOnBigQuery = InspectionOnBigQuery(dataset, clientBigQuery)
    }

    @Test
    fun `should insert inspection data with minimum info to bigquery`() {
        val inspectionReport = InspectionReport(
            dateTime = LocalDateTime.now(),
            enterpriseId = 1.1,
            inspector = "John doe"
        )
        inspectionOnBigQuery.add(inspectionReport)
    }

    @Test
    fun `should insert inspection data with all data info to bigquery`() {
        val inspectionReport = InspectionReport(
            dateTime = LocalDateTime.now(),
            enterpriseId = 1.1,
            drainageExecuted = 1.1,
            drainagePhoto = "drainagePhoto",
            earthmovingExecuted = 1.1,
            earthmovingPhoto = "earthmovingPhoto",
            pavingExecuted = 1.1,
            pavingPhoto = "pavingPhoto",
            signalingExecuted = 1.1,
            signalingPhoto = "signalingPhoto",
            riskComments = "riskComments",
            generalVideo = "generalVideo",
            inspector = "John doe",
            signature = "signature",
            location = "location",
            statusComments = "statusComments"
        )
        inspectionOnBigQuery.add(inspectionReport)
    }

    @Test
    fun `should find inspection by enterprise id`() {
        val query = """SELECT * FROM `houer_dev.INSPECTIONS` WHERE ENTERPRISE_ID = 113""".trimIndent()
        val tableResults = utils.runQuery(query)

        every { clientBigQuery.bigQuery.query(any()) } returns tableResults

        val filters = inspectionOnBigQuery.findByEnterpriseId("113")

        Assertions.assertTrue(filters.isNotEmpty())
    }

    @Test()
    fun `should throw NotFoundException when findByEnterpriseId is called with an invalid enterprise id`() {
        val query = """SELECT * FROM `houer_dev.INSPECTIONS` WHERE ENTERPRISE_ID = -11""".trimIndent()
        val tableResults = utils.runQuery(query)

        every { clientBigQuery.bigQuery.query(any()) } returns tableResults

        val exception = assertThrows(NotFoundException::class.java) {
            inspectionOnBigQuery.findByEnterpriseId("-11")
        }

        Assertions.assertEquals("Inspections not found", exception.message)
    }

    private fun getResponse(query: Any?): TableResult {
        val key: String = Toolbox.instance.convertToMd5(query as String)
        val result = queryReponse[key] as String
        println(result)
        return Toolbox.instance.deserializeFromBase64(result) as TableResult
    }
}
