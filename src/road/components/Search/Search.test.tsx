import React from 'react'
import '@testing-library/jest-dom'

import { render, screen, fireEvent } from '@testing-library/react'

import Search from '.'
import { EnterpriseContext } from '../../contexts/EnterprisesContext'

const mockEnterpriseContext = {
  initialEnterprises: {
    enterprises: [
      { id: '1', name: 'Enterprise 1' },
      { id: '2', name: 'Enterprise 2' }
    ]
  },
  setEnterprisesQueries: jest.fn(),
  geralCoordinatesMap: {}
}

const mockSearchHandleGeoJSONClickData = {
  setDetailsAndRisksOpened: jest.fn(),
  getCurrentCoordinate: jest.fn(),
  getCurrentEnterprise: jest.fn()
}
describe('<Search />', () => {
  it('should render correctly and show options on input focus', () => {
    render(
      <EnterpriseContext.Provider value={mockEnterpriseContext}>
        <Search
          searchHandleGeoJSONClickData={mockSearchHandleGeoJSONClickData}
        />
      </EnterpriseContext.Provider>
    )

    const input = screen.getByTestId('input')
    expect(input).toBeInTheDocument()

    fireEvent.focus(input)

    const option1 = screen.getByText('1 Enterprise 1')
    const option2 = screen.getByText('2 Enterprise 2')
    expect(option1).toBeInTheDocument()
    expect(option2).toBeInTheDocument()
  })

  it('should select an option on click', () => {
    render(
      <EnterpriseContext.Provider value={mockEnterpriseContext}>
        <Search
          searchHandleGeoJSONClickData={mockSearchHandleGeoJSONClickData}
        />
      </EnterpriseContext.Provider>
    )

    const input = screen.getByTestId('input')
    fireEvent.focus(input)

    const option1 = screen.getByText('1 Enterprise 1')

    fireEvent.click(option1)

    expect(mockEnterpriseContext.setEnterprisesQueries).toHaveBeenCalledWith({
      id: '1'
    })

    expect(
      mockSearchHandleGeoJSONClickData.getCurrentCoordinate
    ).toHaveBeenCalledWith(1, {})

    expect(
      mockSearchHandleGeoJSONClickData.getCurrentEnterprise
    ).toHaveBeenCalledWith(mockEnterpriseContext.initialEnterprises, 1)

    expect(
      mockSearchHandleGeoJSONClickData.setDetailsAndRisksOpened
    ).toHaveBeenCalledWith(true)

    const inputAfterSelection = screen.getByTestId('input')
    expect(inputAfterSelection).toHaveValue('')
  })
})
