import styled from 'styled-components'

export const ContainerTableBoxDetailing = styled.div`
  width: 100%;
  position: relative;
  /* width: 40.67vw; */
`
export const StyledDetailing = styled.div`
  display: flex;
  flex-direction: column;
  .program {
    order: 1;
  }
  .subProgram {
    order: 2;
  }
  .road {
    order: 3;
  }
  .extension {
    order: 4;
  }
  .status {
    order: 5;
  }
  .startedAt {
    order: 6;
  }
  .amountDone {
    order: 7;
  }
  .totalEstimated {
    order: 8;
  }
  .resourcesToBeAvailable {
    order: 9;
  }
  .dueAt {
    order: 10;
  }
  .enterprises {
    order: 11;
  }
  .cities {
    order: 12;
  }
  .populationEstimated {
    order: 13;
  }
  .directJobs {
    order: 14;
  }
  .indirectJobs {
    order: 15;
  }
`

export const Content = styled.div`
  display: flex;
  padding: 24px;

  flex-direction: column;
`
export const DetailingFonts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 70%;
  margin-left: auto;
  text-align: right;
`
