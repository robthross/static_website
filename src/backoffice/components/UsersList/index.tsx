import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { AgGridReact } from 'ag-grid-react'

import DeleteModal from '../DeleteModal'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import SelectFilter from './components/SelectFilter'
import {
  ContainerButtons,
  ContainerPagination,
  ContainerUsersList,
  DetailsPagination,
  DetailsPaginationAndPagination,
  ActionButton,
  PageButton,
  RegisterButton,
  StyledUserList,
  Table,
  TopBar
} from './styles'

function UsersList() {
  const [selectedColumn, setSelectedColumn] = useState('')
  const [rowData, setRowData] = useState([])
  const [modalIsVisible, setModalIsVisible] = useState(false)

  const handleColumnSelect = (value: string) => {
    setSelectedColumn(value)
  }

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
            <ActionButton isDelete onClick={() => setModalIsVisible(true)}>
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

  const onGridReady = (params: any) => {
    const gridApi = params.api
    gridApi.sizeColumnsToFit()
  }

  const handlePageClick = (page: number) => {
    setCurrentPage(page)
  }

  const totalPages = 4
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <StyledUserList>
      <RegisterButton onClick={() => navigate('/backoffice/register')}>
        Cadastrar
      </RegisterButton>
      <ContainerUsersList>
        <TopBar>
          <h4>Usuários Cadastrados</h4>
          <div>
            <SelectFilter
              handleSelect={handleColumnSelect}
              selected={selectedColumn}
            />
          </div>
        </TopBar>
        <Table
          onDragStart={(event: React.DragEvent) => {
            event.preventDefault()
          }}
        >
          {rowData.length ? (
            <AgGridReact
              className="ag-theme-alpine customStyle"
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={{
                resizable: true
              }}
              onGridReady={onGridReady}
              rowHeight={80}
              paginationPageSize={pageSize}
            />
          ) : (
            <></>
          )}
          <DetailsPaginationAndPagination>
            <DetailsPagination>
              Mostrando <span>1 - 10</span> de <span>124</span>
            </DetailsPagination>
            <ContainerPagination>
              <PageButton
                onClick={handlePrevPage}
                className={currentPage === 1 ? 'arrowDisabled' : ''}
              >
                {'<'}
              </PageButton>
              {pageNumbers.map((page) => (
                <PageButton
                  key={page}
                  onClick={() => handlePageClick(page)}
                  disabled={page === currentPage}
                >
                  {page}
                </PageButton>
              ))}
              <PageButton
                onClick={handleNextPage}
                className={currentPage === totalPages ? 'arrowDisabled' : ''}
              >
                {'>'}
              </PageButton>
            </ContainerPagination>
          </DetailsPaginationAndPagination>
        </Table>
      </ContainerUsersList>
      <DeleteModal
        isVisible={modalIsVisible}
        setIsVisible={setModalIsVisible}
      />
    </StyledUserList>
  )
}

export default UsersList
