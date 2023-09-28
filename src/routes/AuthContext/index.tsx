import React, { createContext, useContext, useEffect, useState } from 'react'

import axios from 'axios'

import Loading from '../../common/components/Loading'

const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID
const callbackURL = process.env.REACT_APP_AUTH0_CALLBACK_URL
const redirectUri = `https://${domain}/authorize?response_type=code&client_id=${clientId}&connection=Username-Password-Authentication&redirect_uri=${callbackURL}&state=tab&scope=openid%20profile%20email%20user_metadata%20app_metadata`
const tokenEndpoint = `https://${domain}/oauth/token`

interface AuthContextData {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  token: string
}

const AuthContext = createContext<AuthContextData>(null)

const searchParams = new URLSearchParams(window.location.search)

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const containsAuth0Back = location.pathname.includes('/auth0/back')
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [token, setToken] = useState<string>('')

  async function getToken() {
    const code = searchParams.get('code')
    const config = {
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret:
        'sFUbNNgF0rl3HQdWZBHuyqTr67dmPdPuyc_sgsGXpOA64l3QXswYnnwiOu0ULE3C',
      code,
      redirect_uri: window.location.origin
    }
    await axios
      .post(tokenEndpoint, config)
      .then((response) => {
        const idToken = response.data.id_token
        setIsAuthenticated(() => true)
        setToken(idToken)
        // ver depois oq fazer com o edcode dele
        // const decodedToken = jwtDecode(accessToken)
        // console.log('Token válido:', decodedToken)
      })
      .catch((error) => {
        console.error('Erro ao obter o token de acesso:', error)
      })
  }

  useEffect(() => {
    if (!containsAuth0Back) {
      if (!isAuthenticated) {
        localStorage.setItem('returnTo', window.location.pathname)
        window.location.href = redirectUri
      }
    } else {
      if (!isAuthenticated) getToken()
    }
  }, [containsAuth0Back, isAuthenticated])

  const data: AuthContextData = {
    isAuthenticated,
    setIsAuthenticated,
    token
  }

  return (
    <AuthContext.Provider value={data}>
      {isAuthenticated ? (
        <>{children}</>
      ) : (
        <>
          <Loading initial />
        </>
      )}
    </AuthContext.Provider>
  )
}

const useAuthContext = (): AuthContextData => {
  return useContext(AuthContext)
}

export { AuthContext, AuthContextProvider, useAuthContext }
