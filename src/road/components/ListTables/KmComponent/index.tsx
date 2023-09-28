import React from 'react'

import Text from '../../../../common/components/Text'
import theme from '../../../../common/styles/theme'
import { IEnterpriseData } from '../../../interfaces/components/enterprises'
import { getKmPercent } from '../../../utils/getKmPercent'
import Progress from './Progress'
import { ContainerTexts, Item, StatusBar, StyledKmComponent } from './styles'

function KmComponent({ enterpriseData }: { enterpriseData: IEnterpriseData }) {
  const statusList = [
    [
      {
        title: 'Obra à iniciar',
        progress: enterpriseData?.mileageByToStart,
        km: enterpriseData?.mileageByToStart,
        color: theme.colors.greenVivid.greenVivid40
      },
      {
        title: 'Obra em execução',
        progress: enterpriseData?.mileageByExecuting,
        km: enterpriseData?.mileageByExecuting,
        color: theme.colors.blue.blue50
      }
    ],
    [
      {
        title: 'Obra concluída',
        progress: enterpriseData?.mileageByCompleted,
        km: enterpriseData?.mileageByCompleted,
        color: theme.colors.indigoWarmVivid.indigoWarmVivid70
      },
      {
        title: 'Obra paralisada',
        progress: enterpriseData?.mileageByPaused,
        km: enterpriseData?.mileageByPaused,
        color: theme.colors.orangeVivid.orangeVivid30
      }
    ]
  ]

  return (
    <StyledKmComponent>
      {statusList.map((groups, index) => (
        <React.Fragment key={index}>
          {groups.map((item) => (
            <Item key={item.title + item.km}>
              <StatusBar>
                <Text
                  text={item.title}
                  size={theme.font.sizes.s16}
                  color={theme.colors.blueWarmVivid.blueWarmVivid70}
                  weight={theme.font.w600}
                />
                <Progress
                  percent={
                    +getKmPercent(item?.progress, enterpriseData?.mileage)
                  }
                  color={item.color}
                />
              </StatusBar>
              <ContainerTexts>
                <Text
                  text={`${getKmPercent(
                    item?.progress,
                    enterpriseData?.mileage
                  )}%`}
                  size={theme.font.sizes.s14}
                  color={theme.colors.blueWarmVivid.blueWarmVivid70}
                  weight={theme.font.w400}
                />
                <Text
                  text={`${item.km || '0 km'}`}
                  size={theme.font.sizes.s14}
                  color={theme.colors.blueWarmVivid.blueWarmVivid70}
                  weight={theme.font.w600}
                />
              </ContainerTexts>
            </Item>
          ))}
        </React.Fragment>
      ))}
    </StyledKmComponent>
  )
}

export default KmComponent
