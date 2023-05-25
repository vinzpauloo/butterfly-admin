// ** React Imports
import React, { useEffect, ChangeEvent } from 'react'

// ** MUI Imports
import { Typography } from '@mui/material'
import { DataGrid, GridSortModel } from '@mui/x-data-grid'

// ** Custom Table Components Imports
import UserTableToolbar from '../components/UserTableToolbar'

// ** Project/Other Imports
import SADrawer from '../components/drawer/SADrawer'
import EditSuperAgentDrawer from '../components/drawer/editsuperagent'
import { OperatorColumns } from '@/data/OperatorColumns'
import { SuperAgentColumns } from '@/data/SuperAgentColumns'
import { ContentCreatorColumns } from '@/data/ContentCreatorColumns'

// ** Hooks/Services
import { UserTableService } from '../../../services/api/UserTableService'
import { CreateAccount } from '@/services/api/CreateAccount'
import useDebounce from '@/hooks/useDebounce'
import { useErrorHandling } from '@/hooks/useErrorHandling'

// ** TanStack Query
import { useQuery, useQueries } from '@tanstack/react-query'

// ** Zustand State Management
import { useUserTableStore } from '@/zustand/userTableStore'
import Container from '@/pages/components/Container'

const SuperAgents = () => {
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
    languages,
    setLanguages,
    currencies,
    setCurrencies,
    rowData,
    setRowData,
    handleRoleChange,
    openDrawer,
    drawerRole,
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
  const superAgentColumns = SuperAgentColumns()
  const contentCreatorColumns = ContentCreatorColumns()
  const columnsMap = new Map([
    ['operators', operatorColumns],
    ['superagent', superAgentColumns],
    ['contentcreators', contentCreatorColumns]
  ])
  const filteredColumns: any = columnsMap.get(columnType) ?? []

  // ** Service/Hooks
  const { getUsers } = UserTableService()
  const { handleError } = useErrorHandling()
  const { getLanguages, getCurrency } = CreateAccount()
  const debouncedUsername = useDebounce(searchValue, 1000)
  const debouncedEmail = useDebounce(emailSearchValue, 1000)
  const debouncedMobile = useDebounce(mobileSearchValue, 1000)

  useEffect(() => {
    if (initialLoad) {
      setPage(1)
      setRole('SA')
      setColumnType('SA')
      setActiveTab('SA')
      setSort('desc')
      setSortName('created_at')
      handleRoleChange('SA')
      setInitialLoad(false)
    } else {
      handleRoleChange(activeTab)
    }
  }, [initialLoad, activeTab, handleRoleChange])

  useEffect(() => {
    setPage(1)
    setActiveTab('SA')
    setSort('desc')
    setSortName('created_at')
    handleRoleChange('SA')
    setOpenDrawer(null)
    handleDrawerToggle('')
    setDrawerRole(null)
    setRole('SA')
    setColumnType('SA')
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
    },
    enabled: !initialLoad
  })

  useQueries({
    queries: [
      {
        queryKey: ['Languages'],
        queryFn: getLanguages,
        onSuccess: (response: { data: [] }) => {
          setLanguages(response?.data)
        },
        onError: (e: any) => {
          handleError(e, `getLanguages() UserTable.tsx`)
        }
      },
      {
        queryKey: ['Currencies'],
        queryFn: getCurrency,
        onSuccess: (response: { data: [] }) => {
          setCurrencies(response?.data)
        },
        onError: (e: any) => {
          handleError(e, `getCurrency() UserTable.tsx`)
        }
      }
    ]
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
        Super Agents
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
        columns={filteredColumns}
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
      <SADrawer
        open={openDrawer === 'SA'}
        toggle={() => handleDrawerToggle('SA')}
        languages={languages}
        currencies={currencies}
      />

      {/* EDIT Drawers */}
      {drawerRole === 'SA' && <EditSuperAgentDrawer open={drawerRole === 'SA'} toggle={() => setDrawerRole(null)} />}
    </Container>
  )
}

SuperAgents.acl = {
  action: 'read',
  subject: 'sa-page'
}

export default SuperAgents
