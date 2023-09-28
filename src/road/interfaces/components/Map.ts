import { ICoordinatesData, IFeature } from './coordinates'

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
}
