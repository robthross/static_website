import React from 'react'

import moment from 'moment'

import Text from '../../../common/components/Text'
import theme from '../../../common/styles/theme'
import { IDetailingTypes } from '../../interfaces/components/enterprises'
import detailingTypes from '../../utils/detailingTypes'
import { formatDate } from '../../utils/formatData'
import ContinuousText from '../ContinuousText'
import { StyledItemTable } from './styles'

function ItemTable({ item }: { item: [IDetailingTypes, string] }) {
  const [key, value] = item

  const itemView = () => {
    const firstCondition = [
      'totalEstimated',
      'resourcesAvailable',
      'resourcesToBeAvailable'
    ]
    const thirdCondition = ['startedAt', 'dueAt']

    if (firstCondition.includes(key)) {
      const formattedValue = (+value).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true,
        style: 'currency',
        currency: 'BRL'
      })

      return formattedValue
    } else if (key === 'extension') {
      return `${value.toString().replace('.', ',')} km`
    } else if (thirdCondition.includes(key)) {
      const format = ['DD/MM/YYYY', 'DD-MM-YYYY', 'DD.MM.YYYY', 'DDMMYYYY']

      if (moment(value, format).isValid()) {
        return formatDate(value)
      } else {
        return 'Não disponível'
      }
    } else if (key === 'directJobs' || key === 'indirectJobs') {
      return value.split('.')[0]
    } else if (key === 'populationEstimated') {
      const numberFormated = Number(value).toLocaleString('pt-BR')
      return `${numberFormated}`
    } else {
      return value
    }
  }

  const formattedItemView = itemView()

  return (
    <StyledItemTable className={`${key}`}>
      <Text
        text={
          <ContinuousText
            itemName={`${detailingTypes[item[0]]}:`}
            value={formattedItemView}
          />
        }
        size={theme.font.sizes.s16}
        color={theme.colors.blue.blue80}
        weight={theme.font.w400}
      />
    </StyledItemTable>
  )
}

export default ItemTable
