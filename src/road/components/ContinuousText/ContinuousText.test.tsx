import '@testing-library/jest-dom'

import React from 'react'

import { render } from '@testing-library/react'

import ContinuousText from '.'

describe('ContinuousText', () => {
  it('renders the component with the provided item name and value', () => {
    const itemName = 'Item Name'
    const value = 'Value'

    const { getByText, getByTestId } = render(
      <ContinuousText itemName={itemName} value={value} />
    )

    const continuousTextElement = getByTestId('continuous-text')
    const valueTextElement = getByText(value)

    expect(continuousTextElement).toBeInTheDocument()
    expect(valueTextElement).toBeInTheDocument()
    expect(continuousTextElement).toHaveTextContent(itemName)
  })
})
