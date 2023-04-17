import { DataGrid } from '@mui/x-data-grid'
import React from 'react'

function Table({ isLoading, isFetching, rowData, columnData, rowCount, pageSize, setPage }: any) {
  const handlePageChange = (newPage: number) => {
    setPage(newPage + 1)
  }

  return (
    <DataGrid
      loading={isLoading || isFetching}
      checkboxSelection={false}
      disableSelectionOnClick
      autoHeight
      getRowId={row => row.id}
      rows={rowData}
      columns={columnData}
      disableColumnMenu
      rowCount={rowCount}
      pageSize={pageSize}
      paginationMode='server'
      pagination
      onPageChange={handlePageChange}
    />
  )
}

export default Table
