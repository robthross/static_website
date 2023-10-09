import React from 'react'

import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Sidebar from '.'
import { EnterpriseContextProvider } from '../../contexts/EnterprisesContext'
import { IType } from '../../interfaces/components/sidebar'

const mockedProps = {
  data: [
    { type: 'PROGRAM' as IType, options: ['Option 1', 'Option 2'] },
    { type: 'STATUS' as IType, options: ['Option A', 'Option B'] }
  ],
  isLoading: false,
  setDetailsAndRisksOpened: jest.fn(),
  HandleGeoJSONClickData: {
    setDetailsAndRisksOpened: jest.fn(),
    getCurrentCoordinate: jest.fn(),
    getCurrentEnterprise: jest.fn()
  },
  handleChange: jest.fn(),
  handleClick: jest.fn(),
  toClean: jest.fn()
}

it('should render correctly', () => {
  render(
    <EnterpriseContextProvider>
      <Sidebar
        data={mockedProps.data}
        isLoading={mockedProps.isLoading}
        handleClick={mockedProps.handleClick}
        currentType="PROGRAM"
        handleChange={mockedProps.handleChange}
        toClean={mockedProps.toClean}
      />
    </EnterpriseContextProvider>
  )

  const loading = screen.queryByText('Loading')

  expect(loading).toBeNull()
  const itemButton = screen.getByText('Programas')
  expect(itemButton).toBeInTheDocument()
})

it('should call handleClick function when clicking an item', () => {
  const { getByText } = render(
    <EnterpriseContextProvider>
      <Sidebar
        data={mockedProps.data}
        isLoading={mockedProps.isLoading}
        handleChange={mockedProps.handleChange}
        handleClick={mockedProps.handleClick}
        currentType="PROGRAM"
        toClean={mockedProps.toClean}
      />
    </EnterpriseContextProvider>
  )
  const tipo1Button = getByText('Programas')
  fireEvent.click(tipo1Button)

  expect(mockedProps.handleClick).toHaveBeenCalledWith('program')
})

it('should call handleChange function when interacting with an item', () => {
  render(
    <EnterpriseContextProvider>
      <Sidebar
        handleChange={mockedProps.handleChange}
        data={mockedProps.data}
        isLoading={mockedProps.isLoading}
        handleClick={mockedProps.handleClick}
        currentType="PROGRAM"
        toClean={mockedProps.toClean}
      />
    </EnterpriseContextProvider>
  )

  const programasButton = screen.getByRole('button', { name: 'Programas' })
  fireEvent.click(programasButton)

  const opcao1Checkbox = screen.getByText('Option 1')
  fireEvent.click(opcao1Checkbox)

  expect(mockedProps.handleChange).toHaveBeenCalledWith('program', 'Option 1')
})

it('should call the clean function when clicking the Clear button', () => {
  const { getByText } = render(
    <EnterpriseContextProvider>
      <Sidebar
        data={mockedProps.data}
        isLoading={mockedProps.isLoading}
        handleClick={mockedProps.handleClick}
        currentType="PROGRAM"
        toClean={mockedProps.toClean}
        handleChange={mockedProps.handleChange}
      />
    </EnterpriseContextProvider>
  )

  const limparButton = getByText('Limpar')
  fireEvent.click(limparButton)

  expect(mockedProps.toClean).toHaveBeenCalled()
})
