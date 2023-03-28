// ** React Imports
import React, { useState, useEffect, ChangeEvent } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import { Box, Card, Grid, Button, Tab } from '@mui/material'
import { DataGrid, GridSortModel } from '@mui/x-data-grid'
import MuiTabList, { TabListProps } from '@mui/lab/TabList'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Table Components Imports
import UserTableToolbar from './UserTableToolbar'

// ** Style Imports
import styles from '@/pages/user/list/styles'

// ** Other Imports
import operatorColumns from '@/pages/user/data/OperatorColumn'
import superAgentColumns from '@/pages/user/data/SuperAgentColumn'
import contentCreatorColumns from '@/pages/user/data/ContentCreatorColumn'

// ** Hooks
import { useUsersTable } from '../../../services/api/useUsersTable'

// ** TanStack Query
import { useQuery } from '@tanstack/react-query'

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
  const [columnType, setColumnType] = useState('SUPERVISOR')
  const [rowCount, setRowCount] = useState<any>()

  const [sort, setSort] = useState<SortType>('desc')
  const [sortName, setSortName] = useState<string>('created_at')

  const [search, setSearch] = useState<string>()
  const [emailSearchValue, setEmailSearchValue] = useState<string>('')
  const [mobileSearchValue, setMobileSearchValue] = useState<string>('')
  const [searchValue, setSearchValue] = useState<string>('')

  const debouncedUsername = useDebounce(searchValue, 1000)
  const debouncedEmail = useDebounce(emailSearchValue, 1000)
  const debouncedMobile = useDebounce(mobileSearchValue, 1000)

  const { isLoading } = useQuery({
    queryKey: [
      'allUsers',
      page,
      role,
      sort,
      sortName,
      search,
      search === 'username' ? debouncedUsername : search === 'email' ? debouncedEmail : debouncedMobile
    ],
    queryFn: () =>
      getUsers({
        data: {
          role: role,
          page: page,
          sort: sort,
          sort_by: sortName,
          search_by: search,
          search_value:
            search === 'username' ? debouncedUsername : search === 'email' ? debouncedEmail : debouncedMobile
        }
      }),
    onSuccess: (data: any) => {
      setRowCount(data?.total)
      setRowData(data?.data)
      setPageSize(data?.per_page)
      setPage(data?.current_page)
    }
  })

  const handleRoleChange = (newRole: any) => {
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
  }

  const [rowData, setRowData] = useState<any>()

  const handlePageChange = (newPage: any) => {
    setPage(newPage + 1)
    console.log(page)
  }

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
  }, [])

  const handleSortModel = (newModel: GridSortModel) => {
    if (newModel.length) {
      setSort(newModel[0].sort)
      setSortName(newModel[0].field)
    } else {
      setSort('asc')
      setSortName('username')
    }
  }

  const handleSearch = (value: string, type: string) => {
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
  }

  const [activeTab, setActiveTab] = useState<any>()
  const handleChange = (event: any, value: string) => {
    setActiveTab(value)
  }

  useEffect(() => {
    console.log(`ACTIVETABS###`, activeTab)
    handleRoleChange(activeTab)
  }, [activeTab])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <Box sx={{ padding: '20px 25px 0 25px', ...styles.buttonContainer }}>
            <TabContext value={activeTab}>
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
                      Operators
                    </Box>
                  }
                />
                <Tab
                  value='SA'
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }}>
                      <Icon fontSize={20} icon='mdi:lock-outline' />
                      Super Agent
                    </Box>
                  }
                />
                <Tab
                  value='CC'
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 2 } }}>
                      <Icon fontSize={20} icon='mdi:bookmark-outline' />
                      Content Creator
                    </Box>
                  }
                />
              </TabList>
            </TabContext>
            {/* <Box sx={styles.usersButtons}>
              <Button
                onClick={() => handleRoleChange('SUPERVISOR')}
                sx={{
                  ...styles.userButton,
                  backgroundColor: role === 'SUPERVISOR' ? '#9747FF' : '#FFF',
                  color: role === 'SUPERVISOR' ? '#FFF' : 'black'
                }}
              >
                Operators
              </Button>
              <Button
                onClick={() => handleRoleChange('SA')}
                sx={{
                  ...styles.userButton,
                  backgroundColor: role === 'SA' ? '#9747FF' : '#FFF',
                  color: role === 'SA' ? '#FFF' : 'black'
                }}
              >
                Super Agent
              </Button>
              <Button
                onClick={() => handleRoleChange('CC')}
                sx={{
                  ...styles.userButton,
                  backgroundColor: role === 'CC' ? '#9747FF' : '#FFF',
                  color: role === 'CC' ? '#FFF' : 'black'
                }}
              >
                Content Creators
              </Button>
            </Box> */}

            <Link
              style={styles.linkButton}
              href={{
                pathname: 'list/CreateAccount',
                query: { role }
              }}
            >
              <Button sx={styles.createAccount}>Create Account</Button>
            </Link>
          </Box>

          <DataGrid
            loading={isLoading}
            checkboxSelection={false}
            disableSelectionOnClick
            paginationMode='server'
            sortingMode='server'
            autoHeight
            rows={rowData ?? []}
            columns={filteredColumns}
            pageSize={pageSize}
            pagination
            onPageChange={handlePageChange}
            rowCount={rowCount}
            onSortModelChange={handleSortModel}
            components={{ Toolbar: UserTableToolbar }}
            componentsProps={{
              toolbar: {
                role: role,
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
            sx={{ padding: 5 }}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserTable
