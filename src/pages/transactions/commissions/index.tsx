/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'

import Transaction from '@/pages/transactions'
import NotesDrawer from './NotesDrawer'
import { Box, Button } from '@mui/material'
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

  const { getCommissions } = TransactionsService()
  const { isLoading, isFetching } = useQuery({
    queryKey: ['commissions', pageSize, page],
    queryFn: () =>
      getCommissions({
        data: {
          select: 'id,role,transaction_type,gold_amount,status,created_at',
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

  const columnData: GridColDef[] = [
    {
      field: 'role',
      headerName: TranslateString('Role'),
      flex: 0.15,
      minWidth: 110,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.role
    },
    {
      field: 'transaction type',
      headerName: TranslateString('Transaction Type'),
      headerAlign: 'center',
      align: 'center',
      flex: 0.15,
      minWidth: 170,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.transaction_type
    },
    {
      field: 'gold amount',
      headerName: TranslateString('Gold Amount'),
      headerAlign: 'center',
      align: 'center',
      flex: 0.15,
      minWidth: 150,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.gold_amount
    },
    {
      field: 'status',
      headerName: TranslateString('Status'),
      headerAlign: 'center',
      align: 'center',
      flex: 0.15,
      minWidth: 110,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.status
    },
    {
      field: 'date created',
      headerName: TranslateString('Date Created'),
      flex: 0.25,
      minWidth: 200,
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
