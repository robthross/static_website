import React, { useState } from 'react'

import styled from 'styled-components'

import theme from '../../styles/theme'

export const ChipContainer = styled.li`
  background-color: ${() => theme.colors.gray.default};
  color: ${() => theme.colors.black.darkText};
  border-radius: 20px;
  padding: 8px 11px;
  margin: 21px 13px 0 0;
  display: flex;
  align-items: center;
`

export const RemoveIcon = styled.div`
  margin-left: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: ${() => theme.colors.black.darkText};
`

export const ChipText = styled.span`
  margin-right: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
`
