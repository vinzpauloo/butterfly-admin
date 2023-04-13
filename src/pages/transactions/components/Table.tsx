import { DataGrid } from '@mui/x-data-grid'
import React from 'react'

function Table({ rowData, columnData }: any) {
  return (
    <DataGrid
      checkboxSelection={false}
      disableSelectionOnClick
      autoHeight
      rows={rowData}
      columns={columnData}
      disableColumnMenu
    />
  )
}

export default Table
