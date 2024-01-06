package br.com.houer.tab.executiveview.domain.service

interface DownloadInspectionReportMedia {

    fun downloadPhoto(id: String): ByteArray

    fun downloadVideo(id: String): ByteArray
}
