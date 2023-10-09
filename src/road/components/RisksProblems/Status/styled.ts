import styled from 'styled-components'

export const StyledStatus = styled.div<{ background: string }>`
  min-width: 62px;
  height: 28px;
  display: flex;
  align-self: flex-start;
  padding: 0 10px;
  justify-content: center;
  background: ${(props) => props.background};
`
