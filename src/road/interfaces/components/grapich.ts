export interface IGraphic {
  id: string
  name: string
  status: string
  startOrder: string
  workDeadline: string
  currentIAP?: number
  scurve: {
    month: number
    year: number
    planned: number
    executed: number
    plannedAcc: number
    executedAcc: number
  }[]
}
