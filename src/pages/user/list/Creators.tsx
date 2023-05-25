// ** React Imports
import React, { useEffect, ChangeEvent } from 'react'

// ** MUI Imports
import { Typography } from '@mui/material'
import { DataGrid, GridSortModel } from '@mui/x-data-grid'

// ** Custom Table Components Imports
import UserTableToolbar from '../components/UserTableToolbar'

// ** Project/Other Imports
import CCDrawer from '../components/drawer/CCDrawer'
import EditCreatorDrawer from '../components/drawer/EditCreatorDrawer'

// import { OperatorColumns } from '@/data/OperatorColumns'
// import { SuperAgentColumns } from '@/data/SuperAgentColumns'
import { ContentCreatorColumns } from '@/data/ContentCreatorColumns'

// ** Hooks/Services
import { UserTableService } from '../../../services/api/UserTableService'
import useDebounce from '@/hooks/useDebounce'
import { useErrorHandling } from '@/hooks/useErrorHandling'

// ** TanStack Query
import { useQuery } from '@tanstack/react-query'

// ** Zustand State Management
import { useUserTableStore } from '@/zustand/userTableStore'
import Container from '@/pages/components/Container'

const Creators = () => {
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
  const contentCreatorColumns = ContentCreatorColumns()

  // ** Service/Hooks
  const { getUsers } = UserTableService()
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
      getUsers({
        data: {
          role: role,
          role_id: roleId,
          page: activeTab === 'SUPERVISOR' ? supervisorPage : activeTab === 'SA' ? saPage : ccPage,
          sort: sort,
          sort_by: sortName,
          search_by: search,
          search_value:
            search === 'username' ? debouncedUsername : search === 'email' ? debouncedEmail : debouncedMobile,
          ...(role === 'SUPERVISOR' ? { with: subRole } : {})
        }
      }),
    onSuccess: response => {
      setRowCount(response?.total)
      setRowData(response?.data)
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

  return (
    <Container>
      <Typography variant='h4' component='h4'>
        Content Creators
      </Typography>
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
        columns={contentCreatorColumns}
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
    </Container>
  )
}

export default Creators
