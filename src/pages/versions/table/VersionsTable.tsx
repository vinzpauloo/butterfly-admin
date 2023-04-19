// ** React Imports
import React from 'react'

// ** MUI Imports
import { DataGrid, GridColumns, GridRowModel } from '@mui/x-data-grid'

// ** Other Imports
import { useSiteContext } from '../context/SiteContext'
import { MenuItemData } from '../data/MenuItemData'

// type SiteColumns = {
//   [key: string]: GridColumns
// }

//If we want a feature wherein columns change as well
// const siteColumns: SiteColumns = {
//   site1: columns,
//   site2: columns,
//   site3: columns,
//   site4: columns
// }

type SiteRows = {
  [key: string]: GridRowModel[]
}

const VersionsTable = () => {
  const { selectedSite } = useSiteContext()
  const { columns, row1, row2, row3, row4 } = MenuItemData()

  const siteRows: SiteRows = {
    site1: row1,
    site2: row2,
    site3: row3,
    site4: row4
  }

  return (
    <DataGrid
      disableColumnMenu
      rowsPerPageOptions={[]}
      checkboxSelection={false}
      disableSelectionOnClick
      autoHeight
      columns={columns}
      rows={siteRows[selectedSite] ?? []}
      pagination
    />
  )
}

// columns={siteColumns[selectedSite]} If we want a feature wherein columns change as well

export default VersionsTable
