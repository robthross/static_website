import React from 'react'

import { render } from '@testing-library/react'

import '@testing-library/jest-dom/extend-expect'
import KmComponent from '.'
import { IEnterpriseData } from '../../../interfaces/components/enterprises'

const mockEnterpriseData = {
  enterprises: [
    {
      id: '43.0',
      name: 'Viçosa - Porto Firme',
      program: 'PROVIAS',
      subProgram: 'Recuperação de pavimento',
      road: 'MG-482',
      extension: '29.0',
      status: '15 - Obra em execução',
      filterStatus: 'EXECUTING',
      startedAt: '02/05/23',
      amountDone: '19%',
      totalEstimated: '5877916.14',
      resourcesToBeAvailable: '2215155.0999999996',
      dueAt: '27/01/24',
      cities: 'Viçosa, Porto Firme',
      enterprises: 'ECR',
      populationEstimated: 91324,
      iap: 0.8967158495954307,
      semaphore: 'VERDE'
    }
  ],
  greenLight: 24,
  mileage: '1000 km',
  mileageByCompleted: '100 km',
  mileageByExecuting: '250 km',
  mileageByPaused: '50 km',
  mileageByToStart: '500 km',
  redLight: 8,
  resourcesAvailable: '2389.2 mi',
  total: 228,
  totalAmount: '4882.1 mi',
  yellowLight: 4
}

describe('KmComponent', () => {
  it('should render the correct progress and km values for each status', () => {
    const { getByText } = render(
      <KmComponent
        enterpriseData={mockEnterpriseData as unknown as IEnterpriseData}
      />
    )

    expect(getByText('Obra à iniciar')).toBeInTheDocument()
    expect(getByText('50.00%')).toBeInTheDocument()
    expect(getByText('500 km')).toBeInTheDocument()

    expect(getByText('Obra em execução')).toBeInTheDocument()
    expect(getByText('25.00%')).toBeInTheDocument()
    expect(getByText('250 km')).toBeInTheDocument()

    expect(getByText('Obra concluída')).toBeInTheDocument()
    expect(getByText('10.00%')).toBeInTheDocument()
    expect(getByText('100 km')).toBeInTheDocument()

    expect(getByText('Obra paralisada')).toBeInTheDocument()
    expect(getByText('5.00%')).toBeInTheDocument()
    expect(getByText('50 km')).toBeInTheDocument()
  })
})
