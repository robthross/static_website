import React, { useEffect, useState } from 'react'
import { BsFillTrashFill, BsEye } from 'react-icons/bs'
import { CgHome } from 'react-icons/cg'
import { FiAlertTriangle } from 'react-icons/fi'
import { HiMenuAlt4 } from 'react-icons/hi'
import { MdPersonOutline } from 'react-icons/md'

import ContainerTabSinfra from '../../../backoffice/components/ContainerTabSinfra'
import { ContainerButtons } from '../../../common/components/ActionButtons/styles'
import DeleteModal from '../../../common/components/DeleteModal'
import ListComponent from '../../../common/components/ListComponent'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { ContainerBoxListFlat } from '../../../common/components/ListComponent/styles'
import { GhostButton } from './components/GhostButton/styles'

function EmpList() {
  const pageSize = 3
  const [modalIsVisible, setModalIsVisible] = useState(false)

  const [rowData, setRowData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [columnDefs] = useState([
    { headerName: 'Data', field: 'birth' },
    {
      headerName: 'Responsável',
      field: 'name'
    },
    { headerName: 'Interferência', field: 'username' },
    {
      headerName: 'Acidente',
      field: 'acao',
      cellRenderer: () => {
        return (
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
              color: '#FEC100'
            }}
          >
            <FiAlertTriangle />
          </div>
        )
      }
    },
    {
      headerName: 'Ação',
      field: 'acao',
      cellRenderer: (item: any) => {
        return (
          <ContainerButtons>
            <GhostButton colorButton="blue">
              <BsEye /> Cronograma
            </GhostButton>
            <GhostButton colorButton="green">
              <BsFillTrashFill />
              Medição
            </GhostButton>
            <GhostButton colorButton="yellow">
              <BsFillTrashFill /> Editar
            </GhostButton>
            <GhostButton colorButton="red">
              <BsFillTrashFill /> Excluir
            </GhostButton>
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
      <ContainerBoxListFlat>
        {rowData && (
          <ListComponent
            titleTable="Diários Cadastrados"
            rowData={rowData}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            pageSize={3}
            columnDefs={columnDefs}
            flat
          />
        )}
        <DeleteModal
          isVisible={modalIsVisible}
          setIsVisible={setModalIsVisible}
        />
      </ContainerBoxListFlat>
    </ContainerTabSinfra>
  )
}

export default EmpList
