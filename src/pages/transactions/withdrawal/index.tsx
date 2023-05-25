/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'

import Transaction from '@/pages/transactions'
import { Avatar, Box, Button, Stack, Typography } from '@mui/material'
import Icon from '@/@core/components/icon'
import WithdrawModal from './WithdrawModal'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useTranslateString } from '@/utils/TranslateString'
import { useErrorHandling } from '@/hooks/useErrorHandling'
import TransactionsService from '@/services/api/Transactions'
import { useQuery } from '@tanstack/react-query'
import formatDate from '@/utils/formatDate'
import { useAuth } from '@/services/useAuth'
import { FILE_SERVER_URL } from '@/lib/baseUrls'


type modalData = {
  id: number | undefined
  photo: string
  name: string
  amount: string
  note: string
  status: string
}

function index() {
  const [data, setData] = useState([])
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState(10)
  const [rowCount, setRowCount] = useState(0)
  const [open, setOpen] = useState(false)
  const TranslateString = useTranslateString()
  const { handleError } = useErrorHandling()
  const [isRequestWithdraw, setIsRequestWithdraw] = useState<boolean>(false)
  const auth = useAuth()
  const [modalData, setModalData] = useState<modalData>({
    id: undefined,
    photo: '',
    name: '',
    amount: '',
    note: '',
    status: ''
  })

  const { getWithdrawals } = TransactionsService()
  const { isLoading, isFetching } = useQuery({
    queryKey: ['transactionEarnings', pageSize, page],
    queryFn: () => getWithdrawals({ data: { with: 'user' }}),
    onSuccess: data => {
      setData(data.data)
      setRowCount(data.total)
      setPageSize(data.per_page)
      setPage(data.current_page)
    },
    onError: (e: any) => {
      handleError(e, `getWithdrawals() transactions/commissions/index.tsx`)
    }
  })

  const columnData: GridColDef[] = [
    {
      field: 'content creator',
      headerName: TranslateString('Content Creator'),
      flex: 1,
      minWidth: 170,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.user?.username,
      renderCell: (params: GridRenderCellParams) =>
        <Stack direction='row' alignItems='center' gap={2}>
          <Avatar src={FILE_SERVER_URL + params.row?.user?.photo} />
          <Typography variant='subtitle2'>{params.row?.user?.username}</Typography>
        </Stack>
    },
    {
      field: 'amount',
      headerName: TranslateString('Amount'),
      headerAlign: 'center',
      align: 'center',
      minWidth: 110,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.amount
    },
    {
      field: 'note',
      headerName: TranslateString('Note'),
      minWidth: 200,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.note,
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
      valueGetter: (params: GridRenderCellParams) => params.row?.status,
      renderCell: (params: GridRenderCellParams) =>
        <Typography color={params.row?.status === 'Approved' ? 'green' : params.row?.status === 'Declined' ? 'red' : 'default'}>
          {params.row?.status}
        </Typography>
    },
    {
      field: 'approved by',
      headerName: TranslateString('Approved By'),
      headerAlign: 'center',
      align: 'center',
      minWidth: 140,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.customers?.amount
    },
    {
      field: 'view',
      headerName: 'View',
      headerAlign: 'center',
      align: 'center',
      minWidth: 70,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => 
        <Box display='flex' alignItems='center' justifyContent='center' width='100%'>
          <Button onClick={() => {
            setIsRequestWithdraw(false)
            setOpen(true)
            setModalData({
              id: params.row?.id,
              photo: FILE_SERVER_URL + params.row?.user?.photo,
              name: params.row?.user?.username,
              amount: params.row?.amount,
              note: params.row?.note,
              status: params.row?.status
            })
          }}>
            <Icon fontSize={30} icon='mdi:eye' color='98A9BC' />
          </Button>
        </Box>
    }
  ]

  return (
    <>
      <Transaction
        title='Withdrawals'
        isLoading={isLoading}
        isFetching={isFetching}
        rowData={data}
        columnData={columnData}
        rowCount={rowCount}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
      >
        {auth.user?.role === 'CC' &&
          <Stack direction='row' justifyContent='center'>
            <Button variant='outlined' sx={{ width: 'max-content' }} onClick={() => {setIsRequestWithdraw(true); setOpen(true)}}>Request Withdraw</Button>
          </Stack>
        }
      </Transaction>
      {open ? <WithdrawModal data={modalData} isRequestWithdraw={isRequestWithdraw} open={open} setOpen={setOpen} /> : null}
    </>
  )
}

index.acl = {
  action: 'read',
  subject: 'cc-page'
}

export default index
