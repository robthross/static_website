import theme from '../../../../../../common/styles/theme'
import { IEnterpriseData } from '../../../../../interfaces/components/enterprises'

export const pieChartData = (enterpriseData: IEnterpriseData) => [
  {
    title: `Ótimo: ${enterpriseData?.greenLight || 0}`,
    status: 'Ótimo',
    value: enterpriseData?.greenLight || 0,
    color: theme.colors.greenCoolVivid.greenCoolVivid30
  },
  {
    title: `Atenção: ${enterpriseData?.yellowLight || 0}`,
    status: 'Atenção',
    value: enterpriseData?.yellowLight || 0,
    color: theme.colors.yellowVivid.yellowVivid20
  },
  {
    title: `Ruim: ${enterpriseData?.redLight || 0}`,
    status: 'Ruim',
    value: enterpriseData?.redLight || 0,
    color: theme.colors.red.red50
  }
]
