import styled from 'styled-components'
import theme from '../../../common/styles/theme'

export const ItemContainer = styled.div`
  height: 100%;
`
export const ItemText = styled.p`
  margin-left: 40px;
  height: 70px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f1f5f9;

  color: ${theme.colors.dash.dashTextDark};
  font-size: ${theme.font.sizes.s12};
  font-weight: ${theme.font.w500};
`
export const More = styled.button`
  display: flex;
  width: 100%;
  background: none;
  border: none;
  justify-content: center;
  align-items: flex-end;
  height: 60px;
  color: ${theme.colors.dash.dashTextDark};
  font-size: ${theme.font.sizes.s12};
  font-weight: ${theme.font.w600};
  padding-bottom: 1rem;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`
