import React, {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import * as turf from '@turf/turf'

import Loading from '../common/components/Loading'
import {
  AppContainer,
  CenterContainer,
  LeftContainer,
  RightContainer
} from '../common/styles/pages/StylesApp'
import { GET_FILTERS } from './api/api'
import DetailsRisksContainer from './components/DetailsRisksContainer'
import ListTables from './components/ListTables'
import Map from './components/Map'
import Search from './components/Search'
import Sidebar from './components/Sidebar'
import { EnterpriseContext } from './contexts/EnterprisesContext'
import { useAxios } from './hooks/useAxios'
import { ICoordinatesData, IFeature } from './interfaces/components/coordinates'
import { IEnterpriseData } from './interfaces/components/enterprises'

function Home() {
  const [initialLoading, setInitialLoading] = useState(true)

  const {
    initialEnterprises,
    enterpriseData,
    enterpriseLoading,
    loadingMap,
    coordinatesFiltered,
    setEnterprisesQueries,
    geralCoordinatesMap,
    enterprisesQueries,
    detailsAndRisksOpened,
    setDetailsAndRisksOpened,
    toClean,
    getCurrentCoordinate,
    getCurrentEnterprise,
    handleChange,
    currentCoordinate,
    currentEnterprise
  }: {
    initialEnterprises: IEnterpriseData | null
    currentCoordinate: any
    currentEnterprise: any
    handleChange: (type: string, value: number | string) => void
    getCurrentCoordinate: (
      value: number | string,
      coordinates: ICoordinatesData
    ) => IFeature
    getCurrentEnterprise: (
      initialData: IEnterpriseData | null,
      value: number | string
    ) => void
    enterpriseData: IEnterpriseData
    enterpriseLoading: boolean
    loadingMap: boolean
    coordinatesFiltered: ICoordinatesData
    toClean: MouseEventHandler<HTMLButtonElement>
    setEnterprisesQueries: Dispatch<
      SetStateAction<{ [key: string]: string | number }>
    >
    enterprisesQueries: { [key: string]: string }
    geralCoordinatesMap: ICoordinatesData
    detailsAndRisksOpened: boolean
    setDetailsAndRisksOpened: Dispatch<SetStateAction<boolean>>
  } = useContext(EnterpriseContext)

  // esse objeto vai enviar para o search tudo q preciso para abrir o detalhamento do empreendimento ao escolher direto da busca.
  const HandleGeoJSONClickData = {
    setDetailsAndRisksOpened,
    getCurrentCoordinate,
    getCurrentEnterprise
  }

  function handleGeoJSONClick(event: { layer: { feature: IFeature } }) {
    setDetailsAndRisksOpened(false)
    const id = event?.layer?.feature?.properties.ID

    getCurrentCoordinate(id, coordinatesFiltered)
    getCurrentEnterprise(initialEnterprises, id)
    setEnterprisesQueries({
      id: event?.layer?.feature?.properties?.ID.toFixed(1).toString()
    })
    setTimeout(() => {
      setDetailsAndRisksOpened(true)
    }, 500)
  }

  const { data: sideBarData, loading: sideBarLoading } = useAxios({
    method: 'GET',
    url: GET_FILTERS.url,
    headers: {
      // no need to stringify
      accept: '*/*'
    }
  })

  // para o sidebar
  const [currentTypeSidebar, setCurrentTypeSidebar] = useState('')

  function handleClickSidebar(type: string) {
    if (currentTypeSidebar === type) {
      setCurrentTypeSidebar('')
    } else {
      setCurrentTypeSidebar(type)
    }
  }

  // manipula o initialLoading
  useEffect(() => {
    if (!sideBarLoading && !loadingMap && !enterpriseLoading) {
      setInitialLoading(false)
    }
  }, [enterpriseLoading, loadingMap, sideBarLoading])

  const centerMap = useMemo(() => {
    if (geralCoordinatesMap) {
      const calculated = turf.center(geralCoordinatesMap as turf.AllGeoJSON)
      return calculated?.geometry?.coordinates?.reverse()
    }
  }, [geralCoordinatesMap])

  return initialLoading ? (
    <Loading initial />
  ) : (
    <>
      <AppContainer>
        <LeftContainer>
          <Sidebar
            data-testid="test-sidebar"
            data={sideBarData}
            isLoading={!initialLoading && sideBarLoading}
            handleClick={handleClickSidebar}
            currentType={currentTypeSidebar}
            handleChange={handleChange}
            toClean={toClean}
          />
        </LeftContainer>
        <CenterContainer>
          <Search searchHandleGeoJSONClickData={HandleGeoJSONClickData} />
          {geralCoordinatesMap && (
            <Map
              initialCoordinates={geralCoordinatesMap}
              loading={!initialLoading && loadingMap}
              coordinatesJson={coordinatesFiltered}
              handleGeoJSONClick={handleGeoJSONClick}
              center={centerMap}
              enterprisesQueries={enterprisesQueries}
            />
          )}
        </CenterContainer>
        <RightContainer>
          <ListTables
            enterpriseData={enterpriseData}
            loading={!initialLoading && enterpriseLoading}
          />
        </RightContainer>
      </AppContainer>

      {detailsAndRisksOpened && (
        <DetailsRisksContainer
          currentEnterprise={currentEnterprise}
          currentCoordinate={currentCoordinate}
        />
      )}
    </>
  )
}

export default Home
