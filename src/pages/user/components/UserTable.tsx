// ** React Imports
import React, { useState, useEffect, ChangeEvent } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import { Box, Card, Grid, Button } from '@mui/material'
import { DataGrid, GridSortModel } from '@mui/x-data-grid'

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

  const [sort, setSort] = useState<SortType>('asc')
  const [sortName, setSortName] = useState<string>('username')

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
      console.log(`onSUCCESS`, data)
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

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <Box sx={{ padding: 5, ...styles.buttonContainer }}>
            <Box sx={styles.usersButtons}>
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
            </Box>

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
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserTable
