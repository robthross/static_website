import React from 'react'

export const handleChange = (
  type: string,
  value: number | string,
  setState: React.Dispatch<
    React.SetStateAction<{
      [key: string]: string | number | string[] | number[]
    }>
  >,
  state: {
    [key: string]: string | number | string[] | number[]
  }
) => {
  if (value === 0) value = 'VERDE'
  else if (value === 1) value = 'AMARELO'
  else value = 'VERMELHO'
  setState({
    ...state,
    [type]: value
  })
}
