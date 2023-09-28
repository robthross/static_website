import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Loading from '../../../common/components/Loading'

function RedirectLogout() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/')
  }, [navigate])

  return <Loading initial />
}

export default RedirectLogout
