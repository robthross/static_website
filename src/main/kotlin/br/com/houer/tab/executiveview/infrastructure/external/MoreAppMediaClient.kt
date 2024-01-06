package br.com.houer.tab.executiveview.infrastructure.external

import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.Header
import io.micronaut.http.annotation.Headers
import io.micronaut.http.client.annotation.Client
import org.reactivestreams.Publisher

@Client("https://api.moreapp.com/api")
interface MoreAppMediaClient {
    @Headers(
        Header(name = "X-Api-Key", value = "LDsneS_LGX_L1b5Ap0VB7eIh0TDaCthPDUYkkgsrTos=")
    )
    @Get("/v1.0/customers/163779/registrationFile/{id}/download")
    fun getImage(id: String): ByteArray

    @Headers(
        Header(name = "X-Api-Key", value = "LDsneS_LGX_L1b5Ap0VB7eIh0TDaCthPDUYkkgsrTos=")
    )
    @Get("/v1.0/customers/163779/registrationFile/{id}/download")
    fun downloadVideo(id: String): Publisher<ByteArray>
}
