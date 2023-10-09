/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'

import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import PieChartComponent from '.'
import { EnterpriseContextProvider } from '../../../contexts/EnterprisesContext'
import { IEnterpriseData } from '../../../interfaces/components/enterprises'
import initialEnterpriseMock from '../../../Mocks/initialEnterpriseMock'
import * as handleChangeModule from './utils/handleChange'

const enterpriseData = initialEnterpriseMock as IEnterpriseData

describe('PieChartComponent', () => {
  it('renders total correctly', () => {
    const { getByText } = render(
      <EnterpriseContextProvider>
        <PieChartComponent enterpriseData={enterpriseData} />
      </EnterpriseContextProvider>
    )
    const totalText = getByText(`${enterpriseData.total}`)
    expect(totalText).toBeInTheDocument()
  })
  it('renders legend items', () => {
    const { getAllByTestId, getByText } = render(
      <EnterpriseContextProvider>
        <PieChartComponent enterpriseData={enterpriseData} />
      </EnterpriseContextProvider>
    )
    const legendItems = getAllByTestId('legend-item')
    expect(legendItems).toHaveLength(3)
    const greenLightText = getByText('Ótimo')
    expect(greenLightText).toBeInTheDocument()
    const yellowLightText = getByText(`Atenção`)
    expect(yellowLightText).toBeInTheDocument()
    const redLightText = getByText(`Ruim`)
    expect(redLightText).toBeInTheDocument()
  })
  const handleChangeMock = jest.fn()

  // @ts-ignore
  handleChangeModule.handleChange = handleChangeMock
  it('handles click', () => {
    const { getAllByTestId, getByText } = render(
      <EnterpriseContextProvider>
        <PieChartComponent enterpriseData={enterpriseData} />
      </EnterpriseContextProvider>
    )
    const legendItems = getAllByTestId('legend-item')

    const totalText = getByText(enterpriseData.total)
    expect(totalText).toBeInTheDocument()

    fireEvent.click(legendItems[0])
    expect(handleChangeMock).toHaveBeenCalled()
    fireEvent.click(legendItems[1])
    expect(handleChangeMock).toHaveBeenCalled()
    fireEvent.click(legendItems[2])
    expect(handleChangeMock).toHaveBeenCalled()
    fireEvent.click(legendItems[2])
    expect(handleChangeMock).toHaveBeenCalledWith(
      'semaphore',
      0,
      expect.any(Function),
      {}
    )
  })
})
