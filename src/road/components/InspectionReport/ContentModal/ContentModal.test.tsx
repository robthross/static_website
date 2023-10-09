import React from 'react'

import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import ContentModal from '.'
import { IInspectionReport } from '../../../interfaces/components/inspectionreport'
import inspectionReportsDataMock from '../../../Mocks/inspectionReportsDataMock'

describe('ContentModal', () => {
  const mockData = inspectionReportsDataMock

  it('renders null when type is unknown', () => {
    const { container } = render(
      <ContentModal
        type=""
        currentData={mockData as unknown as IInspectionReport}
        initialImageCarousel=""
        openedModal="comments"
        currentModalText=""
      />
    )
    expect(container.firstChild).toBeNull()
  })

  it('renders Carousel for type "image"', () => {
    const { getByTestId } = render(
      <ContentModal
        type="image"
        currentData={mockData as unknown as IInspectionReport}
        initialImageCarousel="image-url"
        openedModal="comments"
        currentModalText=""
      />
    )
    expect(getByTestId('carousel-component')).toBeInTheDocument()
  })

  it('renders InspectionReportComments for types "comments" and "risks"', () => {
    const { getByTestId } = render(
      <ContentModal
        type="comments"
        currentData={mockData as unknown as IInspectionReport}
        initialImageCarousel=""
        openedModal="comments"
        currentModalText="Some comments"
      />
    )
    expect(getByTestId('InspectionReportComments')).toBeInTheDocument()
  })

  it('renders VideoPlayer for type "video"', () => {
    const { getByTestId } = render(
      <ContentModal
        type="video"
        currentData={mockData as unknown as IInspectionReport}
        initialImageCarousel=""
        openedModal="comments"
        currentModalText=""
      />
    )
    expect(getByTestId('video-player')).toBeInTheDocument()
  })
})
