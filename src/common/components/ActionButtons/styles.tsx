import styled from 'styled-components'

import theme from '../../styles/theme'

export const ContainerButtons = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  height: 100%;
`

const buttonsProperties = {
  delete: {
    background: theme.colors.red.danger,
    color: theme.colors.pure.pure
  },
  edit: {
    background: theme.colors.pure.pure,
    color: theme.colors.blue.blueTextSinfra
  },
  default: {
    background: theme.colors.cyan.cyan50,
    color: theme.colors.pure.pure
  }
}

type ButtonProps = {
  buttonType: 'edit' | 'delete' | 'default'
}

export const ActionButton = styled.button<ButtonProps>`
  height: 28px;
  padding: 0 1rem;
  background: ${(props) => buttonsProperties[props.buttonType].background};
  color: ${(props) => buttonsProperties[props.buttonType].color};
  border: none;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.08),
    0px 4px 6px 0px rgba(50, 50, 93, 0.11);
  font-size: ${({ theme }) => theme.font.sizes.s12};
  font-weight: ${({ theme }) => theme.font.w600};
  letter-spacing: 0.24px;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`
