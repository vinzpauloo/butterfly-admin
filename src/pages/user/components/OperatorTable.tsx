// ** React Imports
import React, { useEffect, ChangeEvent } from 'react'

// ** MUI Imports
import { Typography } from '@mui/material'
import { DataGrid, GridSortModel } from '@mui/x-data-grid'

// ** Custom Table Components Imports
import UserTableToolbar from './UserTableToolbar'

// ** Project/Other Imports
import SupervisorDrawer from './drawer/SupervisorDrawer'
import EditSupervisorDrawer from './drawer/EditSupervisorDrawer'
import { OperatorColumns } from '@/data/OperatorColumns'

// import { SuperAgentColumns } from '@/data/SuperAgentColumns'
// import { ContentCreatorColumns } from '@/data/ContentCreatorColumns'

// ** Hooks/Services
import { UserTableService } from '../../../services/api/UserTableService'
import useDebounce from '@/hooks/useDebounce'
import { useErrorHandling } from '@/hooks/useErrorHandling'

// ** TanStack Query
import { useQuery } from '@tanstack/react-query'

// ** Zustand State Management
import { useUserTableStore } from '@/zustand/userTableStore'
import Container from '@/pages/components/Container'

const OperatorTable = () => {
  const {
    setPage,
    pageSize,
    setPageSize,
    role,
    setRole,
    roleId,

    // columnType,
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

  // ** Columns for DataGrid
  const operatorColumns = OperatorColumns()

  // const superAgentColumns = SuperAgentColumns()
  // const contentCreatorColumns = ContentCreatorColumns()
  // const columnsMap = new Map([
  //   ['OPERATIONS', operatorColumns],
  //   ['superagent', superAgentColumns],
  //   ['contentcreators', contentCreatorColumns]
  // ])
  // const filteredColumns: any = columnsMap.get(columnType) ?? []

  // ** Service/Hooks
  const { getUsers } = UserTableService()
  const { handleError } = useErrorHandling()
  const debouncedUsername = useDebounce(searchValue, 1000)
  const debouncedEmail = useDebounce(emailSearchValue, 1000)
  const debouncedMobile = useDebounce(mobileSearchValue, 1000)

  useEffect(() => {
    if (initialLoad) {
      setPage(1)
      setRole('OPERATIONS')
      setColumnType('OPERATIONS')
      setActiveTab('OPERATIONS')
      setSort('desc')
      setSortName('created_at')
      handleRoleChange('OPERATIONS')
      setInitialLoad(false)
    } else {
      handleRoleChange(activeTab)
    }
  }, [initialLoad, activeTab, handleRoleChange])

  useEffect(() => {
    setPage(1)
    setActiveTab('OPERATIONS')
    setSort('desc')
    setSortName('created_at')
    handleRoleChange('OPERATIONS')
    setOpenDrawer(null)
    handleDrawerToggle('')
    setDrawerRole(null)
    setRole('OPERATIONS')
    setColumnType('OPERATIONS')
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
      activeTab === 'OPERATIONS' ? supervisorPage : activeTab === 'SA' ? saPage : ccPage
    ],
    queryFn: () =>
      getUsers({
        data: {
          role: role,
          role_id: roleId,
          page: activeTab === 'OPERATIONS' ? supervisorPage : activeTab === 'SA' ? saPage : ccPage,
          sort: sort,
          sort_by: sortName,
          search_by: search,
          search_value:
            search === 'username' ? debouncedUsername : search === 'email' ? debouncedEmail : debouncedMobile,
          ...(role === 'OPERATIONS' ? { with: subRole } : {})
        }
      }),
    onSuccess: response => {
      setRowCount(response?.total)
      console.log(response?.data)
      setRowData(response?.data)
      setPageSize(response?.per_page)
      if (activeTab === 'OPERATIONS') {
        setSupervisorPage(response?.current_page)
      } else if (activeTab === 'SA') {
        setSaPage(response?.current_page)
      } else if (activeTab === 'CC') {
        setCcPage(response?.current_page)
      }
    },
    onError: (e: any) => {
      handleError(e, `getUsers() UserTable.tsx`)
    }
  })

  const handleSortModel = (newModel: GridSortModel) => {
    if (newModel.length) {
      setSort(newModel[0].sort)
      setSortName(newModel[0].field)
    } else {
      setSort('asc')
      setSortName('username')
    }
  }

  console.log(`drawerRole`, drawerRole)

  return (
    <Container>
      <Typography variant='h4' component='h4'>
        Operators
      </Typography>
      <DataGrid
        page={activeTab === 'OPERATIONS' ? supervisorPage - 1 : activeTab === 'SA' ? saPage - 1 : ccPage - 1}
        disableColumnMenu
        loading={isLoading || isRefetching}
        checkboxSelection={false}
        disableSelectionOnClick
        paginationMode='server'
        sortingMode='server'
        onSortModelChange={handleSortModel}
        autoHeight
        rows={rowData ?? []}
        columns={operatorColumns}
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
      <SupervisorDrawer open={openDrawer === 'OPERATIONS'} toggle={() => handleDrawerToggle('OPERATIONS')} />

      {/* EDIT Drawers */}
      {drawerRole === 'OPERATIONS' && (
        <EditSupervisorDrawer data={drawerData} open={drawerRole === 'OPERATIONS'} toggle={() => setDrawerRole(null)} />
      )}
    </Container>
  )
}

export default OperatorTable
