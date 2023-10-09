export interface IEnterprise {
  id: string
  name: string
  program: string
  subProgram: string
  road: string
  extension: string
  status: string
  filterStatus: string
  startedAt: string
  amountDone: string
  totalEstimated: string
  resourcesAvailable: string
  resourcesToBeAvailable: string
  dueAt: string
  populationEstimated: number
  iap: string
  cities: string
  enterprises: string
  riskEnvironment: string
  riskExpropriation: string
  riskWork: string
  semaphore: string
  indirectJobs: string
  directJobs: string
}

export type IDetailingTypes =
  | 'id'
  | 'name'
  | 'program'
  | 'subProgram'
  | 'road'
  | 'status'
  | 'startedAt'
  | 'amountDone'
  | 'totalEstimated'
  | 'resourcesToBeAvailable'
  | 'resourcesAvailable'
  | 'dueAt'
  | 'cities'
  | 'extension'
  | 'populationEstimated'
  | 'indirectJobs'
  | 'directJobs'

export interface IEnterpriseData {
  enterprises: IEnterprise[]
  total: number
  totalAmount: string
  resourcesAvailable: string
  redLight: number
  greenLight: number
  yellowLight: number
  mileage: string
  mileageByToStart: string
  mileageByExecuting: string
  mileageByPaused: string
  mileageByCompleted: string
}
