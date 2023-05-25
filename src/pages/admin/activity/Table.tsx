// ** React Imports
import React, { useEffect, ChangeEvent } from 'react'

// ** MUI Imports
import { Typography } from '@mui/material'
import { DataGrid, GridSortModel } from '@mui/x-data-grid'

// ** Custom Table Components Imports
import UserTableToolbar from '@/pages/user/components/UserTableToolbar'

// ** Project/Other Imports
import CCDrawer from '@/pages/user/components/drawer/CCDrawer'
import EditCreatorDrawer from '@/pages/user/components/drawer/EditCreatorDrawer'
import { OperatorColumns } from '@/data/OperatorColumns'
import { SuperAgentColumns } from '@/data/SuperAgentColumns'
import { ContentCreatorColumns } from '@/data/ContentCreatorColumns'

// ** Hooks/Services
import { UserTableService } from '@/services/api/UserTableService'
import useDebounce from '@/hooks/useDebounce'
import { useErrorHandling } from '@/hooks/useErrorHandling'

// ** TanStack Query
import { useQuery } from '@tanstack/react-query'

// ** Zustand State Management
import { useUserTableStore } from '@/zustand/userTableStore'

import { CustomerColumns } from '@/data/CustomerColumns'

const ActivityLogsTable = () => {
  const {
    setPage,
    pageSize,
    setPageSize,
    role,
    setRole,
    roleId,
    columnType,
    setColumnType,
    rowCount,
    setRowCount,
    subRole,
    sort,
    setSort,
    sortName,
    setSortName,
    search,
    emailSearchValue,
    mobileSearchValue,
    searchValue,
    initialLoad,
    setInitialLoad,
    activeTab,
    setActiveTab,
    rowData,
    setRowData,
    handleRoleChange,
    openDrawer,
    drawerRole,
    drawerData,
    setDrawerRole,
    supervisorPage,
    saPage,
    ccPage,
    setSupervisorPage,
    setSaPage,
    setCcPage,
    setOpenDrawer
  } = useUserTableStore()

  const { handlePageChange, handleSearch, handleDrawerToggle } = useUserTableStore(state => ({
    handlePageChange: state.handlePageChange,
    handleSearch: state.handleSearch,
    handleDrawerToggle: state.handleDrawerToggle
  }))

  const { columns } = CustomerColumns()

  // ** Columns for DataGrid
  const operatorColumns = OperatorColumns()
  const superAgentColumns = SuperAgentColumns()
  const contentCreatorColumns = ContentCreatorColumns()
  const columnsMap = new Map([
    ['operators', operatorColumns],
    ['superagent', superAgentColumns],
    ['contentcreators', contentCreatorColumns]
  ])
  const filteredColumns: any = columnsMap.get(columnType) ?? []

  // ** Service/Hooks
  const { getUsers, getAllCustomers } = UserTableService()
  const { handleError } = useErrorHandling()
  const debouncedUsername = useDebounce(searchValue, 1000)
  const debouncedEmail = useDebounce(emailSearchValue, 1000)
  const debouncedMobile = useDebounce(mobileSearchValue, 1000)

  useEffect(() => {
    if (initialLoad) {
      setPage(1)
      setRole('CC')
      setColumnType('CC')
      setActiveTab('CC')
      setSort('desc')
      setSortName('created_at')
      handleRoleChange('CC')
      setInitialLoad(false)
    } else {
      handleRoleChange(activeTab)
    }
  }, [initialLoad, activeTab, handleRoleChange])

  useEffect(() => {
    setPage(1)
    setActiveTab('CC')
    setSort('desc')
    setSortName('created_at')
    handleRoleChange('CC')
    setOpenDrawer(null)
    handleDrawerToggle('')
    setDrawerRole(null)
    setRole('CC')
    setColumnType('CC')
  }, [])

  const { isLoading, isRefetching } = useQuery({
    queryKey: [
      'allUsers',
      role,
      roleId,
      sort,
      sortName,
      search,
      search === 'username'
        ? debouncedUsername || undefined
        : search === 'email'
        ? debouncedEmail || undefined
        : debouncedMobile || undefined,
      subRole,
      activeTab === 'SUPERVISOR' ? supervisorPage : activeTab === 'SA' ? saPage : ccPage
    ],
    queryFn: () =>
      getAllCustomers({
        data: {
          sort_by: sortName,
          sort: sort
        }
      }),
    onSuccess: response => {
      console.log(`SUCCESS`, response?.data)
      setRowCount(response?.total)
      setRowData(
        response?.data.map((item: any) => {
          return item
        })
      )
      setPageSize(response?.per_page)
      if (activeTab === 'SUPERVISOR') {
        setSupervisorPage(response?.current_page)
      } else if (activeTab === 'SA') {
        setSaPage(response?.current_page)
      } else if (activeTab === 'CC') {
        setCcPage(response?.current_page)
      }
    },
    onError: (e: any) => {
      handleError(e, `getUsers() UserTable.tsx`)
    },
    enabled: !initialLoad
  })

  console.log(`ROWDATATABLE`, rowData)

  const handleSortModel = (newModel: GridSortModel) => {
    if (newModel.length) {
      setSort(newModel[0].sort)
      setSortName(newModel[0].field)
    } else {
      setSort('asc')
      setSortName('username')
    }
  }

  return (
    <>
      <DataGrid
        page={activeTab === 'SUPERVISOR' ? supervisorPage - 1 : activeTab === 'SA' ? saPage - 1 : ccPage - 1}
        disableColumnMenu
        loading={isLoading || isRefetching}
        checkboxSelection={false}
        disableSelectionOnClick
        paginationMode='server'
        sortingMode='server'
        onSortModelChange={handleSortModel}
        autoHeight
        rows={rowData ?? []}
        getRowId={(row: any) => row?._id}
        columns={columns}
        pageSize={pageSize || 10}
        pagination
        onPageChange={handlePageChange}
        rowCount={rowCount || 10}
        rowsPerPageOptions={[10]}
        components={{ Toolbar: UserTableToolbar }}
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
      {/* CREATE Drawers */}
      <CCDrawer open={openDrawer === 'CC'} toggle={() => handleDrawerToggle('CC')} />

      {/* EDIT Drawers */}
      {drawerRole === 'CC' && (
        <EditCreatorDrawer data={drawerData} open={drawerRole === 'CC'} toggle={() => setDrawerRole(null)} />
      )}
    </>
  )
}

export default ActivityLogsTable
