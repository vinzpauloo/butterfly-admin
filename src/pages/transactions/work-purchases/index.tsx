/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'

import Transaction from '@/pages/transactions'
import { Autocomplete, Avatar, Box, Button, Stack, TextField, Typography } from '@mui/material'
import Icon from '@/@core/components/icon'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useTranslateString } from '@/utils/TranslateString'
import { useQuery } from '@tanstack/react-query'
import TransactionsService from '@/services/api/Transactions'
import { useErrorHandling } from '@/hooks/useErrorHandling'
import formatDate from '@/utils/formatDate'
import { FILE_SERVER_URL } from '@/lib/baseUrls'

function index() {
  const [contentCreator, setContentCreator] = useState<string | null>('')
  const [customer, setCustomer] = useState<string | null>('')
  const [sitename, setSiteName] = useState<string | null>('')
  const [data, setData] = useState([])
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState(10)
  const [rowCount, setRowCount] = useState(0)
  const TranslateString = useTranslateString()
  const { handleError } = useErrorHandling()

  const { getWorkPurchases } = TransactionsService()
  const { isLoading, isFetching } = useQuery({
    queryKey: ['workPurchases', pageSize, page],
    queryFn: () =>
      getWorkPurchases({
        data: {
          page: page,
          paginate: pageSize
        }
      }),
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

  const handleClear = () => {
    setContentCreator('')
    setCustomer('')
    setSiteName('')
  }

  const columnData: GridColDef[] = [
    {
      field: 'content creator',
      headerName: TranslateString('Content Creator'),
      flex: 0.15,
      minWidth: 150,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.creator,
      renderCell: (params: GridRenderCellParams) =>
        <Stack direction='row' alignItems='center' gap={2}>
          <Avatar src={FILE_SERVER_URL + params.row?.creator_photo} />
          <Typography variant='subtitle2'>{params.row?.creator}</Typography>
        </Stack>
    },
    {
      field: 'customer',
      headerName: TranslateString('Customer'),
      flex: 0.15,
      minWidth: 150,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.customer?.username,
      renderCell: (params: GridRenderCellParams) =>
        <Stack direction='row' alignItems='center' gap={2}>
          <Avatar src={FILE_SERVER_URL + params.row?.customer?.photo} />
          <Typography variant='subtitle2'>{params.row?.customer?.username}</Typography>
        </Stack>
    },
    {
      field: 'coin amount',
      headerName: TranslateString('Coin Amount'),
      headerAlign: 'center',
      align: 'center',
      flex: 0.1,
      minWidth: 100,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.coin_amount
    },
    {
      field: 'coin balance',
      headerName: TranslateString('Coin Balance'),
      headerAlign: 'center',
      align: 'center',
      flex: 0.1,
      minWidth: 100,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.coin_balance
    },
    {
      field: 'coin_partner_share',
      headerName: TranslateString('Coin Partner Share'),
      headerAlign: 'center',
      align: 'center',
      flex: 0.12,
      minWidth: 120,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.coin_partner_share + '%'
    },
    {
      field: 'date created',
      headerName: TranslateString('Date Created'),
      flex: 0.17,
      minWidth: 170,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => formatDate(params.row?.created_at)
    },
    {
      field: 'notes',
      headerName: TranslateString('Notes'),
      headerAlign: 'center',
      align: 'center',
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      renderCell: () => 
        <Box display='flex' alignItems='center' justifyContent='center' width='100%'>
          <Button>
            <Icon fontSize={30} icon='game-icons:notebook' color='98A9BC' />
          </Button>
        </Box>
    }
  ]

  const fakeCCList = ['KimiNoLiyan', 'MamaKatsu', 'AriyanaNoJowa', 'JokkakeUdon']
  const fakeCustomerList = ['miguel26', 'MamaKatsu', 'AriyanaNoJowa', 'JokkakeUdon']
  const fakeSiteList = ['Butterfly-Vlog', 'Cornhub-Vlog', 'Phil Corn', '69420-Vlog']

  return (
    <Transaction
      title='Work Purchases'
      isLoading={isLoading}
      isFetching={isFetching}
      rowData={data}
      columnData={columnData}
      rowCount={rowCount}
      pageSize={pageSize}
      setPage={setPage}
      setPageSize={setPageSize}
    >
      <Stack direction={['column', 'column', 'row']} gap={2.5} mb={5}>
        <Autocomplete
          sx={{ width: 200 }}
          disablePortal
          clearOnBlur={false}
          options={fakeCCList}
          value={contentCreator}
          onChange={(event, value) => setContentCreator(value)}
          onInputChange={(event, value) => setContentCreator(value)}
          renderInput={(params) => <TextField {...params} label='Content Creator' size='small'/>}
        />
        <Autocomplete
          sx={{ width: 200 }}
          disablePortal
          clearOnBlur={false}
          options={fakeCustomerList}
          value={customer}
          onChange={(event, value) => setCustomer(value)}
          onInputChange={(event, value) => setCustomer(value)}
          renderInput={(params) => <TextField {...params} label='Customer' size='small'/>}
        />
        <Autocomplete
          sx={{ width: 200 }}
          disablePortal
          clearOnBlur={false}
          options={fakeSiteList}
          value={sitename}
          onChange={(event, value) => setSiteName(value)}
          onInputChange={(event, value) => setSiteName(value)}
          renderInput={(params) => <TextField {...params} label='Site Name' size='small'/>}
        />
        <Button variant='contained' color='error' onClick={handleClear}>
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
