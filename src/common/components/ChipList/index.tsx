import React, { useCallback } from 'react'

import Chip from '../Chip'
import { ChipListContainer } from './styles'

interface ChipListProps<T> {
  idKey: keyof T
  labelKey: keyof T
  selectedItems: T[]
  setSelectedItems: React.Dispatch<React.SetStateAction<T[]>>
}

const ChipList = <T,>({
  idKey,
  labelKey,
  selectedItems,
  setSelectedItems
}: ChipListProps<T>) => {
  const handleRemoveItem = useCallback((item: T) => {
    const updatedItems = selectedItems.filter(
      (selected) => selected[idKey] !== item[idKey]
    )
    setSelectedItems(updatedItems)
  }, [])

  return (
    <ChipListContainer>
      {selectedItems.map((item) => (
        <Chip
          key={item[idKey].toString()}
          onRemove={handleRemoveItem}
          data={item}
          labelKey={labelKey}
        />
      ))}
    </ChipListContainer>
  )
}

export default ChipList
