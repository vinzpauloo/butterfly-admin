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
    queryFn: () => getDonations({ data: { with: 'users,customers,sites', page: page, paginate: pageSize } }),
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
      field: 'content creator',
      headerName: TranslateString('Content Creator'),
      flex: 1,
      minWidth: 170,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.users?.username
    },
    {
      field: 'site name',
      headerName: TranslateString('Site Name'),
      minWidth: 150,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.sites?.name
    },
    {
      field: 'amount',
      headerName: TranslateString('Amount'),
      headerAlign: 'center',
      align: 'center',
      minWidth: 110,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.coin_amount
    },
    {
      field: 'payment method',
      headerName: TranslateString('Payment Method'),
      headerAlign: 'center',
      align: 'center',
      minWidth: 150,
      sortable: true,
      renderCell: () => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {/* {params.row.users.username} */} Deposit
        </Typography>
      )
    },
    {
      field: 'request date',
      headerName: TranslateString('Request Date'),
      minWidth: 200,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => formatDate(params.row?.created_at)
    },
    {
      field: 'last update',
      headerName: TranslateString('Last Update'),
      minWidth: 200,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => formatDate(params.row?.updated_at)
    },
    {
      field: 'status',
      headerName: TranslateString('Status'),
      headerAlign: 'center',
      align: 'center',
      minWidth: 120,
      sortable: true,
      renderCell: () => <Typography color='green'>{/* {params.row.users.username} */} Approved</Typography>
    },
    {
      field: 'approved by',
      headerName: TranslateString('Approved By'),
      headerAlign: 'center',
      align: 'center',
      minWidth: 140,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.customers?.username
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
