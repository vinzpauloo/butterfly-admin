import React from 'react'
import { GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';

const CustomToolbar = () => {
  return (
    <GridToolbarContainer sx={{ marginBottom: 2 }}>
      <GridToolbarExport
        size='medium'
        variant='outlined'
        color='secondary'
        printOptions={{ disableToolbarButton: true }}
        excelOptions={{ allColumns: true }}
        csvOptions={{ allColumns: true }}
      />
    </GridToolbarContainer>
  )
}

export default CustomToolbar