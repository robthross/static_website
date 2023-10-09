import React, { useState } from 'react'

import styled from 'styled-components'

import theme from '../../styles/theme'

export interface SearchAutocompleteProps {
  options: string[]
  onSelect: (option: string) => void
}

export const AutocompleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-top: 0.3rem;
`

export const AutocompleteContent = styled.div`
  display: flex;
  position: relative;
`

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${() => theme.colors.gray.inputBorder};
  border-radius: 4px;
  padding: 6px;
  position: relative;
  width: 100%;
  min-height: 46px;
`

export const Input = styled.input`
  border: none;
  border-bottom: 0.5px solid ${() => theme.colors.dash.dashTextLight};
  outline: none;
  width: 100%;
  padding: 0;
  font-size: 14px;
  line-height: 17px;
  color: #646363;
  background: transparent;
`

export const SearchIcon = styled.div`
  margin-right: 8px;
  color: ${() => theme.colors.gray.gray};
`

export const SuggestionsList = styled.ul`
  list-style: none;
  border: 1px solid ${() => theme.colors.gray.inputBorder};
  border-top: none;
  border-radius: 0 0 4px 4px;
  max-height: 200px;
  background-color: ${() => theme.colors.pure.pure};
  overflow-y: auto;
  position: absolute;
  top: 95%;
  left: 0;
  right: 0;
`

export const ListItem = styled.li`
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`

export const PlusIcon = styled.div`
  height: 19px;
  width: 19px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${() => theme.colors.blue.backofficeBlue};
  color: ${() => theme.colors.pure.pure};
  margin-right: 8px;
  border-radius: 50px;
`

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  border: none;
  background-color: transparent;
`

export const ChipList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  list-style: none;
`

export const Chip = styled.li`
  background-color: ${() => theme.colors.gray.default};
  color: ${() => theme.colors.black.darkText};
  border-radius: 20px;
  padding: 8px 11px;
  margin: 21px 13px 0 0;
  display: flex;
  align-items: center;
`

export const RemoveIcon = styled.div`
  margin-left: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${() => theme.colors.black.darkText};
`

export const ChipText = styled.span`
  margin-right: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px; /* Defina o valor desejado */
`
