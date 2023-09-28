import styled from 'styled-components'

export const ContainerSlide = styled.div<{ containerWidth: number }>`
  height: 100%;
  display: flex;
  align-items: center;
  .image-gallery {
    width: calc(${(props) => props.containerWidth}px - 80px);
    img {
      object-fit: cover;
    }
  }
  .image-gallery-left-nav,
  .image-gallery-right-nav {
    width: 30px;
    padding: 0;
    svg {
      width: 30px;
    }
  }
  .image-gallery-left-nav {
    transform: translateX(-100%) translateY(-8%);
  }
  .image-gallery-right-nav {
    transform: translateX(100%) translateY(-8%);
  }

  .image-gallery-play-button,
  .image-gallery-fullscreen-button,
  .image-gallery-slides {
    display: none;
  }
  .image-gallery-thumbnail {
    width: 95px;
  }
  .active {
    width: 145px;
  }
`
