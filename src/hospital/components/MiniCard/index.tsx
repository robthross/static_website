import React from 'react'

import DashCard from '../DashCard'
import {
  ContainerMiniCard,
  MiniCardTitle,
  MiniCardType,
  MiniCardValue
} from './styles'

function MiniCard({
  title,
  type,
  value
}: {
  title: string
  type: string
  value: string
}) {
  return (
    <DashCard width="100%" height="100%" minHeight="100px">
      <ContainerMiniCard>
        <MiniCardTitle>{title}</MiniCardTitle>
        <MiniCardType>{type}</MiniCardType>
        <MiniCardValue>{value}</MiniCardValue>
      </ContainerMiniCard>
    </DashCard>
  )
}

export default MiniCard
