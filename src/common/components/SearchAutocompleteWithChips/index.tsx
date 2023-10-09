import React, { useEffect, useRef, useState } from 'react'

import Lupa from '../../assets/svg/lupa'
import theme from '../../styles/theme'
import ChipList from '../ChipList'
import { FormInputLabel } from '../FormInput/styles'
import Text from '../Text'
import {
  AddButton,
  AutocompleteContainer,
  AutocompleteContent,
  Input,
  InputContainer,
  ListItem,
  PlusIcon,
  SearchIcon,
  SuggestionsList
} from './styles'

interface SearchAutocompleteWithChipsProps<T> {
  options: T[]
  idKey: keyof T
  labelKey: keyof T
  onSelect: (option: T) => void
  label?: string
}

const SearchAutocompleteWithChips = <T,>({
  label,
  idKey,
  labelKey,
  options,
  onSelect
}: SearchAutocompleteWithChipsProps<T>) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [suggestions, setSuggestions] = useState<T[]>([])
  const [selectedItems, setSelectedItems] = useState<T[]>([])

  const autocompleteRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        autocompleteRef.current &&
        !autocompleteRef.current.contains(event.target)
      ) {
        setSuggestions([])
        setInputValue('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)

    // TODO: Remover e chamar API quando possivel
    const filteredOptions = options.filter((option) =>
      option[labelKey].toString().toLowerCase().includes(value.toLowerCase())
    )

    setSuggestions(value.length ? filteredOptions : [])
  }

  const handleSelectOption = (option: T) => {
    setSelectedItems([...selectedItems, option])

    const updatedSuggestions = suggestions.filter(
      (suggestion) => suggestion[idKey] !== option[idKey]
    )
    setSuggestions(updatedSuggestions)
    onSelect(option)
  }

  const handleRemoveItem = (item: T) => {
    const updatedItems = selectedItems.filter(
      (selected) => selected[idKey] !== item[idKey]
    )
    setSelectedItems(updatedItems)
  }

  return (
    <AutocompleteContainer ref={autocompleteRef}>
      <FormInputLabel>
        <Text
          color={theme.colors.blueWarmVivid.blueWarmVivid80}
          size="14px"
          weight={600}
          style={{ marginBottom: 9 }}
        >
          {label}
        </Text>
      </FormInputLabel>
      <AutocompleteContent>
        <InputContainer>
          <SearchIcon>
            <Lupa />
          </SearchIcon>
          <Input type="text" value={inputValue} onChange={handleInputChange} />
        </InputContainer>
        {!!inputValue.length && (
          <SuggestionsList>
            {suggestions.map((option) => (
              <ListItem key={option[idKey].toString()}>
                <Text color={theme.colors.gray.gray}>
                  {option[labelKey].toString()}
                </Text>
                <AddButton onClick={() => handleSelectOption(option)}>
                  <PlusIcon>+</PlusIcon>
                  <Text color={theme.colors.gray.gray}>Adicionar</Text>
                </AddButton>
              </ListItem>
            ))}
            {!suggestions.length && (
              <ListItem>
                <Text color={theme.colors.gray.gray}>
                  Nenhum resultado encontrado.
                </Text>
              </ListItem>
            )}
          </SuggestionsList>
        )}
      </AutocompleteContent>
      <div>
        <ChipList {...{ selectedItems, setSelectedItems, idKey, labelKey }} />
      </div>
    </AutocompleteContainer>
  )
}

export default SearchAutocompleteWithChips
