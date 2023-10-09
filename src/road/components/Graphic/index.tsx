import React, { useEffect, useState } from 'react'

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'

import theme from '../../../common/styles/theme'
import { IGraphic } from '../../interfaces/components/grapich'
import { StyledGraphic, ContentGraphic, TitleGraphic } from './styles'
import { getDimensions } from './utils/getDimensions'

function Graphic({ data, pdf }: { data: IGraphic; pdf?: boolean }) {
  const [dataGraphic, setData] = useState(null)

  useEffect(() => {
    setData(transformData(data.scurve))
  }, [data])

  const transformData = (scurve: any[]) => {
    if (Array.isArray(scurve)) {
      const monthNames = [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez'
      ]

      return scurve.map((item) => ({
        name: `${monthNames[item.month - 1]}/${item?.year}`,
        leftbar:
          item.planned > 0
            ? parseFloat((item?.planned * 100).toFixed(2))
            : undefined,
        rightbar:
          item.executed > 0
            ? parseFloat((item?.executed * 100).toFixed(2))
            : undefined,
        lineDash:
          item.plannedAcc > 0
            ? parseFloat((item?.plannedAcc * 100).toFixed(2))
            : undefined,
        lineSolid:
          item.executedAcc > 0
            ? parseFloat((item?.executedAcc * 100).toFixed(2))
            : undefined
      }))
    }
  }

  const [width, setWidth] = useState<number>()
  const [height, setHeight] = useState<number>()

  useEffect(() => {
    getDimensions(pdf, setWidth, setHeight)
  }, [pdf])

  return (
    <ContentGraphic>
      <TitleGraphic> CRONOGRAMA - OBRA </TitleGraphic>
      <TitleGraphic> {data?.name} </TitleGraphic>
      <StyledGraphic data-testid="chart">
        <ComposedChart
          className="chart"
          width={width}
          height={height}
          data={dataGraphic}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" />
          <YAxis
            yAxisId="left"
            tickFormatter={(value) => `${value}%`}
            domain={[0, 25]}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
          <>
            <Bar
              dataKey="leftbar"
              fill={theme.colors.green.greenGraphic}
              name="MÊS A MÊS PREVISTO"
              yAxisId="left"
            />
            <Bar
              dataKey="rightbar"
              fill={theme.colors.yellow.yellowGraphic}
              name="MÊS A MÊS REALIZADO"
              yAxisId="left"
            />
            <Line
              dataKey="lineDash"
              strokeDasharray={'5, 5'}
              stroke={theme.colors.blue.blueGraphic}
              name="ACUM. PREVISTO"
              yAxisId="right"
            />
            <Line
              dataKey="lineSolid"
              stroke={theme.colors.orange.orangeGraphic}
              name="ACUM. REALIZADO"
              yAxisId="right"
            />
          </>
        </ComposedChart>
      </StyledGraphic>
    </ContentGraphic>
  )
}

export default Graphic
