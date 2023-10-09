import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider } from 'styled-components'

import GlobalStyles from './common/styles/global'
import theme from './common/styles/theme'
import { App } from './routes'
import { AuthContextProvider } from './routes/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const domain = process.env.REACT_APP_AUTH0_DOMAIN
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID

root.render(
  <React.StrictMode>
    {domain && clientId ? (
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </ThemeProvider>
        <GlobalStyles />
      </BrowserRouter>
    ) : (
      <div>
        Erro de configuração do Auth0. Verifique as variáveis de ambiente.
      </div>
    )}
  </React.StrictMode>
)
