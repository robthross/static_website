/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'

import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'

import Map from '.'
import { ICoordinatesData } from '../../interfaces/components/coordinates'
import coordinateDataMock from '../../Mocks/coordinateDataMock'
import * as handleFullscreenModule from './utils/handleFullscreen'

const mockEnterprisesQueries = {
  query1: 'value1',
  query2: 'value2'
}

jest.mock('react-leaflet', () => ({
  ...jest.requireActual('react-leaflet'),
  MapContainer: ({ ...props }) => (
    <div data-testid="map" {...props}>
      Map Mockado
    </div>
  )
}))

const handleGeoJSONClick = jest.fn()
describe('Map component', () => {
  it('renders the component with loading true', () => {
    const { getByTestId } = render(
      <Map
        loading={true}
        initialCoordinates={undefined}
        coordinatesJson={coordinateDataMock as ICoordinatesData}
        handleGeoJSONClick={null}
        center={[]}
        enterprisesQueries={mockEnterprisesQueries}
        initialEnterprises={undefined}
      />
    )
    const mapElement = getByTestId('loading-component')

    expect(mapElement).toBeInTheDocument()
  })

  it('renders the component with data', () => {
    const { getByTestId } = render(
      <Map
        loading={false}
        initialCoordinates={coordinateDataMock as ICoordinatesData}
        coordinatesJson={coordinateDataMock as ICoordinatesData}
        handleGeoJSONClick={handleGeoJSONClick}
        center={[]}
        enterprisesQueries={mockEnterprisesQueries}
        initialEnterprises={undefined}
      />
    )
    const mapElement = getByTestId('map')

    expect(mapElement).toBeInTheDocument()
  })

  it('does not render the component when there is no data', () => {
    const { queryByTestId } = render(
      <Map
        loading={false}
        initialCoordinates={coordinateDataMock as ICoordinatesData}
        coordinatesJson={{ features: null } as ICoordinatesData}
        handleGeoJSONClick={handleGeoJSONClick}
        center={[]}
        enterprisesQueries={mockEnterprisesQueries}
        initialEnterprises={undefined}
      />
    )
    const mapElement = queryByTestId('map')

    expect(mapElement).not.toBeInTheDocument()
  })

  it('should toggle scroll zoom on button click', () => {
    const { getByTestId } = render(
      <Map
        loading={false}
        initialCoordinates={coordinateDataMock as ICoordinatesData}
        coordinatesJson={coordinateDataMock as ICoordinatesData}
        handleGeoJSONClick={handleGeoJSONClick}
        center={[]}
        enterprisesQueries={mockEnterprisesQueries}
        initialEnterprises={undefined}
      />
    )
    const buttonZoom = getByTestId('button-zoom')
    expect(buttonZoom.textContent).toBe('Ativar zoom')

    fireEvent.click(buttonZoom)

    expect(buttonZoom.textContent).toBe('Desativar zoom')
  })

  const handleFullscreenMock = jest.fn()
  // @ts-ignore
  handleFullscreenModule.handleFullscreen = handleFullscreenMock

  it('should toggle full screen on button click', () => {
    const { getByTestId } = render(
      <Map
        loading={false}
        initialCoordinates={coordinateDataMock as ICoordinatesData}
        coordinatesJson={coordinateDataMock as ICoordinatesData}
        handleGeoJSONClick={handleGeoJSONClick}
        center={[]}
        enterprisesQueries={mockEnterprisesQueries}
        initialEnterprises={undefined}
      />
    )
    const fullScreenButton = getByTestId('full-screen-button')

    fireEvent.click(fullScreenButton)
    expect(handleFullscreenMock).toHaveBeenCalled()
  })

  it('should switch between limits on button click', () => {
    const { getByText } = render(
      <Map
        loading={false}
        initialCoordinates={coordinateDataMock as ICoordinatesData}
        coordinatesJson={coordinateDataMock as ICoordinatesData}
        handleGeoJSONClick={handleGeoJSONClick}
        center={[]}
        enterprisesQueries={mockEnterprisesQueries}
        initialEnterprises={undefined}
      />
    )
    const mesoButton = getByText('Mesoregião')
    const citiesButton = getByText('Municipal')

    fireEvent.click(citiesButton)

    expect(mesoButton).not.toHaveClass('enabled')
    expect(citiesButton).toHaveClass('enabled')

    fireEvent.click(mesoButton)

    expect(mesoButton).toHaveClass('enabled')
    expect(citiesButton).not.toHaveClass('enabled')
  })
})
