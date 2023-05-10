import React from 'react'

import { DataGrid } from '@mui/x-data-grid'

function Table({ isLoading, isFetching, rowData, columnData, rowCount, pageSize, setPage, setPageSize }: any) {
  const handlePageChange = (newPage: number) => {
    setPage(newPage + 1)
  }

  const handlePageSizeChange = (pageSize: number) => {
    setPageSize(pageSize)
  }

  return (
    <DataGrid
      autoHeight
      columns={columnData}
      checkboxSelection={false}
      disableSelectionOnClick
      disableColumnMenu
      getRowId={row => row.id}
      loading={isLoading || isFetching}
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
      pageSize={pageSize}
      pagination
      paginationMode='server'
      rowCount={rowCount}
      rows={rowData}
      rowsPerPageOptions={[10, 25, 50]}
    />
  )
}

export default Table
