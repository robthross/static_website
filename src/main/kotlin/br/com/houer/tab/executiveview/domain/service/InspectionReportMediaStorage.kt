package br.com.houer.tab.executiveview.domain.service

import java.time.LocalDateTime

interface InspectionReportMediaStorage {

    fun uploadJpegImage(enterpriseId: Double, dateTime: LocalDateTime, imageName: String, imageBytes: ByteArray): String

    fun uploadMp4Video(enterpriseId: Double, dateTime: LocalDateTime, videoName: String, videoBytes: ByteArray): String
}
