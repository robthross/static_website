package br.com.houer.tab.executiveview.infrastructure.external

import br.com.houer.tab.executiveview.domain.service.DownloadInspectionReportMedia
import jakarta.inject.Singleton
import java.net.HttpURLConnection
import java.net.URL

@Singleton
class DownloadMoreAppInspectionReportMedia(private val moreAppMediaClient: MoreAppMediaClient) :
    DownloadInspectionReportMedia {
    override fun downloadPhoto(id: String): ByteArray {
        return moreAppMediaClient.getImage(id)
    }

    override fun downloadVideo(id: String): ByteArray {
        val url = URL("https://api.moreapp.com/api/v1.0/customers/163779/registrationFile/$id/download")
        val connection = url.openConnection() as HttpURLConnection

        // set headers
        connection.setRequestProperty("X-Api-Key", "LDsneS_LGX_L1b5Ap0VB7eIh0TDaCthPDUYkkgsrTos=")

        // handle response
        val responseCode = connection.responseCode
        println("Response Code: $responseCode")

        return connection.inputStream.readAllBytes()
    }
}
