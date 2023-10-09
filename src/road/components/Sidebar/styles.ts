import styled from 'styled-components'

export const StyledSidebar = styled.div`
  min-width: 182px;
  width: 100%;
  height: 100%;
  background: #0c326f;
  display: flex;
  position: relative;
  flex-direction: column;
  overflow-y: auto;
  @media (max-width: 929px) {
    min-width: initial;
  }
`

export const ContainerButtons = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: auto;
  @media (max-width: 929px) {
    padding: 0.5rem;
  }
`
export const LeftButtons = styled.div`
  display: flex;
  gap: 15px;
`
export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
  padding: 23px 0;
  position: relative;
  img {
    width: 60px;
  }
  @media (max-width: 929px) {
    padding: 0.5rem;
  }
`
export const PoweredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 80px;
  img {
    width: 100px;
  }
  @media (max-width: 929px) {
    padding: 0.5rem;
  }
`
