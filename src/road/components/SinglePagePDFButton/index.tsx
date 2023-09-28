import React, { useContext, useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'

import styled from 'styled-components'

import Button from '../../../common/components/Button'
import theme from '../../../common/styles/theme'
import { POST_REPORTS_BULK } from '../../api/api'
import { EnterpriseContext } from '../../contexts/EnterprisesContext'
import { useAxios } from '../../hooks/useAxios'
import {
  ICoordinatesData,
  IFeature
} from '../../interfaces/components/coordinates'
import SinglePagePDFPage from '../SinglePagePDFPage'
import { StyledSinglePagePDFButton } from './styles'

export const ContainerPDF = styled.div`
  width: 100%;
  top: 0;
  left: 0;
`

const SinglePagePDFButton = ({ ids }: { ids: string[] }) => {
  const { fetchData, data, error, setError } = useAxios()
  const [loading, setLoading] = useState(false)
  const { geralCoordinatesMap } = useContext(EnterpriseContext)
  const [listData, setListData] = useState([])
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    removeAfterPrint: true
  })

  function getCurrentCoordinate(
    value: number | string,
    coordinates: ICoordinatesData
  ) {
    const coordinate = coordinates?.features?.find((item) => {
      if (typeof value === 'number') {
        return +item?.properties?.ID === value
      } else if (typeof value === 'string') {
        return item?.properties?.Empreendim === value
      }
      return null
    })
    if (coordinate) {
      const coordinateObject = {
        type: 'FeatureCollection',
        features: [coordinate]
      } as ICoordinatesData
      return coordinateObject
    }
    return {
      type: '',
      features: ['']
    } as unknown as IFeature
  }

  async function handleClick() {
    setError('')
    setLoading(true)
    await fetchData({
      method: 'POST',
      url: POST_REPORTS_BULK.url, // Use directly, no need for `${}`
      headers: {
        accept: '*/*'
      },
      data: {
        ids
      }
    })
  }

  useEffect(() => {
    let myTimeOut: any
    if (listData.length > 0) {
      myTimeOut = setTimeout(() => {
        setLoading(false)
        handlePrint()
      }, 2000)
    }
    return () => {
      clearTimeout(myTimeOut)
    }
  }, [listData])

  useEffect(() => {
    if (data) {
      setListData(Object.values(data))
    }
  }, [data])

  useEffect(() => {
    if (error) {
      setLoading(false)
    }
  }, [error])

  return (
    <StyledSinglePagePDFButton>
      <div style={{ position: 'fixed', zIndex: -9000000 }}>
        <ContainerPDF ref={componentRef}>
          {listData.map((item) => (
            <SinglePagePDFPage
              key={item?.enterprise?.id}
              data={item?.enterprise}
              currentCoordinate={
                getCurrentCoordinate(
                  parseFloat(item?.enterprise?.id),
                  geralCoordinatesMap
                ) as unknown as ICoordinatesData
              }
              graphicData={item?.planning}
              actionPlansData={item?.actionPlans}
              inspectionReportsData={item?.inspections}
            />
          ))}
        </ContainerPDF>
      </div>
      <Button
        text={loading ? 'Carregando...' : 'Exportar PDF'}
        color={theme.colors.pure.pure100}
        background={theme.colors.gray.default}
        onClick={handleClick}
        disabled={!ids?.length}
      />
    </StyledSinglePagePDFButton>
  )
}

export default SinglePagePDFButton
