import React, { useContext } from 'react'

import {
  render,
  fireEvent,
  screen,
  act,
  renderHook
} from '@testing-library/react'
import '@testing-library/jest-dom'

import '@testing-library/jest-dom/extend-expect'
import { IEnterpriseData } from '../interfaces/components/enterprises'
import initialEnterpriseMock from '../Mocks/initialEnterpriseMock'
import {
  EnterpriseContext,
  EnterpriseContextProvider,
  useEnterpriseContext
} from './EnterprisesContext'

function TestComponent() {
  const {
    detailsAndRisksOpened,
    currentCoordinate,
    currentEnterprise,
    toClean,
    getCurrentEnterprise
  } = useContext(EnterpriseContext)

  return (
    <div>
      <div data-testid="details-and-risks">
        {detailsAndRisksOpened.toString()}
      </div>
      <div data-testid="current-coordinate">
        {JSON.stringify(currentCoordinate)}
      </div>
      <div data-testid="current-enterprise">
        {JSON.stringify(currentEnterprise)}
      </div>
      <button onClick={toClean}>Limpar</button>
      {/*  */}
      <button
        onClick={() => getCurrentEnterprise(initialEnterpriseMock, '2.0')}
      >
        TestClickCurrentEnterprise
      </button>
      <div data-testid="current-enterprise-value">
        {JSON.stringify(currentEnterprise)}
      </div>
    </div>
  )
}

describe('EnterpriseContextProvider', () => {
  test('deve atualizar o estado corretamente ao chamar toClean', () => {
    render(
      <EnterpriseContextProvider>
        <TestComponent />
      </EnterpriseContextProvider>
    )
    expect(screen.getByTestId('details-and-risks')).toHaveTextContent('false')
    expect(screen.getByTestId('current-coordinate')).toHaveTextContent('null')
    expect(screen.getByTestId('current-enterprise')).toHaveTextContent('null')

    fireEvent.click(screen.getByText('Limpar'))

    expect(screen.getByTestId('details-and-risks')).toHaveTextContent('false')
    expect(screen.getByTestId('current-coordinate')).toHaveTextContent('null')
    expect(screen.getByTestId('current-enterprise')).toHaveTextContent('null')
  })

  test('GetCurrentEnterprise with value number', () => {
    const { result } = renderHook(useEnterpriseContext)
    act(() =>
      result.current.getCurrentEnterprise(
        initialEnterpriseMock as IEnterpriseData | null,
        2.0
      )
    )
    expect(result.current.currentEnterprise).toBe(
      initialEnterpriseMock.enterprises[1]
    )
  })
  test('GetCurrentEnterprise with value string', () => {
    const { result } = renderHook(useEnterpriseContext)
    act(() =>
      result.current.getCurrentEnterprise(
        initialEnterpriseMock as IEnterpriseData | null,
        'Indianópolis - BR-365'
      )
    )
    expect(result.current.currentEnterprise).toBe(
      initialEnterpriseMock.enterprises[0]
    )
  })
})
