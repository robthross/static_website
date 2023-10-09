import styled from 'styled-components'

import theme from '../../../../../common/styles/theme'

export const SelectFilterStyled = styled.select`
  border-radius: 4px;
  background: ${theme.colors.pure.pure};
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.08),
    0px 4px 6px 0px rgba(50, 50, 93, 0.11);
  width: 160px;
  height: 28px;
  border: none;
  color: ${theme.colors.gray.grayCard};
  font-size: ${theme.font.sizes.s12};
  padding-left: 24px;
  option {
    background: ${theme.colors.pure.pure};
    color: ${theme.colors.gray.grayCard};
  }
`
export const ContainerSelectFilter = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  svg {
    left: 8px;
    font-size: ${theme.font.sizes.s14};
    color: ${theme.colors.blue.blueTextSinfra};
    position: absolute;
  }
`
