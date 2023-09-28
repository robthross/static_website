import styled from 'styled-components'

import theme from '../../../common/styles/theme'

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.pure.pure};
  padding: 60px 43px 45px 31px;
  margin: 31px 33px 10px 31px;
  border-radius: 6px;
  height: 85%;
  box-shadow: 0px 0px 32px 0px #8898aa26;
`
export const Breadcrumb = styled.div`
  display: flex;
  align-items: baseline;
  margin-left: 31px;
  margin-top: 51px;
`

export const Button = styled.button`
  border-radius: 4px;
  padding: 12px 44px;
  align-self: flex-end;
  background: ${theme.colors.blue.blueButtonSinfra};
  box-shadow: 0px 1px 3px 0px #00000014, 0px 4px 6px 0px #32325d1c;
  border: none;
  cursor: pointer;
  color: ${theme.colors.pure.pure};
  font-size: ${theme.font.sizes.s14};
  font-weight: ${theme.font.w600};
  letter-spacing: 0.28px;
  margin-top: auto;
  :hover {
    opacity: 0.8;
  }
`
