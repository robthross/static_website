/* eslint-disable import-helpers/order-imports */
import React, { useCallback, useEffect, useRef, useState } from 'react'

import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import * as turf from '@turf/turf'

import { GeoJsonObject } from 'geojson'
import L, { LatLngBoundsExpression } from 'leaflet'

import {
  ICoordinatesData,
  ILayer,
  IMesoName
} from '../../interfaces/components/coordinates'
import { IMap } from '../../interfaces/components/Map'
import theme from '../../../common/styles/theme'
import mesoregionsColors, { citiesColors } from '../../utils/mesoregionsColors'
import Text from '../../../common/components/Text'
import { ButtonZoom, FullScreenButton, LimitsButton, StyledMap } from './styles'

import { BsArrowsFullscreen } from 'react-icons/bs'
import { handleFullscreen } from './utils/handleFullscreen'
import { toggleScrollZoom } from './utils/toggleScrollZoom'
import filterMesoRegions from './utils/filterMesoRegions'
import Loading from '../../../common/components/Loading'

/**
 * O componente Map recebe um objeto GeoJSON contendo as coordenadas geográficas a serem exibidas.
 * param {GeoJsonObject} coordinatesJson - Objeto GeoJSON contendo as coordenadas geográficas a serem exibidas.
 */
function Map({
  coordinatesJson,
  handleGeoJSONClick,
  loading,
  enterprisesQueries,
  initialCoordinates
}: IMap) {
  const [mesoregionsData, setMesoregionsData] = useState<ICoordinatesData>()
  const [citiesData, setCitiesData] = useState<ICoordinatesData>()
  const [currentLimits, setCurrentLimits] = useState<'meso' | 'cities'>('meso')
  const [scrollZoomEnabled, setScrollZoomEnabled] = useState(false)
  const mapRef = useRef(null)

  useEffect(() => {
    const loadData = (dataKey: string) => {
      const url = `${process.env.PUBLIC_URL}/GeoJsons/${dataKey}.json`

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Network response was not ok for ${dataKey}.json`)
          }
          return response.json()
        })
        .then((data) => {
          if (dataKey === 'mesoregioes') {
            setMesoregionsData(data as unknown as ICoordinatesData)
          } else {
            setCitiesData(data as unknown as ICoordinatesData)
          }
        })
        .catch((error) => {
          console.error(`Error loading ${dataKey} data:`, error)
        })
    }

    if (currentLimits === 'meso') {
      !mesoregionsData && loadData('mesoregioes')
    } else {
      !citiesData && loadData('cities')
    }
  }, [currentLimits])

  const enterprisesStyle = {
    color: 'red',
    weight: 3
  }

  useEffect(() => {
    if (!mapRef.current || !coordinatesJson?.features) {
      return
    }

    currentLimits === 'meso' &&
      L.geoJSON(
        filterMesoRegions(enterprisesQueries, mesoregionsData) as
          | GeoJsonObject
          | GeoJsonObject[],
        {
          style: function (feature) {
            const name = feature?.properties?.nm_meso as IMesoName
            return {
              fillColor: mesoregionsColors[name],
              weight: 2,
              opacity: 0.7,
              color: mesoregionsColors[name],
              dashArray: '5',
              fillOpacity: 0.3
            }
          }
        }
      ).addTo(mapRef.current)

    currentLimits === 'cities' &&
      L.geoJSON(citiesData as GeoJsonObject | GeoJsonObject[], {
        style: function (feature) {
          // pega o idText, transforma em string, e depois pega o primeiro valor pra virar o indice da cor
          const indexColor = parseInt(feature.properties.CD_MUN.toString()[6])

          return {
            fillColor: citiesColors[indexColor],
            weight: 1,
            opacity: 0.7,
            color: citiesColors[indexColor],
            dashArray: '1',
            fillOpacity: 0.3
          }
        },
        onEachFeature: function (feature, layer) {
          const cityName = feature.properties.NM_MUN
          layer.bindTooltip(cityName, { className: 'tooltip' })
        }
      }).addTo(mapRef.current)

    const pointsLayer = L.geoJSON(
      coordinatesJson as GeoJsonObject | GeoJsonObject[],
      {
        style: enterprisesStyle
      }
    ).addTo(mapRef.current)

    pointsLayer.on('click', handleGeoJSONClick)

    pointsLayer.eachLayer(function (layer) {
      if (layer instanceof L.Path) {
        const layerId = L.stamp(layer)
        layer.getElement().setAttribute('data-testid', `${layerId}`)
      }
    })
    pointsLayer.eachLayer(function (layer) {
      layer.on({
        mouseover: function (event) {
          const hoveredLayer = event.target
          hoveredLayer.setStyle({ weight: 7 })
        },
        mouseout: function (event) {
          const hoveredLayer = event.target
          hoveredLayer.setStyle({ weight: 3 })
        }
      })
      const newLayer = layer as unknown as ILayer
      if (newLayer) {
        const feature = newLayer.feature
        if (feature && feature.properties) {
          const featureText = feature.properties.Empreendim
          layer.bindTooltip(featureText, { className: 'tooltip' })
        }
      }
    })

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      mapRef?.current?.eachLayer((layer: L.Layer) => {
        if (layer instanceof L.GeoJSON) {
          layer.clearLayers()
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinatesJson, mesoregionsData, currentLimits, citiesData])

  // Define os limites geográficos dos dados do GeoJSON
  const calcBound = useCallback(() => {
    const listCoords: any = []
    initialCoordinates?.features?.forEach((item: any) => {
      if (item?.geometry.type === 'MultiLineString') {
        listCoords.push(item?.geometry?.coordinates.flat())
      } else {
        listCoords.push(item?.geometry?.coordinates)
      }
    })

    const lineString = turf.lineString(listCoords?.flat())

    const values = turf.bbox(lineString)

    const bounds = () => {
      if (values.includes(Infinity)) {
        return [
          [-22.6572865, -48.9301161],
          [-14.7501491, -40.1798554079006]
        ]
      } else {
        return [
          [values[1], values[0]],
          [values[3], values[2]]
        ]
      }
    }

    return bounds()
  }, [coordinatesJson?.features])

  if (coordinatesJson.features)
    return loading ? (
      <Loading />
    ) : (
      <StyledMap>
        <MapContainer
          ref={mapRef}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
          bounds={calcBound() as LatLngBoundsExpression}
        >
          <>
            <TileLayer
              url={`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidmljdG9ybWF5YSIsImEiOiJjbGZ3cWNlODYwZXhwM3JvNXQybjNxcGFiIn0.LhvsVGBHtfWJr-NHkIvSSA`}
              attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
            />
            <GeoJSON
              data={coordinatesJson as GeoJsonObject}
              style={{ color: 'red' }}
              onEachFeature={(feature, layer) => {
                if (feature.properties && feature.properties.Empreendim) {
                  layer.bindTooltip(feature.properties.Empreendim, {
                    className: 'tooltip'
                  })
                }
                layer.on({
                  mouseover: (event) => {
                    const layer = event.target
                    layer.setStyle({ weight: 7 })
                  },
                  mouseout: (event) => {
                    const layer = event.target
                    layer.setStyle({ weight: 3 })
                  }
                })
              }}
              eventHandlers={{
                click: handleGeoJSONClick
              }}
            />
          </>
        </MapContainer>
        <ButtonZoom
          data-testid="button-zoom"
          onClick={() =>
            toggleScrollZoom(mapRef, setScrollZoomEnabled, scrollZoomEnabled)
          }
        >
          <Text
            text={`${!scrollZoomEnabled ? 'Ativar' : 'Desativar'} zoom`}
            size={theme.font.sizes.s14}
            color={theme.colors.pure.pure100}
            weight={theme.font.w400}
          />
        </ButtonZoom>
        <FullScreenButton
          onClick={handleFullscreen}
          data-testid="full-screen-button"
        >
          <BsArrowsFullscreen />
        </FullScreenButton>
        <LimitsButton>
          <button
            data-testid="meso-button"
            onClick={() => setCurrentLimits(() => 'meso')}
            className={currentLimits === 'meso' ? 'enabled' : ''}
          >
            Mesoregião
          </button>
          <button
            data-testid="cities-button"
            onClick={() => setCurrentLimits(() => 'cities')}
            className={currentLimits === 'cities' ? 'enabled' : ''}
          >
            Municipal
          </button>
        </LimitsButton>
      </StyledMap>
    )
  else return null
}

export default Map
