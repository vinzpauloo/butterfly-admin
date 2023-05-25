// ** React Imports
import React, { ChangeEvent } from 'react'

// ** MUI Imports
import { DataGrid } from '@mui/x-data-grid'

// ** Custom Table Components Imports
import ActivityLogsToolbar from './Toolbar'

// ** Project/Other Imports
import { ActivityLogsColumns } from '@/data/ActivityLogsColumns'

// ** Hooks/Services
import { ActivityLogsService } from '@/services/api/ActivityLogsService'
import { useErrorHandling } from '@/hooks/useErrorHandling'

// import useDebounce from '@/hooks/useDebounce'

// ** TanStack Query
import { useQuery } from '@tanstack/react-query'

// ** Zustand State Management
import { useActivityLogsStore } from '@/zustand/activityLogsStore'

const ActivityLogsTable = () => {
  const {
    page,
    setPage,
    pageSize,
    setPageSize,
    role,
    roleId,
    rowCount,
    setRowCount,
    sort,
    sortName,
    emailSearchValue,
    mobileSearchValue,
    searchValue,
    rowData,
    setRowData
  } = useActivityLogsStore()

  const { handlePageChange, handleSearch, handleDrawerToggle, handleSortModel } = useActivityLogsStore(state => ({
    handlePageChange: state.handlePageChange,
    handleSearch: state.handleSearch,
    handleDrawerToggle: state.handleDrawerToggle,
    handleSortModel: state.handleSortModel
  }))

  // ** Columns for DataGrid
  const { columns } = ActivityLogsColumns()

  // ** Service/Hooks
  const { getActivityLogs } = ActivityLogsService()
  const { handleError } = useErrorHandling()

  const { isLoading, isRefetching } = useQuery({
    queryKey: ['activityLogs', sort, sortName, page],
    queryFn: () =>
      getActivityLogs({
        params: {
          sort_by: sortName,
          sort: sort,
          page: page
        }
      }),
    onSuccess: response => {
      setRowCount(response?.total)
      setRowData(response?.data)
      setPageSize(response?.per_page)
      setPage(response?.current_page)
    },
    onError: (e: any) => {
      handleError(e, `getActivityLogs() ActivityTable.tsx`)
    }
  })

  return (
    <>
      <DataGrid
        disableColumnMenu
        loading={isLoading || isRefetching}
        checkboxSelection={false}
        disableSelectionOnClick
        paginationMode='server'
        sortingMode='server'
        onSortModelChange={handleSortModel}
        autoHeight
        rows={rowData ?? []}
        getRowId={(row: any) => row?._id || row?.id}
        columns={columns}
        pageSize={pageSize || 10}
        pagination
        onPageChange={handlePageChange}
        rowCount={rowCount || 10}
        rowsPerPageOptions={[10]}
        components={{ Toolbar: ActivityLogsToolbar }}
        componentsProps={{
          toolbar: {
            toggle: (role: any) => handleDrawerToggle(role),
            role: role,
            role_id: roleId,
            usernameValue: searchValue,
            emailValue: emailSearchValue,
            mobileValue: mobileSearchValue,
            clearUsername: () => handleSearch('', 'username'),
            clearEmail: () => handleSearch('', 'email'),
            clearMobile: () => handleSearch('', 'mobile'),
            clearAll: () => {
              handleSearch('', 'username')
              handleSearch('', 'email')
              handleSearch('', 'mobile')
            },
            onUsernameChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value, 'username'),
            onEmailChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value, 'email'),
            onMobileChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value, 'mobile')
          }
        }}
        sx={{ padding: 0 }}
      />
    </>
  )
}

export default ActivityLogsTable
