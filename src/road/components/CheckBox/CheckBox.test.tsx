import React from 'react'

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import CheckBox from '.'

describe('CheckBox', () => {
  it('Deve não estar checado com valores de value e option diferentes', () => {
    render(<CheckBox value={'Opçao0'} option="Opção" type="teste" />)

    const checkbox = screen.getByTestId('input-radio')
    expect(checkbox).not.toBeChecked()
  })
  it('Deve estar checado com valores de value e option diferentes', () => {
    render(<CheckBox value={'Op 1'} option="Op 1" type="teste" />)

    const checkbox = screen.getByTestId('input-radio')
    expect(checkbox).toBeChecked()
  })
  it('Não deve estar checado com valores de value e option diferentes do tipo id', () => {
    render(<CheckBox value="20,21" option="22" type="id" />)

    const checkbox = screen.getByTestId('input-radio')
    expect(checkbox).not.toBeChecked()
  })
  it('Deve estar checado com valores de value e option iguais do tipo id', () => {
    render(<CheckBox value="20,21" option="21" type="id" />)

    const checkbox = screen.getByTestId('input-radio')
    expect(checkbox).toBeChecked()
  })
})
