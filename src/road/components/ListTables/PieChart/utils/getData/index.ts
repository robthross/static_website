import { IEnterpriseData } from '../../../../../interfaces/components/enterprises'

type ICurrentData = {
  title: string
  value: number
  color: string
  status: string
}[]

export const getData = (
  currentData: ICurrentData,
  enterpriseData: IEnterpriseData,
  color: string
) => {
  if (
    currentData[0].value === 0 &&
    currentData[1].value === 0 &&
    currentData[2].value === 0
  ) {
    return [
      {
        title: `Sem dados`,
        status: 'Sem dados',
        value:
          enterpriseData?.total -
            (enterpriseData?.greenLight +
              enterpriseData?.yellowLight +
              enterpriseData?.redLight) || 0,
        color
      }
    ]
  } else {
    return currentData
  }
}
