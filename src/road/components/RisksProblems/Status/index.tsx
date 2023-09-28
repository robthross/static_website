import React from 'react'

import Text from '../../../../common/components/Text'
import theme from '../../../../common/styles/theme'
import { StyledStatus } from './styled'

function Status({
  status,
  value
}: {
  status: 'VERDE' | 'AMARELO' | 'VERMELHO'
  value: string
}) {
  const statusConvert = {
    VERDE: theme.colors.greenCoolVivid.greenCoolVivid30,
    AMARELO: theme.colors.yellowVivid.yellowVivid20,
    VERMELHO: theme.colors.red.red50
  }

  const treatedNumber = (+value * 100).toFixed()

  return (
    <StyledStatus
      background={statusConvert[status]}
      data-testid="status-component"
    >
      <Text
        text={`IAP: ${treatedNumber}%`}
        size={theme.font.sizes.s20}
        color={theme.colors.pure.pure}
        weight={theme.font.w700}
      />
    </StyledStatus>
  )
}

export default Status
