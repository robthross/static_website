import '@testing-library/jest-dom'

import React from 'react'

import { act, render, screen } from '@testing-library/react'

import Carousel from '.'
import { ICarousel } from '../../interfaces/components/Carousel'

describe('Carousel', () => {
  const mockData: ICarousel = {
    data: {
      earthmovingPhoto: 'earthmoving.jpg',
      pavingPhoto: 'paving.jpg',
      drainagePhoto: 'drainage.jpg',
      signalingPhoto: 'signaling.jpg'
    },
    initialImage: 'Execução Terraplanagem'
  }

  it('shows loading before images are loaded', () => {
    render(<Carousel {...mockData} />)

    const loadingElement = screen.getByTestId('loading-component')

    expect(loadingElement).toBeInTheDocument()
  })

  it('renders the Carousel component with provided data', () => {
    render(<Carousel {...mockData} />)

    const title = screen.getByText('Execução Terraplanagem')

    expect(title).toBeInTheDocument()
  })
  it('should render without crashing when data is missing', () => {
    const mockData = {} as any
    const initialImage = 'Initial Image Title'

    const { container } = render(
      <Carousel data={mockData} initialImage={initialImage} />
    )

    expect(container).toBeInTheDocument()
    expect(container.firstChild).toBeNull()
  })

  jest.useFakeTimers()

  it('should set loading to false after a certain time', () => {
    const mockData = {
      earthmovingPhoto: 'earthmoving.jpg',
      pavingPhoto: 'paving.jpg',
      drainagePhoto: 'drainage.jpg',
      signalingPhoto: 'signaling.jpg'
    }
    const initialImage = 'Execução Terraplanagem'

    const { getByTestId } = render(
      <Carousel data={mockData} initialImage={initialImage} />
    )

    const loading = getByTestId('loading-component')

    expect(loading).toBeInTheDocument()

    act(() => {
      jest.advanceTimersByTime(1500)
    })

    expect(loading).not.toBeInTheDocument()
  })
})
