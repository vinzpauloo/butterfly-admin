// ** React Imports
import React, { ChangeEvent } from 'react'

// ** MUI Imports
import { DataGrid, GridSortModel } from '@mui/x-data-grid'

// ** Custom Table Components Imports
import CustomersToolbar from './Toolbar'

// ** Hooks/Services
import { UserTableService } from '@/services/api/UserTableService'
import useDebounce from '@/hooks/useDebounce'
import { useErrorHandling } from '@/hooks/useErrorHandling'

// ** TanStack Query
import { useQuery } from '@tanstack/react-query'

// ** Zustand State Management
import { useCustomerStore } from '@/zustand/customerStore'

import { CustomerColumns } from '@/data/CustomerColumns'

const CustomerTable = () => {
  const {
    page,
    setPage,
    pageSize,
    setPageSize,
    role,
    roleId,
    rowCount,
    setRowCount,
    sort,
    setSort,
    sortName,
    setSortName,
    search,
    emailSearchValue,
    mobileSearchValue,
    searchValue,
    rowData,
    setRowData
  } = useCustomerStore()

  const { handlePageChange, handleSearch, handleDrawerToggle } = useCustomerStore(state => ({
    handlePageChange: state.handlePageChange,
    handleSearch: state.handleSearch,
    handleDrawerToggle: state.handleDrawerToggle
  }))

  // ** Columns for DataGrid
  const { columns } = CustomerColumns()

  // ** Service/Hooks
  const { getAllCustomers } = UserTableService()
  const { handleError } = useErrorHandling()
  const debouncedUsername = useDebounce(searchValue, 1000)
  const debouncedEmail = useDebounce(emailSearchValue, 1000)
  const debouncedMobile = useDebounce(mobileSearchValue, 1000)

  const { isLoading, isRefetching } = useQuery({
    queryKey: [
      'getAllCustomers',
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
        : debouncedMobile || undefined
    ],
    queryFn: () =>
      getAllCustomers({
        data: {
          with: 'agents',
          sort_by: sortName,
          sort: sort,
          page: page,
          search_by: search,
          search_value:
            search === 'username' ? debouncedUsername : search === 'email' ? debouncedEmail : debouncedMobile
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
      setPage(response?.current_page)
    },
    onError: (e: any) => {
      handleError(e, `getAllCustomers() CustomerTable.tsx`)
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
    <>
      <DataGrid
        disableColumnMenu
        loading={isLoading || isRefetching}
        checkboxSelection={false}
        disableSelectionOnClick
        paginationMode='server'
        sortingMode='server'
        onSortModelChange={handleSortModel}
        autoHeight
        rows={rowData ?? []}
        getRowId={(row: any) => row?._id || row?.id}
        columns={columns}
        pageSize={pageSize || 10}
        pagination
        onPageChange={handlePageChange}
        rowCount={rowCount || 10}
        rowsPerPageOptions={[10]}
        components={{ Toolbar: CustomersToolbar }}
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
    </>
  )
}

export default CustomerTable
