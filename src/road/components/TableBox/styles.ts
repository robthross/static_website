import styled from 'styled-components'

import theme from '../../../common/styles/theme'

export const StyledTableBox = styled.div<{
  shadow?: boolean
}>`
  display: flex;
  flex-direction: column;
  width: 100%;
`
export const TitleBox = styled.div<{ subtitle?: string }>`
  display: flex;
  align-items: center;
  height: 54px;
  width: 100%;
  padding: 20px;
  justify-content: ${(props) => (props.subtitle ? 'space-between' : 'center')};
  background: ${theme.colors.blueWarmVivid.blueWarmVivid80};
  text-align: center;
`
export const ContentBox = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`
