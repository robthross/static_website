import React from 'react'

import { ChipContainer, ChipText, RemoveIcon } from './styles'

interface ChipProps<T> {
  data: T
  labelKey: keyof T
  onRemove: (data: T) => void
}

const Chip = <T,>({ data, labelKey, onRemove }: ChipProps<T>) => {
  return (
    <ChipContainer>
      <ChipText>{data[labelKey].toString()}</ChipText>
      <RemoveIcon onClick={() => onRemove(data)}>✕</RemoveIcon>
    </ChipContainer>
  )
}

export default Chip
