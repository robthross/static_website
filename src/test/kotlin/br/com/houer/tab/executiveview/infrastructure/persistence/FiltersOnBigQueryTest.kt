package br.com.houer.tab.executiveview.infrastructure.persistence

import br.com.houer.tab.executiveview.Toolbox
import com.google.cloud.bigquery.TableResult
import io.mockk.every
import io.mockk.impl.annotations.RelaxedMockK
import io.mockk.junit5.MockKExtension
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import java.io.FileNotFoundException
import java.util.*

@ExtendWith(MockKExtension::class)
class FiltersOnBigQueryTest {

    val dataset: String = "houer_dev"

    @RelaxedMockK
    lateinit var clientBigQuery: ClientBigQuery

    private lateinit var filtersOnBigQuery: FiltersOnBigQuery

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
        filtersOnBigQuery = FiltersOnBigQuery(dataset, clientBigQuery)
    }

    @Test
    fun `should return at least an option for each filter`() {
        val query = """
                SELECT  Programa, Sub_Programa, Status, Mesoregi__o, Empreendimento, Localizador FROM `houer_dev.GERENCIAMENTO` WHERE Status <> '18 - Cancelado';
        """.trimIndent()
        val tableResults = utils.runQuery(query)

        every { clientBigQuery.bigQuery.query(any()) } returns tableResults

        val filters = filtersOnBigQuery.findAllOptions()

        assertEquals(5, filters.size)
        assertTrue(filters[0].options.isNotEmpty())
        assertTrue(filters[1].options.isNotEmpty())
        assertTrue(filters[2].options.isNotEmpty())
        assertTrue(filters[3].options.isNotEmpty())
        assertTrue(filters[4].options.isNotEmpty())
    }

    @Test
    fun `should return a not empty list with enterprise options`() {
        val query = """
                SELECT Empreendimento, Localizador FROM `houer_dev.GERENCIAMENTO` WHERE Status <> '18 - Cancelado';
        """.trimIndent()
        val tableResults = utils.runQuery(query)

        every { clientBigQuery.bigQuery.query(any()) } returns tableResults

        val filters = filtersOnBigQuery.findEnterpriseOptions()

        assertTrue(filters.isNotEmpty())
    }

    private fun getResponse(query: Any?): TableResult {
        val key: String = Toolbox.instance.convertToMd5(query as String)
        val result = queryReponse[key] as String?
        println(result)
        return Toolbox.instance.deserializeFromBase64(result) as TableResult
    }
}
