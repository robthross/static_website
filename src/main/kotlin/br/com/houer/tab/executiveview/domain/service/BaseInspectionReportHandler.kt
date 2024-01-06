package br.com.houer.tab.executiveview.domain.service

import br.com.houer.tab.executiveview.domain.model.InspectionReport

abstract class BaseInspectionReportHandler : InspectionReportHandler {
    private var nextHandler: InspectionReportHandler? = null

    override fun setNextHandler(nextHandler: InspectionReportHandler) {
        this.nextHandler = nextHandler
    }

    override fun handleReport(report: InspectionReport) {
        nextHandler?.handleReport(report)
    }
}
