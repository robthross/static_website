import React from 'react'

import { IEnterprise } from '../../interfaces/components/enterprises'
import theme from '../../../common/styles/theme'
import ContinuousText from '../ContinuousText'
import TableBox from '../TableBox'
import Text from '../../../common/components/Text'
import Status from './Status'
import { ContainerTableBoxRiscksProblems, StyledRiscksProblems } from './styles'

function RisksProblems({ data }: { data: IEnterprise }) {
  const currentItem = {
    riskEnvironment: data.riskEnvironment,
    riskExpropriation: data.riskExpropriation,
    semaphore: data.semaphore?.toUpperCase(),
    riskWork: data.riskWork,
    iap: data.iap
  }

  if (
    currentItem.riskEnvironment ||
    currentItem.riskExpropriation ||
    currentItem.semaphore ||
    currentItem.riskWork
  )
    return (
      <TableBox
        title="Riscos/ Problemas"
        sizeTitle={theme.font.sizes.s21}
        shadow
      >
        <ContainerTableBoxRiscksProblems>
          <StyledRiscksProblems>
            {currentItem.semaphore && (
              <Status
                status={
                  currentItem.semaphore as 'VERMELHO' | 'VERDE' | 'AMARELO'
                }
                value={currentItem.iap}
              />
            )}
            {currentItem.riskWork && (
              <Text
                text={
                  <ContinuousText
                    itemName="Obra:"
                    value={currentItem.riskWork}
                  />
                }
                size={theme.font.sizes.s16}
                color={theme.colors.blue.blue80}
                weight={theme.font.w400}
              />
            )}
            {currentItem.riskEnvironment && (
              <Text
                text={
                  <ContinuousText
                    itemName="Meio-ambiente:"
                    value={currentItem.riskEnvironment}
                  />
                }
                size={theme.font.sizes.s16}
                color={theme.colors.blue.blue80}
                weight={theme.font.w400}
              />
            )}
            {currentItem?.riskExpropriation && (
              <Text
                text={
                  <ContinuousText
                    itemName="Desapropriação:"
                    value={currentItem.riskExpropriation}
                  />
                }
                size={theme.font.sizes.s16}
                color={theme.colors.blue.blue80}
                weight={theme.font.w400}
              />
            )}
          </StyledRiscksProblems>
        </ContainerTableBoxRiscksProblems>
      </TableBox>
    )
}

export default RisksProblems
