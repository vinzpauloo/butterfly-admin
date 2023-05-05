// ** React Imports
import React, { useEffect, ChangeEvent } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import { Box, Card, Grid, Tab } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import MuiTabList, { TabListProps } from '@mui/lab/TabList'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Table Components Imports
import UserTableToolbar from './UserTableToolbar'

// ** Other Imports
import SupervisorDrawer from './drawer/SupervisorDrawer'
import SADrawer from './drawer/SADrawer'
import CCDrawer from './drawer/CCDrawer'
import EditSupervisorDrawer from './drawer/EditSupervisorDrawer'
import EditSuperAgentDrawer from './drawer/editsuperagent'
import EditCreatorDrawer from './drawer/EditCreatorDrawer'
import { OperatorColumns } from '@/data/OperatorColumns'
import { SuperAgentColumns } from '@/data/SuperAgentColumns'
import { ContentCreatorColumns } from '@/data/ContentCreatorColumns'

// ** Hooks/Services
import { UserTableService } from '../../../services/api/UserTableService'
import { CreateAccount } from '@/services/api/CreateAccount'
import useDebounce from '@/hooks/useDebounce'

// ** TanStack Query
import { useQuery, useQueries } from '@tanstack/react-query'

// ** Utils Imports
import { useTranslateString } from '@/utils/TranslateString'

// ** Zustand State Management
import { useUserTableStore } from '@/zustand/userTableStore'

import { captureSuccess, captureError } from '@/services/Sentry'

const UserTable = () => {
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
    drawerData,
    setDrawerRole,
    supervisorPage,
    saPage,
    ccPage,
    setSupervisorPage,
    setSaPage,
    setCcPage
  } = useUserTableStore()

  const { handlePageChange, handleSearch, handleDrawerToggle } = useUserTableStore(state => ({
    handlePageChange: state.handlePageChange,
    handleSearch: state.handleSearch,
    handleDrawerToggle: state.handleDrawerToggle
  }))

  // ** Router
  const router = useRouter()
  const currentLocation = router.asPath

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
  const { getLanguages, getCurrency } = CreateAccount()
  const debouncedUsername = useDebounce(searchValue, 1000)
  const debouncedEmail = useDebounce(emailSearchValue, 1000)
  const debouncedMobile = useDebounce(mobileSearchValue, 1000)

  useEffect(() => {
    if (initialLoad) {
      setPage(1)
      setRole('SUPERVISOR')
      setColumnType('operators')
      setActiveTab('SUPERVISOR')
      setSort('desc')
      setSortName('created_at')
      handleRoleChange('SUPERVISOR')
      setInitialLoad(false)
    } else {
      handleRoleChange(activeTab)
    }
  }, [initialLoad, activeTab, handleRoleChange])

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
      captureSuccess(currentLocation, `getUsers() ${JSON.stringify(response)}`)
    },
    onError: error => {
      captureError(currentLocation, `ERROR: ${error}`, `queryFn: getUsers()`)
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
        }
      },
      {
        queryKey: ['Currencies'],
        queryFn: getCurrency,
        onSuccess: (response: { data: [] }) => {
          setCurrencies(response?.data)
        }
      }
    ]
  })

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <UserTabs />

          <DataGrid
            page={activeTab === 'SUPERVISOR' ? supervisorPage - 1 : activeTab === 'SA' ? saPage - 1 : ccPage - 1}
            disableColumnMenu
            loading={isLoading || isRefetching}
            checkboxSelection={false}
            disableSelectionOnClick
            paginationMode='server'
            sortingMode='server'
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
                onUsernameChange: (event: ChangeEvent<HTMLInputElement>) =>
                  handleSearch(event.target.value, 'username'),
                onEmailChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value, 'email'),
                onMobileChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value, 'mobile')
              }
            }}
            sx={{ padding: 0 }}
          />
          {/* CREATE Drawers */}
          <SupervisorDrawer open={openDrawer === 'SUPERVISOR'} toggle={() => handleDrawerToggle('SUPERVISOR')} />
          <SADrawer
            open={openDrawer === 'SA'}
            toggle={() => handleDrawerToggle('SA')}
            languages={languages}
            currencies={currencies}
          />
          <CCDrawer open={openDrawer === 'CC'} toggle={() => handleDrawerToggle('CC')} />

          {/* EDIT Drawers */}
          {drawerRole === 'SUPERVISOR' && (
            <EditSupervisorDrawer
              data={drawerData}
              open={drawerRole === 'SUPERVISOR'}
              toggle={() => setDrawerRole(null)}
            />
          )}
          {drawerRole === 'SA' && (
            <EditSuperAgentDrawer open={drawerRole === 'SA'} toggle={() => setDrawerRole(null)} />
          )}
          {drawerRole === 'CC' && (
            <EditCreatorDrawer data={drawerData} open={drawerRole === 'CC'} toggle={() => setDrawerRole(null)} />
          )}
        </Card>
      </Grid>
    </Grid>
  )
}

function UserTabs() {
  const TranslateString = useTranslateString()

  const { activeTab } = useUserTableStore()
  const handleChange = useUserTableStore(state => state.handleChange)

  return (
    <Box sx={styles.buttonContainer}>
      <TabContext value={activeTab || 'SUPERVISOR'}>
        <TabList
          variant='scrollable'
          scrollButtons='auto'
          onChange={handleChange}
          aria-label='forced scroll tabs example'
        >
          <Tab
            value='SUPERVISOR'
            label={
              <Box sx={styles.tabStyle}>
                <Icon fontSize={20} icon='mdi:account-outline' />
                {TranslateString('Operators')}
              </Box>
            }
          />
          <Tab
            value='SA'
            label={
              <Box sx={styles.tabStyle}>
                <Icon fontSize={20} icon='mdi:lock-outline' />
                {TranslateString('Super Agent')}
              </Box>
            }
          />
          <Tab
            value='CC'
            label={
              <Box sx={styles.tabStyle}>
                <Icon fontSize={20} icon='mdi:bookmark-outline' />
                {TranslateString('Content Creator')}
              </Box>
            }
          />
        </TabList>
      </TabContext>
    </Box>
  )
}

const TabList = styled(MuiTabList)<TabListProps>(({ theme }) => ({
  '& .MuiTabs-indicator': {
    display: 'none'
  },
  '& .Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`
  },
  '& .MuiTab-root': {
    minWidth: 65,
    minHeight: 40,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.up('md')]: {
      minWidth: 130
    }
  }
}))

const styles = {
  buttonContainer: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'column',
      md: 'column',
      lg: 'row'
    },
    justifyContent: {
      xs: 'flex-start',
      md: 'flex-start',
      lg: 'space-between'
    },
    mx: 5,
    mt: 5
  },
  tabStyle: {
    display: 'flex',
    alignItems: 'center',
    '& svg': { mr: 2 }
  }
}

export default UserTable
