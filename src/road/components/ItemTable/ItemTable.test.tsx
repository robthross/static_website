import React from 'react'

import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import ItemTable from '.'
import { IDetailingTypes } from '../../interfaces/components/enterprises'

describe('ItemTable Component', () => {
  const mockItem = ['totalEstimated', '2.1889761784E8'] as [
    IDetailingTypes,
    string
  ]

  it('renders formatted item view correctly for "totalEstimated"', () => {
    const { getByText } = render(<ItemTable item={mockItem} />)
    const formattedValue = 'R$ 218.897.617,84'

    const formattedItemElement = getByText(formattedValue)
    expect(formattedItemElement).toBeInTheDocument()
  })

  it('renders formatted item view correctly for "extension"', () => {
    const mockItem = ['extension', '56.8'] as [IDetailingTypes, string]
    const { getByText } = render(<ItemTable item={mockItem} />)
    const formattedValue = '56,8 km'

    const formattedItemElement = getByText(formattedValue)
    expect(formattedItemElement).toBeInTheDocument()
  })

  it('renders formatted item view correctly for date fields', () => {
    const mockItem = ['startedAt', '03/09/13'] as [IDetailingTypes, string]
    const { getByText } = render(<ItemTable item={mockItem} />)
    const formattedValue = 'Setembro de 2013'

    const formattedItemElement = getByText(formattedValue)
    expect(formattedItemElement).toBeInTheDocument()
  })
})
