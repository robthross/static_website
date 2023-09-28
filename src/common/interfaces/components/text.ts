import { ReactNode } from 'react'

export interface IText {
  children?: ReactNode
  text?: string | ReactNode
  size?: string
  color?: string
  weight?: number
  style?: React.CSSProperties
}
