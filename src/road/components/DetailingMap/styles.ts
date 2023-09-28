import styled from 'styled-components'

import theme from '../../../common/styles/theme'

const widthScreen = window.innerWidth

export const StyledDetailingMap = styled.div`
  width: 100%;
  position: relative;
  .tooltip {
    color: ${theme.colors.blueWarmVivid.blueWarmVivid70};
    font-weight: ${theme.font.w600};
  }
  @media (max-width: 929px) {
    width: 100%;
    height: ${widthScreen}px;
  }
`
export const ButtonZoom = styled.button`
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 1000;
  padding: 5px;
  background-color: ${theme.colors.pure.pure};
  background-clip: padding-box;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  cursor: pointer;
  :hover {
    background-color: #f4f4f4;
  }
  @media (max-width: 929px) {
    bottom: 40px;
  }
`
