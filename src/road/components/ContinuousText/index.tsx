import React from 'react'

import { StyledSpanKey } from './styles'

function ContinuousText({
  itemName,
  value
}: {
  itemName: string
  value: string
}) {
  return (
    <>
      <StyledSpanKey data-testid="continuous-text">{itemName}</StyledSpanKey>
      {React.createElement('span', null, '\u00A0')}
      {React.createElement('span', null, '\u00A0')}
      {value}
    </>
  )
}

export default ContinuousText
