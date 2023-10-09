import '@testing-library/jest-dom'
import React from 'react'

import { render, fireEvent, screen } from '@testing-library/react'

import Button from '.'

describe('Button', () => {
  it('renders the button with the provided text', () => {
    const buttonText = 'Click here'
    render(<Button text={buttonText} onClick={() => null} />)
    const buttonElement = screen.getByTestId('custom-button')
    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toHaveTextContent(buttonText)
  })

  it('clicking the button calls the onClick handler', () => {
    const buttonText = 'Click here'
    const mockClickHandler = jest.fn()
    render(<Button text={buttonText} onClick={mockClickHandler} />)
    const buttonElement = screen.getByTestId('custom-button')

    fireEvent.click(buttonElement)

    expect(mockClickHandler).toHaveBeenCalled()
  })
})
