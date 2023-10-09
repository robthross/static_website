import React from 'react'

import Loading from '../../../common/components/Loading'
import Title from '../../../common/components/Text'
import theme from '../../../common/styles/theme'
import { ITableBox } from '../../interfaces/components/tables'
import { ContentBox, StyledTableBox, TitleBox } from './styles'

/**
 * O componente TableBox é uma componente React que recebe três propriedades: title, sizeTitle e children. Ele retorna uma estrutura de tabela com um título e conteúdo.
 */
function TableBox({
  title,
  sizeTitle,
  shadow,
  children,
  loading,
  subtitle
}: ITableBox) {
  return (
    <StyledTableBox shadow={shadow} className="table">
      <TitleBox subtitle={subtitle}>
        <Title
          text={title}
          size={sizeTitle}
          color={theme.colors.pure.pure}
          weight={theme.font.w700}
        />
        {subtitle && (
          <Title
            text={subtitle}
            size={sizeTitle}
            color={theme.colors.pure.pure}
            weight={theme.font.w700}
          />
        )}
      </TitleBox>
      <ContentBox className="content">
        {loading ? <Loading /> : <>{children}</>}
      </ContentBox>
    </StyledTableBox>
  )
}

export default TableBox
