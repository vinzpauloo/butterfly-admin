/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'

import Transaction from '@/pages/transactions'
import TransactionsService from '@/services/api/Transactions'
import { useQuery } from '@tanstack/react-query'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { Typography } from '@mui/material'
import formatDate from '@/utils/formatDate'

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

function index() {
  const [data, setData] = useState([])
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState(10)
  const [rowCount, setRowCount] = useState(0)
  const { getDonations } = TransactionsService()

  const { isLoading, isFetching } = useQuery({
    queryKey: ['donations', page],
    queryFn: () => getDonations({ data: { with: 'users,customers,sites', page: page } }),
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

  return (
    <Transaction
      isLoading={isLoading}
      isFetching={isFetching}
      rowData={data}
      columnData={columnData}
      rowCount={rowCount}
      pageSize={pageSize}
      setPage={setPage}
    />
  )
}

export default index
