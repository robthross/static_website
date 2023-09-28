import '@testing-library/jest-dom'
import React from 'react'

import { render, screen } from '@testing-library/react'

import Loading from '.'

describe('Loading', () => {
  it('renders initial loading with correct text', () => {
    render(<Loading initial />)
    const loadingElement = screen.getByTestId('initial-loading')

    expect(loadingElement).toBeInTheDocument()

    const loadingText = screen.getByText('Carregando...')
    expect(loadingText).toBeInTheDocument()
  })

  it('renders loading', () => {
    render(<Loading />)
    const loadingElement = screen.getByTestId('loading-component')

    expect(loadingElement).toBeInTheDocument()
  })
})
