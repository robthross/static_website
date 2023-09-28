import React from 'react'

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
  return (
    <ContainerTabSinfra>
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
