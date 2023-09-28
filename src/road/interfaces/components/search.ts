import { ICoordinatesData, IFeature } from './coordinates'
import { IEnterpriseData } from './enterprises'

export interface ISearchHandleGeoJSONClickData {
  setDetailsAndRisksOpened: React.Dispatch<React.SetStateAction<boolean>>
  getCurrentCoordinate: (
    value: number | string,
    coordinates: ICoordinatesData
  ) => IFeature
  getCurrentEnterprise: (
    initialData: IEnterpriseData | null,
    value: number | string
  ) => void
}

export interface ISearch {
  searchHandleGeoJSONClickData: ISearchHandleGeoJSONClickData
}
