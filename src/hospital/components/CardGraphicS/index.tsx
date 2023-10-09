import React, { useEffect, useRef, useState } from 'react'

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts'

import DashCard from '../DashCard'
function CardGraphicS() {
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100
    }
  ]

  const containerRef = useRef(null)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (containerRef.current) {
      const elementWidth = containerRef.current.offsetWidth
      const elementHeight = containerRef.current.offsetHeight
      setWidth(() => elementWidth)
      setHeight(() => elementHeight)
    }
  }, [])

  return (
    <DashCard
      reference={containerRef}
      width="100%"
      height="50%"
      minHeight="350px"
      title="Curva S"
    >
      <ComposedChart
        width={width - 20}
        height={height - 60}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
        <Bar dataKey="pv" fill="#39A5F2" />
        <Bar dataKey="uv" fill="#0C326F" />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={2} />
      </ComposedChart>
    </DashCard>
  )
}

export default CardGraphicS
