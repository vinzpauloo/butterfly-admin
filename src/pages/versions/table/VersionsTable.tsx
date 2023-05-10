// ** React Imports
import React, { useEffect, useState } from 'react'

// ** MUI Imports
import { DataGrid } from '@mui/x-data-grid'

// ** Other Imports
import { useSiteContext } from '../../../context/SiteContext'
import { MenuItemData } from '../../../data/MenuItemData'

// ** TanStack Query
import { useQuery } from '@tanstack/react-query'

// ** Hooks/Services
import { ApkService } from '@/services/api/ApkService'
import { useAuth } from '@/services/useAuth'
import { useErrorHandling } from '@/hooks/useErrorHandling'

type SortType = 'asc' | 'desc' | undefined | null

const VersionsTable = () => {
  // ** Hooks/Services
  const { getAllApks } = ApkService()
  const { handleError } = useErrorHandling()
  const { user } = useAuth()

  // ** Context
  const { selectedSite } = useSiteContext()

  const { columns } = MenuItemData()

  // ** States
  const [rowData, setRowData] = useState<[]>([])
  const [siteId, setSiteId] = useState<string>('1')
  const [sort] = useState<SortType>('desc')
  const [sortName] = useState<string>('created_at')

  useEffect(() => {
    if (user?.role === 'GOD') {
      setSiteId(selectedSite)
    }
  }, [selectedSite])

  const { isLoading, isRefetching } = useQuery({
    queryKey: ['allApk', siteId],
    queryFn: () =>
      getAllApks({
        data: {
          site_id: siteId,
          sort: sort,
          sort_by: sortName
        }
      }),
    onSuccess: (data: any) => {
      setRowData(data?.data)
    },
    onError: (e: any) => {
      handleError(e, `getAllApks() Versions Table`)
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
