export interface IInspectionReport {
  dateTime?: string
  enterpriseId?: number
  location?: string
  drainageExecuted?: number
  earthmovingExecuted?: number
  pavingExecuted?: number
  signalingExecuted?: number
  riskComments?: string
  inspector?: string
  earthmovingPhoto: string
  pavingPhoto: string
  signalingPhoto: string
  signature?: string
  statusComments?: string
  drainagePhoto: string
  generalVideo?: string
}
