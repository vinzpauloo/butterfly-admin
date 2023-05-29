// ** React Imports
import React, { useState, useEffect, ChangeEvent, useCallback } from 'react'

// ** MUI Imports
import { Card, CardHeader, Grid } from '@mui/material'
import { DataGrid, GridSortModel } from '@mui/x-data-grid'

// ** Custom Table Components Imports
import SuperAgentToolbar from './SuperAgentToolbar'

// ** Other Imports
import AddAgentDrawer from './drawer/AddAgentDrawer'

// ** Hooks
import { useErrorHandling } from '@/hooks/useErrorHandling'
import { UserTableService } from '@/services/api/UserTableService'
import RolesService from '@/services/api/RolesService'

// ** TanStack Query
import { useQuery } from '@tanstack/react-query'
import { agentColumns } from '@/data/AgentColumns'

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

// ** Types
enum RoleEnum  {
  GOD = 1,
  OPERATIONS = 2,
  CC = 3,
  SA = 4,
  AGENT = 5
}

const SuperAgentTable = () => {

  const { getAllRoles } = RolesService()
  const { getUsers } = UserTableService()
  const { handleError } = useErrorHandling()

  const [page, setPage] = useState<number>()
  const [pageSize, setPageSize] = useState<number>()
  const [role, setRole] = useState('AGENT')
  const [roleId, setRoleId] = useState<any>()
  const [columnType, setColumnType] = useState('AGENT')
  const [rowCount, setRowCount] = useState<any>()

  const [subRole] = useState('role')

  const [sort, setSort] = useState<SortType>('desc')
  const [sortName, setSortName] = useState<string>('created_at')

  const [search, setSearch] = useState<string | undefined>(undefined)
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined)

  const debouncedUsername = useDebounce(searchValue, 1000)

  const [ dropdownRoles, setDropdownRoles ] = React.useState< [] | null >(null)

  const { isLoading, isRefetching } = useQuery({
    queryKey: [
      'allUsers',
      page,
      role,
      roleId,
      sort,
      sortName,
      search,
      (search === 'username' && debouncedUsername) || undefined,
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
          search_value: search === 'username' && debouncedUsername,
          ...(role === 'AGENT' ? { with: subRole } : {})
        }
      }),
    onSuccess: (data: any) => {
      setRowCount(data?.total)
      setRowData(data?.data)
      setPageSize(data?.per_page)
      setPage(data?.current_page)
    }
  })

  //get All Roles
  const { data : dataRoles } = useQuery({
    queryKey: ['roles'],
    queryFn: () => getAllRoles({}),
    onSuccess: data => {
      setDropdownRoles(data.data)
    },
    onError: (e: any) => {
      handleError(e, `getAllRoles() user/components/SuperAgentTable.tsx`)
    }
  })

  const [rowData, setRowData] = useState<any>()

  const handlePageChange = useCallback((newPage: any) => {
    setPage(newPage + 1)
  }, [])

  const columnsMap = new Map([['AGENT', agentColumns]])

  const filteredColumns: any = columnsMap.get(columnType) ?? []

  useEffect(() => {
    setRole('AGENT')
    setColumnType('AGENT')
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
    }
  }, [])

  const [openDrawer, setOpenDrawer] = useState(false)
  const handleDrawerToggle = () => {
    setOpenDrawer(isDrawerOpen => !isDrawerOpen)
  }

  const filterDropdownRoles = (roles : any[]) => { 
    // Filter by roles inside this array
    const filterByIds = [
      RoleEnum.GOD,
      RoleEnum.OPERATIONS,
      RoleEnum.CC, 
      RoleEnum.SA, 
      RoleEnum.AGENT
    ]
    const filteredRoles = roles.filter( role => !filterByIds.includes(role.id) )
    return filteredRoles
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Agents' sx={{ textTransform: 'uppercase' }} />
          <DataGrid
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
            onSortModelChange={handleSortModel}
            components={{ Toolbar: SuperAgentToolbar }}
            componentsProps={{
              toolbar: {
                toggle: handleDrawerToggle,
                role: role,
                role_id: roleId,
                usernameValue: searchValue,
                clearSearch: () => {
                  handleSearch('', 'username')
                },
                onUsernameChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value, 'username')
              }
            }}
            sx={{ padding: 0 }}
          />
          {/* CREATE Agent Drawer */}
          {
            dropdownRoles && 
            <AddAgentDrawer
              dataRoles={ filterDropdownRoles(dropdownRoles) }
              open={openDrawer} 
              toggle={handleDrawerToggle} />
          }
          
        </Card>
      </Grid>
    </Grid>
  )
}

export default SuperAgentTable
