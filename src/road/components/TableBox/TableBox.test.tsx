import React from 'react'
import '@testing-library/jest-dom'

import { render } from '@testing-library/react'

import TableBox from '.'

describe('<TableBox />', () => {
  it('renders title and content correctly', () => {
    const title = 'Test Table'
    const sizeTitle = 'h2'
    const children = <div>Test Content</div>

    const { getByText } = render(
      <TableBox title={title} sizeTitle={sizeTitle}>
        {children}
      </TableBox>
    )

    const titleElement = getByText(title)
    const contentElement = getByText('Test Content')
    expect(titleElement).toBeInTheDocument()
    expect(contentElement).toBeInTheDocument()
  })

  it('renders subtitle when provided', () => {
    const title = 'Test Table'
    const subtitle = 'Subtitle'
    const sizeTitle = 'h2'
    const children = <div>Test Content</div>

    const { getByText } = render(
      <TableBox title={title} sizeTitle={sizeTitle} subtitle={subtitle}>
        {children}
      </TableBox>
    )

    const titleElement = getByText(title)
    const subtitleElement = getByText(subtitle)

    expect(titleElement).toBeInTheDocument()
    expect(subtitleElement).toBeInTheDocument()
  })

  it('renders loading component when loading is true', () => {
    const title = 'Test Table'
    const sizeTitle = 'h2'
    const children = <div>Test Content</div>

    const { getByTestId } = render(
      <TableBox title={title} sizeTitle={sizeTitle} loading={true}>
        {children}
      </TableBox>
    )
    const loadingElement = getByTestId('loading-component')
    expect(loadingElement).toBeInTheDocument()
  })
})
