import React from 'react'

import SidebarSinfra from '../../../common/components/SidebarSinfra'
import {
  ContainerChildren,
  ContainerSidebarChildren,
  ContainerTABSinfraStyled,
  DefaultTopBar
} from './styles'

function ContainerTabSinfra({
  children,
  sidebarItems
}: {
  children: React.ReactNode
  sidebarItems: {
    icon: React.JSX.Element
    label: string
    path: string
  }[]
}) {
  return (
    <>
      <DefaultTopBar />
      <ContainerTABSinfraStyled>
        <ContainerSidebarChildren>
          <SidebarSinfra items={sidebarItems} />
          <ContainerChildren>{children}</ContainerChildren>
        </ContainerSidebarChildren>
      </ContainerTABSinfraStyled>
    </>
  )
}

export default ContainerTabSinfra
