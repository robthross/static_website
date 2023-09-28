import React, { useEffect, useRef, useState } from 'react'
import 'react-image-gallery/styles/css/image-gallery.css'
import ImageGallery from 'react-image-gallery'

import Loading from '../../../common/components/Loading'
import Text from '../../../common/components/Text'
import theme from '../../../common/styles/theme'
import { ICarousel } from '../../interfaces/components/Carousel'
import { IInspectionReport } from '../../interfaces/components/inspectionreport'
import { ContainerLoading } from './styles'

interface ExecutionType {
  key: keyof IInspectionReport
  title: string
}
type ImageList = {
  title: string
  original: string
  thumbnail: string
}[]

function Carousel({ data, initialImage }: ICarousel) {
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)

  const refGalery = useRef(null)

  const images: ImageList = []

  const executionTypes: ExecutionType[] = [
    {
      key: 'earthmovingPhoto',
      title: 'Execução Terraplanagem'
    },
    {
      key: 'pavingPhoto',
      title: 'Execução Pavimentação'
    },
    {
      key: 'drainagePhoto',
      title: 'Execução Drenagem'
    },
    {
      key: 'signalingPhoto',
      title: 'Execução Sinalização'
    }
  ]

  useEffect(() => {
    const initialItem = images.findIndex((item) => item.title === initialImage)
    setCurrentSlide(initialItem)
  }, [images, initialImage])

  executionTypes.forEach((executionType) => {
    if (data[executionType.key]) {
      images.push({
        title: executionType.title,
        original: data[executionType.key] as string,
        thumbnail: data[executionType.key] as string
      })
    }
  })

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [])

  return images.length ? (
    <>
      <Text
        text={images[currentSlide].title}
        size={theme.font.sizes.s16}
        color={theme.colors.blueWarmVivid.blueWarmVivid70}
        weight={700}
      />
      <ImageGallery
        lazyLoad
        items={images}
        ref={refGalery}
        onSlide={(index) => setCurrentSlide(index)}
        startIndex={currentSlide}
      />
      {loading && (
        <ContainerLoading>
          <Loading />
        </ContainerLoading>
      )}
    </>
  ) : (
    <></>
  )
}

export default Carousel
