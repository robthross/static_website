import styled from 'styled-components'

import theme from '../../../common/styles/theme'

export const StyledButton = styled.button<{ background: string }>`
  min-width: 95px;
  height: 31px;
  background: ${(props) => props.background};
  border-radius: 10px;
  border: none;
  font-size: ${theme.font.sizes.s14};
  font-weight: ${theme.font.w900};
  cursor: pointer;
  :hover {
    filter: brightness(95%);
  }
  :disabled {
    opacity: 0.5;
  }
`
