import { ICoordinatesData } from '../../../../interfaces/components/coordinates'

export default function filterMesoRegions(
  enterprisesQueries: {
    [key: string]: string
  },
  mesoregionsData: ICoordinatesData
) {
  if (enterprisesQueries?.mesoRegion) {
    const selecteds = mesoregionsData.features.filter((item) => {
      return enterprisesQueries?.mesoRegion
        .toUpperCase()
        .replace(/[^a-z0-9]/gi, '')
        .includes(
          item?.properties?.nm_meso?.toUpperCase()?.replace(/[^a-z0-9]/gi, '')
        )
    })
    const newObject = {
      type: 'FeatureCollection',
      features: selecteds
    }
    if (selecteds.length) {
      return newObject
    } else {
      return mesoregionsData
    }
  } else {
    return mesoregionsData
  }
}
