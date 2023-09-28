import { getKmPercent } from '../../utils/getKmPercent'

describe('getKmPercent', () => {
  it('should calculate the percentage correctly when total mileage is greater than 0', () => {
    const kmItem = '3000 km'
    const mileage = '6000 km'

    const result = getKmPercent(kmItem, mileage)

    expect(result).toBe('50.00')
  })

  it('should return 0 when total mileage is 0', () => {
    const kmItem = '3213.6 km'
    const mileage = '0'

    const result = getKmPercent(kmItem, mileage)

    expect(result).toBe(0)
  })
})
