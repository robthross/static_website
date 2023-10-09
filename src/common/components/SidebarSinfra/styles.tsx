import styled from 'styled-components'

import theme from '../../styles/theme'

export const ContainerSidebar = styled.div`
  min-width: 85px;
  height: calc(100% - 55px);
  background: ${theme.colors.blueWarmVivid.blueWarmVivid80};
  position: absolute;
  left: 0;
  top: 55px;
  z-index: 1;
  transition: min-width 0.2s ease-in-out;
  padding-top: 60px;
  p {
    width: 0;
    pointer-events: none;
    transition: opacity 0.2s ease-in-out;
    opacity: 0;
  }
  :hover {
    min-width: 270px;
    p {
      opacity: 1;
    }
  }
`
export const ContainerLogo = styled.div`
  width: 65px;
  display: flex;
  margin: 0 auto;
  > img {
    width: 100%;
  }
  margin-bottom: 30px;
`
export const ButtonSideBar = styled.button`
  height: 52px;
  width: 100%;
  cursor: pointer;
  background: none;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  padding-left: 35px;
  gap: 15px;
  :hover {
    background: rgba(255, 255, 255, 0.1);
  }
  svg {
    color: ${theme.colors.pure.pure};
    width: 15px;
    height: 15px;
  }
`
export const Label = styled.p`
  color: ${theme.colors.pure.pure};
  font-size: ${theme.font.sizes.s14};
  font-weight: ${theme.font.w700};
`
