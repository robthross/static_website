import { useState, useEffect } from 'react'

import cachios from 'cachios'

import { useAuthContext } from '../../routes/AuthContext'
import IUseAxios from '../interfaces/components/useaxios'

// const Toast = Swal.mixin({
//   toast: true,
//   position: 'top-end',
//   showConfirmButton: false,
//   timer: 5000,
//   timerProgressBar: true,
//   background: theme.colors.red.red50,
//   iconColor: theme.colors.pure.pure,
//   color: theme.colors.pure.pure,
//   didOpen: (toast) => {
//     toast.addEventListener('mouseenter', Swal.stopTimer)
//     toast.addEventListener('mouseleave', Swal.resumeTimer)
//   }
// })

export const useAxios = (axiosParams?: IUseAxios) => {
  const [data, setData] = useState(undefined)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [updateCount, setUpdateCount] = useState(0)
  const { token } = useAuthContext() ?? {}

  const fetchData = async (params: IUseAxios) => {
    try {
      const config = {
        ...params,
        ttl: 10 * 60,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      const result = await cachios.request(config)
      setData(result?.data)
    } catch (error) {
      setData(undefined)
      setError(
        'Desculpe, ocorreu um erro no servidor. Tente novamente mais tarde.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData(axiosParams)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateCount])

  // useEffect(() => {
  //   if (error) {
  //     Toast.fire({
  //       icon: 'error',
  //       title: error
  //     })
  //   }
  // }, [error])

  const refetch = () => {
    setLoading(true)
    setError('')
    setUpdateCount(updateCount + 1)
  }

  return { data, error, loading, refetch, fetchData, setError }
}
