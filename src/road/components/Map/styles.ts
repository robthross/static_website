import styled from 'styled-components'

import theme from '../../../common/styles/theme'

const widthScreen = window.innerWidth

export const StyledMap = styled.div`
  width: 100%;
  height: 100%;
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
  bottom: 20px;
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
export const FullScreenButton = styled.button`
  position: absolute;
  bottom: 20px;
  right: 10px;
  z-index: 1000;
  padding: 5px;
  background-color: ${theme.colors.pure.pure};
  background-clip: padding-box;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${theme.font.sizes.s20};
  cursor: pointer;
  :hover {
    background-color: #f4f4f4;
  }
  @media (max-width: 929px) {
    bottom: 40px;
  }
`
export const LimitsButton = styled.div`
  position: absolute;
  bottom: 25px;
  right: 60px;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 929px) {
    bottom: 40px;
  }
  > button {
    border: 2px solid rgba(0, 0, 0, 0.2);
    height: 31.8px;
    width: 100%;
    padding: 0 0.5rem;
    font-size: ${theme.font.sizes.s12};
    background-color: ${theme.colors.pure.pure};
    border: none;
    border-radius: 5px;
    cursor: pointer;
    :not(.enabled) {
      :hover {
        background-color: #f4f4f4;
      }
    }
  }
  .enabled {
    font-weight: ${theme.font.w600};
    background: ${theme.colors.blueWarmVivid.blueWarmVivid70};
    color: ${theme.colors.pure.pure};
    font-size: ${theme.font.sizes.s14};
    transform: scale(1.1);
  }
`
export const LocalView = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 1000;
  padding: 5px;
  background-color: ${theme.colors.pure.pure};
  background-clip: padding-box;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`
