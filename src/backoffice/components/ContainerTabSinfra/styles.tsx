import styled from 'styled-components'

import theme from '../../../common/styles/theme'

export const ContainerTABSinfraStyled = styled.div`
  width: 100%;
  height: calc(100vh - 55px);

  background-image: linear-gradient(
    to bottom,
    rgba(52, 93, 150, 0.1) 37%,
    #ffffff 37%
  );
`
export const DefaultTopBar = styled.div`
  width: 100%;
  height: 55px;
  background: ${theme.colors.gray.default};
`
export const ContainerSidebarChildren = styled.div`
  display: flex;
  padding-left: 85px; // posiçao original do sidebar
  width: 100%;
  height: 100%;
`

export const ContainerChildren = styled.div`
  width: 100%;
  height: 100%;
`
