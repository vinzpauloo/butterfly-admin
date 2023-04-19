// ** React Imports
import React, { useState } from 'react'

// ** MUI Imports
import { DataGrid, GridRowModel } from '@mui/x-data-grid'

// ** Other Imports
import { useSiteContext } from '../context/SiteContext'
import { MenuItemData } from '../data/MenuItemData'

// ** TanStack Query
import { useQuery } from '@tanstack/react-query'

// ** Hooks/Services
import { ApkService } from '@/services/api/ApkService'

interface SiteRows {
  [key: string]: GridRowModel[]
}

const VersionsTable = () => {
  const { selectedSite } = useSiteContext()
  const { getAllApks } = ApkService()
  const { columns, row1, row2, row3, row4 } = MenuItemData()

  const [rowData, setRowData] = useState<[]>([])

  const siteRows: SiteRows = {
    site1: row1,
    site2: row2,
    site3: row3,
    site4: row4
  }

  const { isLoading, isFetching } = useQuery({
    queryKey: ['allApk'],
    queryFn: () => getAllApks(),
    onSuccess: (data: any) => {
      console.log(`Success, APK data`, data)
      setRowData(data?.data)
    }
  })

  return (
    <DataGrid
      disableColumnMenu
      rowsPerPageOptions={[]}
      checkboxSelection={false}
      disableSelectionOnClick
      autoHeight
      columns={columns}
      // rows={siteRows[selectedSite] ?? []}
      rows={rowData ?? []}
      pagination
    />
  )
}

export default VersionsTable
