export function formatDate(dateString: string) {
  function capitalizeFirstLetter(string: string) {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1)
  }

  const parts = dateString.split('/')
  const monthIndex = parseInt(parts[1], 10) - 1
  let year = parseInt(parts[2], 10)

  year += year < 100 && 2000

  const months = [
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro'
  ]

  const formattedDate = `${capitalizeFirstLetter(
    months[monthIndex]
  )} de ${year}`
  return formattedDate
}
