import styled from 'styled-components'

import theme from '../../../common/styles/theme'

export const ContainerLoading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000000;
  position: absolute;
  background: ${theme.colors.pure.pure};
  border-radius: ${theme.border.radius10};
`
