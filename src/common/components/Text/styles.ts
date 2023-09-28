import styled from 'styled-components'

export const StyledText = styled.p<{
  size: string
  color: string
  weight: number
}>`
  font-size: ${(props) => props.size};
  color: ${(props) => props.color};
  font-weight: ${(props) => props.weight};
`
