import styled, { keyframes } from 'styled-components'

export const StyledProgress = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
`

export const Bar = styled.div`
  display: flex;
  min-width: 142px;
  width: 100%;
  background: #d9d9d9;
  height: 6px;
  position: relative;
`

const animateBar = (percent: number) => keyframes`
  0% {
    width: 0%;
  }
  50%{
    width: 100%
  }
  100% {
    width: ${percent}%;
  }
`

export const ColorBar = styled.div<{
  percent: number
  color: string
}>`
  position: absolute;
  height: 100%;
  top: 0;
  left: 0;
  background: ${(props) => props.color};
  animation: ${(props) => animateBar(props.percent)} 2s 1s ease-in-out forwards;
`
