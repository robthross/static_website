package br.com.houer.tab.executiveview.domain.model

data class ActionPlans(
    val id: String,
    val name: String,
    val actionPlans: List<ActionPlan>
)

data class ActionPlan(
    val action: String,
    val responsible: String?,
    val deadline: String?,
    val status: String?
)
