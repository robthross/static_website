import React, { useState } from 'react'

import Text from '../../../common/components/Text'
import theme from '../../../common/styles/theme'
import { IInspectionReport } from '../../interfaces/components/inspectionreport'
import { IModalTypes } from '../../interfaces/components/ModalTypes'
import Progress from '../ListTables/KmComponent/Progress'
import Modal from '../Modal'
import TableBox from '../TableBox'
import ContentModal from './ContentModal'
import {
  ButtonOpenModal,
  CardContainer,
  Card,
  Info,
  InfoIcons,
  ProgressBarContainer,
  GalleryIcon,
  CommentIcon,
  WarningIcon,
  VideoIcon,
  Column,
  LastColumn,
  InfoText,
  ContainerTitle,
  ItemProgress,
  IconTitle
} from './styles'

function InspectionReport({
  data,
  enterpriseName
}: {
  data: IInspectionReport[]
  enterpriseName: string
}) {
  const [openedModal, setOpenedModal] = useState<IModalTypes>('')
  const [initialImageCarousel, setInitialImageCarousel] = useState('')
  const [currentData, setCurrentData] = useState<IInspectionReport>(null)
  const [currentModalText, setCurrentModalText] = useState<string>('')

  return (
    <>
      <TableBox
        title="Relatório Monitoramento de Empreendimento"
        sizeTitle={theme.font.sizes.s21}
        shadow
      >
        <CardContainer data-testid="inspectionReport">
          <ContainerTitle>
            <Text
              text={`${data[0]?.enterpriseId} - ${enterpriseName}`}
              size={theme.font.sizes.s14}
              color={theme.colors.pure.pure100}
              weight={theme.font.w900}
            />
          </ContainerTitle>
          {data &&
            data.map((report: IInspectionReport, index: number) => (
              <Card
                key={index}
                isFirstCard={index === 0}
                data-testid="data-item"
              >
                <Column>
                  <InfoText>
                    <Text
                      text={`Data/Hora da inspeção: ${report.dateTime}`}
                      size={theme.font.sizes.s12}
                      color={theme.colors.blueWarmVivid.blueWarmVivid80}
                      weight={theme.font.w600}
                    />
                  </InfoText>
                  <InfoText>
                    <Text
                      text={`Responsável: ${report.inspector}`}
                      size={theme.font.sizes.s12}
                      color={theme.colors.blueWarmVivid.blueWarmVivid80}
                      weight={theme.font.w600}
                    />
                  </InfoText>
                  <InfoText>
                    <Text
                      text={`Localização: ${report.location}`}
                      size={theme.font.sizes.s12}
                      color={theme.colors.blueWarmVivid.blueWarmVivid80}
                      weight={theme.font.w600}
                    />
                  </InfoText>
                </Column>
                <Column>
                  <Info>
                    <Text
                      text={`Execução Terraplanagem`}
                      size={theme.font.sizes.s12}
                      color={theme.colors.blueWarmVivid.blueWarmVivid80}
                      weight={theme.font.w700}
                    />
                    <ProgressBarContainer>
                      <ItemProgress>
                        <Progress
                          percent={report.earthmovingExecuted}
                          color={theme.colors.blue.blue50}
                        />
                      </ItemProgress>
                      <Text
                        text={`${report.earthmovingExecuted}%`}
                        size={theme.font.sizes.s12}
                        color={theme.colors.gray.gray21}
                        weight={theme.font.w500}
                      />
                      <ButtonOpenModal
                        data-testid="gallery-icon"
                        onClick={() => {
                          if (report.earthmovingPhoto) {
                            setOpenedModal('image')
                            setInitialImageCarousel('Execução Terraplanagem')
                            setCurrentData(report)
                          }
                        }}
                      >
                        <GalleryIcon disabled={!report.earthmovingPhoto} />
                      </ButtonOpenModal>
                    </ProgressBarContainer>
                  </Info>
                  <Info>
                    <Text
                      text={`Execução Pavimentação`}
                      size={theme.font.sizes.s12}
                      color={theme.colors.blueWarmVivid.blueWarmVivid80}
                      weight={theme.font.w700}
                    />
                    <ProgressBarContainer>
                      <ItemProgress>
                        <Progress
                          percent={report.pavingExecuted}
                          color={theme.colors.blue.blue50}
                        />
                      </ItemProgress>
                      <Text
                        text={`${report.pavingExecuted}%`}
                        size={theme.font.sizes.s12}
                        color={theme.colors.gray.gray21}
                        weight={theme.font.w500}
                      />
                      <ButtonOpenModal
                        onClick={() => {
                          if (report.pavingPhoto) {
                            setOpenedModal('image')
                            setInitialImageCarousel('Execução Pavimentação')
                            setCurrentData(report)
                          }
                        }}
                      >
                        <GalleryIcon
                          data-testid="gallery-icon"
                          disabled={!report.pavingPhoto}
                        />
                      </ButtonOpenModal>
                    </ProgressBarContainer>
                  </Info>
                </Column>
                <Column>
                  <Info>
                    <Text
                      text={`Execução Drenagem`}
                      size={theme.font.sizes.s12}
                      color={theme.colors.blueWarmVivid.blueWarmVivid80}
                      weight={theme.font.w700}
                    />
                    <ProgressBarContainer>
                      <ItemProgress>
                        <Progress
                          percent={report.drainageExecuted}
                          color={theme.colors.blue.blue50}
                        />
                      </ItemProgress>
                      <Text
                        text={`${report.drainageExecuted}%`}
                        size={theme.font.sizes.s12}
                        color={theme.colors.gray.gray21}
                        weight={theme.font.w500}
                      />
                      <ButtonOpenModal
                        onClick={() => {
                          if (report.drainagePhoto) {
                            setOpenedModal('image')
                            setInitialImageCarousel('Execução Drenagem')
                            setCurrentData(report)
                          }
                        }}
                      >
                        <GalleryIcon
                          data-testid="gallery-icon"
                          disabled={!report.drainagePhoto}
                        />
                      </ButtonOpenModal>
                    </ProgressBarContainer>
                  </Info>
                  <Info>
                    <Text
                      text={`Execução Sinalização`}
                      size={theme.font.sizes.s12}
                      color={theme.colors.blueWarmVivid.blueWarmVivid80}
                      weight={theme.font.w700}
                    />
                    <ProgressBarContainer>
                      <ItemProgress>
                        <Progress
                          percent={report.signalingExecuted}
                          color={theme.colors.blue.blue50}
                        />
                      </ItemProgress>
                      <Text
                        text={`${report.signalingExecuted}%`}
                        size={theme.font.sizes.s12}
                        color={theme.colors.gray.gray21}
                        weight={theme.font.w500}
                      />
                      <ButtonOpenModal
                        onClick={() => {
                          if (report.signalingPhoto) {
                            setOpenedModal('image')
                            setInitialImageCarousel('Execução Sinalização')
                            setCurrentData(report)
                          }
                        }}
                      >
                        <GalleryIcon
                          data-testid="gallery-icon"
                          disabled={!report.signalingPhoto}
                        />
                      </ButtonOpenModal>
                    </ProgressBarContainer>
                  </Info>
                </Column>
                <LastColumn>
                  <InfoIcons>
                    <IconTitle>
                      <Text
                        text={`Comentários`}
                        size={theme.font.sizes.s12}
                        color={theme.colors.blueWarmVivid.blueWarmVivid80}
                        weight={theme.font.w600}
                      />
                    </IconTitle>
                    <CommentIcon
                      data-testid="comment-icon"
                      disabled={!report.statusComments}
                      onClick={() => {
                        if (report.statusComments) {
                          setOpenedModal('comments')
                          setCurrentModalText(report.statusComments)
                        }
                      }}
                    />
                  </InfoIcons>
                  <InfoIcons>
                    <IconTitle>
                      <Text
                        text={`Riscos`}
                        size={theme.font.sizes.s12}
                        color={theme.colors.blueWarmVivid.blueWarmVivid80}
                        weight={theme.font.w600}
                      />
                    </IconTitle>
                    <WarningIcon
                      disabled={!report.riskComments}
                      onClick={() => {
                        if (report.riskComments) {
                          setOpenedModal('risks')
                          setCurrentModalText(report.riskComments)
                        }
                      }}
                    />
                  </InfoIcons>
                  <InfoIcons>
                    <IconTitle>
                      <Text
                        text={`Status de Obra`}
                        size={theme.font.sizes.s12}
                        color={theme.colors.blueWarmVivid.blueWarmVivid80}
                        weight={theme.font.w600}
                      />
                    </IconTitle>
                    <VideoIcon
                      disabled={!report.generalVideo}
                      onClick={() => {
                        if (report.generalVideo) {
                          setOpenedModal('video')
                          setCurrentData(report)
                        }
                      }}
                    />
                  </InfoIcons>
                </LastColumn>
              </Card>
            ))}
        </CardContainer>
      </TableBox>
      {openedModal && (
        <Modal
          closeFunction={setOpenedModal}
          transparent={openedModal === 'video'}
        >
          <ContentModal
            type={openedModal}
            currentData={currentData}
            initialImageCarousel={initialImageCarousel}
            openedModal={openedModal}
            currentModalText={currentModalText}
          />
        </Modal>
      )}
    </>
  )
}

export default InspectionReport
