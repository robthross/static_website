import React, { useState } from 'react'

import { AgGridReact } from 'ag-grid-react'

import SelectFilter from '../../../backoffice/components/UsersList/components/SelectFilter'
import {
  ContainerList,
  ContainerPagination,
  DetailsPagination,
  DetailsPaginationAndPagination,
  PageButton,
  Table,
  TopBar
} from './styles'

function ListComponent({
  titleTable,
  rowData,
  setCurrentPage,
  currentPage,
  pageSize,
  columnDefs,
  flat
}: {
  titleTable: string
  rowData: any[]
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  currentPage: number
  pageSize: 3
  columnDefs: (
    | {
        headerName: string
        field: string
        cellRenderer?: undefined
      }
    | {
        headerName: string
        field: string
        cellRenderer: (item: any) => React.JSX.Element
      }
  )[]
  flat?: boolean
}) {
  const [selectedColumn, setSelectedColumn] = useState('')

  const handleColumnSelect = (value: string) => {
    setSelectedColumn(value)
  }
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
    <ContainerList flat={flat}>
      <TopBar>
        <h4>{titleTable}</h4>
        <div>
          <SelectFilter
            handleSelect={handleColumnSelect}
            selected={selectedColumn}
          />
        </div>
      </TopBar>
      <Table
        blueBar
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
    </ContainerList>
  )
}

export default ListComponent
