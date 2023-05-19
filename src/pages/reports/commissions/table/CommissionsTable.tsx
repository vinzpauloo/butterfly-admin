// ** React Imports
import React, { useEffect, useState } from 'react'

// ** MUI Imports
import { DataGrid } from '@mui/x-data-grid'

// ** TanStack Query
import { useQuery } from '@tanstack/react-query'

// ** Project/Component Imports
import { CommissionsColumns } from '@/data/CommissionsColumns'

// ** Hooks/Services
import { useAuth } from '@/services/useAuth'
import { useErrorHandling } from '@/hooks/useErrorHandling'
import { ReportsService } from '@/services/api/ReportsService'

// ** Zustand Store
import { useReportsCommissionsStore } from '@/zustand/reportsCommissionsStore'

const CommissionsTable = () => {
  // ** State
  const [siteId, setSiteId] = useState<string>('1')

  // ** Hooks/Services
  const { user } = useAuth()
  const { handleError } = useErrorHandling()
  const { getSecurityFunds } = ReportsService()

  // ** Store
  const { selectedSite, rowData, setRowData } = useReportsCommissionsStore()

  // ** Data
  const { columns } = CommissionsColumns()

  useEffect(() => {
    if (user?.role === 'GOD') {
      setSiteId(selectedSite)
    }
  }, [selectedSite])

  // ** Api Method
  const { isLoading, isRefetching } = useQuery({
    queryKey: ['reportsSecurityFunds', siteId],
    queryFn: () =>
      getSecurityFunds({
        params: {
          sort: `desc`,
          sort_by: `created_at`,
          site_id: siteId
        }
      }),
    onSuccess: (data: any) => {
      setRowData(data?.data)
    },
    onError: (e: any) => {
      handleError(e, `getSecurityFunds() Commissions Table`)
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

export default CommissionsTable
