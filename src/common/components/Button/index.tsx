import React from 'react'

import Text from '../../../common/components/Text'
import theme from '../../../common/styles/theme'
import { IButton } from '../../../road/interfaces/components/button'
import { StyledButton } from './styles'

function Button({ text, color, background, onClick, disabled }: IButton) {
  return (
    <StyledButton
      data-testid="custom-button"
      background={background}
      onClick={onClick}
      disabled={disabled}
    >
      <Text
        text={text}
        size={theme.font.sizes.s14}
        color={color}
        weight={theme.font.w500}
      />
    </StyledButton>
  )
}

export default Button
