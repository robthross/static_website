package br.com.houer.tab.executiveview.domain.usecases

import br.com.houer.tab.executiveview.domain.model.InspectionReport
import br.com.houer.tab.executiveview.domain.repository.InspectionRepository
import br.com.houer.tab.executiveview.domain.service.InspectionService
import jakarta.inject.Singleton

@Singleton
class InspectionUseCase(
    private val inspectionRepository: InspectionRepository,
    saveInspectionReportHandle: SaveInspectionReportHandle,
    private val saveDrainagePhotoHandle: SaveDrainagePhotoHandle,
    saveEarthmovingPhotoHandle: SaveEarthmovingPhotoHandle,
    savePavingPhotoHandle: SavePavingPhotoHandle,
    saveSignalingPhotoHandle: SaveSignalingPhotoHandle,
    saveGeneralVideoHandle: SaveGeneralVideoHandle
) : InspectionService {
    init {
        saveDrainagePhotoHandle.setNextHandler(saveEarthmovingPhotoHandle)
        saveEarthmovingPhotoHandle.setNextHandler(savePavingPhotoHandle)
        savePavingPhotoHandle.setNextHandler(saveSignalingPhotoHandle)
        saveSignalingPhotoHandle.setNextHandler(saveGeneralVideoHandle)
        saveGeneralVideoHandle.setNextHandler(saveInspectionReportHandle)
    }

    override fun add(inspectionReport: InspectionReport) {
        saveDrainagePhotoHandle.handleReport(inspectionReport)
    }

    override fun findByEnterpriseId(enterpriseId: String): List<InspectionReport> {
        return inspectionRepository.findByEnterpriseId(enterpriseId)
    }
}
