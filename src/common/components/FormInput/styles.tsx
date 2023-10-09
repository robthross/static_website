import styled from 'styled-components'

import theme from '../../styles/theme'

export const FormItemContainer = styled.div`
  margin-block-end: 1.125rem;
  margin-block-start: 0.3rem;
`

export const FormInputLabel = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #646363;
`

export const FormInput = styled.input`
  padding: 6px 11px;
  font-size: 14px;
  line-height: 17px;
  outline-offset: 0px;
  width: 100%;
  border: solid;
  border-width: 1px;
  border-radius: 4px;
  border-color: ${theme.colors.gray.inputBorder};
  &::placeholder {
    color: ${theme.colors.gray.gray};
  }
`
