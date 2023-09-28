import React from 'react'

import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import InspectionReportComments from '.'

describe('InspectionReportComments Component', () => {
  it('renders comments correctly', () => {
    const type = 'comments'
    const content = 'This is a test comment.'
    const { getByText } = render(
      <InspectionReportComments type={type} content={content} />
    )

    const typeText = getByText('Comentários:')
    const contentText = getByText(content)

    expect(typeText).toBeInTheDocument()
    expect(contentText).toBeInTheDocument()
  })

  it('renders risks correctly', () => {
    const type = 'risks'
    const content = 'This is a test risk.'
    const { getByText } = render(
      <InspectionReportComments type={type} content={content} />
    )

    const typeText = getByText('Riscos:')
    const contentText = getByText(content)

    expect(typeText).toBeInTheDocument()
    expect(contentText).toBeInTheDocument()
  })
})
