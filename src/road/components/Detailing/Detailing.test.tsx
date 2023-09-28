import '@testing-library/jest-dom'

import React from 'react'

import { render, screen } from '@testing-library/react'

import Detailing from '.'
import DetailingMock from '../../Mocks/detailing'
import GraphicMock from '../../Mocks/graphicMock'

describe('Detailing', () => {
  it('renders the Detailing component with provided data', () => {
    render(<Detailing data={DetailingMock} graphic={GraphicMock} />)

    const detailingComponent = screen.getByTestId('detailing')
    expect(detailingComponent).toBeInTheDocument()

    const enterpriseName = screen.getByText(DetailingMock.name)
    expect(enterpriseName).toBeInTheDocument()
  })

  it('displays id when graphic data is not provided', () => {
    render(<Detailing data={DetailingMock} graphic={null} />)

    const id = screen.getByText(`id: ${DetailingMock.id}.`)
    expect(id).toBeInTheDocument()
  })
})
