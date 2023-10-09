import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'

import DetailingMap from '.'
import { ICoordinatesData } from '../../interfaces/components/coordinates'
import '@testing-library/jest-dom'
import coordinateDataMock from '../../Mocks/coordinateDataMock'

jest.mock('react-leaflet', () => ({
  __esModule: true,

  MapContainer: () => <div data-testid="mocked-detailing-map" />
}))

describe('DetailingMap', () => {
  it('renders the map component', () => {
    render(
      <DetailingMap coordinatesJson={coordinateDataMock as ICoordinatesData} />
    )
    const mapContainer = screen.getByTestId('mocked-detailing-map')
    expect(mapContainer).toBeInTheDocument()
  })
  it('toggles scroll zoom when button is clicked', () => {
    render(
      <DetailingMap coordinatesJson={coordinateDataMock as ICoordinatesData} />
    )
    const ButtonZoom = screen.getByTestId('button-zoom')

    const ButtonText = ButtonZoom.querySelector('.text-component')

    expect(ButtonText).toHaveTextContent('Ativar zoom')

    fireEvent.click(ButtonZoom)

    expect(ButtonText).not.toHaveTextContent('Ativar zoom')
    expect(ButtonText).toHaveTextContent('Desativar zoom')
  })
})
