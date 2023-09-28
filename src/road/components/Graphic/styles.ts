import styled from 'styled-components'

import theme from '../../../common/styles/theme'

export const StyledGraphic = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding-bottom: 1rem;
  font-size: 12px;
`
export const ContentGraphic = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`

export const TitleGraphic = styled.div`
  font-size: ${theme.font.sizes.s14};
  padding: 5px;
  color: ${theme.colors.black.blackText};
  margin: auto;
  font-weight: bold;
`
