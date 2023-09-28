import React from 'react'

import SidebarSinfra from '../SidebarSinfra'
import {
  ContainerChildren,
  ContainerSidebarChildren,
  ContainerTABSinfraStyled,
  DefaultTopBar
} from './styles'

function ContainerTabSinfra({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DefaultTopBar />
      <ContainerTABSinfraStyled>
        <ContainerSidebarChildren>
          <SidebarSinfra />
          <ContainerChildren>{children}</ContainerChildren>
        </ContainerSidebarChildren>
      </ContainerTABSinfraStyled>
    </>
  )
}

export default ContainerTabSinfra
