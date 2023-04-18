// ** React Imports
import React, { useState, useEffect, ChangeEvent, useCallback } from 'react'

// ** MUI Imports
import { Box, Card, Grid, Tab } from '@mui/material'
import { DataGrid, GridSortModel } from '@mui/x-data-grid'
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
import { useTranslateString } from '@/utils/TranslateString';

// ** Hooks
import { useUsersTable } from '../../../services/api/useUsersTable'

// ** TanStack Query
import { useQuery } from '@tanstack/react-query'
import { operatorColumns } from '@/data/OperatorColumns'
import { superAgentColumns } from '@/data/SuperAgentColumns'
import { contentCreatorColumns } from '@/data/ContentCreatorColumns'


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

const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

type SortType = 'asc' | 'desc' | undefined | null

const UserTable = () => {
  const { getUsers } = useUsersTable()
  const [page, setPage] = useState<number>()
  const [pageSize, setPageSize] = useState<number>()
  const [role, setRole] = useState('SUPERVISOR')
  const [roleId, setRoleId] = useState<any>()
  const [columnType, setColumnType] = useState('SUPERVISOR')
  const [rowCount, setRowCount] = useState<any>()

  const [subRole] = useState('role')

  const [sort, setSort] = useState<SortType>('desc')
  const [sortName, setSortName] = useState<string>('created_at')

  const [search, setSearch] = useState<string | undefined>(undefined)
  const [emailSearchValue, setEmailSearchValue] = useState<string | undefined>(undefined)
  const [mobileSearchValue, setMobileSearchValue] = useState<string | undefined>(undefined)
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined)

  const debouncedUsername = useDebounce(searchValue, 1000)
  const debouncedEmail = useDebounce(emailSearchValue, 1000)
  const debouncedMobile = useDebounce(mobileSearchValue, 1000)

  const { isLoading, isRefetching } = useQuery({
    queryKey: [
      'allUsers',
      page,
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
      subRole
    ],
    queryFn: () =>
      getUsers({
        data: {
          role: role,
          role_id: roleId,
          page: page,
          sort: sort,
          sort_by: sortName,
          search_by: search,
          search_value:
            search === 'username' ? debouncedUsername : search === 'email' ? debouncedEmail : debouncedMobile,
          ...(role === 'SUPERVISOR' ? { with: subRole } : {})
        }
      }),
    onSuccess: (data: any) => {
      setRowCount(data?.total)
      setRowData(data?.data)
      setPageSize(data?.per_page)
      setPage(data?.current_page)
    }
  })

  const handleRoleChange = useCallback((newRole: any) => {
    setRole(newRole)

    // Updates the row data based on the newRole
    switch (newRole) {
      case 'SUPERVISOR':
        setColumnType('operators')
        break
      case 'SA':
        setColumnType('superagent')
        break
      case 'CC':
        setColumnType('contentcreators')
        break
      default:
        break
    }
  }, [])

  const [rowData, setRowData] = useState<any>()

  const handlePageChange = useCallback((newPage: any) => {
    setPage(newPage + 1)
  }, [])

  const columnsMap = new Map([
    ['operators', operatorColumns],
    ['superagent', superAgentColumns],
    ['contentcreators', contentCreatorColumns]
  ])

  const filteredColumns: any = columnsMap.get(columnType) ?? []

  useEffect(() => {
    setRole('SUPERVISOR')
    setColumnType('operators')
    setActiveTab('SUPERVISOR')
    setRoleId('2')
  }, [])

  const handleSortModel = useCallback((newModel: GridSortModel) => {
    if (newModel.length) {
      setSort(newModel[0].sort)
      setSortName(newModel[0].field)
    } else {
      setSort('asc')
      setSortName('username')
    }
  }, [])

  const handleSearch = useCallback((value: string, type: string) => {
    setSearch(type)
    switch (type) {
      case 'username':
        setSearchValue(value)
        break
      case 'email':
        setEmailSearchValue(value)
        break
      case 'mobile':
        setMobileSearchValue(value)
        break
    }
  }, [])

  const [activeTab, setActiveTab] = useState<any>()
  const handleChange = (event: any, value: string) => {
    setActiveTab(value)
  }

  useEffect(() => {
    handleRoleChange(activeTab)
  })

  type DrawerType = 'SUPERVISOR' | 'SA' | 'CC' | null
  const [openDrawer, setOpenDrawer] = useState<DrawerType>(null)
  const handleDrawerToggle = (role: string | null) => {
    let drawerType: DrawerType

    switch (role) {
      case 'SUPERVISOR':
        drawerType = 'SUPERVISOR'
        break
      case 'SA':
        drawerType = 'SA'
        break
      case 'CC':
        drawerType = 'CC'
        break
      default:
        drawerType = null
    }
    setOpenDrawer(prevDrawer => (prevDrawer === drawerType ? null : drawerType))
  }

  const TranslateString = useTranslateString()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <Box sx={{ mx: 5, mt: 5, ...styles.buttonContainer }}>
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
                    <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }}>
                      <Icon fontSize={20} icon='mdi:account-outline' />
                      {TranslateString("Operators")}
                    </Box>
                  }
                />
                <Tab
                  value='SA'
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }}>
                      <Icon fontSize={20} icon='mdi:lock-outline' />
                      {TranslateString("Super Agent")}
                    </Box>
                  }
                />
                <Tab
                  value='CC'
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }}>
                      <Icon fontSize={20} icon='mdi:bookmark-outline' />
                      {TranslateString("Content Creator")}
                    </Box>
                  }
                />
              </TabList>
            </TabContext>
          </Box>

          <DataGrid
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
            onSortModelChange={handleSortModel}
            components={{ Toolbar: UserTableToolbar }}
            componentsProps={{
              toolbar: {
                toggle: (role: any) => handleDrawerToggle(role),
                role: role,
                role_id: roleId,
                usernameValue: searchValue,
                emailValue: emailSearchValue,
                mobileValue: mobileSearchValue,
                clearSearch: () => {
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
          <SupervisorDrawer open={openDrawer === 'SUPERVISOR'} toggle={() => handleDrawerToggle('SUPERVISOR')} />
          <SADrawer open={openDrawer === 'SA'} toggle={() => handleDrawerToggle('SA')} />
          <CCDrawer open={openDrawer === 'CC'} toggle={() => handleDrawerToggle('CC')} />
        </Card>
      </Grid>
    </Grid>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    overflow: 'hidden'
  },
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
    mb: 0
  },
  usersButtons: {
    display: 'flex',
    gap: 2,
    flexWrap: 'wrap',
    mb: {
      xs: 5,
      sm: 5,
      md: 5,
      lg: 0,
      xl: 0
    }
  },
  userButton: {
    border: 1,
    height: '56px',
    minWidth: {
      xs: '224px',
      sm: 'auto',
      md: 'auto',
      lg: '224px'
    },
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    transition: 'background-color 0.1s',
    '&:hover': {
      backgroundColor: `#9747FF`,
      color: 'white'
    },
    textTransform: 'uppercase'
  },
  linkButton: {
    textDecoration: 'none'
  },
  createAccount: {
    border: 1,
    height: '56px',
    minWidth: '224px',
    width: {
      xs: '100%',
      md: '100%',
      lg: '224px'
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    borderColor: 'black',
    textTransform: 'uppercase',
    color: 'black',
    backgroundColor: '#FFF',
    '&:hover': {
      backgroundColor: `#9747FF`,
      color: 'white'
    }
  },
  tableContainer: {
    minHeight: 540,
    overflowX: 'auto'
  },
  paginationContainer: {
    margin: '0 auto'
  },
  paginationContent: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  icon: {
    fontSize: 12,
    color: 'black'
  },
  text: {
    color: 'black',
    fontSize: 12
  },
  pageNumber: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    borderRadius: 2,
    marginLeft: 2,
    marginRight: 2,
    cursor: 'pointer'
  },
  searchContainer: {
    padding: 5,
    borderTop: '1px solid black'
  },
  cardHeader: {
    margin: 0,
    padding: 0
  },
  searchInput: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      md: 'column',
      lg: 'row'
    },
    padding: 0,
    gap: 5
  },
  fullWidth: {
    width: '100%'
  },
  dataGrid: {
    padding: 5
  }
}

export default UserTable
