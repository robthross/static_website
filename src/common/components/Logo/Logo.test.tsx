import React from 'react'

import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import Logo from '.'

describe('Logo', () => {
  it('renders default logo with correct alt text', () => {
    render(<Logo />)
    const logoElement = screen.getByRole('img')

    expect(logoElement).toBeInTheDocument()
    expect(logoElement).toHaveAttribute(
      'src',
      expect.stringContaining('LogoLight.png')
    )
    expect(logoElement).toHaveAttribute(
      'alt',
      'TAB - Gestão de dados e conhecimentos integrados'
    )
  })

  it('renders dark logo with correct alt text', () => {
    render(<Logo dark />)
    const logoElement = screen.getByRole('img')

    expect(logoElement).toBeInTheDocument()
    expect(logoElement).toHaveAttribute(
      'src',
      expect.stringContaining('LogoDark.png')
    )
    expect(logoElement).toHaveAttribute(
      'alt',
      'TAB - Gestão de dados e conhecimentos integrados'
    )
  })

  it('renders specific logo with correct alt text', () => {
    const logoName = 'DER'
    render(<Logo logoName={logoName} />)
    const logoElement = screen.getByRole('img')

    expect(logoElement).toBeInTheDocument()
    expect(logoElement).toHaveAttribute(
      'src',
      expect.stringContaining('DER.png')
    )
    expect(logoElement).toHaveAttribute('alt', 'DER')
  })

  it('renders specific logo with correct alt text', () => {
    const logoName = 'Houer'
    render(<Logo logoName={logoName} />)
    const logoElement = screen.getByRole('img')

    expect(logoElement).toBeInTheDocument()
    expect(logoElement).toHaveAttribute(
      'src',
      expect.stringContaining('HouerLight.png')
    )
    expect(logoElement).toHaveAttribute('alt', 'Houer')
  })
})
