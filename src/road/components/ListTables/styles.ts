import styled from 'styled-components'

import theme from '../../../common/styles/theme'

export const StyledListTables = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: ${theme.colors.pure.pure};
  @media (max-width: 1040px) {
    .table {
      > div > p {
        font-size: ${theme.font.sizes.s12};
      }
    }
  }
`

export const ContainerTop = styled.div`
  display: flex;
  width: 100%;
  height: 19.625%;
  > div {
    :nth-child(1) {
      border-right: 1px solid ${theme.colors.gray.generic};
    }
  }
  @media (max-width: 1040px) {
    height: 13%;
  }
  @media (max-width: 929px) {
    flex-direction: column;
  }
`
export const ContainerCenter = styled.div`
  display: flex;
  width: 100%;
  height: 37.75%;
  min-height: 300px;
`
export const ContainerBottom = styled.div``
export const ContainerTexts = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  > p {
    @media (max-width: 1225px) {
      font-size: ${theme.font.sizes.s20};
    }
    @media (max-width: 1060px) {
      font-size: ${theme.font.sizes.s14};
    }
  }
`
