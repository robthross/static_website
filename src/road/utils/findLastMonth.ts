import { IGraphic } from '../interfaces/components/grapich'

export default function findLastMonth(graphic: IGraphic) {
  const filteredScurve = graphic.scurve.filter((data) => data.executedAcc !== 0)

  let formattedDate = null

  if (filteredScurve.length) {
    const lastMonth = filteredScurve.reduce((prev, current) => {
      const prevDate = new Date(prev.year, prev.month - 1)
      const currentDate = new Date(current.year, current.month - 1)
      return currentDate > prevDate ? current : prev
    })

    const { month, year } = lastMonth
    const monthNames = [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez'
    ]
    formattedDate = `${monthNames[month - 1]}/${year}`
  }

  return formattedDate
}
