import React from 'react'

import { ContainerSelectFilter, SelectFilterStyled } from './styles'

import { MdFilterList } from 'react-icons/md'

function SelectFilter({
  handleSelect,
  selected
}: {
  handleSelect: (value: string) => void
  selected: string
}) {
  return (
    <ContainerSelectFilter>
      <MdFilterList />
      <SelectFilterStyled
        onChange={(e) => handleSelect(e.target.value)}
        value={selected}
      >
        <option value="" disabled>
          Filtrar por:
        </option>
        <option value="nome">Nome</option>
        <option value="email">Email</option>
        <option value="birth">Data de Nascimento</option>
        <option value="registrationDate">Data de Cadastro</option>
        <option value="">Nenhum</option>
      </SelectFilterStyled>
    </ContainerSelectFilter>
  )
}

export default SelectFilter
