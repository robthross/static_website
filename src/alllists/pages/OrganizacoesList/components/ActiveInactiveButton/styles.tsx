import styled from 'styled-components'

import theme from '../../../../../common/styles/theme'

export const ActiveInactiveButton = styled.button<{ inactive: boolean }>`
  height: 28px;
  padding: 0 1rem;
  background: ${(props) =>
    props.inactive
      ? theme.colors.greenVivid.greenVivid30
      : theme.colors.indigoVivid.indigoViVid50};
  color: ${theme.colors.pure.pure};
  border: none;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.08),
    0px 4px 6px 0px rgba(50, 50, 93, 0.11);
  font-size: ${({ theme }) => theme.font.sizes.s12};
  font-weight: ${({ theme }) => theme.font.w600};
  letter-spacing: 0.24px;
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`
