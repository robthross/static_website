import { MouseEventHandler } from 'react'

export interface IButton {
  text: string
  color?: string
  background?: string
  onClick: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}
