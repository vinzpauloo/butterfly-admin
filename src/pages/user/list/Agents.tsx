// ** React Imports
import React, { useState, useEffect, ChangeEvent, useCallback } from 'react'

// ** MUI Imports
import { Typography } from '@mui/material'
import { DataGrid, GridSortModel } from '@mui/x-data-grid'

// ** Custom Table Components Imports
import SuperAgentToolbar from '../components/SuperAgentToolbar'

// ** Other Imports
import AddAgentDrawer from '../components/drawer/AddAgentDrawer'

// ** Hooks
import { UserTableService } from '@/services/api/UserTableService'
import useDebounce from '@/hooks/useDebounce'

// ** TanStack Query
import { useQuery } from '@tanstack/react-query'
import { agentColumns } from '@/data/AgentColumns'
import Container from '@/pages/components/Container'

type SortType = 'asc' | 'desc' | undefined | null

const Agents = () => {
  const { getUsers } = UserTableService()
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

  return (
    <Container>
      <Typography variant='h4' component='h4'>
        Agents
      </Typography>
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
      <AddAgentDrawer open={openDrawer} toggle={handleDrawerToggle} />
    </Container>
  )
}

export default Agents
