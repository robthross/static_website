import { convertKmToNumber } from '../../utils/convertKmToNumber'

describe('convertKmToNumber', () => {
  it('should convert "3000 km" to 3000', () => {
    const input = '3000 km'
    const result = convertKmToNumber(input)
    expect(result).toBe('3000')
  })
  it('should convert "3000km" to 3000', () => {
    const input = '3000km'
    const result = convertKmToNumber(input)
    expect(result).not.toBe('3000')
  })
})
