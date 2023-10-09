import { MouseEventHandler } from 'react'

export type IType =
  | 'PROGRAM'
  | 'SUBPROGRAM'
  | 'STATUS'
  | 'REGION'
  | 'ENTERPRISE'
export type IOptions = string[]

export interface IFilterSidebar {
  type: IType
  options: IOptions
}

export type ISidebarData = IFilterSidebar[]

export interface ISidebarComponent {
  data: ISidebarData
  isLoading: boolean
  toClean: MouseEventHandler<HTMLButtonElement>
  handleClick: (type: string) => void
  currentType: string
  handleChange: (type: string, value: string | number) => void
}

export interface IItemSidebarComponent {
  handleClick: (type: string) => void
  item: IFilterSidebar
  currentType: string
  handleChange: (type: string, value: number | string) => void
  enterprisesQueries: { [key: string]: string }
  enterpriseRefetch: () => void
}
