import styled from 'styled-components'

import theme from '../../../../common/styles/theme'

export const StyledPierChart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 10px;
`
export const TopContainerPieChart = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 170px;
  svg {
    height: 170px;
  }
  @media (max-width: 1060px) {
    height: 120px;
    svg {
      height: 120px;
    }
  }
`
export const ContainerText = styled.div`
  position: absolute;
  @media (max-width: 1060px) {
    > p {
      font-size: ${theme.font.sizes.s24} !important;
    }
  }
`
export const BottomContainerPieChart = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 23px;
  gap: 40px;
  @media (max-width: 1265px) {
    gap: 20px;
  }
  @media (max-width: 1040px) {
    gap: 8px;
  }
`
export const LegendIItem = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`
export const BallItem = styled.div<{ color: string }>`
  width: 7px;
  aspect-ratio: 1 / 1;
  background: ${(props) => props.color};
  border-radius: 50%;
  position: relative;
  top: 1.5px;
`
