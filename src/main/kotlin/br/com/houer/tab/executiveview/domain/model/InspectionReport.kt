package br.com.houer.tab.executiveview.domain.model

import java.time.LocalDateTime

data class InspectionReport(
    val dateTime: LocalDateTime,
    val enterpriseId: Double,
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
    val inspector: String,
    val statusComments: String? = null
)
