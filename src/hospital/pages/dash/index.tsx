import React from 'react'
import { CgHome } from 'react-icons/cg'
import { HiMenuAlt4 } from 'react-icons/hi'
import { MdPersonOutline } from 'react-icons/md'

import ContainerTabSinfra from '../../../backoffice/components/ContainerTabSinfra'
import CardGraphicS from '../../components/CardGraphicS'
import CardPulvGraphic from '../../components/CardPulvGraphic'
import {
  ContainerCol,
  ContainerDash,
  ContainerFlexCards
} from '../../components/ContainerDash/styles'
import EquipmentGraphic from '../../components/EquipmentGraphic'
import InterferencesCard from '../../components/InterferencesCard'
import MiniCard from '../../components/MiniCard'
import SlideCard from '../../components/SlideCard'
import WeeklyCard from '../../components/WeeklyCard'

function Dash() {
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
      <ContainerDash>
        <ContainerCol width="60%">
          <ContainerFlexCards height="15%">
            <MiniCard title="Saldo Contratual" type="Valor" value="R$24.780" />
            <MiniCard title="Saldo Contratual" type="Valor" value="R$24.780" />
            <MiniCard title="Saldo Contratual" type="Valor" value="R$24.780" />
          </ContainerFlexCards>
          <CardGraphicS />
          <ContainerFlexCards height="35%">
            <CardPulvGraphic />
            <EquipmentGraphic />
          </ContainerFlexCards>
        </ContainerCol>

        <ContainerCol width="40%">
          <InterferencesCard />
          <SlideCard />

          <WeeklyCard />
        </ContainerCol>
      </ContainerDash>
    </ContainerTabSinfra>
  )
}

export default Dash
