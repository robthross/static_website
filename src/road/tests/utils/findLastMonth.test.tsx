import { IGraphic } from '../../interfaces/components/grapich'
import graphicMock from '../../Mocks/graphicMock'
import findLastMonth from '../../utils/findLastMonth'

const graphic: IGraphic = graphicMock

describe('findLastMonth', () => {
  it('should return the formatted last month', () => {
    const result = findLastMonth(graphic)

    expect(result).toBe('Mai/2023')
  })

  it('should return null if there are no executedAcc data', () => {
    const graphic: IGraphic = {
      id: '43.0',
      name: 'Viçosa - Porto Firme ',
      status: '15 - Obra em execução',
      startOrder: '2023-05-02',
      workDeadline: '9',
      currentIAP: 0.8967158495954307,
      scurve: [
        {
          month: 5,
          year: 2023,
          planned: 0.0676,
          plannedAcc: 0.0676,
          executed: 0.0534,
          executedAcc: 0
        }
      ]
    }

    const result = findLastMonth(graphic)

    expect(result).toBeNull()
  })

  it('should return null if scurve array is empty', () => {
    const graphic: IGraphic = {
      id: '43.0',
      name: 'Viçosa - Porto Firme ',
      status: '15 - Obra em execução',
      startOrder: '2023-05-02',
      workDeadline: '9',
      currentIAP: 0.8967158495954307,
      scurve: []
    }

    const result = findLastMonth(graphic)

    expect(result).toBeNull()
  })

  it('should return the correct last month based on date comparison', () => {
    const graphic: IGraphic = {
      scurve: [
        {
          year: 2023,
          month: 7,
          executedAcc: 100,
          planned: null,
          plannedAcc: null,
          executed: null
        },
        {
          year: 2023,
          month: 6,
          executedAcc: 50,
          planned: null,
          plannedAcc: null,
          executed: null
        },
        {
          year: 2023,
          month: 8,
          executedAcc: 75,
          planned: null,
          plannedAcc: null,
          executed: null
        }
      ],
      id: '',
      name: '',
      status: '',
      startOrder: '',
      workDeadline: ''
    }

    const result = findLastMonth(graphic)

    expect(result).toBe('Ago/2023')
  })
})
