import React from 'react'

import { render, fireEvent } from '@testing-library/react'

import InspectionReport from '.'
import '@testing-library/jest-dom'
import { IInspectionReport } from '../../interfaces/components/inspectionreport'
import inspectionReportsDataMock from '../../Mocks/inspectionReportsDataMock'

describe('InspectionReport Component', () => {
  const mockData = inspectionReportsDataMock as IInspectionReport[]
  const mockEnterpriseName = 'Sample Enterprise'

  it('renders cards with correct data', () => {
    const { getAllByTestId } = render(
      <InspectionReport data={mockData} enterpriseName={mockEnterpriseName} />
    )

    const dataCards = getAllByTestId('data-item')
    expect(dataCards).toHaveLength(mockData.length)
  })

  it('opens modal and renders content correctly', () => {
    const { getAllByTestId, getByTestId } = render(
      <InspectionReport data={mockData} enterpriseName={mockEnterpriseName} />
    )
    const galleryIcon = getAllByTestId('gallery-icon')

    fireEvent.click(galleryIcon[0])

    const modal = getByTestId('modal')
    expect(modal).toBeInTheDocument()

    fireEvent.click(getByTestId('close-modal-button'))
    expect(modal).not.toBeInTheDocument()
  })
})
