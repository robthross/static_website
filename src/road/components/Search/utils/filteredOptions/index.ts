import { IEnterpriseData } from '../../../../interfaces/components/enterprises'

export function filteredOptions(
  initialEnterprises: IEnterpriseData,
  name: string,
  setFilteredList: React.Dispatch<any>
) {
  const idList =
    initialEnterprises?.enterprises?.filter((item) => {
      const isIdMatch = item?.id?.toLowerCase().includes(name?.toLowerCase())
      return isIdMatch
    }) || []

  const nameList =
    initialEnterprises?.enterprises?.filter((item) => {
      const isNameMatch = item?.name
        ?.toLowerCase()
        .includes(name?.toLowerCase())
      return isNameMatch
    }) || []

  const combinedList = Array.from(new Set([...idList, ...nameList]))

  setFilteredList(combinedList)
}
