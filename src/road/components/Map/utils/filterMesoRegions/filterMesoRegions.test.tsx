import filterMesoRegions from '.'
import {
  ICoordinatesData,
  IFeatures
} from '../../../../interfaces/components/coordinates'

const mockMesoRegionsData = {
  type: 'FeatureCollection',
  features: [
    { properties: { nm_meso: 'Meso 1' } },
    { properties: { nm_meso: 'Meso 2' } },
    { properties: { nm_meso: 'Meso 3' } }
  ]
}

describe('filterMesoRegions function', () => {
  it('should return the original mesoregionsData if enterprisesQueries.mesoRegion is not provided', () => {
    const enterprisesQueries = {}
    const result = filterMesoRegions(
      enterprisesQueries,
      mockMesoRegionsData as ICoordinatesData
    )

    expect(result).toBe(mockMesoRegionsData)
  })

  it('should return mesoregionsData with filtered features when enterprisesQueries.mesoRegion is provided and matches', () => {
    const enterprisesQueries = { mesoRegion: 'Meso 1' }
    const result = filterMesoRegions(
      enterprisesQueries,
      mockMesoRegionsData as ICoordinatesData
    )

    expect(result.features).toHaveLength(1)
    expect(result.features[0].properties.nm_meso).toBe('Meso 1')
  })

  it('should return mesoregionsData when enterprisesQueries.mesoRegion is provided but does not match', () => {
    const enterprisesQueries = { mesoRegion: 'Non-existing Meso' }
    const result = filterMesoRegions(
      enterprisesQueries,
      mockMesoRegionsData as ICoordinatesData
    )

    expect(result).toBe(mockMesoRegionsData)
  })

  it('should handle special characters and case insensitivity in queries', () => {
    const enterprisesQueries = { mesoRegion: 'meS_o 2@' }
    const result = filterMesoRegions(
      enterprisesQueries,
      mockMesoRegionsData as ICoordinatesData
    )

    expect(result.features).toHaveLength(1)
    expect(result.features[0].properties.nm_meso).toBe('Meso 2')
  })

  it('should handle empty mesoregionsData', () => {
    const enterprisesQueries = { mesoRegion: 'Meso 1' }
    const emptyMesoRegionsData = {
      type: 'FeatureCollection',
      features: [] as IFeatures
    }
    const result = filterMesoRegions(enterprisesQueries, emptyMesoRegionsData)

    expect(result.features).toHaveLength(0)
  })

  it('should return mesoregionsData with no filters if no matches', () => {
    const enterprisesQueries = { mesoRegion: 'Meso 99' }
    const result = filterMesoRegions(
      enterprisesQueries,
      mockMesoRegionsData as ICoordinatesData
    )

    expect(result).toBe(mockMesoRegionsData)
  })
})
