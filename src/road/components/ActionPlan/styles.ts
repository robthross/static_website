import styled from 'styled-components'

import theme from '../../../common/styles/theme'

export const ContainerTableBoxActionPlan = styled.div`
  padding: 23px 10px;
`

export const TableContainer = styled.table`
  border: 1px solid ${theme.colors.gray.darkgray};
  border-collapse: collapse;
  width: 100%;
`

export const TableHead = styled.thead`
  th {
    background-color: #ddd;
    color: ${theme.colors.blueWarmVivid.blueWarmVivid80};
    padding: 5px;
    border: 1px solid ${theme.colors.gray.darkgray};
    font-size: ${theme.font.sizes.s12};
    text-align: center;
  }
`

export const TableRow = styled.tr`
  td {
    padding: 5px;
    border: 1px solid ${theme.colors.gray.darkgray};
    font-size: ${theme.font.sizes.s12};
    text-align: center;
  }
`
