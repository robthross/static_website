import React from 'react'
import { act } from 'react-test-renderer'

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import VideoPlayer from '.'
import { IInspectionReport } from '../../interfaces/components/inspectionreport'

const mockData = {
  generalVideo:
    'https://storage.googleapis.com/houer-tab-inspections/43.0/2023-07-14T12:04/703e5db3-4aeb-46d0-b5dd-b6ae8119ab24.mp4'
}

describe('<VideoPlayer />', () => {
  it('renders video player with correct data', async () => {
    await act(async () => {
      render(<VideoPlayer data={mockData as IInspectionReport} />)
    })
    const videoPlayer = screen.getByTestId('video-player')
    expect(videoPlayer).toBeInTheDocument()
  })
})
