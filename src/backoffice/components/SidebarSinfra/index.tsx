import React from 'react'
import { CgHome } from 'react-icons/cg'
import { HiMenuAlt4 } from 'react-icons/hi'
import { MdPersonOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import Logo from '../../../common/components/Logo'
import { ButtonSideBar, ContainerLogo, ContainerSidebar, Label } from './styles'

function SidebarSinfra() {
  const navigate = useNavigate()
  return (
    <ContainerSidebar>
      <ContainerLogo>
        <Logo />
      </ContainerLogo>
      <ButtonSideBar onClick={() => navigate('/')}>
        <CgHome />
        <Label>Home</Label>
      </ButtonSideBar>
      <ButtonSideBar onClick={() => navigate('/backoffice')}>
        <MdPersonOutline />
        <Label>Usuários</Label>
      </ButtonSideBar>
      <ButtonSideBar onClick={() => navigate('/road')}>
        <HiMenuAlt4 />
        <Label>Empreendimentos</Label>
      </ButtonSideBar>
    </ContainerSidebar>
  )
}

export default SidebarSinfra
