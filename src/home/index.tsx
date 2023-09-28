import React from 'react'
import { useNavigate } from 'react-router-dom'

import ContainerTabSinfra from '../backoffice/components/ContainerTabSinfra'
import Text from '../common/components/Text'
import theme from '../common/styles/theme'
import { Box, BoxContainer, Button, ContainerHome } from './styles'

function Home() {
  const navigate = useNavigate()
  return (
    <ContainerTabSinfra>
      <ContainerHome>
        <Text
          color={theme.colors.blueWarmVivid.blueWarmVivid80}
          size="44px"
          weight={600}
          style={{ marginBottom: 7 }}
        >
          Olá,
        </Text>
        <Text
          color={theme.colors.blueWarmVivid.blueWarmVivid80}
          size="16px"
          weight={300}
          style={{ marginBottom: 41 }}
        >
          Seja bem-vindo ao painel de controle.
        </Text>
        <BoxContainer>
          <Box>
            <Text
              color={theme.colors.gray.grayDark}
              size="17px"
              weight={600}
              style={{ marginBottom: 15 }}
            >
              Usuários
            </Text>
            <Text color={theme.colors.blue.darkBlue} size="16px" weight={300}>
              Cadastre usuários
            </Text>
            <Button onClick={() => navigate('/backoffice/register')}>
              Ver mais
            </Button>
          </Box>
          <Box style={{ marginLeft: 24 }}>
            <Text
              color={theme.colors.gray.grayDark}
              size="17px"
              weight={600}
              style={{ marginBottom: 15 }}
            >
              Empreendimentos
            </Text>
            <Text color={theme.colors.blue.darkBlue} size="16px" weight={300}>
              Empreendimentos
            </Text>
            <Button onClick={() => navigate('/road')}>Ver mais</Button>
          </Box>
          <Box style={{ marginLeft: 24 }}>
            <Text
              color={theme.colors.gray.grayDark}
              size="17px"
              weight={600}
              style={{ marginBottom: 15 }}
            >
              Listas
            </Text>
            <Text color={theme.colors.blue.darkBlue} size="16px" weight={300}>
              Lista de usuários
            </Text>
            <Button onClick={() => navigate('/backoffice')}>Ver mais</Button>
          </Box>
        </BoxContainer>
      </ContainerHome>
    </ContainerTabSinfra>
  )
}

export default Home
