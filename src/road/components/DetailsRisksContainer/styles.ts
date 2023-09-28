import styled from 'styled-components'

import theme from '../../../common/styles/theme'

export const StyledDetailsRisksContainer = styled.div`
  display: flex;
  width: 100%;
  min-width: 930px;
  flex-direction: column;
  margin-top: ${theme.spacings.small24p};
  @media (max-width: 929px) {
    margin-top: 0.5rem;
    width: 100%;
    height: auto;
    min-width: initial;
  }
  background: ${theme.colors.pure.pure};
`

export const StyledDetailsRisksLine = styled.div`
  display: flex;
  margin-bottom: ${theme.spacings.small24p};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  @media (max-width: 929px) {
    width: 100%;
    height: auto;
    flex-direction: column;
  }
`

export const LineColLeft = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  @media (max-width: 929px) {
    width: 100%;
    height: auto;
  }
`
export const LineColRight = styled.div`
  display: flex;
  width: 75%;
  img {
    box-sizing: border-box;
    width: 100%;
  }
  @media (max-width: 929px) {
    width: 100%;
    height: auto;
  }
`

export const LineColGraphic = styled.div`
  display: flex;
  width: 75%;
  flex-direction: column;
  img {
    box-sizing: border-box;
    width: 100%;
  }
  > * {
    align-self: flex-start;
  }
  @media (max-width: 929px) {
    width: 100%;
    height: auto;
  }
`

export const LoadingContainer = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  z-index: 1000000;
`
