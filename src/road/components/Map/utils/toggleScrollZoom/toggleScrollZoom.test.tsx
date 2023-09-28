import '@testing-library/jest-dom'

import { toggleScrollZoom } from '.'

describe('toggleScrollZoom Function', () => {
  it('should enable scrollWheelZoom if it is disabled', () => {
    const mockScrollWheelZoom = {
      enabled: jest.fn(() => false),
      enable: jest.fn(),
      disable: jest.fn()
    }

    const mockMapRef = {
      current: {
        scrollWheelZoom: mockScrollWheelZoom
      }
    }

    const mockSetState = jest.fn()

    toggleScrollZoom(mockMapRef, mockSetState, false)

    expect(mockScrollWheelZoom.enable).toHaveBeenCalled()
    expect(mockSetState).toHaveBeenCalledWith(true)
  })

  it('should disable scrollWheelZoom if it is enabled', () => {
    const mockMapRef = {
      current: {
        scrollWheelZoom: {
          enabled: jest.fn(() => true),
          enable: jest.fn(),
          disable: jest.fn()
        }
      }
    }

    const mockSetState = jest.fn()

    toggleScrollZoom(mockMapRef, mockSetState, true)

    expect(mockMapRef.current.scrollWheelZoom.disable).toHaveBeenCalled()

    expect(mockSetState).toHaveBeenCalledWith(false)
  })
})
