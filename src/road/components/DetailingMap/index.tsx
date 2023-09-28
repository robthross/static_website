/* eslint-disable import-helpers/order-imports */
import React, { useCallback, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet'
import { ButtonZoom, StyledDetailingMap } from './styles'
import { GeoJsonObject } from 'geojson'
import { LatLngBoundsExpression } from 'leaflet'
import { IDetailingMap } from '../../interfaces/components/DetailingMap'
import * as turf from '@turf/turf'
import Text from '../../../common/components/Text'
import theme from '../../../common/styles/theme'
import { IFeature } from '../../interfaces/components/coordinates'

function DetailingMap({ coordinatesJson }: IDetailingMap) {
  const [scrollZoomEnabled, setScrollZoomEnabled] = useState(false)

  const mapRef = useRef(null)

  // Define os limites geográficos dos dados do GeoJSON
  const calcBound = useCallback(() => {
    const listCoords: any = []
    coordinatesJson?.features?.forEach((item: IFeature) => {
      if (item?.geometry?.type === 'MultiLineString') {
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

  const toggleScrollZoom = () => {
    mapRef?.current?.scrollWheelZoom?.enabled()
      ? mapRef?.current?.scrollWheelZoom?.disable()
      : mapRef?.current?.scrollWheelZoom?.enable()
    setScrollZoomEnabled(!scrollZoomEnabled)
  }

  return (
    <StyledDetailingMap>
      <MapContainer
        ref={mapRef}
        style={{ height: '100%', width: '100%' }}
        zoom={6}
        scrollWheelZoom={false}
        bounds={calcBound() as LatLngBoundsExpression}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidmljdG9ybWF5YSIsImEiOiJjbGZ3cWNlODYwZXhwM3JvNXQybjNxcGFiIn0.LhvsVGBHtfWJr-NHkIvSSA`}
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        />
        <GeoJSON
          data={coordinatesJson as GeoJsonObject}
          style={{ color: 'red' }}
        />
      </MapContainer>
      <ButtonZoom
        className="button-zoom"
        data-testid="button-zoom"
        onClick={toggleScrollZoom}
      >
        <Text
          text={`${!scrollZoomEnabled ? 'Ativar' : 'Desativar'} zoom`}
          size={theme.font.sizes.s14}
          color={theme.colors.pure.pure100}
          weight={theme.font.w400}
        />
      </ButtonZoom>
    </StyledDetailingMap>
  )
}

export default DetailingMap
