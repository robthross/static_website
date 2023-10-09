import React from 'react'
import ReactPlayer from 'react-player'

import { IInspectionReport } from '../../interfaces/components/inspectionreport'
import { StyledVideoPlayer } from './styles'

function VideoPlayer({ data }: { data: IInspectionReport }) {
  return (
    <StyledVideoPlayer data-testid="video-player">
      <ReactPlayer
        playing
        controls
        url={data.generalVideo}
        width="854px"
        height="480px"
      />
    </StyledVideoPlayer>
  )
}

export default VideoPlayer
