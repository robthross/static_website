import React from 'react'
import { BiLogOut } from 'react-icons/bi'

import styled from 'styled-components'

import theme from '../../../common/styles/theme'

export const StyledLogoutButton = styled.button`
  display: flex;
  font-size: ${theme.font.sizes.s14};
  align-items: center;
  background: none;
  padding: 0.5rem;
  position: absolute;
  top: 0;
  right: 0;
  color: ${theme.colors.pure.pure};
  gap: 0.5rem;
  border: none;
  cursor: pointer;
  span {
    font-size: ${theme.font.sizes.s20};
    position: relative;
    top: 3px;
    transition: 0.3s ease-in-out;
  }
  :hover {
    span {
      transform: scale(1.1);
    }
  }
`

export const LogoutButton = () => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN
  const logoutUrl = process.env.REACT_APP_AUTH0_LOGOUT_URL
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID

  const handleLogout = () => {
    localStorage.clear()
    // formato: https://{yourDomain}/v2/logout?returnTo=http%3A%2F%2Fwww.example.com&client_id={clientId}
    window.location.href = `https://${domain}/v2/logout?returnTo=${logoutUrl}&client_id=${clientId}`
  }

  return (
    <>
      <StyledLogoutButton onClick={handleLogout} data-testid="logout-button">
        Sair
        <span>
          <BiLogOut />
        </span>
      </StyledLogoutButton>
    </>
  )
}
