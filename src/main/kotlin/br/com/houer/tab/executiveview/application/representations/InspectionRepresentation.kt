package br.com.houer.tab.executiveview.application.representations

import br.com.houer.tab.executiveview.application.utils.LocalDateTimeDeserializer
import br.com.houer.tab.executiveview.domain.model.EnterpriseFilter
import br.com.houer.tab.executiveview.domain.model.InspectionReport
import com.fasterxml.jackson.databind.annotation.JsonDeserialize
import java.time.LocalDateTime

data class InspectionRequest(val data: DataInspectionRequest) {
    fun toInspection(): InspectionReport {
        return InspectionReport(
            dateTime = data.data.dateTime!!,
            enterpriseId = data.data.id!!.enterpriseId,
            location = data.data.location,
            signature = data.data.signature,
            drainageExecuted = data.data.drainageExecuted,
            drainagePhoto = data.data.drainagePhoto,
            earthmovingExecuted = data.data.earthmovingExecuted,
            earthmovingPhoto = data.data.earthmovingPhoto,
            pavingExecuted = data.data.pavingExecuted,
            pavingPhoto = data.data.pavingPhoto,
            signalingExecuted = data.data.signalingExecuted,
            signalingPhoto = data.data.signalingPhoto,
            riskComments = data.data.riskComments,
            generalVideo = data.data.generalVideo,
            inspector = data.info.userId,
            statusComments = data.data.statusComments
        )
    }
}

data class DataInspectionRequest(val data: InputDataInspectionRequest, val info: InfoInspectionRequest)

data class InputDataInspectionRequest(
    @JsonDeserialize(using = LocalDateTimeDeserializer::class)
    val dateTime: LocalDateTime? = null,
    val id: EnterpriseFilter? = null,
    val location: String? = null,
    val signature: String? = null,
    val drainageExecuted: Double? = null,
    val drainagePhoto: String? = null,
    val earthmovingExecuted: Double? = null,
    val earthmovingPhoto: String? = null,
    val pavingExecuted: Double? = null,
    val pavingPhoto: String? = null,
    val signalingExecuted: Double? = null,
    val signalingPhoto: String? = null,
    val riskComments: String? = null,
    val generalVideo: String? = null,
    val statusComments: String? = null
)

data class InfoInspectionRequest(val userId: String, val formId: String, val formName: String)
