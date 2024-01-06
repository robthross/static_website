package br.com.houer.tab.executiveview.infrastructure.external

import br.com.houer.tab.executiveview.domain.service.InspectionReportMediaStorage
import com.google.cloud.storage.Blob
import com.google.cloud.storage.BlobId
import com.google.cloud.storage.BlobInfo
import com.google.cloud.storage.Storage
import com.google.cloud.storage.StorageOptions
import io.micronaut.context.annotation.Value
import jakarta.inject.Singleton
import java.time.LocalDateTime

@Singleton
class InspectionReportGCPStorage(@Value("\${storage.inspection.bucket.name}") private val bucketName: String) :
    InspectionReportMediaStorage {
    override fun uploadJpegImage(
        enterpriseId: Double,
        dateTime: LocalDateTime,
        imageName: String,
        imageBytes: ByteArray
    ): String {
        val blobName = "$enterpriseId/$dateTime/$imageName.jpeg"
        val contentType = "image/jpeg"

        return uploadMedia(bucketName, blobName, contentType, imageBytes)
    }

    override fun uploadMp4Video(
        enterpriseId: Double,
        dateTime: LocalDateTime,
        videoName: String,
        videoBytes: ByteArray
    ): String {
        val blobName = "$enterpriseId/$dateTime/$videoName.mp4"
        val contentType = "video/mp4"

        return uploadMedia(bucketName, blobName, contentType, videoBytes)
    }

    private fun uploadMedia(bucketName: String, blobName: String, contentType: String, mediaBytes: ByteArray): String {
        val storage: Storage = StorageOptions.getDefaultInstance().service

        // Prepare blob information
        val blobId: BlobId = BlobId.of(bucketName, blobName)
        val blobInfo: BlobInfo = BlobInfo.newBuilder(blobId).setContentType(contentType).build()

        // Upload the image
        val blob: Blob = storage.create(blobInfo, mediaBytes)

        return "https://storage.googleapis.com/$bucketName/${blob.name}"
    }
}
