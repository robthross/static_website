export function convertKmToNumber(currentString: string) {
  const newNumber = currentString?.slice(0, currentString.length - 3)
  return newNumber || 0
}
