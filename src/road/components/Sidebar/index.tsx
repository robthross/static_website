import React, { useContext } from 'react'

import Button from '../../../common/components/Button'
import Loading from '../../../common/components/Loading'
import Logo from '../../../common/components/Logo'
import Text from '../../../common/components/Text'
import theme from '../../../common/styles/theme'
import { EnterpriseContext } from '../../contexts/EnterprisesContext'
import { ISidebarComponent } from '../../interfaces/components/sidebar'
import { LogoutButton } from '../LogoutButton'
import SinglePagePDFButton from '../SinglePagePDFButton'
import ItemSidebar from './ItemSidebar'
import {
  ContainerButtons,
  LogoContainer,
  StyledSidebar,
  PoweredContainer
} from './styles'

function Sidebar({
  data,
  isLoading,
  toClean,
  handleClick,
  currentType,
  handleChange
}: ISidebarComponent) {
  const { enterprisesQueries, enterpriseRefetch } =
    useContext(EnterpriseContext)

  const idsToPDf = enterprisesQueries?.id?.split(',')

  return (
    <StyledSidebar>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <LogoContainer>
            <Logo dark={false} logoName={'Tab'} />
            <Logo dark={false} logoName={'DER'} />
            <LogoutButton />
          </LogoContainer>
          {data?.map((item) => (
            <ItemSidebar
              key={item.type}
              handleClick={handleClick}
              currentType={currentType}
              item={item}
              handleChange={handleChange}
              enterprisesQueries={enterprisesQueries}
              enterpriseRefetch={enterpriseRefetch}
            />
          ))}
          <ContainerButtons>
            <Button
              text="Limpar"
              color={theme.colors.pure.pure100}
              background={theme.colors.gray.default}
              onClick={toClean}
            />

            <SinglePagePDFButton ids={idsToPDf} />
          </ContainerButtons>
          <PoweredContainer>
            <Text
              text="Powered by"
              size={theme.font.sizes.s12}
              color={theme.colors.pure.pure}
              weight={0}
            />
            <Logo dark={false} logoName={'Houer'} />
          </PoweredContainer>
        </>
      )}
    </StyledSidebar>
  )
}

export default Sidebar
