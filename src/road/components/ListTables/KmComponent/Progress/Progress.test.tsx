import React from 'react'
import '@testing-library/jest-dom'

import { render } from '@testing-library/react'

import Progress from '.'

describe('Progress Component', () => {
  it('renders progress bar with correct percent and color', () => {
    const percent = 50
    const color = '#FF5733'

    const { getByTestId } = render(<Progress percent={percent} color={color} />)
    const colorBar = getByTestId('color-bar')

    expect(colorBar).toBeInTheDocument()

    expect(colorBar).toHaveStyle(`background-color: ${color}`)
  })
})
