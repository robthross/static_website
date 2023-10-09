import '@testing-library/jest-dom'
import React from 'react'

import { render, fireEvent, screen } from '@testing-library/react'

import Modal from '.'

describe('Modal', () => {
  it('clicking the close button calls the close function', () => {
    const mockCloseFunction = jest.fn()
    const content = <div>Modal Content</div>

    render(<Modal closeFunction={mockCloseFunction}>{content}</Modal>)

    const closeButton = screen.getByTestId('close-modal-button')
    fireEvent.click(closeButton)

    expect(mockCloseFunction).toHaveBeenCalledWith('')
  })
})
