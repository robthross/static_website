import React, { useContext, useEffect, useRef, useState } from 'react'
import { IoMdSearch } from 'react-icons/io'

import { useOnClickOutside } from 'usehooks-ts'

import { EnterpriseContext } from '../../contexts/EnterprisesContext'
import { ICoordinatesData } from '../../interfaces/components/coordinates'
import { ISearch } from '../../interfaces/components/search'
import theme from '../../../common/styles/theme'
import Text from '../../../common/components/Text'
import {
  InputSearch,
  ItemOptionSearch,
  OptionsSearch,
  StyledSearch
} from './styles'
import { filteredOptions } from './utils/filteredOptions'

function Search({ searchHandleGeoJSONClickData }: ISearch) {
  const { initialEnterprises, setEnterprisesQueries, geralCoordinatesMap } =
    useContext(EnterpriseContext)

  const [name, setName] = useState('')
  const [filteredList, setFilteredList] = useState(
    initialEnterprises?.enterprises
  )
  const [visibleList, setVisibleList] = useState(false)

  useEffect(() => {
    filteredOptions(initialEnterprises, name, setFilteredList)
  }, [initialEnterprises, initialEnterprises.enterprises, name])

  function handleGeoJSONClick(id: number) {
    searchHandleGeoJSONClickData?.setDetailsAndRisksOpened(false)
    searchHandleGeoJSONClickData?.getCurrentCoordinate(
      id,
      geralCoordinatesMap as ICoordinatesData
    )
    searchHandleGeoJSONClickData?.getCurrentEnterprise(initialEnterprises, id)
    searchHandleGeoJSONClickData?.setDetailsAndRisksOpened(true)
  }

  const handleClick = (id: string) => {
    setEnterprisesQueries({
      id
    })

    handleGeoJSONClick(+id)
    setVisibleList(false)
    setName(() => '')
    setFilteredList(initialEnterprises?.enterprises)
  }

  const ref = useRef(null)
  const handleClickOutside = () => {
    setVisibleList(false)
  }

  useOnClickOutside(ref, handleClickOutside)

  return (
    <StyledSearch ref={ref}>
      <InputSearch
        data-testid="input"
        placeholder="O que você procura?"
        type="text"
        id="name"
        value={name}
        onChange={(event) => setName(event?.target?.value)}
        onFocus={() => setVisibleList(true)}
        autoComplete="off"
      />
      <IoMdSearch />
      {visibleList && initialEnterprises?.enterprises.length > 0 && (
        <OptionsSearch>
          {filteredList?.map((item: { name: string; id: string }) => (
            <ItemOptionSearch
              key={item?.name + item?.id}
              onClick={() => handleClick(item?.id)}
            >
              <Text
                text={`${item?.id} ${item?.name}`}
                size={theme.font.sizes.s14}
                color={theme.colors.blue.blue80}
                weight={theme.font.w300}
              />
            </ItemOptionSearch>
          ))}
        </OptionsSearch>
      )}
    </StyledSearch>
  )
}

export default Search
