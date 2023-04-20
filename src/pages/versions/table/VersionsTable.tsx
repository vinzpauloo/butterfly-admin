// ** React Imports
import React, { useEffect, useState } from 'react'

// ** MUI Imports
import { DataGrid } from '@mui/x-data-grid'

// ** Other Imports
import { useSiteContext } from '../context/SiteContext'
import { MenuItemData } from '../data/MenuItemData'

// ** TanStack Query
import { useQuery } from '@tanstack/react-query'

// ** Hooks/Services
import { ApkService } from '@/services/api/ApkService'

const VersionsTable = () => {
  const { selectedSite } = useSiteContext()
  const { getAllApks } = ApkService()
  const { columns } = MenuItemData()

  const [rowData, setRowData] = useState<[]>([])
  const [siteId, setSiteId] = useState<string | undefined>()

  useEffect(() => {
    setSiteId(selectedSite)
  }, [selectedSite])

  const { isLoading, isRefetching } = useQuery({
    queryKey: ['allApk', siteId],
    queryFn: () =>
      getAllApks({
        data: {
          site_id: siteId
        }
      }),
    onSuccess: (data: any) => {
      setRowData(data?.data)
    }
  })

  return (
    <DataGrid
      disableColumnMenu
      loading={isLoading || isRefetching}
      rowsPerPageOptions={[]}
      checkboxSelection={false}
      disableSelectionOnClick
      autoHeight
      columns={columns}
      rows={rowData ?? []}
      pagination
    />
  )
}

export default VersionsTable
