import '@testing-library/jest-dom'

import React from 'react'

import { render } from '@testing-library/react'

import Local from '.'

describe('Local', () => {
  it('renders the component with the provided text', () => {
    const text = 'Location Text'

    const { getByText } = render(<Local text={text} />)

    const localElement = getByText(text)

    expect(localElement).toBeInTheDocument()
  })
})
