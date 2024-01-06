package br.com.houer.tab.executiveview.infrastructure.persistence

import br.com.houer.tab.executiveview.domain.exceptions.OperationNotExecuted
import com.google.auth.oauth2.ServiceAccountCredentials
import com.google.cloud.bigquery.BigQuery
import com.google.cloud.bigquery.BigQueryOptions
import com.google.cloud.bigquery.InsertAllRequest
import com.google.cloud.bigquery.TableId
import io.micronaut.context.annotation.Value
import jakarta.inject.Singleton
import java.io.File
import java.nio.file.Files
import java.nio.file.Paths
import java.util.*

@Singleton
class ClientBigQuery(
    @Value("\${google.service.account.key}") var encodedKey: String
) {
    init {
        val decodedKey = Base64.getDecoder().decode(encodedKey)
        val keyFilePath = Paths.get("keyfile.json")
        Files.write(keyFilePath, decodedKey)
    }

    private val credentialsFile = File("keyfile.json")

    private val credentials = ServiceAccountCredentials
        .fromStream(credentialsFile.inputStream())
        .createScoped(
            mutableListOf(
                "https://www.googleapis.com/auth/drive",
                "https://www.googleapis.com/auth/cloud-platform"
            )
        )
    // Create a BigQuery client object with the credentials

    val bigQuery: BigQuery = BigQueryOptions.newBuilder().setCredentials(credentials).build().service

    fun insertData(datasetName: String, tableName: String, row: Map<String, Any>) {
        val tableId = TableId.of(datasetName, tableName)
        val insertRequest = InsertAllRequest.newBuilder(tableId)

        insertRequest.addRow(row["id"] as String, row.filterNot { it.key == "id" })

        val response = bigQuery.insertAll(insertRequest.build())

        if (response.hasErrors()) {
            response.insertErrors.entries.forEach { entry ->
                println("Error in row ${entry.key}: ${entry.value}")
            }
            throw OperationNotExecuted(response.insertErrors.entries.first().value.toString())
        } else {
            println("Rows successfully inserted.")
        }
    }
}
