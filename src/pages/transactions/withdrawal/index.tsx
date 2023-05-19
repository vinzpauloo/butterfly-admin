/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'

import Transaction from '@/pages/transactions'
import { Box, Button, Typography } from '@mui/material'
import Icon from '@/@core/components/icon'
import ShowWithdrawDrawer from './ShowWithdrawDrawer'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useTranslateString } from '@/utils/TranslateString'
import { useErrorHandling } from '@/hooks/useErrorHandling'
import TransactionsService from '@/services/api/Transactions'
import { useQuery } from '@tanstack/react-query'
import formatDate from '@/utils/formatDate'

function index() {
  const [data, setData] = useState([])
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState(10)
  const [rowCount, setRowCount] = useState(0)
  const [open, setOpen] = useState(false)
  const TranslateString = useTranslateString()
  const { handleError } = useErrorHandling()

  // temporary for now, get only donations
  const { getDonations } = TransactionsService()
  const { isLoading, isFetching } = useQuery({
    queryKey: ['donations', pageSize, page],
    queryFn: () =>
      getDonations({ data: { with: 'users,customers,sites', page: page, paginate: pageSize } }),
    onSuccess: data => {
      setData(data.data)
      setRowCount(data.total)
      setPageSize(data.per_page)
      setPage(data.current_page)
    },
    onError: (e: any) => {
      handleError(e, `getDonations() transactions/commissions/index.tsx`)
    }
  })

  const columnData: GridColDef[] = [
    {
      field: 'contentCreator',
      headerName: TranslateString('Content Creator'),
      flex: 1,
      minWidth: 170,
      sortable: false,
      renderCell: (params: GridRenderCellParams) =>
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.users.username}
        </Typography>
    },
    {
      field: 'siteName',
      headerName: TranslateString('Site Name'),
      minWidth: 150,
      sortable: false,
      renderCell: (params: GridRenderCellParams) =>
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.sites.name}
        </Typography>
    },
    {
      field: 'amount',
      headerName: TranslateString('Amount'),
      headerAlign: 'center',
      align: 'center',
      minWidth: 110,
      sortable: false,
      renderCell: (params: GridRenderCellParams) =>
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.coin_amount}
        </Typography>
    },
    {
      field: 'paymentMethod',
      headerName: TranslateString('Payment Method'),
      headerAlign: 'center',
      align: 'center',
      minWidth: 150,
      sortable: false,
      renderCell: () =>
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {/* {params.row.users.username} */} Deposit
        </Typography>
    },
    {
      field: 'requestDate',
      headerName: TranslateString('Request Date'),
      minWidth: 200,
      sortable: false,
      renderCell: (params: GridRenderCellParams) =>
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {formatDate(params.row.created_at)}
        </Typography>
    },
    {
      field: 'lastUpdate',
      headerName: TranslateString('Last Update'),
      minWidth: 200,
      sortable: false,
      renderCell: (params: GridRenderCellParams) =>
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {formatDate(params.row.updated_at)}
        </Typography>
    },
    {
      field: 'status',
      headerName: TranslateString('Status'),
      headerAlign: 'center',
      align: 'center',
      minWidth: 120,
      sortable: false,
      renderCell: () => (
        <Typography color='green'>
          {/* {params.row.users.username} */} Approved
        </Typography>
      )
    },
    {
      field: 'approvedBy',
      headerName: TranslateString('Approved By'),
      headerAlign: 'center',
      align: 'center',
      minWidth: 140,
      sortable: false,
      renderCell: (params: GridRenderCellParams) =>
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.customers.username}
        </Typography>
    },
    {
      field: 'view',
      headerName: 'View',
      headerAlign: 'center',
      align: 'center',
      minWidth: 70,
      sortable: false,
      renderCell: () => {
        const handleClick = () => {
          setOpen(true)
        }

        return (
          <Box display='flex' alignItems='center' justifyContent='center' width='100%'>
            <Button onClick={handleClick}>
              <Icon fontSize={30} icon='mdi:eye' color='98A9BC' />
            </Button>
          </Box>
        )
      }
    }
  ]

  return (
    <>
      <Transaction
        isLoading={isLoading}
        isFetching={isFetching}
        rowData={data}
        columnData={columnData}
        rowCount={rowCount}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
      />
      {open ? <ShowWithdrawDrawer open={open} setOpen={setOpen} /> : null}
    </>
  )
}

index.acl = {
  action: 'read',
  subject: 'shared-page'
}

export default index
