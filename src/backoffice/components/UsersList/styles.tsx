import styled from 'styled-components'

import theme from '../../../common/styles/theme'

export const StyledUserList = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px 40px 10px 60px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  *::selection {
    background: none;
  }
`
export const ContainerUsersList = styled.div`
  width: 100%;
  height: 100%;
  background: ${theme.colors.pure.pure};
  border-radius: 6px;
  box-shadow: 0px 0px 32px 0px rgba(136, 152, 170, 0.15);
`
export const TopBar = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  justify-content: space-between;
  h4 {
    color: ${theme.colors.blue.blueTextSinfra};
    font-size: ${theme.font.sizes.s14};
    font-weight: 700;
  }
`
export const Table = styled.div`
  width: 100%;
  min-height: 50%;
  height: calc(
    100% - 36px - 50px
  ); // dimensao 36 equivale aos botoes de navegaçao e 50 o topbar
  border-radius: 6px;
  padding-bottom: 50px;
  .ag-cell {
    display: flerx;
    align-items: center;
  }
  .ag-cell-focus {
    border-color: transparent !important;
  }
  .customStyle {
    --ag-header-background-color: ${theme.colors.white.whiteBackground};
    --ag-borders: none;
    --ag-header-foreground-color: ${theme.colors.blue.blueTextSinfra};
    --ag-font-size: ${theme.font.sizes.s14};
    --ag-odd-row-background-color: ${theme.colors.gray.gray01};
    --ag-data-color: ${theme.colors.gray.grayCard};
  }
`

export const ContainerButtons = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  height: 100%;
`
export const ActionButton = styled.button<{ isDelete?: boolean }>`
  width: ${({ isDelete }) => (isDelete ? '80px' : '60px')};
  height: 28px;
  background: ${({ isDelete, theme }) =>
    isDelete ? theme.colors.red.danger : theme.colors.pure.pure};
  border: none;
  border-radius: 4px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.08),
    0px 4px 6px 0px rgba(50, 50, 93, 0.11);
  color: ${({ isDelete, theme }) =>
    isDelete ? theme.colors.pure.pure : theme.colors.blue.blueTextSinfra};
  font-size: ${({ theme }) => theme.font.sizes.s12};
  font-weight: ${({ theme }) => theme.font.w600};
  letter-spacing: 0.24px;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`

export const RegisterButton = styled.button`
  margin-bottom: 20px;
  border-radius: 4px;
  background: ${theme.colors.blue.blueButtonSinfra};
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.08),
    0px 4px 6px 0px rgba(50, 50, 93, 0.11);
  border: none;
  width: 148px;
  height: 43px;
  cursor: pointer;
  color: ${theme.colors.pure.pure};
  font-size: ${theme.font.sizes.s14};
  font-weight: ${theme.font.w600};
  letter-spacing: 0.28px;
  :hover {
    opacity: 0.8;
  }
`
export const ContainerPagination = styled.div`
  display: flex;
  gap: 5px;
  .arrowDisabled {
    cursor: initial;
    :hover {
      background: none;
      border-color: ${theme.colors.gray.lightgray};
      color: ${theme.colors.gray.grayCard};
    }
    opacity: 0.5;
  }
`
export const PageButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: none;
  border: 1px solid ${theme.colors.gray.lightgray};
  color: ${theme.colors.gray.grayCard};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  :disabled,
  :hover {
    background: ${theme.colors.blueWarmVivid.blueWarmVivid80};
    border-color: ${theme.colors.blueWarmVivid.blueWarmVivid80};
    color: ${theme.colors.pure.pure};
  }
`
export const DetailsPaginationAndPagination = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
`
export const DetailsPagination = styled.p`
  color: ${theme.colors.blue.darkBlue};
  font-size: ${theme.font.sizes.s14};
  letter-spacing: 0.28px;
  span {
    font-weight: ${theme.font.w600};
  }
`
