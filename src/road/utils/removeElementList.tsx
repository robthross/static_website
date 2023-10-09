export default function removeElementList<T>(list: T[], element: T): T[] {
  const index = list.indexOf(element)
  if (index !== -1) {
    list.splice(index, 1)
  }
  return list
}
