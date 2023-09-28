import styled from 'styled-components'

import theme from '../common/styles/theme'

export const ContainerHome = styled.div`
  padding: 60px 22px 10px;
`

export const BoxContainer = styled.div`
  display: flex;
  align-items: center;
  *::selection {
    background: none;
  }
`
export const Box = styled.div`
  width: 359px;
  height: 237px;
  background-color: ${theme.colors.pure.pure};
  padding: 16px;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  box-shadow: 0px 0px 32px 0px #8898aa26;
`

export const Button = styled.button`
  border-radius: 4px;
  padding: 12px 44px;
  background: ${theme.colors.blue.blueButtonSinfra};
  box-shadow: box-shadow: 0px 1px 3px 0px #00000014, 0px 4px 6px 0px #32325D1C;
  border: none;
  cursor: pointer;
  display: flex;
  align-self: flex-start;
  color: ${theme.colors.pure.pure};
  font-size: ${theme.font.sizes.s14};
  font-weight: ${theme.font.w600};
  letter-spacing: 0.28px;
  margin-top: auto;
  :hover {
    opacity: 0.8;
  }
`
