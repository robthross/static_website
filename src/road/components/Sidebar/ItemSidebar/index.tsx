import React, { useContext, useEffect, useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'

import Text from '../../../../common/components/Text'
import theme from '../../../../common/styles/theme'
import { IItemSidebarComponent } from '../../../interfaces/components/sidebar'
import { getIdEnterpriseFilter } from '../../../utils/getIdEnterpriseFilter'
import menusSidebar from '../../../utils/menusSidebar'
import CheckBox from '../../CheckBox'
import {
  ButtonItemSidebar,
  ButtonOption,
  ContainerItems,
  ContainerOptions,
  Icon,
  InputSearch,
  ContainerSearch,
  SearchIcon,
  InputContainer
} from './styles'
import { EnterpriseContext } from '../../../contexts/EnterprisesContext'
import { useDebounce } from '../../../hooks/useDebounce'

const utils = {
  PROGRAM: 'program',
  SUBPROGRAM: 'subProgram',
  STATUS: 'status',
  REGION: 'mesoRegion',
  ENTERPRISE: 'id'
}

function ItemSidebar({
  handleClick,
  item,
  currentType,
  handleChange,
  enterprisesQueries,
  enterpriseRefetch
}: IItemSidebarComponent) {
  const typeLowerCase = utils[item.type]
  const [searchText, setSearchText] = useState('')

  const debouncedValue = useDebounce<string>(enterprisesQueries.id, 1000)

  useEffect(() => {
    if (debouncedValue) {
      enterpriseRefetch()
    }
  }, [debouncedValue, enterpriseRefetch])

  return (
    <ContainerItems key={typeLowerCase}>
      <ButtonItemSidebar onClick={() => handleClick(typeLowerCase)}>
        <Text
          text={menusSidebar[item.type]}
          size={theme.font.sizes.s14}
          color={theme.colors.pure.pure}
          weight={theme.font.w700}
        />
        <Icon opened={currentType === typeLowerCase}>
          <FiChevronDown />
        </Icon>
      </ButtonItemSidebar>
      <ContainerOptions
        opened={currentType === typeLowerCase}
        data-testid="container-options"
      >
        {typeLowerCase === 'id' && (
          <ContainerSearch>
            <InputContainer>
              <InputSearch
                type="text"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder="Pesquisar"
              />
              <SearchIcon />
            </InputContainer>
          </ContainerSearch>
        )}
        {item.options
          .filter((option) =>
            option.toLowerCase().includes(searchText.toLowerCase())
          )
          .map((option) => (
            <ButtonOption
              key={option}
              onClick={() => handleChange(typeLowerCase, option)}
            >
              <CheckBox
                value={enterprisesQueries[typeLowerCase]}
                option={
                  typeLowerCase === 'id'
                    ? getIdEnterpriseFilter(option)
                    : option
                }
                type={typeLowerCase}
              />
              <Text
                text={option}
                size={theme.font.sizes.s14}
                color={theme.colors.pure.pure100}
                weight={theme.font.w400}
              />
            </ButtonOption>
          ))}
      </ContainerOptions>
    </ContainerItems>
  )
}

export default ItemSidebar
