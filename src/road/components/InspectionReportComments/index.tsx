import React from 'react'

import Text from '../../../common/components/Text'
import theme from '../../../common/styles/theme'
import { StyledComments } from './styles'

function InspectionReportComments({
  type,
  content
}: {
  type: string
  content: string
}) {
  return (
    <StyledComments>
      <Text
        text={type === 'comments' ? 'Comentários:' : 'Riscos:'}
        size={theme.font.sizes.s16}
        color={theme.colors.blueWarmVivid.blueWarmVivid80}
        weight={700}
      />
      <Text
        text={content}
        size={theme.font.sizes.s16}
        color={theme.colors.blueWarmVivid.blueWarmVivid80}
        weight={500}
      />
    </StyledComments>
  )
}

export default InspectionReportComments
