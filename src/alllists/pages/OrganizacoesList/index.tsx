/* eslint-disable no-constant-condition */
import React, { useEffect, useState } from 'react'
import { BsFillTrashFill } from 'react-icons/bs'
import { CgHome } from 'react-icons/cg'
import { HiMenuAlt4 } from 'react-icons/hi'
import { MdPersonOutline } from 'react-icons/md'

import ContainerTabSinfra from '../../../backoffice/components/ContainerTabSinfra'
import {
  ActionButton,
  ContainerButtons
} from '../../../common/components/ActionButtons/styles'
import DeleteModal from '../../../common/components/DeleteModal'
import ListComponent from '../../../common/components/ListComponent'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { ContainerBoxList } from '../../../common/components/ListComponent/styles'
import { ActiveInactiveButton } from './components/ActiveInactiveButton/styles'
import StatusIcon from './components/StatusIcon'

function OrganizacoesList() {
  const pageSize = 3
  const [modalIsVisible, setModalIsVisible] = useState(false)

  const [rowData, setRowData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const [columnDefs] = useState([
    { headerName: 'Nome da Organização', field: 'name' },
    {
      headerName: 'CNPJ',
      field: 'phone'
    },
    { headerName: 'Contato', field: 'phone' },
    {
      headerName: 'Data de Cadastro',
      field: 'acao'
    },
    {
      headerName: 'Ativo',
      field: 'acao',
      cellRenderer: (item: any) => {
        return <StatusIcon inactive />
      }
    },
    {
      headerName: 'Ação',
      field: 'acao',
      cellRenderer: (item: any) => {
        return (
          <ContainerButtons>
            <ActionButton buttonType="edit">Editar</ActionButton>
            <ActiveInactiveButton inactive={true}>
              {true ? 'Ativar' : 'Desativar'}
            </ActiveInactiveButton>
            <ActionButton
              buttonType="delete"
              onClick={() => setModalIsVisible(true)}
            >
              <BsFillTrashFill />
            </ActionButton>
          </ContainerButtons>
        )
      }
    }
  ])

  async function fetchPageData(page: number) {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users`)
      const data = await response.json()
      const startIndex = (page - 1) * pageSize
      const endIndex = startIndex + pageSize

      const currentPageData = data.slice(startIndex, endIndex)

      setRowData(currentPageData)
    } catch (error) {
      console.error('Erro ao buscar dados:', error)
    }
  }

  useEffect(() => {
    fetchPageData(currentPage)
  }, [currentPage])

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
      <ContainerBoxList>
        {rowData && (
          <ListComponent
            titleTable="Organizações Cadastradas"
            rowData={rowData}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            pageSize={3}
            columnDefs={columnDefs}
          />
        )}
        <DeleteModal
          isVisible={modalIsVisible}
          setIsVisible={setModalIsVisible}
        />
      </ContainerBoxList>
    </ContainerTabSinfra>
  )
}

export default OrganizacoesList
