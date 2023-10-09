import React, { useContext, useState } from 'react'
import { PieChart } from 'react-minimal-pie-chart'

import Text from '../../../../common/components/Text'
import theme from '../../../../common/styles/theme'
import { EnterpriseContext } from '../../../contexts/EnterprisesContext'
import { IPieComponent } from '../../../interfaces/components/pie'
import {
  ContainerText,
  TopContainerPieChart,
  StyledPierChart,
  BottomContainerPieChart,
  LegendIItem,
  BallItem
} from './styles'
import { getData } from './utils/getData'
import { handleChange } from './utils/handleChange'
import { pieChartData } from './utils/pieChartData'

function PieChartComponent({ enterpriseData }: IPieComponent) {
  const currentData = pieChartData(enterpriseData)

  const [activeSlice, setActiveSlice] = useState(-1)

  const { setEnterprisesQueries, enterprisesQueries } =
    useContext(EnterpriseContext)

  return (
    <StyledPierChart>
      <TopContainerPieChart>
        <ContainerText>
          <Text
            text={`${enterpriseData?.total || 0}`}
            size={theme.font.sizes.s32}
            color={theme.colors.blue.blue70}
            weight={theme.font.w400}
          />
        </ContainerText>
        <PieChart
          className="pie"
          lineWidth={40}
          data={getData(currentData, enterpriseData, theme.colors.gray.generic)}
          style={{ cursor: 'pointer' }}
          animate={true}
          animationDuration={1500}
          animationEasing="ease-out"
          onClick={(event, dataIndex) => {
            setActiveSlice(dataIndex)
            handleChange(
              'semaphore',
              dataIndex,
              setEnterprisesQueries,
              enterprisesQueries
            )
          }}
        />
      </TopContainerPieChart>
      <BottomContainerPieChart>
        {currentData.map((item, index) => (
          <LegendIItem
            data-testid="legend-item"
            key={item.value}
            onClick={() => {
              setActiveSlice(index)
              handleChange(
                'semaphore',
                index,
                setEnterprisesQueries,
                enterprisesQueries
              )
            }}
            style={{
              cursor: 'pointer',
              opacity: activeSlice === index ? 1 : 0.6
            }}
          >
            <BallItem color={item.color} />
            <Text
              text={item.status}
              size={theme.font.sizes.s12}
              color={theme.colors.blue.blue70}
              weight={theme.font.w700}
            />
          </LegendIItem>
        ))}
      </BottomContainerPieChart>
    </StyledPierChart>
  )
}

export default PieChartComponent
