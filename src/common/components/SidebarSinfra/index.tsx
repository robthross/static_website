import React from 'react'
import { useNavigate } from 'react-router-dom'

import Logo from '../Logo'
import { ButtonSideBar, ContainerLogo, ContainerSidebar, Label } from './styles'

function SidebarSinfra({
  items
}: {
  items: { icon: JSX.Element; label: string; path: string }[]
}) {
  const navigate = useNavigate()
  return (
    <ContainerSidebar>
      <ContainerLogo>
        <Logo />
      </ContainerLogo>
      {items.map((item) => (
        <ButtonSideBar key={item.label} onClick={() => navigate(item.path)}>
          {item.icon}
          <Label>{item.label}</Label>
        </ButtonSideBar>
      ))}
    </ContainerSidebar>
  )
}

export default SidebarSinfra
