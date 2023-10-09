import styled from 'styled-components'

import theme from '../../../common/styles/theme'

export const StyledModal = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.75);
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  z-index: 100000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`
export const ContentModal = styled.div<{ transparent?: boolean }>`
  background: ${(props) =>
    props.transparent ? 'rgba(0, 0, 0, 0.0)' : theme.colors.pure.pure};
  padding: 2rem;
  width: 60%;
  border-radius: ${theme.border.radius10};
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: ${(props) =>
    !props.transparent &&
    '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)'};
  p {
    align-self: flex-start;
    margin-bottom: 12px;
  }
  .image-gallery-image {
    max-height: 300px !important;
  }
  .image-gallery-thumbnail-image {
    max-height: 100px !important;
  }
  .fullscreen .image-gallery-image {
    max-height: calc(100vh - 80px) !important;
  }
  .fullscreen .image-gallery-thumbnail-image {
    max-height: calc(100vh - 80px) !important;
  }
  margin: 1rem;
  @media (max-height: 570px) {
    transform: scale(0.8);
  }
  @media (max-height: 440px) {
    transform: scale(0.6);
  }
`
export const ButtonClose = styled.button<{ transparent?: boolean }>`
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 0;
  cursor: pointer;
  z-index: 10000000;
  background: none;
  width: ${(props) => (props.transparent ? '100px' : '40px')};
  height: ${(props) => (props.transparent ? '100px' : '40px')};
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  transition: all 0.3s ease-in-out;
  :hover {
    transform: rotate(90deg);
  }
  > svg {
    width: ${(props) => (props.transparent ? '60px' : '2rem')};
    height: ${(props) => (props.transparent ? '60px' : '2rem')};
    fill: ${(props) =>
      props.transparent
        ? theme.colors.pure.pure
        : theme.colors.blueWarmVivid.blueWarmVivid80};
  }
`
