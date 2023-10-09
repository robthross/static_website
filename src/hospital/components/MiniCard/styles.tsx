import styled from 'styled-components'

import theme from '../../../common/styles/theme'

export const ContainerMiniCard = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`
export const MiniCardTitle = styled.p`
  color: ${theme.colors.dash.dashTextDark};
  font-size: ${theme.font.sizes.s14};
  font-weight: ${theme.font.w600};
  margin-bottom: 4px;
`
export const MiniCardType = styled.p`
  color: #94a3b8;
  font-size: ${theme.font.sizes.s12};
  font-weight: ${theme.font.w600};
`
export const MiniCardValue = styled.p`
  color: ${theme.colors.dash.dashTextDark};
  font-size: ${theme.font.sizes.s14};
  font-weight: ${theme.font.w600};
`
