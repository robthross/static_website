export type ICoordinates = [number, number][]
export type IType = string
export type IMesoName =
  | 'CAMPO DAS VERTENTES'
  | 'CENTRAL MINEIRA'
  | 'JEQUITINHONHA'
  | 'METROPOLITANA DE BELO HORIZONTE'
  | 'NOROESTE DE MINAS'
  | 'NORTE DE MINAS'
  | 'OESTE DE MINAS'
  | 'SUL/SUDOESTE DE MINAS'
  | 'TRIÂNGULO MINEIRO/ALTO PARANAÍBA'
  | 'VALE DO MUCURI'
  | 'VALE DO RIO DOCE'
  | 'ZONA DA MATA'

export interface IGeometry {
  coordinates: ICoordinates
  type: IType
}
export interface IProperties {
  Empreendim: string
  ID: number
  type: IType
  nm_meso: IMesoName
}
export interface IFeature {
  geometry: IGeometry
  properties: IProperties
  type: IType
}

export type IFeatures = IFeature[]

export interface ICoordinatesData {
  features: IFeatures
  type: IType
}
export interface ILayer extends ICoordinates {
  feature: IFeature
}
