import React from 'react'
import './print.css'

import Logo from '../../../common/components/Logo'
import Text from '../../../common/components/Text'
import theme from '../../../common/styles/theme'
import { POST_REPORTS_BULK } from '../../api/api'
import { useAxios } from '../../hooks/useAxios'
import { IAction, IActionPlan } from '../../interfaces/components/actionplan'
import { ICoordinatesData } from '../../interfaces/components/coordinates'
import {
  IDetailingTypes,
  IEnterprise
} from '../../interfaces/components/enterprises'
import { IGraphic } from '../../interfaces/components/grapich'
import { IInspectionReport } from '../../interfaces/components/inspectionreport'
import detailingTypes from '../../utils/detailingTypes'
import findLastMonth from '../../utils/findLastMonth'
import { getFormattedDateTime } from '../../utils/getFormattedDateTime'
import { TableContainer, TableHead, TableRow } from '../ActionPlan/styles'
import ContinuousText from '../ContinuousText'
import DetailingMap from '../DetailingMap'
import Graphic from '../Graphic'
import {
  Card,
  ItemProgress,
  ProgressBarContainer
} from '../InspectionReport/styles'
import ItemTable from '../ItemTable'
import Progress from '../ListTables/KmComponent/Progress'
import Status from '../RisksProblems/Status'
import {
  ActionsSinglePage,
  CardLeftCol,
  CardLeftColDown,
  CardLeftColDownItem,
  CardLeftColUp,
  CardLeftColUpItem,
  CardRightCol,
  CardRightColLine,
  CardRightColLineItem,
  ContainerImage,
  ContentTopBar,
  DetailingColsSinglePage,
  DetailingFonts,
  DetailingLeftSinglePage,
  DetailingRightSinglePage,
  DetailingSinglePage,
  Footer,
  GraphicSinglePage,
  HeaderSinglePage,
  InspectionStyled,
  MapSinglePage,
  RiskIap,
  RisksContents,
  StyledSinglePagePDFPage,
  TopBar
} from './styles'

const SinglePagePDFPage = ({
  data,
  currentCoordinate,
  graphicData,
  actionPlansData,
  inspectionReportsData
}: {
  data: IEnterprise
  currentCoordinate: ICoordinatesData
  graphicData?: IGraphic
  actionPlansData?: IAction
  inspectionReportsData?: IInspectionReport[]
}) => {
  const currentDate = getFormattedDateTime()
  const listData = Object.entries(data)
  const halfLength = Math.round(listData.length / 2 + 1)
  const currentListLeft = listData.slice(0, halfLength + 1)
  const currentListRight = listData.slice(halfLength + 1)

  let dateProgress = null
  if (graphicData) dateProgress = findLastMonth(graphicData)

  function RenderItem(list: [string, any][]) {
    return list.map((item: [IDetailingTypes, string]) => {
      if (detailingTypes[item[0]] !== undefined) {
        if (item[0] !== 'name' && item[0] !== 'id') {
          return <ItemTable item={item} key={detailingTypes[item[0]]} />
        }
      }
      return null
    })
  }
  if (data.name)
    return (
      <>
        <StyledSinglePagePDFPage className="page-break">
          <TopBar>
            <ContentTopBar>
              <Logo dark={false} logoName={'DER'} />
              <Text
                text={`Relatório emitido em: ${currentDate}`}
                size="10px"
                color={theme.colors.pure.pure}
                weight={700}
              />
            </ContentTopBar>
          </TopBar>
          <HeaderSinglePage>
            <Text
              text="Relatório de empreendimento"
              size="14px"
              color={theme.colors.blueWarmVivid.blueWarmVivid70}
              weight={700}
            />
            <Text
              text={data.name}
              size="12px"
              color={theme.colors.blue.blue80}
              weight={700}
            />
          </HeaderSinglePage>

          <DetailingSinglePage>
            <Text
              text="Detalhamento"
              size="14px"
              color={theme.colors.blueWarmVivid.blueWarmVivid70}
              weight={700}
            />
            <DetailingColsSinglePage>
              {!!currentListLeft.length && (
                <DetailingLeftSinglePage>
                  {RenderItem(currentListLeft)}
                </DetailingLeftSinglePage>
              )}
              {!!currentListRight && (
                <DetailingRightSinglePage>
                  {RenderItem(currentListRight)}
                </DetailingRightSinglePage>
              )}
            </DetailingColsSinglePage>
            <DetailingFonts>
              <Text
                text={
                  dateProgress
                    ? `Avanço Ref.: ${dateProgress}. id: ${data?.id}.`
                    : `id: ${data?.id}.`
                }
                size={theme.font.sizes.s12}
                color={theme.colors.grayCool.grayCool40}
                weight={0}
              />
              <Text
                text="População Beneficiada - IBGE 2022"
                size={theme.font.sizes.s12}
                color={theme.colors.grayCool.grayCool40}
                weight={0}
              />
              <Text
                text="Nº de empregos gerados indiretamente: Sistema de Matrizes de Insumos 2017 - NEREUS"
                size={theme.font.sizes.s12}
                color={theme.colors.grayCool.grayCool40}
                weight={0}
              />
            </DetailingFonts>
          </DetailingSinglePage>

          {!!currentCoordinate?.features?.length && (
            <MapSinglePage>
              <DetailingMap coordinatesJson={currentCoordinate} pdf />
            </MapSinglePage>
          )}
          {data?.iap && (
            <RiskIap>
              <Text
                text="Riscos e Problemas"
                size="14px"
                color={theme.colors.blueWarmVivid.blueWarmVivid70}
                weight={700}
              />
              <Status
                status={data?.semaphore as 'VERMELHO' | 'VERDE' | 'AMARELO'}
                value={data.iap}
              />
            </RiskIap>
          )}

          <RisksContents>
            {data?.riskWork && (
              <Text
                text={<ContinuousText itemName="Obra:" value={data.riskWork} />}
                size={theme.font.sizes.s16}
                color={theme.colors.blue.blue80}
                weight={theme.font.w400}
              />
            )}
            {data?.riskEnvironment && (
              <Text
                text={
                  <ContinuousText
                    itemName="Meio-ambiente:"
                    value={data?.riskEnvironment}
                  />
                }
                size={theme.font.sizes.s16}
                color={theme.colors.blue.blue80}
                weight={theme.font.w400}
              />
            )}
            {data?.riskExpropriation && (
              <Text
                text={
                  <ContinuousText
                    itemName="Desapropriação:"
                    value={data?.riskExpropriation}
                  />
                }
                size={theme.font.sizes.s16}
                color={theme.colors.blue.blue80}
                weight={theme.font.w400}
              />
            )}
          </RisksContents>
          <Footer>
            <Logo dark={false} />
          </Footer>
        </StyledSinglePagePDFPage>
        {(!!graphicData || !!actionPlansData?.actionPlans?.length) && (
          <StyledSinglePagePDFPage className="page-break">
            <TopBar>
              <ContentTopBar>
                <Logo dark={false} logoName={'DER'} />
                <Text
                  text={`Relatório emitido em: ${currentDate}`}
                  size="10px"
                  color={theme.colors.pure.pure}
                  weight={700}
                />
              </ContentTopBar>
            </TopBar>
            <div className="page2" />
            {graphicData && (
              <GraphicSinglePage>
                <Graphic data={graphicData} pdf />
              </GraphicSinglePage>
            )}
            {!!actionPlansData?.actionPlans?.length && (
              <ActionsSinglePage>
                <Text
                  text="Plano de Ações"
                  size="14px"
                  color={theme.colors.blueWarmVivid.blueWarmVivid70}
                  weight={700}
                />
                <TableContainer>
                  <TableHead>
                    <tr>
                      <th>Ação</th>
                      <th>Responsável</th>
                      <th>Prazo</th>
                      <th>Status</th>
                    </tr>
                  </TableHead>
                  <tbody>
                    {!!actionPlansData?.actionPlans?.length &&
                      actionPlansData?.actionPlans.map(
                        (item: IActionPlan, index: number) => (
                          <TableRow key={index}>
                            <td>{item?.action}</td>
                            <td>{item?.responsible}</td>
                            <td>{item?.deadline}</td>
                            <td>{item?.status}</td>
                          </TableRow>
                        )
                      )}
                  </tbody>
                </TableContainer>
              </ActionsSinglePage>
            )}
            <Footer>
              <Logo dark={false} />
            </Footer>
          </StyledSinglePagePDFPage>
        )}
        {/* inspeção */}
        {inspectionReportsData &&
          !!inspectionReportsData.length &&
          inspectionReportsData[0]?.enterpriseId && (
            <StyledSinglePagePDFPage className="page-break">
              <TopBar>
                <ContentTopBar>
                  <Logo dark={false} logoName={'DER'} />
                  <Text
                    text={`Relatório emitido em: ${currentDate}`}
                    size="10px"
                    color={theme.colors.pure.pure}
                    weight={700}
                  />
                </ContentTopBar>
              </TopBar>
              <div className="page3" />
              <InspectionStyled>
                <Text
                  text="Avanço físico de obra - DER-MG"
                  size="14px"
                  color={theme.colors.blueWarmVivid.blueWarmVivid70}
                  weight={700}
                />
                <Card isFirstCard>
                  <CardLeftCol>
                    <CardLeftColUp>
                      <CardLeftColUpItem>
                        <Text
                          text={`Data/Hora da inspeção: ${inspectionReportsData[0]?.dateTime}`}
                          size={theme.font.sizes.s06}
                          color={theme.colors.blueWarmVivid.blueWarmVivid80}
                          weight={theme.font.w600}
                        />
                        <Text
                          text={`Responsável: ${inspectionReportsData[0]?.inspector}`}
                          size={theme.font.sizes.s06}
                          color={theme.colors.blueWarmVivid.blueWarmVivid80}
                          weight={theme.font.w600}
                        />
                        <Text
                          text={`Localização: ${inspectionReportsData[0]?.location}`}
                          size={theme.font.sizes.s06}
                          color={theme.colors.blueWarmVivid.blueWarmVivid80}
                          weight={theme.font.w600}
                        />
                      </CardLeftColUpItem>
                      <CardLeftColUpItem>
                        <Text
                          text={`Execução Terraplanagem`}
                          size={theme.font.sizes.s06}
                          color={theme.colors.blueWarmVivid.blueWarmVivid80}
                          weight={theme.font.w700}
                        />
                        <ProgressBarContainer>
                          <ItemProgress>
                            <Progress
                              percent={
                                inspectionReportsData[0]?.earthmovingExecuted
                              }
                              color={theme.colors.blue.blue50}
                            />
                          </ItemProgress>
                          <Text
                            text={`${inspectionReportsData[0]?.earthmovingExecuted}%`}
                            size={theme.font.sizes.s06}
                            color={theme.colors.gray.gray21}
                            weight={theme.font.w500}
                          />
                        </ProgressBarContainer>
                        <Text
                          text={`Execução Pavimentação`}
                          size={theme.font.sizes.s12}
                          color={theme.colors.blueWarmVivid.blueWarmVivid80}
                          weight={theme.font.w700}
                        />
                        <ProgressBarContainer>
                          <ItemProgress>
                            <Progress
                              percent={inspectionReportsData[0]?.pavingExecuted}
                              color={theme.colors.blue.blue50}
                            />
                          </ItemProgress>
                          <Text
                            text={`${inspectionReportsData[0]?.pavingExecuted}%`}
                            size={theme.font.sizes.s12}
                            color={theme.colors.gray.gray21}
                            weight={theme.font.w500}
                          />
                        </ProgressBarContainer>
                      </CardLeftColUpItem>
                      <CardLeftColUpItem>
                        <Text
                          text={`Execução Drenagem`}
                          size={theme.font.sizes.s12}
                          color={theme.colors.blueWarmVivid.blueWarmVivid80}
                          weight={theme.font.w700}
                        />
                        <ProgressBarContainer>
                          <ItemProgress>
                            <Progress
                              percent={
                                inspectionReportsData[0]?.drainageExecuted
                              }
                              color={theme.colors.blue.blue50}
                            />
                          </ItemProgress>
                          <Text
                            text={`${inspectionReportsData[0]?.drainageExecuted}%`}
                            size={theme.font.sizes.s12}
                            color={theme.colors.gray.gray21}
                            weight={theme.font.w500}
                          />
                        </ProgressBarContainer>
                        <Text
                          text={`Execução Sinalização`}
                          size={theme.font.sizes.s12}
                          color={theme.colors.blueWarmVivid.blueWarmVivid80}
                          weight={theme.font.w700}
                        />
                        <ProgressBarContainer>
                          <ItemProgress>
                            <Progress
                              percent={
                                inspectionReportsData[0]?.signalingExecuted
                              }
                              color={theme.colors.blue.blue50}
                            />
                          </ItemProgress>
                          <Text
                            text={`${inspectionReportsData[0]?.signalingExecuted}%`}
                            size={theme.font.sizes.s12}
                            color={theme.colors.gray.gray21}
                            weight={theme.font.w500}
                          />
                        </ProgressBarContainer>
                      </CardLeftColUpItem>
                    </CardLeftColUp>
                    <CardLeftColDown>
                      <CardLeftColDownItem>
                        <Text
                          text={'Comentários:'}
                          size={theme.font.sizes.s06}
                          color={theme.colors.blueWarmVivid.blueWarmVivid80}
                          weight={600}
                        />
                        <Text
                          text={inspectionReportsData[0]?.statusComments}
                          size={theme.font.sizes.s06}
                          color={theme.colors.blueWarmVivid.blueWarmVivid80}
                          weight={600}
                        />
                      </CardLeftColDownItem>
                      <CardLeftColDownItem>
                        <Text
                          text={'Riscos:'}
                          size={theme.font.sizes.s06}
                          color={theme.colors.blueWarmVivid.blueWarmVivid80}
                          weight={600}
                        />
                        <Text
                          text={inspectionReportsData[0]?.riskComments}
                          size={theme.font.sizes.s06}
                          color={theme.colors.blueWarmVivid.blueWarmVivid80}
                          weight={600}
                        />
                      </CardLeftColDownItem>
                    </CardLeftColDown>
                  </CardLeftCol>
                  <CardRightCol>
                    <CardRightColLine>
                      {inspectionReportsData[0]?.earthmovingPhoto && (
                        <CardRightColLineItem>
                          <Text
                            text={'Terraplanagem'}
                            size={theme.font.sizes.s06}
                            color={theme.colors.blueWarmVivid.blueWarmVivid80}
                            weight={600}
                          />
                          <ContainerImage>
                            <img
                              src={inspectionReportsData[0]?.earthmovingPhoto}
                              alt="Terraplanagem"
                            />
                          </ContainerImage>
                        </CardRightColLineItem>
                      )}
                      {inspectionReportsData[0]?.pavingPhoto && (
                        <CardRightColLineItem>
                          <Text
                            text={'Pavimentação'}
                            size={theme.font.sizes.s06}
                            color={theme.colors.blueWarmVivid.blueWarmVivid80}
                            weight={600}
                          />
                          <ContainerImage>
                            <img
                              src={inspectionReportsData[0]?.pavingPhoto}
                              alt="Pavimentação"
                            />
                          </ContainerImage>
                        </CardRightColLineItem>
                      )}
                    </CardRightColLine>
                    <CardRightColLine>
                      {inspectionReportsData[0]?.drainagePhoto && (
                        <CardRightColLineItem>
                          <Text
                            text={'Drenagem'}
                            size={theme.font.sizes.s06}
                            color={theme.colors.blueWarmVivid.blueWarmVivid80}
                            weight={600}
                          />
                          <ContainerImage>
                            <img
                              src={inspectionReportsData[0]?.drainagePhoto}
                              alt="Drenagem"
                            />
                          </ContainerImage>
                        </CardRightColLineItem>
                      )}
                      {inspectionReportsData[0]?.signalingPhoto && (
                        <CardRightColLineItem>
                          <Text
                            text={'Sinalização'}
                            size={theme.font.sizes.s06}
                            color={theme.colors.blueWarmVivid.blueWarmVivid80}
                            weight={600}
                          />
                          <ContainerImage>
                            <img
                              src={inspectionReportsData[0]?.signalingPhoto}
                              alt="Sinalização"
                            />
                          </ContainerImage>
                        </CardRightColLineItem>
                      )}
                    </CardRightColLine>
                  </CardRightCol>
                </Card>
              </InspectionStyled>
              <Footer>
                <Logo dark={false} />
              </Footer>
            </StyledSinglePagePDFPage>
          )}
      </>
    )
}

export default SinglePagePDFPage
