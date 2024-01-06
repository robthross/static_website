package br.com.houer.tab.executiveview.infrastructure.persistence

import br.com.houer.tab.executiveview.domain.exceptions.NotFoundException
import br.com.houer.tab.executiveview.domain.model.InspectionReport
import br.com.houer.tab.executiveview.domain.repository.InspectionRepository
import com.google.cloud.bigquery.FieldValue
import com.google.cloud.bigquery.QueryJobConfiguration
import io.micronaut.context.annotation.Value
import jakarta.inject.Singleton
import java.time.LocalDateTime

@Singleton
class InspectionOnBigQuery(
    @Value("\${bigquery.dataset}") private val dataset: String,
    private val clientBigQuery: ClientBigQuery
) : InspectionRepository {
    override fun add(inspectionReport: InspectionReport) {
        val row =
            with(inspectionReport) {
                val map = mutableMapOf<String, Any>()
                map["id"] = enterpriseId.toString() + dateTime.toString()
                map["ENTERPRISE_ID"] = enterpriseId
                map["DATE_TIME"] = dateTime.toString()
                map["INSPECTOR"] = inspector
                drainageExecuted?.let { map.put("DRAINAGE_EXECUTED", drainageExecuted) }
                drainagePhoto?.let { map.put("DRAINAGE_PHOTO", drainagePhoto) }
                earthmovingExecuted?.let { map.put("EARTHMOVING_EXECUTED", earthmovingExecuted) }
                earthmovingPhoto?.let { map.put("EARTHMOVING_PHOTO", earthmovingPhoto) }
                pavingExecuted?.let { map.put("PAVING_EXECUTED", pavingExecuted) }
                pavingPhoto?.let { map.put("PAVING_PHOTO", pavingPhoto) }
                signalingExecuted?.let { map.put("SIGNALING_EXECUTED", signalingExecuted) }
                signalingPhoto?.let { map.put("SIGNALING_PHOTO", signalingPhoto) }
                riskComments?.let { map.put("RISK_COMMENTS", riskComments) }
                generalVideo?.let { map.put("GENERAL_VIDEO", generalVideo) }
                signature?.let { map.put("SIGNATURE", signature) }
                location?.let { map.put("LOCATION", location) }
                statusComments?.let { map.put("STATUS_COMMENTS", statusComments) }
                map
            }

        clientBigQuery.insertData(dataset, "INSPECTIONS", row)
    }

    override fun findByEnterpriseId(enterpriseId: String): List<InspectionReport> {
        val query = """
            SELECT * FROM `$dataset.INSPECTIONS` WHERE ENTERPRISE_ID = $enterpriseId
        """.trimIndent()
        val queryConfig = QueryJobConfiguration.newBuilder(query).build()
        val results = clientBigQuery.bigQuery.query(queryConfig)

        if (results.totalRows < 1) throw NotFoundException("Inspections not found")

        val inspectionReports = mutableListOf<InspectionReport>()
        for (row in results.values) {
            inspectionReports.add(
                InspectionReport(
                    enterpriseId = row.get("ENTERPRISE_ID").doubleValue,
                    dateTime = LocalDateTime.parse(row.get("DATE_TIME").stringValue),
                    inspector = row.get("INSPECTOR").stringValue,
                    drainageExecuted = getDoubleProperty(row.get("DRAINAGE_EXECUTED")),
                    drainagePhoto = getStringProperty(row.get("DRAINAGE_PHOTO")),
                    earthmovingExecuted = getDoubleProperty(row.get("EARTHMOVING_EXECUTED")),
                    earthmovingPhoto = getStringProperty(row.get("EARTHMOVING_PHOTO")),
                    pavingExecuted = getDoubleProperty(row.get("PAVING_EXECUTED")),
                    pavingPhoto = getStringProperty(row.get("PAVING_PHOTO")),
                    signalingExecuted = getDoubleProperty(row.get("SIGNALING_EXECUTED")),
                    signalingPhoto = getStringProperty(row.get("SIGNALING_PHOTO")),
                    riskComments = getStringProperty(row.get("RISK_COMMENTS")),
                    generalVideo = getStringProperty(row.get("GENERAL_VIDEO")),
                    signature = getStringProperty(row.get("SIGNATURE")),
                    location = getStringProperty(row.get("LOCATION")),
                    statusComments = getStringProperty(row.get("STATUS_COMMENTS"))
                )
            )
        }

        return inspectionReports
    }

    private fun getStringProperty(field: FieldValue): String? {
        return with(field) { if (this.isNull) null else this.stringValue }
    }

    private fun getDoubleProperty(field: FieldValue): Double? {
        return with(field) { if (this.isNull) null else this.doubleValue }
    }
}
