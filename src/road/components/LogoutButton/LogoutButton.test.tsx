import React from 'react'

import { render, fireEvent } from '@testing-library/react'

import { LogoutButton } from '.'

describe('LogoutButton', () => {
  const originalClear = Storage.prototype.clear

  beforeEach(() => {
    Storage.prototype.clear = jest.fn()
    window.location.href = ''
  })

  afterEach(() => {
    Storage.prototype.clear = originalClear
  })

  it('should clear localStorage and redirect on button click', () => {
    const { getByTestId } = render(<LogoutButton />)

    const logoutButton = getByTestId('logout-button')
    fireEvent.click(logoutButton)

    expect(Storage.prototype.clear).toHaveBeenCalled()

    const expectedUrl = `http://localhost/`
    expect(window.location.href).toBe(expectedUrl)
  })
})
