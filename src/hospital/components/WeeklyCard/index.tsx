import React, { useEffect, useRef, useState } from 'react'

import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ComposedChart
} from 'recharts'

import DashCard from '../DashCard'

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: -2400,
    amt: 2400
  },
  {
    name: 'Page B',
    uv: 4000,
    pv: -2400,
    amt: 2400
  },
  {
    name: 'Page C',
    uv: 4000,
    pv: -2400,
    amt: 2400
  },
  {
    name: 'Page D',
    uv: 4000,
    pv: -2400,
    amt: 2400
  },
  {
    name: 'Page E',
    uv: 4000,
    pv: -2400,
    amt: 2400
  },
  {
    name: 'Page F',
    uv: 4000,
    pv: -2400,
    amt: 2400
  },
  {
    name: 'Page G',
    uv: 4000,
    pv: -2400,
    amt: 1400
  }
]

function WeeklyCard() {
  const containerRef = useRef(null)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (containerRef.current) {
      const elementWidth = containerRef.current.offsetWidth
      setWidth(() => elementWidth)
      const elementHeight = containerRef.current.offsetHeight
      setHeight(() => elementHeight)
    }
  }, [])

  return (
    <DashCard
      reference={containerRef}
      width="100%"
      height="35%"
      minHeight="240px"
      title="Quadro efetivo semanal"
    >
      <ComposedChart
        width={width - 20}
        height={height - 60}
        data={data}
        stackOffset="sign"
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <ReferenceLine y={50} stroke="#000" />
        <Bar dataKey="pv" fill="#91ABF0" stackId="stack" />
        <Bar dataKey="uv" fill="#300A9E" stackId="stack" />
      </ComposedChart>
    </DashCard>
  )
}

export default WeeklyCard
