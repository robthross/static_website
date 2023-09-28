import React from 'react'

import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom/extend-expect'
import Text from '.'

describe('<Text/>', () => {
  test('should render text component', () => {
    const texto = 'Exemplo de texto'
    const tamanho = '20px'
    const cor = 'blue'
    const weight = 700
    const { getByText } = render(
      <Text text={texto} size={tamanho} color={cor} weight={weight} />
    )

    const elementoTexto = getByText(texto)
    expect(elementoTexto).toBeInTheDocument()

    const text = screen.getByTestId('test-text')

    expect(text).toHaveStyle({
      fontSize: tamanho
    })

    expect(text).not.toHaveStyle({
      fontSize: '21px'
    })
    expect(text).toHaveStyle({
      color: cor
    })
    expect(text).toHaveStyle({
      fontWeight: weight
    })
  })
})
