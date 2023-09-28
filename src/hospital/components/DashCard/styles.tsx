import styled from 'styled-components'

import theme from '../../../common/styles/theme'

export const DashCardContainer = styled.div<{
  width: string
  height: string
  minHeight: string
}>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  min-height: ${(props) => props.minHeight};
  background: ${theme.colors.pure.pure};
  border: 0.61px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  box-shadow: 0px 8.02111px 12.03166px -2.40633px rgba(15, 23, 42, 0.08);
`
export const TitleDashCard = styled.p`
  padding: 15px;
  width: 100%;
  color: ${theme.colors.dash.dashTextDark};
  font-size: ${theme.font.sizes.s12};
  font-weight: ${theme.font.w600};
  border-bottom: 1px solid #f1f5f9;
`
