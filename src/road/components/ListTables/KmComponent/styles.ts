import styled from 'styled-components'

export const StyledKmComponent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  gap: 20px;
  @media (max-width: 1225px) {
    gap: 0px;
  }
`

export const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
  @media (max-width: 1225px) {
    align-items: flex-end;
    width: 100%;
    gap: 0.5px;
    flex-direction: column;
  }
`

export const ContainerTexts = styled.div`
  display: flex;
  > p {
    width: 80px;
    @media (max-width: 1225px) {
      text-align: end;
    }
  }
`
export const StatusBar = styled.div`
  width: 100%;
  p {
    margin-bottom: 12px;
  }
`
