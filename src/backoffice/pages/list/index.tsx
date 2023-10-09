import React from 'react'
import { CgHome } from 'react-icons/cg'
import { HiMenuAlt4 } from 'react-icons/hi'
import { MdPersonOutline } from 'react-icons/md'

import ContainerTabSinfra from '../../components/ContainerTabSinfra'
import UsersList from '../../components/UsersList'

function Backoffice() {
  const sidebarItems = [
    {
      icon: <CgHome />,
      label: 'Home',
      path: '/'
    },
    {
      icon: <MdPersonOutline />,
      label: 'Usuários',
      path: '/backoffice'
    },
    {
      icon: <HiMenuAlt4 />,
      label: 'Empreendimentos',
      path: '/road'
    }
  ]

  return (
    <ContainerTabSinfra sidebarItems={sidebarItems}>
      <UsersList />
    </ContainerTabSinfra>
  )
}

export default Backoffice
