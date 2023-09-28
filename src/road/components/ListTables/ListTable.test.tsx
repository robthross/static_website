import React from 'react'

import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import ListTables from '.'
import { EnterpriseContextProvider } from '../../contexts/EnterprisesContext'
import { IEnterpriseData } from '../../interfaces/components/enterprises'
import initialEnterpriseMock from '../../Mocks/initialEnterpriseMock'

describe('ListTables Component', () => {
  it('renders total amount correctly', () => {
    const { getByText } = render(
      <EnterpriseContextProvider>
        <ListTables
          enterpriseData={initialEnterpriseMock as IEnterpriseData}
          loading={false}
        />
      </EnterpriseContextProvider>
    )
    const totalAmountText = getByText(`R$ ${initialEnterpriseMock.totalAmount}`)
    expect(totalAmountText).toBeInTheDocument()
  })

  it('renders subtitle with total mileage', () => {
    const { getByText } = render(
      <EnterpriseContextProvider>
        <ListTables
          enterpriseData={initialEnterpriseMock as IEnterpriseData}
          loading={false}
        />
      </EnterpriseContextProvider>
    )
    const subtitleText = getByText(`Total: ${initialEnterpriseMock.mileage}`)
    expect(subtitleText).toBeInTheDocument()
  })
})
