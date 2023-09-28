export interface IActionPlan {
  action: string
  responsible: string
  deadline?: string
  status: string
}

export interface IAction {
  actionPlans: IActionPlan[]
  id: string
  name: string
}
