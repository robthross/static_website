import React from 'react'
import { useNavigate } from 'react-router-dom'

import { render, waitFor } from '@testing-library/react'

import RedirectBack from '.'
import { AuthContext } from '../../../routes/AuthContext'

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}))

describe('RedirectBack', () => {
  it('should navigate to "/" if user is authenticated', async () => {
    const mockNavigate = jest.fn()
    useNavigate.mockReturnValue(mockNavigate)

    render(
      <AuthContext.Provider value={{ isAuthenticated: true }}>
        <RedirectBack />
      </AuthContext.Provider>
    )

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/')
    })
  })

  it('should not navigate if user is not authenticated', async () => {
    const mockNavigate = jest.fn()
    useNavigate.mockReturnValue(mockNavigate)

    render(
      <AuthContext.Provider value={{ isAuthenticated: false }}>
        <RedirectBack />
      </AuthContext.Provider>
    )

    await waitFor(() => {
      expect(mockNavigate).not.toHaveBeenCalled()
    })
  })
})
