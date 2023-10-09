import { ICoordinatesData, IFeature } from './coordinates'
import { IEnterpriseData } from './enterprises'

export type ICoordinates = [number, number][]

export interface IMap {
  loading?: boolean
  initialCoordinates: ICoordinatesData
  coordinatesJson: ICoordinatesData
  handleGeoJSONClick: (event: { layer: { feature: IFeature } }) => void
  center: number[]
  enterprisesQueries: {
    [key: string]: string
  }
  initialEnterprises: IEnterpriseData
}
