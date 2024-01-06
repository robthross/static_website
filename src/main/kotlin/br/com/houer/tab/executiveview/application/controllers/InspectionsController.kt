package br.com.houer.tab.executiveview.application.controllers

import br.com.houer.tab.executiveview.application.representations.InspectionRequest
import br.com.houer.tab.executiveview.domain.exceptions.NotFoundException
import br.com.houer.tab.executiveview.domain.model.InspectionReport
import br.com.houer.tab.executiveview.domain.service.InspectionService
import br.com.houer.tab.executiveview.domain.usecases.EnterprisesUseCase
import io.micronaut.context.annotation.Value
import io.micronaut.http.HttpResponse
import io.micronaut.http.annotation.Body
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Error
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.Post
import io.micronaut.http.annotation.QueryValue
import io.reactivex.rxjava3.core.Flowable
import io.reactivex.rxjava3.schedulers.Schedulers
import org.slf4j.Logger
import org.slf4j.LoggerFactory

@Controller("/inspections")
class InspectionsController(
    private val inspectionService: InspectionService,
    @param:Value("\${houer.forms.ids}")
    private val formIds: List<String>
) {

    private val logger: Logger = LoggerFactory.getLogger(EnterprisesUseCase::class.java)

    @Post
    fun addInspection(@Body inspectionRequest: InspectionRequest): HttpResponse<String> {
        logger.debug("Adding inspection...")
        logger.debug("Inspection request: $inspectionRequest")
        if (shouldSaveForm(inspectionRequest)) {
            inspectionRequest.toInspection().let { inspectionReport ->
                Flowable.just(inspectionReport)
                    .observeOn(Schedulers.io())
                    .subscribe { inspectionService.add(it) }
                return HttpResponse.accepted()
            }
        }
        return HttpResponse.ok("Data will not be processed! Form not found or not valid.")
    }

    @Get
    fun getInspections(@QueryValue enterpriseId: String): List<InspectionReport> {
        return inspectionService.findByEnterpriseId(enterpriseId).sortedByDescending { it.dateTime }
    }

    private fun shouldSaveForm(inspectionRequest: InspectionRequest): Boolean {
        return formIds.contains(inspectionRequest.data.info.formId)
    }

    @Error(exception = NotFoundException::class)
    fun notFoundHandler(): HttpResponse<String> {
        return HttpResponse.notFound("Not found")
    }
}
