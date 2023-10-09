import React from 'react'
import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import RisksProblems from '.'
import { IEnterprise } from '../../interfaces/components/enterprises'
import enterpriseMock from '../../Mocks/enterpriseMock'

describe('RisksProblems component', () => {
  it('renders the component with provided data', () => {
    const { getByText } = render(<RisksProblems data={enterpriseMock} />)

    expect(getByText('Riscos/ Problemas')).toBeInTheDocument()
    expect(
      getByText('Aprovação do projeto de interseção com BR 262.')
    ).toBeInTheDocument()
    expect(getByText('Risk Environment')).toBeInTheDocument()
    expect(getByText('Risk Expropriation')).toBeInTheDocument()

    const statusComponent = screen.getByTestId('status-component')
    expect(statusComponent).toBeInTheDocument()
    expect(statusComponent).toHaveStyle({
      backgroundColor: 'rgb(33, 200, 52)'
    })
    expect(getByText('IAP: 90%')).toBeInTheDocument()
  })

  it('does not render when no relevant data is provided', () => {
    const mockData = {
      riskEnvironment: '',
      riskExpropriation: 'Expropriation risk',
      semaphore: 'VERMELHO',
      riskWork: 'Work risk',
      iap: 123
    }
    const { queryByText } = render(
      <RisksProblems data={mockData as unknown as IEnterprise} />
    )
    expect(
      queryByText('Aprovação do projeto de interseção com BR 262.')
    ).not.toBeInTheDocument()

    expect(queryByText('Risk Environment')).not.toBeInTheDocument()
    expect(queryByText('Risk Expropriation')).not.toBeInTheDocument()

    const statusComponent = screen.getByTestId('status-component')
    expect(statusComponent).toBeInTheDocument()
    expect(queryByText('IAP: 90%')).not.toBeInTheDocument()
  })
})
