package br.com.houer.tab.executiveview

import br.com.houer.tab.executiveview.infrastructure.persistence.ClientBigQuery
import com.google.cloud.bigquery.Job
import com.google.cloud.bigquery.JobId
import com.google.cloud.bigquery.JobInfo
import com.google.cloud.bigquery.QueryJobConfiguration
import com.google.cloud.bigquery.TableResult
import org.apache.commons.codec.binary.Hex
import java.io.ByteArrayInputStream
import java.io.ByteArrayOutputStream
import java.io.FileOutputStream
import java.io.IOException
import java.io.ObjectInputStream
import java.io.ObjectOutputStream
import java.io.Serializable
import java.nio.charset.Charset
import java.security.MessageDigest
import java.security.NoSuchAlgorithmException
import java.util.*

@Throws(InterruptedException::class, IOException::class, NoSuchAlgorithmException::class)
fun main() {
    val queries = arrayOf(
        """SELECT  Programa, Sub_Programa, Status, Mesoregi__o, Empreendimento, Localizador FROM `houer_dev.GERENCIAMENTO` WHERE Status <> '18 - Cancelado';""",
        """SELECT Empreendimento, Localizador FROM `houer_dev.GERENCIAMENTO` WHERE Status <> '18 - Cancelado';""",
        """SELECT * FROM `houer_dev.INSPECTIONS` WHERE ENTERPRISE_ID = 113""",
        """SELECT * FROM `houer_dev.INSPECTIONS` WHERE ENTERPRISE_ID = -11"""
    )
    val prop: Properties = Toolbox.instance.propertyFile
    for (query in queries) {
        val tableResults: TableResult = Toolbox.instance.runQuery(query)
        val key: String = Toolbox.instance.convertToMd5(query)
        prop.setProperty(key, Toolbox.instance.serializeToBase64(tableResults))
    }
    val fr = FileOutputStream("./src/test/resources/query.properties")
    prop.store(fr, null)
    fr.close()
}

class Toolbox private constructor() {
    /**
     * The method runBqQuery is a generic method to call any BigQuery Sql. It will return the result
     * of BigQuery Sql as an object of TableResult.
     *
     * @param query : sql query to execute in bigquery
     * @return
     * @throws InterruptedException
     */
    @Throws(InterruptedException::class)
    fun runQuery(query: String?): TableResult {
        val queryConfig = QueryJobConfiguration.newBuilder(query).setUseLegacySql(false).build()
        val jobId = JobId.of(UUID.randomUUID().toString())
        val queryJob: Job = bigquery.create(JobInfo.newBuilder(queryConfig).setJobId(jobId).build())
        return queryJob.getQueryResults()
    }

    @Throws(IOException::class, ClassNotFoundException::class)
    fun deserializeFromBase64(s: String?): Any {
        val data = Base64.getDecoder().decode(s)
        val ois = ObjectInputStream(
            ByteArrayInputStream(data)
        )
        val o = ois.readObject()
        ois.close()
        return o
    }

    @Throws(IOException::class)
    fun serializeToBase64(o: Serializable?): String {
        val baos = ByteArrayOutputStream()
        val oos = ObjectOutputStream(baos)
        oos.writeObject(o)
        oos.close()
        return Base64.getEncoder().encodeToString(baos.toByteArray())
    }

    val propertyFile: Properties
        get() {
            val prop = Properties()
            val `in` = javaClass.classLoader.getResourceAsStream("query.properties")
            prop.load(`in`)
            return prop
        }

    @Throws(NoSuchAlgorithmException::class)
    fun convertToMd5(text: String): String {
        val md = MessageDigest.getInstance("MD5")
        md.update(text.toByteArray(Charset.forName("UTF8")))
        val resultByte = md.digest()
        return String(Hex.encodeHex(resultByte))
    }

    companion object {
        private val bigquery = ClientBigQuery(
            "ewogICJ0eXBlIjogInNlcnZpY2VfYWNjb3VudCIsCiAgInByb2plY3RfaWQiOiAidGFiLWRldi1wYWluZWwiLAogICJwcml2YXRlX2tleV9pZCI6ICJmODA3NTYxNDYxODNkOWI5N2E3NjJjNTI1NzQyMzU3ZDViMWYwZDdjIiwKICAicHJpdmF0ZV9rZXkiOiAiLS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tXG5NSUlFdkFJQkFEQU5CZ2txaGtpRzl3MEJBUUVGQUFTQ0JLWXdnZ1NpQWdFQUFvSUJBUUREWmtXa25aVjh5ZjMvXG5NZ0MxQ1NKbHRad3RYa05VS0hSakFWY1NjZmE4TkVtTEtZbDdNNEpTRlNsZEpybm9kOEhzV3JzU1RHdkQwV2Z4XG4vSHowK2g4aTNnNjdRZURPa2gyZDUxUFB6TVUwY2hCYlhDMDcwYzBldDVabGp0Nk80a1lsN253MUYweVZMaktGXG51Vmo4SmlVZ0NVSnBWVlp1S0ZDYmVCb21taTNFNlUraVd2VmtTYlQveXBYTkE5TGtVK1RNOHI2U29OSkVuVndkXG5USUJBQVlvR1N6cTRHRTRERXVWbSs5ay95SWtieGVmY1JQMUNWa1BMVC9ocWM5SGRXZWZLV0lOM2lxa3ZuNVp5XG44K1NyQjF1S0VuVWY0RjZmaU5HOVV1NGFWOW1kUXBBWVZ1V21ncEFsWEtYcWErQjdsa3FOUG9UMm9pTUJvSVJJXG5DSEVLYnpjRkFnTUJBQUVDZ2dFQVBJbGk2aTBvTXhFaGIvNjkyVmlMSDVlMFd4bnBJaG1tZFVYbEJBSHF2MFF6XG54TG1Kcm5HMjNsZFFDVndHSE05OWRReG5DTFJFYnRaaHJjYmJyOG9OKzI5d2dQTllBcWVpSlZtVnpidFRIWHg1XG5OTlRKN3M2QkRoTXl0U1FlTDRaSzFWV2RoWlZDVkxXTFVZS3Ezdk95Yk1weG1OQ25obGxYSDlPRnhvL2R2ak0vXG5UQXJ3cmVYcythcWE0dmZ2Y29RcTRDaEY4TkRtQlVDSjZ3akFEOWEySktSN0hKQVVYZzhTaDYzRDZtV2dQT2srXG5nWHlsaEsyMVJCTzRoSVNwMHVBdVk2ODRQbTRvWWxFN0U2KzhpbXR6RFNjMTd6WFVJQkRMOFBmZUZXenl2eWlHXG5LakRGTHlKcFk2SDFJUzJpQzI2RTVhL2NjSVQ4TW90Wm1ndFlLVVhkd1FLQmdRRHhZRTNTWFhNTU1yQldJVDUrXG53T1FERExIQll2MWZDYVhCbnpXeWNEOUM3YWpZWUJ3enJuYUdwYnRTYzZPQ2JlcjU2a0pYWVhPaGNDVGl3NmtLXG5Bb2Izd3JrcHJmdkYyaFAyc0EvTTcwbUJienpOQTdQU2xvS0FJbU0zMEFkM0tvelF0akR6TDVkTW9Ja2VtYzRIXG5ZY0NaUFhKYUhXYzlmMGMzRTRiTzIwMjlzd0tCZ1FEUFBPRC9uS1N4cnI4MW5XbUNaOGQzbGFYN0RkemJwcHc2XG5oZXhNeTZPSjdidWFuVDF6N0hrUEw4eGlMa1RFRXpVcGhmRTE1a3FhZDB3Mk9uOG14cm5vSFFsUDdwaXY0dGJuXG5VSkxLaXdYbkcrcGxkUDJBUXFpUUh0SjQvMVRyNExia0VJOTJNcU1qS2s1NXdsd0swSmtyR3hYRitoZzlYcitoXG5EdXZyV3U2TVp3S0JnRkJDMVoyOXRTTzVOeWxzcEh0QmFKQWJDSUJsaWhxditvNEhnck55MzVaQnNJTkNjaDQ5XG5ST3hBNzZqYkN1T3o2UTV3OXQ1WGFUdWxMcDY0c056RE9sM29RZW02RUo0WmhjbmhnVitEc2MxNFQ1OWNPODhxXG5mUHBlZE45NkxRRlRCTC9oMVNVSURpZE11a3VTbVErYlVZK2kvd000QTd4UE5qNzZIemxwY3RCQkFvR0FUU1FCXG5NTVRUUFZ5cHlrQlZCUGl5ZEI0ZFVhMWdWOWJWOHFibFJkVExoRTBjOXptdXBWY1IzUWhTMFAwZUZjcDhrSDlPXG5RVnoreWk2OERMZUxteGlBSFJtcDNMb1kxZWZmVE8xZUpzekhIcmJ5Y2wrdytTeFc2SWJBbTgrWGdkSDg0am9UXG4zTkNPajBseE9ydVJYV2syaXFnalc3VnpqbXlWY2xOR21DNForK01DZ1lBeUE2Rnl2MFlnZ2FlWk1nd1dIVXR2XG5LRDJGeUw2eS84M1d1UmxGTitPWGRna05KSUNzQ3BLY2xkN0pIS083RlNObit6MkNtRC9YdURCcXBqZGREUzZFXG5tNDFhV2lnSGFTU01JcW1LVVhwM0NySjExZCthNndldUR6ZThwYU9oY1gxN0xESWZqdWZBNk40MUJmMU11VjhrXG5xc2VUVUIrOXlrZExaWG81UERENFZ3PT1cbi0tLS0tRU5EIFBSSVZBVEUgS0VZLS0tLS1cbiIsCiAgImNsaWVudF9lbWFpbCI6ICJwZWRyby1jb2VsaG8tc2FtYmF0ZWNoQHRhYi1kZXYtcGFpbmVsLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwKICAiY2xpZW50X2lkIjogIjExNDQwMTU3NDU0NjkxNTQxMDUwNSIsCiAgImF1dGhfdXJpIjogImh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi9hdXRoIiwKICAidG9rZW5fdXJpIjogImh0dHBzOi8vb2F1dGgyLmdvb2dsZWFwaXMuY29tL3Rva2VuIiwKICAiYXV0aF9wcm92aWRlcl94NTA5X2NlcnRfdXJsIjogImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL29hdXRoMi92MS9jZXJ0cyIsCiAgImNsaWVudF94NTA5X2NlcnRfdXJsIjogImh0dHBzOi8vd3d3Lmdvb2dsZWFwaXMuY29tL3JvYm90L3YxL21ldGFkYXRhL3g1MDkvcGVkcm8tY29lbGhvLXNhbWJhdGVjaCU0MHRhYi1kZXYtcGFpbmVsLmlhbS5nc2VydmljZWFjY291bnQuY29tIgp9Cg"
        ).bigQuery
        val instance = Toolbox()
    }
}
