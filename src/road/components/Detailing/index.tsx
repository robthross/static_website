import React from 'react'

import Text from '../../../common/components/Text'
import theme from '../../../common/styles/theme'
import {
  IDetailingTypes,
  IEnterprise
} from '../../interfaces/components/enterprises'
import { IGraphic } from '../../interfaces/components/grapich'
import detailingTypes from '../../utils/detailingTypes'
import findLastMonth from '../../utils/findLastMonth'
import ItemTable from '../ItemTable'
import TableBox from '../TableBox'
import Local from './Local'
import {
  ContainerTableBoxDetailing,
  Content,
  DetailingFonts,
  StyledDetailing
} from './styles'

function Detailing({
  data,
  graphic
}: {
  data: IEnterprise
  graphic: IGraphic
}) {
  const currentList = Object.entries(data)

  let dateProgress = null
  if (graphic) dateProgress = findLastMonth(graphic)

  function RenderItem() {
    return currentList.map((item: [IDetailingTypes, string]) => {
      if (detailingTypes[item[0]] !== undefined) {
        if (item[0] !== 'name' && item[0] !== 'id') {
          return <ItemTable item={item} key={detailingTypes[item[0]]} />
        } else if (item[0] === 'name') {
          return <Local text={item[1]} key={detailingTypes[item[0]]} />
        }
      }
      return null
    })
  }

  return (
    <ContainerTableBoxDetailing data-testid="detailing">
      <TableBox title="Detalhamento" sizeTitle={theme.font.sizes.s21} shadow>
        <Content>
          <StyledDetailing>{RenderItem()}</StyledDetailing>
          <DetailingFonts>
            <Text
              text={
                dateProgress
                  ? `Avanço Ref.: ${dateProgress}. id: ${data?.id}.`
                  : `id: ${data?.id}.`
              }
              size={theme.font.sizes.s12}
              color={theme.colors.grayCool.grayCool40}
              weight={0}
            />
            <Text
              text="População Beneficiada - IBGE 2022"
              size={theme.font.sizes.s12}
              color={theme.colors.grayCool.grayCool40}
              weight={0}
            />
            <Text
              text="Nº de empregos gerados indiretamente: Sistema de Matrizes de Insumos 2017 - NEREUS"
              size={theme.font.sizes.s12}
              color={theme.colors.grayCool.grayCool40}
              weight={0}
            />
          </DetailingFonts>
        </Content>
      </TableBox>
    </ContainerTableBoxDetailing>
  )
}

export default Detailing
