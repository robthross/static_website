import { ICoordinatesData } from './coordinates'

export type ICoordinates = [number, number][]

export interface IDetailingMap {
  coordinatesJson: ICoordinatesData
  pdf?: boolean
}
