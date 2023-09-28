import React from 'react'
import Loadable from 'react-loadable'
import { Route, Routes } from 'react-router-dom'

import Loading from '../common/components/Loading'
import RedirectBack from '../road/components/RedirectBack'
import RedirectLogout from '../road/components/RedirectLogout'
import { EnterpriseContextProvider } from '../road/contexts/EnterprisesContext'

export const App = () => {
  // const AsyncHome = Loadable({
  //   loader: () => import('../home'),
  //   loading: () => <Loading />
  // })

  const AsyncRoad = Loadable({
    loader: () => import('../road'),
    loading: () => <Loading />
  })

  const AsyncHospitalDash = Loadable({
    loader: () => import('../hospital/pages/dash'),
    loading: () => <Loading />
  })

  // const AsyncBackofficeList = Loadable({
  //   loader: () => import('../backoffice/pages/list'),
  //   loading: () => <Loading />
  // })

  // const AsyncBackofficeRegister = Loadable({
  //   loader: () => import('../backoffice/pages/register'),
  //   loading: () => <Loading />
  // })

  return (
    <Routes>
      <Route
        path="/"
        element={
          <EnterpriseContextProvider>
            <AsyncRoad />
          </EnterpriseContextProvider>
        }
      />
      {/* <Route path="/backoffice" element={<AsyncBackofficeList />} /> */}
      {/* <Route
        path="/backoffice/register"
        element={<AsyncBackofficeRegister />}
      /> */}
      <Route path="/hospital/dash" element={<AsyncHospitalDash />} />
      <Route path="/auth0/back" element={<RedirectBack />} />
      <Route path="/auth0/logout" element={<RedirectLogout />} />
    </Routes>
  )
}
