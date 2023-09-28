import React from 'react'

import theme from '../../../common/styles/theme'
import { IAction, IActionPlan } from '../../interfaces/components/actionplan'
import TableBox from '../TableBox'
import {
  ContainerTableBoxActionPlan,
  TableContainer,
  TableHead,
  TableRow
} from './styles'

function ActionPlan({ data }: { data: IAction }) {
  return (
    <TableBox title="Plano de Ações" sizeTitle={theme.font.sizes.s21} shadow>
      <ContainerTableBoxActionPlan data-testid="action-plan">
        <TableContainer>
          <TableHead>
            <tr>
              <th>Ação</th>
              <th>Responsável</th>
              <th>Prazo</th>
              <th>Status</th>
            </tr>
          </TableHead>
          <tbody>
            {data.actionPlans.map((item: IActionPlan, index: number) => (
              <TableRow key={index}>
                <td>{item.action}</td>
                <td>{item.responsible}</td>
                <td>{item.deadline}</td>
                <td>{item.status}</td>
              </TableRow>
            ))}
          </tbody>
        </TableContainer>
      </ContainerTableBoxActionPlan>
    </TableBox>
  )
}

export default ActionPlan
