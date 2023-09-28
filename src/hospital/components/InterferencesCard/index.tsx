import React from 'react'

import DashCard from '../DashCard'
import { ItemContainer, ItemText, More } from './styles'

function InterferencesCard() {
  const items = [
    'Manipuladora em manutenção do dia 05/06/2023 até 10/06/2023',
    'Efetivo liberado por conta do pagamento salarial no período vespertino do dia 06/06/2023',
    'Manipuladora em manutenção do dia 05/06/2023 até 10/06/2023'
  ]

  return (
    <DashCard
      width="100%"
      height="40%"
      minHeight="280px"
      title="Principais Interferências"
    >
      <ItemContainer>
        {items.map((item) => (
          <ItemText key={item}>{item}</ItemText>
        ))}
        <More>Ver mais</More>
      </ItemContainer>
    </DashCard>
  )
}

export default InterferencesCard
