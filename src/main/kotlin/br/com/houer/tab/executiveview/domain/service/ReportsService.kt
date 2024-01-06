package br.com.houer.tab.executiveview.domain.service

import br.com.houer.tab.executiveview.application.representations.ReportDTO
import br.com.houer.tab.executiveview.application.representations.ReportRequestDTO

interface ReportsService {
    fun getReports(dto: ReportRequestDTO): MutableMap<String, ReportDTO>
}
