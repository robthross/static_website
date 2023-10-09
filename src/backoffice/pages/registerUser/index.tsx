import React from 'react'
import { useForm } from 'react-hook-form'
import { CgHome } from 'react-icons/cg'
import { HiMenuAlt4 } from 'react-icons/hi'
import { MdPersonOutline } from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router-dom'

import moment from 'moment'

import Input from '../../../common/components/FormInput'
import Text from '../../../common/components/Text'
import theme from '../../../common/styles/theme'
import {
  valueIsRequired,
  dateIsValid,
  emailMatch,
  minValue,
  nameIsValid
} from '../../../common/utils/form-rules'
import ContainerTabSinfra from '../../components/ContainerTabSinfra'
import { Breadcrumb, FormContainer, Button } from './styles'

interface FormData {
  name: string
  birthdate: string
  email: string
  registerDate: string
}

function RegisterUser() {
  const navigate = useNavigate()
  const location = useLocation()
  const defaultValues = {
    ...location.state,
    registerDate: moment().format('DD/MM/YYYY')
  }
  const { control, handleSubmit } = useForm({
    defaultValues
  })

  const submitForm = async (dataForm: FormData) => {
    try {
      // TODO: AJUSTAR QUANDO TIVER API
      navigate('/backoffice')
    } catch (e) {}
  }

  const sidebarItems = [
    {
      icon: <CgHome />,
      label: 'Home',
      path: '/'
    },
    {
      icon: <MdPersonOutline />,
      label: 'Usuários',
      path: '/backoffice'
    },
    {
      icon: <HiMenuAlt4 />,
      label: 'Empreendimentos',
      path: '/road'
    }
  ]

  return (
    <ContainerTabSinfra sidebarItems={sidebarItems}>
      <Breadcrumb>
        <Text size="20px" weight={700} color={theme.colors.gray.labelGray}>
          Usuários &gt;
        </Text>
        <Text
          size="14px"
          weight={600}
          color={theme.colors.blueWarmVivid.blueWarmVivid80}
          style={{
            marginLeft: 5
          }}
        >
          Cadastrar
        </Text>
      </Breadcrumb>
      <FormContainer>
        <Input
          name="name"
          style={{ width: '40%' }}
          control={control}
          rules={{
            ...valueIsRequired(),
            ...minValue(2, 'Insira um nome válido.'),
            ...nameIsValid()
          }}
          label="Nome"
          placeholder="Digite o nome do usuário"
        />
        <Input
          name="birthdate"
          style={{ width: '40%' }}
          control={control}
          rules={{
            ...valueIsRequired(),
            ...dateIsValid('', null, moment().format('DD/MM/YYYY'))
          }}
          label="Data de Nascimento"
          date
          placeholder="DD/MM/AAAA"
        />
        <Input
          name="email"
          style={{ width: '40%' }}
          control={control}
          rules={{ ...valueIsRequired(), ...emailMatch }}
          label="Email"
          placeholder="Digite o email do usuário"
        />
        <Input
          name="registerDate"
          style={{ width: '40%' }}
          disabled
          control={control}
          rules={{ ...valueIsRequired() }}
          label="Data de Cadastro"
          date
          placeholder="DD/MM/AAAA"
        />
        <Button onClick={handleSubmit(submitForm)}>Confirmar</Button>
      </FormContainer>
    </ContainerTabSinfra>
  )
}

export default RegisterUser
