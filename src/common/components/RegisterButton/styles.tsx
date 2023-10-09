import styled from 'styled-components'

import theme from '../../../common/styles/theme'

export const RegisterButton = styled.button`
  margin-bottom: 20px;
  border-radius: 4px;
  background: ${theme.colors.blue.blueButtonSinfra};
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.08),
    0px 4px 6px 0px rgba(50, 50, 93, 0.11);
  border: none;
  width: 148px;
  height: 43px;
  cursor: pointer;
  color: ${theme.colors.pure.pure};
  font-size: ${theme.font.sizes.s14};
  font-weight: ${theme.font.w600};
  letter-spacing: 0.28px;
  :hover {
    opacity: 0.8;
  }
`
