import React from 'react'

import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom/extend-expect'
import Graphic from '.'
import { IGraphic } from '../../interfaces/components/grapich'

describe('Graphic', () => {
  it('should render the title and the chart', () => {
    const data = {
      name: 'Obra X',
      scurve: [
        {
          month: 1,
          year: 2023,
          planned: 0.2,
          executed: 0.1,
          plannedAcc: 0.5,
          executedAcc: 0.3
        },
        {
          month: 2,
          year: 2023,
          planned: 0.3,
          executed: 0.2,
          plannedAcc: 0.8,
          executedAcc: 0.6
        }
      ]
    }
    render(<Graphic data={data as IGraphic} />)

    expect(screen.getByText('CRONOGRAMA - OBRA')).toBeInTheDocument()
    expect(screen.getByText('Obra X')).toBeInTheDocument()

    expect(screen.getByRole('region')).toBeInTheDocument()
  })

  it('should show the correct data on the chart', () => {
    const data = {
      name: 'Obra Y',
      scurve: [
        {
          month: 1,
          year: 2023,
          planned: 0.1,
          executed: 0.05,
          plannedAcc: 0.1,
          executedAcc: 0.05
        },
        {
          month: 2,
          year: 2023,
          planned: 0.2,
          executed: 0.15,
          plannedAcc: 0.3,
          executedAcc: 0.2
        }
      ]
    }
    render(<Graphic data={data as IGraphic} />)

    expect(screen.getByText('MÊS A MÊS PREVISTO')).toBeInTheDocument()
    expect(screen.getByText('MÊS A MÊS REALIZADO')).toBeInTheDocument()
    expect(screen.getByText('ACUM. PREVISTO')).toBeInTheDocument()
    expect(screen.getByText('ACUM. REALIZADO')).toBeInTheDocument()
    expect(screen.getByText('Jan/2023')).toBeInTheDocument()
    expect(screen.getByText('Fev/2023')).toBeInTheDocument()
  })
})
