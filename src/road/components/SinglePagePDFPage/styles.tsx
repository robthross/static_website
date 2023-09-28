import styled from 'styled-components'

import theme from '../../../common/styles/theme'

export const StyledSinglePagePDFPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${theme.colors.pure.pure};
  .page2,
  .page3 {
    padding-top: 1rem;
  }
`
export const TopBar = styled.div`
  width: 100%;
  background: ${theme.colors.blueWarmVivid.blueWarmVivid80};
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const ContentTopBar = styled.div`
  width: 595px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 41px;
  }
`
export const HeaderSinglePage = styled.div`
  height: 112px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 21px;
  border-bottom: 1px solid ${theme.colors.gray.generic};
`
export const DetailingSinglePage = styled.div`
  padding: 18px 0;
  width: 595px;
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const DetailingColsSinglePage = styled.div`
  display: flex;
  margin-top: 16px;
  gap: 1rem;
`

export const DetailingLeftSinglePage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  .program {
    order: 1;
  }
  .subProgram {
    order: 2;
  }
  .road {
    order: 3;
  }
  .extension {
    order: 4;
  }
  .status {
    order: 5;
  }
  .startedAt {
    order: 6;
  }
  .amountDone {
    order: 7;
  }
  .totalEstimated {
    order: 8;
  }
  .resourcesToBeAvailable {
    order: 9;
  }
`
export const DetailingRightSinglePage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  .dueAt {
    order: 1;
  }
  .enterprises {
    order: 2;
  }
  .cities {
    order: 3;
  }
  .populationEstimated {
    order: 4;
  }
  .directJobs {
    order: 5;
  }
  .indirectJobs {
    order: 6;
  }
`
export const MapSinglePage = styled.div`
  display: flex;
  width: 595px;
  height: 282px;
  margin-bottom: 3rem;
  .button-zoom {
    display: none;
  }
`
export const RiskIap = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`
export const RisksContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 595px;
`
export const ActionsSinglePage = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 595px;
  > p {
    margin-bottom: 16px;
  }
`
export const GraphicSinglePage = styled.div`
  width: 595px;
`
export const InspectionStyled = styled.div`
  width: 595px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  gap: 0.5rem;
  > div {
    max-height: initial;
  }
`
export const CardLeftCol = styled.div``
export const CardLeftColUp = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`
export const CardLeftColUpItem = styled.div``
export const CardLeftColDown = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%;
`
export const CardLeftColDownItem = styled.div`
  width: 100%;
`

export const CardRightCol = styled.div`
  width: 33%;
  display: flex;
  gap: 1rem;
  margin-left: 1.5rem;
`
export const CardRightColLine = styled.div``
export const CardRightColLineItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`
export const ContainerImage = styled.div`
  width: 65px;
  img {
    box-sizing: border-box;
    max-width: 100%;
  }
`
export const Footer = styled.div`
  width: 100%;
  background: ${theme.colors.blueWarmVivid.blueWarmVivid80};
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  > img {
    width: 35px;
  }
`
export const DetailingFonts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 70%;
  margin-left: auto;
  text-align: right;
`
