import styled from 'styled-components'

export const ContainerDash = styled.div`
  padding: 2rem;
  width: 100%;
  display: flex;
  gap: 20px;
  min-height: 794px;
`

export const ContainerCol = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  height: 87vh;
  min-height: 730px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const ContainerFlexCards = styled.div<{ height: string }>`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  height: ${(props) => props.height};
`
