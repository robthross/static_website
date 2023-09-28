import React from 'react'
import '@testing-library/jest-dom'

import { render, fireEvent, screen } from '@testing-library/react'

import ItemSidebar from '.'
import { IType } from '../../../interfaces/components/sidebar'

const mockedProps = {
  handleClick: jest.fn(),
  item: {
    type: 'PROGRAM' as IType,
    options: ['Option 1', 'Option 2', 'Option 3']
  },
  currentType: 'program',
  handleChange: jest.fn(),
  enterprisesQueries: {}
}

describe('ItemSidebar', () => {
  it('renders without errors', () => {
    render(<ItemSidebar {...mockedProps} />)
  })

  it('check if button exists on screen', () => {
    render(<ItemSidebar {...mockedProps} />)
    const button = screen.getByText('Programas')
    expect(button).toBeInTheDocument()
  })
  it('calls handleClick when button is clicked', () => {
    render(<ItemSidebar {...mockedProps} />)
    const button = screen.getByText('Programas')
    fireEvent.click(button)
    expect(mockedProps.handleClick).toHaveBeenCalledWith('program')
  })

  it('calls handleChange when an option button is clicked', () => {
    const { getByText } = render(<ItemSidebar {...mockedProps} />)
    const optionButton = getByText('Option 1')
    fireEvent.click(optionButton)
    expect(mockedProps.handleChange).toHaveBeenCalledWith('program', 'Option 1')
  })
})
