/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import '@testing-library/jest-dom'

import { render } from '@testing-library/react'

import Redirect from '.'

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}))

jest.mock('../../../common/components/Loading', () => ({
  __esModule: true,
  default: () => <div data-testid="loading">Carregando...</div>
}))

describe('Redirect', () => {
  test('navega para a rota raiz após o redirecionamento', async () => {
    const mockNavigate = jest.fn()
    // @ts-ignore
    useNavigate.mockReturnValue(mockNavigate)

    render(<Redirect />)

    expect(mockNavigate).toHaveBeenCalledWith('/')
  })
})
