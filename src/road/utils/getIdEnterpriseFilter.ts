export function getIdEnterpriseFilter(text: string) {
  const index = text.indexOf('-')
  if (index !== -1) {
    return text.slice(0, index).trim()
  }
  return text
}
