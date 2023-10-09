import React from 'react'
import Loadable from 'react-loadable'
import { Route, Routes } from 'react-router-dom'

import { useAuth0 } from '@auth0/auth0-react'

import Loading from '../common/components/Loading'
import RedirectBack from '../road/components/RedirectBack'
import RedirectLogout from '../road/components/RedirectLogout'
import { EnterpriseContextProvider } from '../road/contexts/EnterprisesContext'
// import { AuthenticationGuard } from './AuthenticationGuard'

export const App = () => {
  // const { isLoading } = useAuth0()

  // if (isLoading) {
  //   return <Loading />
  // }

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

  const AsyncControlUserForm = Loadable({
    loader: () => import('../backoffice/pages/registerControlUser'),
    loading: () => <Loading />
  })

  const AsyncBackofficeList = Loadable({
    loader: () => import('../backoffice/pages/list'),
    loading: () => <Loading />
  })
  const AsyncAllListDiarios = Loadable({
    loader: () => import('../alllists/pages/DiariosList'),
    loading: () => <Loading />
  })
  const AsyncAllListOrgs = Loadable({
    loader: () => import('../alllists/pages/OrganizacoesList'),
    loading: () => <Loading />
  })
  const AsyncAllListEmp = Loadable({
    loader: () => import('../alllists/pages/EmpreedimentosList'),
    loading: () => <Loading />
  })

  // const AsyncBackofficeRegister = Loadable({
  //   loader: () => import('../backoffice/pages/registerUser'),
  //   loading: () => <Loading />
  // })

  return (
    <Routes>
      {/* <Route path="/" element={<AsyncHome />} /> */}
      {/* <Route
      path="/"
      element={
        <EnterpriseContextProvider>
          <AuthenticationGuard component={AsyncRoad} />
        </EnterpriseContextProvider>
      }
    /> */}
      <Route
        path="/"
        element={
          <EnterpriseContextProvider>
            <AsyncRoad />
          </EnterpriseContextProvider>
        }
      />
      <Route path="/backoffice" element={<AsyncBackofficeList />} />
      <Route path="/alllists/diarios" element={<AsyncAllListDiarios />} />
      <Route path="/alllists/orgs" element={<AsyncAllListOrgs />} />
      <Route path="/alllists/emp" element={<AsyncAllListEmp />} />
      {/* <Route
        path="/backoffice/user/register"
        element={<AsyncBackofficeRegister />}
      /> */}
      <Route path="/hospital/dash" element={<AsyncHospitalDash />} />
      <Route
        path="/backoffice/control/register"
        element={<AsyncControlUserForm />}
      />
      <Route path="/auth0/back" element={<RedirectBack />} />
      <Route path="/auth0/logout" element={<RedirectLogout />} />
    </Routes>
  )
}
