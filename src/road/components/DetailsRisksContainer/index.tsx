import React, { useEffect, useRef } from 'react'

import { LoadingSpinner } from '../../../common/components/Loading/styles'
import {
  GET_ACTION_PLANS,
  GET_ENTERPRISES,
  GET_INSPECTION_REPORTS,
  GET_PLANNING
} from '../../api/api'
import { useAxios } from '../../hooks/useAxios'
import { IDetailsRisksContainer } from '../../interfaces/components/DetailsRisks'
import ActionPlan from '../ActionPlan'
import Detailing from '../Detailing'
import DetailingMap from '../DetailingMap'
import Graphic from '../Graphic'
import InspectionReport from '../InspectionReport'
import RisksProblems from '../RisksProblems'
import {
  LineColLeft,
  LineColRight,
  LineColGraphic,
  LoadingContainer,
  StyledDetailsRisksContainer,
  StyledDetailsRisksLine
} from './styles'

function DetailsRisksContainer({
  currentEnterprise,
  currentCoordinate
}: IDetailsRisksContainer) {
  const detailsRef = useRef(null)

  const {
    data: enterpriseData,
    loading: enterpriseLoading,
    refetch: enterpriseRefetch
  } = useAxios({
    method: 'GET',
    url: `${GET_ENTERPRISES.url}/${currentEnterprise.id}`,
    headers: {
      accept: '*/*'
    }
  })

  const {
    data: graphicData,
    loading: graphicLoading,
    error: graphicError,
    refetch: graphicRefetch
  } = useAxios({
    method: 'GET',
    url: `${GET_PLANNING.url}/${currentEnterprise.id}`,
    headers: {
      accept: '*/*'
    }
  })

  const {
    data: actionPlansData,
    loading: actionPlansLoading,
    refetch: refetchActionPlans
  } = useAxios({
    method: 'GET',
    url: `${GET_ACTION_PLANS.url}/${currentEnterprise.id}`,
    headers: {
      accept: '*/*'
    }
  })

  const { data: inspectionReportsData, refetch: inspectionReportsRefetch } =
    useAxios({
      method: 'GET',
      url: `${GET_INSPECTION_REPORTS.url}?enterpriseId=${currentEnterprise.id}`,
      headers: {
        accept: '*/*'
      }
    })

  useEffect(() => {
    graphicRefetch()
    enterpriseRefetch()
    refetchActionPlans()
    inspectionReportsRefetch()
  }, [currentEnterprise])

  setTimeout(() => {
    detailsRef?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }, 1500)

  return enterpriseLoading || graphicLoading || actionPlansLoading ? (
    <LoadingContainer data-testid="loading-spinner-risk">
      <LoadingSpinner small />
    </LoadingContainer>
  ) : (
    <StyledDetailsRisksContainer ref={detailsRef}>
      <StyledDetailsRisksLine>
        <LineColLeft>
          <Detailing
            data={enterpriseData}
            graphic={graphicData && graphicData.scurve ? graphicData : null}
          />
        </LineColLeft>
        <LineColRight>
          {!!currentCoordinate?.features?.length && (
            <DetailingMap coordinatesJson={currentCoordinate} />
          )}
        </LineColRight>
      </StyledDetailsRisksLine>
      <StyledDetailsRisksLine>
        <LineColLeft>
          <RisksProblems data={enterpriseData} />

          {actionPlansData && <ActionPlan data={actionPlansData} />}
        </LineColLeft>
        <LineColGraphic>
          {!graphicLoading &&
            graphicData &&
            graphicData.scurve &&
            !graphicError && <Graphic data={graphicData} />}
        </LineColGraphic>
      </StyledDetailsRisksLine>
      {inspectionReportsData && (
        <StyledDetailsRisksLine>
          <InspectionReport
            data={inspectionReportsData}
            enterpriseName={enterpriseData.name}
          />
        </StyledDetailsRisksLine>
      )}
    </StyledDetailsRisksContainer>
  )
}

export default DetailsRisksContainer
