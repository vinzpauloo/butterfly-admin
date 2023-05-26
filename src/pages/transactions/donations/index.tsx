/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'

import { Stack, Button, OutlinedInput, Typography, Autocomplete, TextField } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'

import formatDate from '@/utils/formatDate'
import Transaction from '@/pages/transactions'
import TransactionsService from '@/services/api/Transactions'
import { useTranslateString } from '@/utils/TranslateString'

import { useErrorHandling } from '@/hooks/useErrorHandling'

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

function index() {
  const { handleError } = useErrorHandling()

  const [contentCreator, setContentCreator] = useState<string | null>('')
  const [customer, setCustomer] = useState<string | null>('')
  const [sitename, setSiteName] = useState<string | null>('')
  const [data, setData] = useState([])
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState(10)
  const [rowCount, setRowCount] = useState(0)
  const { getDonations } = TransactionsService()
  const TranslateString = useTranslateString()

  const filterParams = () => {
    const userUsername = !!contentCreator && { user_username: contentCreator }
    const customerUsername = !!customer && { customer_username: customer }
    const siteName = !!sitename && { site_name: sitename }

    return { ...userUsername, ...customerUsername, ...siteName }
  }

  const debouncedContentCreator = useDebounce(contentCreator, 1000)
  const debouncedCustomer = useDebounce(customer, 1000)
  const debouncedSitename = useDebounce(sitename, 1000)

  const { isLoading, isFetching } = useQuery({
    queryKey: ['donations', debouncedContentCreator, debouncedCustomer, debouncedSitename, pageSize, page],
    queryFn: () =>
      getDonations({ data: { with: 'users,customers,sites', page: page, paginate: pageSize, ...filterParams() } }),
    onSuccess: data => {
      setData(data.data)
      setRowCount(data.total)
      setPageSize(data.per_page)
      setPage(data.current_page)
    },
    onError: (e: any) => {
      handleError(e, `getDonations() transactions/donations/index.tsx`)
    }
  })

  const handleClear = () => {
    setContentCreator('')
    setCustomer('')
    setSiteName('')
  }

  const columnData: GridColDef[] = [
    {
      field: 'content creator',
      headerName: TranslateString('Content Creator'),
      flex: 1,
      minWidth: 170,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.users?.username
    },
    {
      field: 'customer',
      headerName: TranslateString('Customer'),
      minWidth: 170,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.customers?.username
    },
    {
      field: 'site name',
      headerName: TranslateString('Site Name'),
      minWidth: 170,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.sites?.name
    },
    {
      field: 'coin amount',
      headerName: TranslateString('Amount (Gold)'),
      headerAlign: 'center',
      align: 'center',
      minWidth: 150,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.coin_amount
    },
    {
      field: 'money amount',
      headerName: TranslateString('Amount (CNY)'),
      headerAlign: 'center',
      align: 'center',
      minWidth: 150,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.money_amount
    },
    {
      field: 'created at',
      headerName: TranslateString('Date Created'),
      minWidth: 225,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.created_at
    },
    {
      field: 'updated_at',
      headerName: TranslateString('Last Update'),
      minWidth: 225,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.updated_at
    }
  ]

  const fakeList = ['fakelist1', 'fakelist2', 'fakelist3', 'fakelist4']

  return (
    <Transaction
      title='Donations'
      isLoading={isLoading}
      isFetching={isFetching}
      rowData={data}
      columnData={columnData}
      rowCount={rowCount}
      pageSize={pageSize}
      setPage={setPage}
      setPageSize={setPageSize}
    >
      <Stack direction={['column', 'row', 'row']} gap={2.5} alignItems={['flex-start', 'center']} mb={5}>
        <Autocomplete
          sx={{ width: 200 }}
          disablePortal
          clearOnBlur={false}
          options={fakeList}
          value={contentCreator}
          onChange={(event, value) => setContentCreator(value)}
          onInputChange={(event, value) => setContentCreator(value)}
          renderInput={(params) => <TextField {...params} label='Content Creator' size='small' />}
        />
        <Autocomplete
          sx={{ width: 200 }}
          disablePortal
          clearOnBlur={false}
          options={fakeList}
          value={customer}
          onChange={(event, value) => setCustomer(value)}
          onInputChange={(event, value) => setCustomer(value)}
          renderInput={(params) => <TextField {...params} label='Customer' size='small' />}
        />
        <Autocomplete
          sx={{ width: 200 }}
          disablePortal
          clearOnBlur={false}
          options={fakeList}
          value={sitename}
          onChange={(event, value) => setSiteName(value)}
          onInputChange={(event, value) => setSiteName(value)}
          renderInput={(params) => <TextField {...params} label='Site Name' size='small' />}
        />
        <Button variant='contained' color='error' sx={{ width: 100 }} onClick={handleClear}>
          {TranslateString('Clear')}
        </Button>
      </Stack>
    </Transaction>
  )
}

index.acl = {
  action: 'read',
  subject: 'shared-page'
}

export default index
