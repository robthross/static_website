import { pieChartData } from '.'
import theme from '../../../../../../common/styles/theme'
import { IEnterpriseData } from '../../../../../interfaces/components/enterprises'

describe('pieChartData', () => {
  it('should return correct data when all values are provided', () => {
    const enterpriseData = {
      greenLight: 10,
      yellowLight: 5,
      redLight: 2
    }

    const result = pieChartData(enterpriseData as IEnterpriseData)

    expect(result).toEqual([
      {
        title: 'Ótimo: 10',
        status: 'Ótimo',
        value: 10,
        color: theme.colors.greenCoolVivid.greenCoolVivid30
      },
      {
        title: 'Atenção: 5',
        status: 'Atenção',
        value: 5,
        color: theme.colors.yellowVivid.yellowVivid20
      },
      {
        title: 'Ruim: 2',
        status: 'Ruim',
        value: 2,
        color: theme.colors.red.red50
      }
    ])
  })

  it('should handle missing or zero values', () => {
    const enterpriseData = {
      greenLight: 0,
      yellowLight: '',
      redLight: ''
    }

    const result = pieChartData(enterpriseData as unknown as IEnterpriseData)

    expect(result).toEqual([
      {
        title: 'Ótimo: 0',
        status: 'Ótimo',
        value: 0,
        color: theme.colors.greenCoolVivid.greenCoolVivid30
      },
      {
        title: 'Atenção: 0',
        status: 'Atenção',
        value: 0,
        color: theme.colors.yellowVivid.yellowVivid20
      },
      {
        title: 'Ruim: 0',
        status: 'Ruim',
        value: 0,
        color: theme.colors.red.red50
      }
    ])
  })
})
