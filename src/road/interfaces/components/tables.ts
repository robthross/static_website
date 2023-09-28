import { ReactNode } from 'react'

import { IEnterpriseData } from './enterprises'

export interface IListTables {
  enterpriseData: IEnterpriseData
  loading?: boolean
}
export interface ITableBox {
  title: string
  subtitle?: string
  sizeTitle: string
  shadow?: boolean
  children: ReactNode
  loading?: boolean
}
