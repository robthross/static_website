import React from 'react'

import Text from '../../../../common/components/Text'
import theme from '../../../../common/styles/theme'
import { StyledLocal } from './styles'

function Local({ text }: { text: string }) {
  return (
    <StyledLocal>
      <Text
        text={text}
        size={theme.font.sizes.s16}
        color={theme.colors.blueWarmVivid.blueWarmVivid80}
        weight={theme.font.w600}
      />
    </StyledLocal>
  )
}

export default Local
