import styled from 'styled-components'

import theme from '../theme'

export const AppContainer = styled.section`
  width: 100%;
  height: 100vh;
  min-height: 720px;
  min-width: 930px;
  display: flex;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background: ${theme.colors.pure.pure};
  @media (max-width: 929px) {
    flex-direction: column;
    width: 100%;
    height: auto;
    min-width: initial;
    min-height: initial;
  }
`
export const LeftContainer = styled.div`
  width: 18.5%;
  height: 100%;
  @media (max-width: 929px) {
    width: 100%;
    height: auto;
  }
`
export const CenterContainer = styled.div`
  width: 53.5%;
  height: 100%;
  position: relative;
  @media (max-width: 929px) {
    width: 100%;
    height: auto;
  }
`
export const RightContainer = styled.div`
  width: 28%;
  height: 100%;
  background: ${theme.colors.pure.pure};
  @media (max-width: 929px) {
    margin-top: 0.5rem;
    width: 100%;
    height: auto;
  }
`
