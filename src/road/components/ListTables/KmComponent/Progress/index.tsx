import React from 'react'

import { Bar, ColorBar, StyledProgress } from './styles'

function Progress({ percent, color }: { percent: number; color: string }) {
  return (
    <StyledProgress>
      <Bar>
        <ColorBar percent={percent} color={color} data-testid="color-bar" />
      </Bar>
    </StyledProgress>
  )
}

export default Progress
