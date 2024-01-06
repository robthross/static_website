package br.com.houer.tab.executiveview.infrastructure.external

import br.com.houer.tab.executiveview.infrastructure.external.responses.City
import br.com.houer.tab.executiveview.infrastructure.external.responses.IBGEAggregate
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.QueryValue
import io.micronaut.http.client.annotation.Client

@Client("https://servicodados.ibge.gov.br/api")
interface IbgeClient {

    @Get("/v3/agregados/6579/periodos/2021/variaveis/9324")
    fun getPopulationByCity(@QueryValue localidades: String): List<IBGEAggregate>

    @Get("/v1/localidades/estados/31/municipios")
    fun getCityByState(): List<City>
}
