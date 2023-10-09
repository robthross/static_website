import React, { useEffect, useMemo, useState, createContext } from 'react'

import { GET_ENTERPRISES } from '../api/api'
import { useAxios } from '../hooks/useAxios'
import {
  ICoordinatesData,
  IFeature
} from '../interfaces/components/coordinates'
import {
  IEnterprise,
  IEnterpriseData
} from '../interfaces/components/enterprises'
import { getIdEnterpriseFilter } from '../utils/getIdEnterpriseFilter'
import removeElementList from '../utils/removeElementList'
import { replaceNewlineWithSpace } from '../utils/replaceNewlineWithSpace'

function useEnterpriseContext() {
  const [coordinatesData, setCoordinatesData] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      const url = `${process.env.PUBLIC_URL}/GeoJsons/coordinates.json`

      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`Network response was not ok for coordinates.json`)
        }
        const data = await response.json()
        setCoordinatesData(data) // Definir o estado com os dados carregados
      } catch (error) {
        console.error(`Error loading coordinates data:`, error)
        setCoordinatesData(null) // Lidar com o erro definindo o estado como nulo
      }
    }

    loadData()
  }, [])
  const [enterprisesQueriesIDs, setEnterprisesQueriesIDs] = useState<string[]>(
    []
  )

  const [enterprisesQueries, setEnterprisesQueries] = useState<{
    [key: string]: string | string[] | number | number[]
  }>({})
  const [initialEnterprises, setInitialInterprises] =
    useState<IEnterpriseData | null>(null)

  const {
    data: enterpriseData,
    loading: enterpriseLoading,
    refetch: enterpriseRefetch
  } = useAxios({
    method: 'GET',
    url: GET_ENTERPRISES.url,
    params: replaceNewlineWithSpace(enterprisesQueries),
    headers: {
      // no need to stringify
      accept: '*/*'
    }
  })

  useEffect(() => {
    if (initialEnterprises === null || initialEnterprises === undefined) {
      setInitialInterprises(enterpriseData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enterpriseData])

  //  Para sidebar
  const [detailsAndRisksOpened, setDetailsAndRisksOpened] = useState(false)
  const [currentCoordinate, setCurrentCoordinate] = useState(null)
  const [currentEnterprise, setCurrentEnterprise] = useState(null)

  function toClean() {
    setEnterprisesQueries({})
    setEnterprisesQueriesIDs([])
    setDetailsAndRisksOpened(false)
    enterpriseRefetch()
  }

  function getCurrentEnterprise(
    initialData: IEnterpriseData | null,
    value: number | string
  ) {
    const enterprise = initialData?.enterprises?.find((item) => {
      if (typeof value === 'number') {
        return +item?.id === value
      } else if (typeof value === 'string') {
        return item?.name === value
      }
      return null
    })
    setCurrentEnterprise(enterprise)
  }

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
      setCurrentCoordinate(coordinateObject)
      return coordinate
    }
    setCurrentCoordinate(null)
    return {
      type: '',
      features: ['']
    } as unknown as IFeature
  }

  function handleGeoJSONClickFunction(id: number | string) {
    setDetailsAndRisksOpened(false)
    const hasCoord = getCurrentCoordinate(id, geralCoordinatesMap)
    if (hasCoord.type) {
      getCurrentEnterprise(initialEnterprises, id)
      setDetailsAndRisksOpened(true)
    }
  }

  const handleChange = (type: string, value: number | string) => {
    setDetailsAndRisksOpened(false)
    if (enterprisesQueries[type] && enterprisesQueries[type] === value) {
      const newQueries = { ...enterprisesQueries }
      delete newQueries[type]
      setEnterprisesQueries(newQueries)
    } else if (type === 'id') {
      const valueId = getIdEnterpriseFilter(value.toString())
      let newListIds = []
      if (!enterprisesQueriesIDs.includes(valueId)) {
        newListIds = [
          ...enterprisesQueriesIDs,
          getIdEnterpriseFilter(value.toString())
        ]
      } else {
        newListIds = removeElementList(enterprisesQueriesIDs, valueId)
      }
      setEnterprisesQueriesIDs(newListIds)
      setEnterprisesQueries({
        id: newListIds.join(',')
      })
      handleGeoJSONClickFunction(value)
    } else {
      setEnterprisesQueries({
        ...enterprisesQueries,
        [type]: value
      })
    }
  }

  //
  const geralCoordinatesMap = coordinatesData as unknown as ICoordinatesData

  let loadingMap = false
  const data = useMemo(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    loadingMap = true
    const list: number[] = []
    enterpriseData?.enterprises?.forEach((item: IEnterprise) => {
      list.push(+item.id)
    })

    const filtered = geralCoordinatesMap?.features?.filter((item: IFeature) => {
      const id = +item?.properties?.ID

      return list?.includes(id)
    })

    const converted = {
      type: 'FeatureCollection',
      features: filtered || []
    }
    loadingMap = false
    return {
      enterpriseData,
      enterpriseLoading,
      initialEnterprises,
      enterprisesQueries,
      setEnterprisesQueries,
      enterprisesQueriesIDs,
      setEnterprisesQueriesIDs,
      coordinatesFiltered: converted,
      geralCoordinatesMap,
      loadingMap,
      detailsAndRisksOpened,
      setDetailsAndRisksOpened,
      toClean,
      getCurrentCoordinate,
      getCurrentEnterprise,
      handleChange,
      currentCoordinate,
      currentEnterprise,
      handleGeoJSONClickFunction,
      enterpriseRefetch
    }
  }, [
    enterpriseData,
    enterpriseLoading,
    enterprisesQueries,
    geralCoordinatesMap,
    initialEnterprises,
    detailsAndRisksOpened,
    currentCoordinate,
    currentEnterprise
  ])
  return data
}

export const EnterpriseContext = createContext(null)

function EnterpriseContextProvider({
  children
}: {
  children: React.ReactNode
}) {
  const data = useEnterpriseContext()

  return (
    <EnterpriseContext.Provider value={data}>
      {children}
    </EnterpriseContext.Provider>
  )
}

export { useEnterpriseContext, EnterpriseContextProvider }
