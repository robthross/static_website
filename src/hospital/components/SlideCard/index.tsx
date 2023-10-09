import React, { useEffect, useRef, useState } from 'react'
import ImageGallery from 'react-image-gallery'

import DashCard from '../DashCard'
import { ContainerSlide } from './styles'
import 'react-image-gallery/styles/css/image-gallery.css'

function SlideCard() {
  const images = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/'
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/'
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/'
    },
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/'
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/'
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/'
    },
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/'
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/'
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/'
    },
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/'
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/'
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/'
    }
  ]

  const containerRef = useRef(null)

  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (containerRef.current) {
      const elementWidth = containerRef.current.offsetWidth
      setWidth(() => elementWidth)
    }
  }, [])

  return (
    <DashCard
      reference={containerRef}
      width="100%"
      height="25%"
      minHeight="170px"
      title="Fotos"
    >
      <ContainerSlide containerWidth={width}>
        <ImageGallery lazyLoad items={images} />
      </ContainerSlide>
    </DashCard>
  )
}

export default SlideCard
