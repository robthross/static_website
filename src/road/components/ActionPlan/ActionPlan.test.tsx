import '@testing-library/jest-dom'

import React from 'react'

import { render, screen } from '@testing-library/react'

import ActionPlan from '.'
import { IAction } from '../../interfaces/components/actionplan'
import ActionMock from '../../Mocks/actionMock'

describe('ActionPlan', () => {
  const mockAction: IAction = ActionMock

  it('renders action details correctly', () => {
    render(<ActionPlan data={mockAction} />)

    const actionCell = screen.getByText('Pactuar cronograma de conclusão')
    const responsibleCell = screen.getByText('DC')
    const deadlineCell = screen.getByText('04/2023')
    const statusCell = screen.getByText(
      'Concluído Repactuação realizada no mês de maio/2023'
    )

    expect(actionCell).toBeInTheDocument()
    expect(responsibleCell).toBeInTheDocument()
    expect(deadlineCell).toBeInTheDocument()
    expect(statusCell).toBeInTheDocument()
  })
})
