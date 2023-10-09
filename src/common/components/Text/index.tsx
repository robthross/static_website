import React from 'react'

import { IText } from '../../interfaces/components/text'
import { StyledText } from './styles'

function Text({ children, text, size, color, style, weight }: IText) {
  return (
    <StyledText
      style={style}
      size={size}
      color={color}
      weight={weight}
      data-testid="test-text"
      className="text-component"
    >
      {text || children}
    </StyledText>
  )
}

export default Text
