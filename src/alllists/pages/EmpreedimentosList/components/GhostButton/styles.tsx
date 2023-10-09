import styled from 'styled-components'

import theme from '../../../../../common/styles/theme'

const buttonsProperties = {
  blue: {
    color: theme.colors.blue.backofficeBlue
  },
  green: {
    color: theme.colors.green.greenButton
  },
  yellow: {
    color: theme.colors.yellow.yellowButton
  },
  red: {
    color: theme.colors.red.redButton
  }
}

type ButtonProps = {
  colorButton: 'blue' | 'green' | 'yellow' | 'red'
}

export const GhostButton = styled.button<ButtonProps>`
  height: 28px;
  padding: 0 1rem;
  background: none;
  color: ${theme.colors.gray.grayCard};
  border-radius: 4px;
  border: 2px solid ${(props) => buttonsProperties[props.colorButton].color};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  font-size: ${({ theme }) => theme.font.sizes.s12};
  font-weight: ${({ theme }) => theme.font.w400};
  letter-spacing: 0.24px;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
  svg {
    color: ${(props) => buttonsProperties[props.colorButton].color};
  }
`
