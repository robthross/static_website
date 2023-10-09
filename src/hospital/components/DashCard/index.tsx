import React from 'react'

import { DashCardContainer, TitleDashCard } from './styles'

function DashCard({
  children,
  width,
  height,
  minHeight,
  title,
  reference
}: {
  children: React.ReactNode
  width: string
  height: string
  minHeight: string
  title?: string
  reference?: React.MutableRefObject<any>
}) {
  return (
    <DashCardContainer
      width={width}
      height={height}
      minHeight={minHeight}
      ref={reference}
    >
      {title ? <TitleDashCard>{title}</TitleDashCard> : null}
      {children}
    </DashCardContainer>
  )
}

export default DashCard
