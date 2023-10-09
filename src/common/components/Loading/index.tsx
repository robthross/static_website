import React from 'react'

import theme from '../../../common/styles/theme'
import Text from '../Text'
import { LoadingSpinner, StyledInitialLoading, StyledLoading } from './styles'

function Loading({ initial }: { initial?: boolean }) {
  return initial ? (
    <StyledInitialLoading data-testid="initial-loading">
      <LoadingSpinner />
      <Text
        text="Carregando..."
        size={theme.font.sizes.s16}
        color={theme.colors.blue.blue70}
        weight={theme.font.w400}
      />
    </StyledInitialLoading>
  ) : (
    <StyledLoading data-testid={'loading-component'}>
      <LoadingSpinner />
    </StyledLoading>
  )
}

export default Loading
