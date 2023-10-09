import styled from 'styled-components'

import theme from '../../../common/styles/theme'

export const StyledSearch = styled.div`
  width: 50%;
  height: 47px;
  position: absolute;
  top: 22px;
  right: 35px;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  svg {
    position: absolute;
    width: 25px;
    height: 22.5px;
    right: 20px;
    color: ${theme.colors.blueWarmVivid.blueWarmVivid70};
  }
  @media (max-width: 929px) {
    position: initial;
    width: 100%;
    background: ${theme.colors.blueWarmVivid.blueWarmVivid80};
    height: calc(47px + 0.5rem);
    padding: 0.5rem;
    margin-top: 0.5rem;
  }
`
export const InputSearch = styled.input`
  border-radius: ${theme.border.radius10};
  background: ${theme.colors.gray.gray02}E6;
  border: none;
  width: 100%;
  height: 100%;
  padding: 0 24px;
  padding-right: 40px;
  color: ${theme.colors.pure.pure100};
  font-size: ${theme.font.sizes.s14};
  ::placeholder {
    font-style: italic;
  }
`
export const OptionsSearch = styled.div`
  position: absolute;
  width: 100%;
  top: 48px;
  max-height: 100px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  border: 1px solid ${theme.colors.gray.gray02};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  z-index: 10;
  @media (max-width: 929px) {
    width: 100%;
    z-index: 1100;
  }
`
export const ItemOptionSearch = styled.button`
  text-align: start;
  padding: 10px 24px;
  border: none;
  background: ${theme.colors.pure.pure};
  border-bottom: 1px solid ${theme.colors.gray.gray02};
  cursor: pointer;
  :hover {
    background: ${theme.colors.gray.gray02};
  }
`
