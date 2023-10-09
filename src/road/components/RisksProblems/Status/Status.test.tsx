import React from 'react'
import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import Status from '.'

test('should render correctly with the given status and value', () => {
  const status = 'AMARELO'
  const value = '0.75'

  render(<Status status={status} value={value} />)

  const statusElementText = screen.getByText('IAP: 75%')
  expect(statusElementText).toBeInTheDocument()

  const statusComponent = screen.getByTestId('status-component')
  // This RGB corresponds to #FFCD07
  expect(statusComponent).toHaveStyle({
    backgroundColor: 'rgb(255, 205, 7)'
  })
})
