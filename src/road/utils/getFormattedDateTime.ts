export function getFormattedDateTime(): string {
  const now: Date = new Date()

  const day: string = String(now.getDate()).padStart(2, '0')
  const month: string = String(now.getMonth() + 1).padStart(2, '0') // Os meses são indexados de 0 a 11
  const year: number = now.getFullYear()
  const hours: string = String(now.getHours()).padStart(2, '0')
  const minutes: string = String(now.getMinutes()).padStart(2, '0')

  const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}`
  return formattedDateTime
}
