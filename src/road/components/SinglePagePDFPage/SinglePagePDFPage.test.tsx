import React from 'react'

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import SinglePagePDFPage from '.'
import { IAction } from '../../interfaces/components/actionplan'
import { ICoordinatesData } from '../../interfaces/components/coordinates'
import { IInspectionReport } from '../../interfaces/components/inspectionreport'
import actionMock from '../../Mocks/actionMock'
import CoordinateDataMock from '../../Mocks/coordinateDataMock'
import enterpriseMock from '../../Mocks/enterpriseMock'
import graphicMock from '../../Mocks/graphicMock'
import inspectionReportsDataMock from '../../Mocks/inspectionReportsDataMock'

// Hey, developer! This mock became necessary because using the library in this test became unfeasible; it was throwing errors related to functions that were inaccessible to me. However, you can check if the conditional for displaying the map is working.
jest.mock('../DetailingMap', () => ({
  __esModule: true,
  default: () => <div data-testid="mocked-detailing-map" />
}))

describe('<SinglePagePDFPage/>', () => {
  const mockData = enterpriseMock
  const mockCoordinateData = CoordinateDataMock
  const mockGraphicData = graphicMock
  const mockActionPlansData = actionMock
  const mockInspectionReportsData = inspectionReportsDataMock

  it('renders without crashing', () => {
    render(
      <SinglePagePDFPage
        data={mockData}
        currentCoordinate={mockCoordinateData as ICoordinatesData}
        graphicData={mockGraphicData}
        actionPlansData={mockActionPlansData as IAction}
        inspectionReportsData={mockInspectionReportsData as IInspectionReport[]}
      />
    )
  })

  it('renders the enterprise name', () => {
    const { getByText } = render(
      <SinglePagePDFPage
        data={mockData}
        currentCoordinate={mockCoordinateData as ICoordinatesData}
        graphicData={mockGraphicData}
        actionPlansData={mockActionPlansData as IAction}
        inspectionReportsData={mockInspectionReportsData as IInspectionReport[]}
      />
    )

    const enterpriseNameElement = getByText(mockData.name)
    expect(enterpriseNameElement).toBeInTheDocument()
  })

  it('renders the detailing information', () => {
    const { getByText } = render(
      <SinglePagePDFPage
        data={mockData}
        currentCoordinate={mockCoordinateData as ICoordinatesData}
        graphicData={mockGraphicData}
        actionPlansData={mockActionPlansData as IAction}
        inspectionReportsData={mockInspectionReportsData as IInspectionReport[]}
      />
    )
    const detailingHeader = getByText('Detalhamento')
    expect(detailingHeader).toBeInTheDocument()

    const detailingName = getByText('Vicosa Porto Firme')
    expect(detailingName).toBeInTheDocument()
    const detailingProgram = getByText('PROVIAS')
    expect(detailingProgram).toBeInTheDocument()

    const detailingPopulationEstimated = getByText('91.324')
    expect(detailingPopulationEstimated).toBeInTheDocument()
  })

  it('renders the map if coordinates are present', () => {
    const { getByTestId } = render(
      <SinglePagePDFPage
        data={mockData}
        currentCoordinate={mockCoordinateData as ICoordinatesData}
        graphicData={mockGraphicData}
        actionPlansData={mockActionPlansData as IAction}
        inspectionReportsData={mockInspectionReportsData as IInspectionReport[]}
      />
    )
    // Checking if the mocked map component is displayed, since we're also verifying the conditional for the presence of map data.
    const mapElement = getByTestId('mocked-detailing-map')
    expect(mapElement).toBeInTheDocument()
  })

  it('renders risk information', () => {
    render(
      <SinglePagePDFPage
        data={mockData}
        currentCoordinate={mockCoordinateData as ICoordinatesData}
        graphicData={mockGraphicData}
        actionPlansData={mockActionPlansData as IAction}
        inspectionReportsData={mockInspectionReportsData as IInspectionReport[]}
      />
    )

    expect(screen.getByText(mockData.riskWork)).toBeInTheDocument()
    expect(screen.getByText(mockData.riskEnvironment)).toBeInTheDocument()
    expect(screen.getByText(mockData.riskExpropriation)).toBeInTheDocument()
  })

  it('renders graphic data', () => {
    render(
      <SinglePagePDFPage
        data={mockData}
        currentCoordinate={mockCoordinateData as ICoordinatesData}
        graphicData={mockGraphicData}
        actionPlansData={mockActionPlansData as IAction}
        inspectionReportsData={mockInspectionReportsData as IInspectionReport[]}
      />
    )

    expect(screen.getByText('CRONOGRAMA - OBRA')).toBeInTheDocument()
    expect(screen.getByTestId('chart')).toBeInTheDocument()
  })

  it('renders action plans', () => {
    render(
      <SinglePagePDFPage
        data={mockData}
        currentCoordinate={mockCoordinateData as ICoordinatesData}
        graphicData={mockGraphicData}
        actionPlansData={mockActionPlansData as IAction}
        inspectionReportsData={mockInspectionReportsData as IInspectionReport[]}
      />
    )

    expect(
      screen.getByText(mockActionPlansData.actionPlans[0].action)
    ).toBeInTheDocument()
    expect(
      screen.getByText(mockActionPlansData.actionPlans[0].responsible)
    ).toBeInTheDocument()
    expect(
      screen.getByText(mockActionPlansData.actionPlans[0].status)
    ).toBeInTheDocument()
  })

  it('renders inspection reports', () => {
    render(
      <SinglePagePDFPage
        data={mockData}
        currentCoordinate={mockCoordinateData as ICoordinatesData}
        graphicData={mockGraphicData}
        actionPlansData={mockActionPlansData as IAction}
        inspectionReportsData={mockInspectionReportsData as IInspectionReport[]}
      />
    )

    expect(
      screen.getByText('Data/Hora da inspeção: 2023-07-14T11:24:00')
    ).toBeInTheDocument()

    expect(
      screen.getByText('Localização: Rua Domingos Vieira 319')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Responsável: test@houer.com.br')
    ).toBeInTheDocument()
  })
})
