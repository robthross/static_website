package br.com.houer.tab.executiveview.domain.service

import br.com.houer.tab.executiveview.domain.model.InspectionReport

interface InspectionReportHandler {

    fun setNextHandler(nextHandler: InspectionReportHandler)
    fun handleReport(report: InspectionReport)
}
