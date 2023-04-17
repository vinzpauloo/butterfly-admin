/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'

import { Box, Button, OutlinedInput, Typography } from '@mui/material'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'

import formatDate from '@/utils/formatDate'
import Transaction from '@/pages/transactions'
import TransactionsService from '@/services/api/Transactions'
import TranslateString from '@/utils/TranslateString'

const columnData = [
  {
    field: 'content_creator',
    headerName: 'Content Creator',
    width: 193,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.users.username}
      </Typography>
    )
  },
  {
    field: 'customer',
    headerName: 'Customer',
    width: 193,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.customers.username}
      </Typography>
    )
  },
  {
    field: 'site',
    headerName: 'Site Name',
    width: 193,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.sites.name}
      </Typography>
    )
  },
  {
    field: 'coin_amount',
    headerName: 'Amount (Coin)',
    width: 193,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.coin_amount}
      </Typography>
    )
  },
  {
    field: 'money_amount',
    headerName: 'Amount (Money)',
    width: 193,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.money_amount}
      </Typography>
    )
  },
  {
    field: 'created_at',
    headerName: 'Date Created',
    width: 193,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {formatDate(params.row.created_at)}
      </Typography>
    )
  },
  {
    field: 'updated_at',
    headerName: 'Last Update',
    width: 193,
    sortable: false,
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {formatDate(params.row.updated_at)}
      </Typography>
    )
  }
]

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
  const [contentCreator, setContentCreator] = useState('')
  const [customer, setCustomer] = useState('')
  const [sitename, setSiteName] = useState('')
  const [data, setData] = useState([])
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState(10)
  const [rowCount, setRowCount] = useState(0)
  const { getDonations } = TransactionsService()

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
    onError: error => {
      console.log('Transactions Donations Tab', error)
    }
  })

  const handleClear = () => {
    setContentCreator('')
    setCustomer('')
    setSiteName('')
  }

  return (
    <Transaction
      isLoading={isLoading}
      isFetching={isFetching}
      rowData={data}
      columnData={columnData}
      rowCount={rowCount}
      pageSize={pageSize}
      setPage={setPage}
      setPageSize={setPageSize}
    >
      <Box>
        <OutlinedInput
          style={{ marginBottom: '10px', marginRight: '10px' }}
          placeholder='Content Creator'
          size='small'
          value={contentCreator}
          onChange={e => setContentCreator(e.target.value)}
        />
        <OutlinedInput
          style={{ marginBottom: '10px', marginRight: '10px' }}
          placeholder='Customer'
          size='small'
          value={customer}
          onChange={e => setCustomer(e.target.value)}
        />
        <OutlinedInput
          style={{ marginBottom: '10px', marginRight: '10px' }}
          placeholder='Sitename'
          size='small'
          value={sitename}
          onChange={e => setSiteName(e.target.value)}
        />
        <Button variant='contained' color='error' sx={{ width: 50 }} onClick={handleClear}>
          {TranslateString('Clear')}
        </Button>
      </Box>
    </Transaction>
  )
}

export default index
