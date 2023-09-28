import { ICoordinatesData } from './coordinates'
import { IEnterprise } from './enterprises'

export interface IDetailsRisksContainer {
  currentEnterprise: IEnterprise
  currentCoordinate?: ICoordinatesData
}
