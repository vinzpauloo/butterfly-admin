/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'

import Transaction from '@/pages/transactions'
import NotesDrawer from './NotesDrawer'
import { Box, Button, Typography } from '@mui/material'
import Icon from '@/@core/components/icon'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useTranslateString } from '@/utils/TranslateString'
import { useQuery } from '@tanstack/react-query'
import TransactionsService from '@/services/api/Transactions'
import { useErrorHandling } from '@/hooks/useErrorHandling'
import formatDate from '@/utils/formatDate'

function index() {
  const [data, setData] = useState([])
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState(10)
  const [rowCount, setRowCount] = useState(0)
  const [openDrawer, setOpenDrawer] = useState(false)
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
      minWidth: 193,
      sortable: true,
      renderCell: (params: GridRenderCellParams) =>
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.users.username}
        </Typography>
    },
    {
      field: 'referenceID',
      headerName: TranslateString('Reference') + ' ID',
      minWidth: 250,
      sortable: true,
      renderCell: (params: GridRenderCellParams) => 
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.customers._id}
        </Typography>
    },
    {
      field: 'watched',
      headerName: TranslateString('Watched'),
      headerAlign: 'center',
      align: 'center',
      minWidth: 110,
      sortable: true,
      renderCell: (params: GridRenderCellParams) =>
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.coin_amount.slice(0, -3)}
        </Typography>

    },
    {
      field: 'amount',
      headerName: TranslateString('Amount'),
      headerAlign: 'center',
      align: 'center',
      minWidth: 110,
      sortable: true,
      renderCell: (params: GridRenderCellParams) =>
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.money_amount.slice(0, -3)}
        </Typography>
    },
    {
      field: 'dateCreated',
      headerName: TranslateString('Date Created'),
      minWidth: 225,
      sortable: true,
      renderCell: (params: GridRenderCellParams) =>
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {formatDate(params.row.created_at)}
        </Typography>
    },
    {
      field: 'lastUpdate',
      headerName: TranslateString('Last Update'),
      minWidth: 225,
      sortable: true,
      renderCell: (params: GridRenderCellParams) =>
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {formatDate(params.row.updated_at)}
        </Typography>
    },
    {
      field: 'notes',
      headerName: TranslateString('Notes'),
      headerAlign: 'center',
      align: 'center',
      minWidth: 110,
      sortable: true,
      renderCell: () => {
        const handleClick = () => {
          setOpenDrawer(true)
        }

        return (
          <Box display='flex' alignItems='center' justifyContent='center' width='100%'>
            <Button onClick={handleClick}>
              <Icon fontSize={30} icon='game-icons:notebook' color='98A9BC' />
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
      {openDrawer ? <NotesDrawer open={openDrawer} setOpen={setOpenDrawer} /> : null}
    </>
  )
}

index.acl = {
  action: 'read',
  subject: 'shared-page'
}

export default index
