import { getData } from '.'
import { IEnterpriseData } from '../../../../../interfaces/components/enterprises'

describe('getData', () => {
  it('should return "Sem dados" when all currentData values are 0', () => {
    const currentData = [
      { title: 'Title 1', value: 0, color: '#FF0000', status: 'Status 1' },
      { title: 'Title 2', value: 0, color: '#00FF00', status: 'Status 2' },
      { title: 'Title 3', value: 0, color: '#0000FF', status: 'Status 3' }
    ]

    const enterpriseData = {
      total: 100,
      greenLight: 10,
      yellowLight: 20,
      redLight: 30
    }

    const color = '#CCCCCC'

    const result = getData(
      currentData,
      enterpriseData as IEnterpriseData,
      color
    )

    expect(result).toEqual([
      {
        title: 'Sem dados',
        status: 'Sem dados',
        value: 40, // (100 - (10 + 20 + 30))
        color: '#CCCCCC'
      }
    ])
  })

  it('should return the currentData when at least one currentData value is not 0', () => {
    const currentData = [
      { title: 'Title 1', value: 0, color: '#FF0000', status: 'Status 1' },
      { title: 'Title 2', value: 10, color: '#00FF00', status: 'Status 2' },
      { title: 'Title 3', value: 0, color: '#0000FF', status: 'Status 3' }
    ]

    const enterpriseData = {
      total: 100,
      greenLight: 10,
      yellowLight: 20,
      redLight: 30
    }

    const color = '#CCCCCC'

    const result = getData(
      currentData,
      enterpriseData as IEnterpriseData,
      color
    )

    expect(result).toEqual(currentData)
  })

  it('should return "Sem dados" if enterpriseData and currentData are empty', () => {
    const currentData = [
      { title: 'Title 1', value: 0, color: 'green', status: 'Status 1' },
      { title: 'Title 2', value: 0, color: 'yellow', status: 'Status 2' },
      { title: 'Title 3', value: 0, color: 'red', status: 'Status 3' }
    ]
    const enterpriseData = {} as any // Mocking empty enterpriseData
    const color = 'blue'

    const result = getData(currentData, enterpriseData, color)

    expect(result).toEqual([
      {
        title: 'Sem dados',
        status: 'Sem dados',
        value: 0,
        color: 'blue'
      }
    ])
  })
})
