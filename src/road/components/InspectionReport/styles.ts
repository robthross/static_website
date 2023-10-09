/* eslint-disable */
import styled from 'styled-components'
import theme from '../../../common/styles/theme'
import { IoImagesOutline } from 'react-icons/io5'
import { IoDocumentTextOutline } from 'react-icons/io5'
import { IoWarningOutline } from 'react-icons/io5'
import { MdOndemandVideo } from 'react-icons/md'

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin-bottom: 3rem;
`

export const Card = styled.div<{ isFirstCard?: boolean }>`
  display: flex;
  padding: 20px;
  margin-top: 15px;
  width: 100%;
  border-radius: 10px;
  background-color: ${(props) =>
    props.isFirstCard ? `${theme.colors.blue.blueLight}` : `white`};
  border: ${(props) =>
    props.isFirstCard
      ? `1px solid ${theme.colors.blue.blueLight}`
      : `1px solid ${theme.colors.gray.darkgray}`};
  box-shadow: 3px 5px 2px rgba(0, 0, 0, 0.2);
  max-height: 200px;
  @media (max-width: 929px) {
    flex-direction: column;
    max-height: initial;
    height: auto;
  }
`

export const ContainerTitle = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Column = styled.div`
  display: flex;
  width: 25%;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: auto;
  border-right: 1px solid ${theme.colors.gray.darkgray};
  @media (max-width: 929px) {
    width: 100%;
    border: none;
  }
`

export const LastColumn = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: flex-start;
  overflow-y: auto;
  overflow-x: auto;
`

export const Info = styled.div`
  height: 50px;
  padding: 15px;
  @media (max-width: 929px) {
    height: auto;
  }
`

export const InfoText = styled.div`
  padding: 10px;
`

export const InfoIcons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  height: 100%;
`

export const ButtonOpenModal = styled.button`
  padding: 0px;
  margin-left: 5px;
  border: none;
  cursor: pointer;
  background: none;
  :hover {
    transform: scale(1.1);
    transition: 0.1s ease-out;
  }
`

export const ProgressBarContainer = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
`
export const ContentModalInspectionReport = styled.div`
 display: contents;
`

export const ItemProgress = styled.div`
  margin-right: 10px;
  width: 100%;
`

export const IconTitle = styled.div`
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const GalleryIcon = styled(IoImagesOutline)<{
  disabled?: boolean | string
}>`
  width: 25px;
  height: 25px;
  color: ${theme.colors.blue.blue50};
  padding: 3px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`
export const CommentIcon = styled(IoDocumentTextOutline)<{
  disabled?: boolean | string
}>`
  width: 45px;
  height: 45px;
  color: ${theme.colors.blue.blue50};
  padding: 3px;
  margin: auto;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  cursor: pointer;
`

export const WarningIcon = styled(IoWarningOutline)<{
  disabled?: boolean | string
}>`
  width: 45px;
  height: 45px;
  color: ${theme.colors.blue.blue50};
  padding: 3px;
  margin: auto;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  cursor: pointer;
`

export const VideoIcon = styled(MdOndemandVideo)<{
  disabled?: boolean | string
}>`
  width: 45px;
  height: 45px;
  color: ${theme.colors.blue.blue50};
  padding: 3px;
  margin: auto;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  cursor: pointer;
`
