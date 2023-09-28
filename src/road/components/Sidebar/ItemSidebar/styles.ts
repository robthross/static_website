import { IoMdSearch } from 'react-icons/io'

import styled from 'styled-components'

import theme from '../../../../common/styles/theme'

export const ButtonItemSidebar = styled.button`
  background: none;
  border: none;
  padding: 12px 16px;
  text-align: start;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  color: ${theme.colors.pure.pure};
  cursor: pointer;
`
export const Icon = styled.div<{ opened: boolean }>`
  display: flex;
  transform: ${(props) => (props.opened ? 'rotate(180deg)' : 'initial')};
  transition: transform 0.3s ease;
  svg {
    width: 20px;
    height: 28px;
  }
`
export const ContainerItems = styled.div`
  display: flex;
  flex-direction: column;
`

export const ContainerOptions = styled.div<{ opened: boolean }>`
  background: ${theme.colors.pure.pure};
  display: flex;
  flex-direction: column;
  overflow: auto;
  max-height: ${(props) => (props.opened ? '400px' : '0px')};
  margin-bottom: 5px;
  transition: max-height 0.3s ease;
`
export const ButtonOption = styled.button`
  text-align: start;
  background: none;
  border: none;
  padding: 0px 10px;
  padding-right: 5px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 15px;
  :first-child {
    padding-top: 15px;
  }
  cursor: pointer;
`

export const ContainerSearch = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  margin: 10px;
`

export const InputSearch = styled.input`
  width: 100%;
  padding: 10px;
  padding-right: 40px;
  background-color: ${theme.colors.gray.lightgray};
  color: ${theme.colors.pure.pure100};
  font-size: ${theme.font.sizes.s14};
  border-radius: ${theme.border.radius10};
  border: 1px solid ${theme.colors.gray.lightgray};
  ::placeholder {
    font-style: italic;
  }
`

export const SearchIcon = styled(IoMdSearch)`
  position: absolute;
  right: 10px; /* Ajuste a posição do ícone à direita */
  color: ${theme.colors.gray.gray21};
`
