import React from 'react'

import { IInspectionReport } from '../../../interfaces/components/inspectionreport'
import { IModalTypes } from '../../../interfaces/components/ModalTypes'
import Carousel from '../../Carousel'
import InspectionReportComments from '../../InspectionReportComments'
import VideoPlayer from '../../VideoPlayer'
import { ContentModalInspectionReport } from '../styles'

function ContentModal({
  type,
  currentData,
  initialImageCarousel,
  openedModal,
  currentModalText
}: {
  type: IModalTypes
  currentData: IInspectionReport
  initialImageCarousel: string
  openedModal: IModalTypes
  currentModalText: string
}) {
  if (type === 'image') {
    return (
      <ContentModalInspectionReport data-testid="carousel-component">
        <Carousel data={currentData} initialImage={initialImageCarousel} />
      </ContentModalInspectionReport>
    )
  }
  if (type === 'comments' || type === 'risks') {
    return (
      <ContentModalInspectionReport data-testid="InspectionReportComments">
        <InspectionReportComments
          type={openedModal}
          content={currentModalText}
        />
      </ContentModalInspectionReport>
    )
  }
  if (type === 'video') {
    return (
      <ContentModalInspectionReport data-testid="videoplayer">
        <VideoPlayer data={currentData} />
      </ContentModalInspectionReport>
    )
  }
  return null
}

export default ContentModal
