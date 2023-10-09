import React from 'react'
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai'

import styled from 'styled-components'

import theme from '../../../../../common/styles/theme'

export const Container = styled.div<{ inactive?: boolean }>`
  text-align: center;
  width: 100%;
  color: ${(props) => (props.inactive ? '#F94144' : '#49B009')};
  font-size: ${theme.font.sizes.s20};
`

function StatusIcon({ inactive }: { inactive?: boolean }) {
  return (
    <Container inactive={inactive}>
      {inactive ? <AiOutlineClose /> : <AiOutlineCheck />}
    </Container>
  )
}

export default StatusIcon
