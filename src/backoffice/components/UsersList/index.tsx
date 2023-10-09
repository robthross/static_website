import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  ActionButton,
  ContainerButtons
} from '../../../common/components/ActionButtons/styles'
import DeleteModal from '../../../common/components/DeleteModal'
import ListComponent from '../../../common/components/ListComponent'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { RegisterButton } from '../../../common/components/RegisterButton/styles'
import { ContainerBoxList } from '../../../common/components/ListComponent/styles'

function UsersList() {
  const [rowData, setRowData] = useState([])
  const [modalIsVisible, setModalIsVisible] = useState(false)

  const [columnDefs] = useState([
    {
      headerName: 'Nome',
      field: 'name'
    },
    { headerName: 'Data de Nascimento', field: 'birth' },
    { headerName: 'E-mail', field: 'email' },
    { headerName: 'Data de Cadastro', field: 'registrationDate' },
    {
      headerName: 'Ação',
      field: 'acao',
      cellRenderer: (item: any) => {
        return (
          <ContainerButtons>
            <ActionButton
              buttonType="edit"
              onClick={() =>
                // TODO: AJUSTAR QUANDO TIVER API
                navigate('/backoffice/register', {
                  state: {
                    ...item.data,
                    birthdate: '01/01/2023',
                    registerDate: '01/01/2023'
                  }
                })
              }
            >
              Editar
            </ActionButton>
            <ActionButton
              buttonType="delete"
              onClick={() => setModalIsVisible(true)}
            >
              Deletar
            </ActionButton>
          </ContainerButtons>
        )
      }
    }
  ])

  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 3
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

  return (
    <ContainerBoxList>
      <RegisterButton onClick={() => navigate('/backoffice/register')}>
        Cadastrar
      </RegisterButton>
      <ListComponent
        rowData={rowData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        columnDefs={columnDefs}
        titleTable="Usuários Cadastrados"
      />
      <DeleteModal
        isVisible={modalIsVisible}
        setIsVisible={setModalIsVisible}
      />
    </ContainerBoxList>
  )
}

export default UsersList
