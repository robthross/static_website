import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Loading from '../../../common/components/Loading'
import { useAuthContext } from '../../../routes/AuthContext'

function RedirectBack() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthContext()
  const [redirected, setRedirected] = useState(false)

  useEffect(() => {
    if (isAuthenticated && !redirected) {
      const returnTo = localStorage.getItem('returnTo') || '/'
      navigate(returnTo)
      setRedirected(true)
    }
  }, [isAuthenticated, navigate, redirected])

  return <Loading initial />
}

export default RedirectBack
