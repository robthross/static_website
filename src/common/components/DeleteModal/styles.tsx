import styled, { keyframes } from 'styled-components'

import theme from '../../../common/styles/theme'

export const ContainerModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.1);
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`
const fadeIn = keyframes`
  0% {
    transform: translateY(30px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`

export const Modal = styled.div`
  width: 743px;
  height: 330px;
  background: ${theme.colors.pure.pure};
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 75px;
  box-shadow: 0px 0px 32px 0px rgba(136, 152, 170, 0.15);
  position: relative;
  opacity: 0;
  animation: ${fadeIn} 0.3s ease forwards;
`
export const ContainerButtons = styled.div`
  button {
    width: 148px;
    height: 43px;
    border-radius: 4px;
  }
  display: flex;
  gap: 20px;
`
export const CloseButton = styled.button`
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  position: absolute;
  top: 0;
  right: 0;
  font-size: 16px;
  cursor: pointer;
  background: none;
  border: none;
  transition: transform 0.5s ease-in-out;
  :hover {
    transform: rotate(180deg);
  }
`
