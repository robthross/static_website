import styled from 'styled-components'

import theme from '../../../common/styles/theme'

export const StyledLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 100000;
`
export const StyledInitialLoading = styled.div`
  display: flex;
  position: fixed;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 100000;
  background: ${theme.colors.pure.pure};
`
export const LoadingSpinner = styled.div<{ small?: boolean }>`
  width: ${(props) => (props.small ? '2vw' : '70px')};
  height: ${(props) => (props.small ? '2vw' : '70px')};
  border: 10px solid ${theme.colors.gray.default};
  border-top-color: ${theme.colors.blue.blue50};
  border-radius: 50%;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`
