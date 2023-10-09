import { convertKmToNumber } from './convertKmToNumber'

export function getKmPercent(kmItem: string, mileage: string) {
  const kmItemNumber = convertKmToNumber(kmItem)
  const totalNumber = convertKmToNumber(mileage)

  if (+totalNumber > 0) {
    const percent = (+kmItemNumber * 100) / +totalNumber
    return percent.toFixed(2)
  }
  return 0
}
