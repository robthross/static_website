import React from 'react'

import Text from '../../../common/components/Text'
import theme from '../../../common/styles/theme'
import { IListTables } from '../../interfaces/components/tables'
import TableBox from '../TableBox'
import KmComponent from './KmComponent'
import PieChartComponent from './PieChart'
import {
  ContainerBottom,
  ContainerCenter,
  ContainerTexts,
  ContainerTop,
  StyledListTables
} from './styles'

function ListTables({ enterpriseData, loading }: IListTables) {
  return (
    <StyledListTables>
      <ContainerTop>
        <TableBox
          title="Total do Empreendimento"
          sizeTitle={theme.font.sizes.s16}
          loading={loading}
        >
          <ContainerTexts>
            <Text
              text={`R$ ${enterpriseData?.totalAmount}`}
              size={theme.font.sizes.s24}
              color={theme.colors.blue.blue70}
              weight={theme.font.w400}
            />
          </ContainerTexts>
        </TableBox>
      </ContainerTop>
      <ContainerCenter>
        <TableBox
          title="Empreendimentos"
          sizeTitle={theme.font.sizes.s16}
          loading={loading}
        >
          <PieChartComponent enterpriseData={enterpriseData} />
        </TableBox>
      </ContainerCenter>
      <ContainerBottom>
        <TableBox
          title="Km por Status"
          subtitle={'Total: ' + enterpriseData?.mileage}
          sizeTitle={theme.font.sizes.s16}
          loading={loading}
        >
          <KmComponent enterpriseData={enterpriseData} />
        </TableBox>
      </ContainerBottom>
    </StyledListTables>
  )
}

export default ListTables
