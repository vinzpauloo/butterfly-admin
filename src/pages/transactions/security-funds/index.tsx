/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'

import Transaction from '@/pages/transactions'
import { Box, Button } from '@mui/material'
import Icon from '@/@core/components/icon'
import EditDrawer from './EditDrawer'
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

  const { getSecurityFunds } = TransactionsService()
  const { isLoading, isFetching } = useQuery({
    queryKey: ['donations', pageSize, page],
    queryFn: () => getSecurityFunds({ data: { with: 'site,user', page: page, paginate: pageSize } }),
    onSuccess: data => {
      setData(data.data)
      setRowCount(data.total)
      setPageSize(data.per_page)
      setPage(data.current_page)
    },
    onError: (e: any) => {
      handleError(e, `getSecurityFunds() transactions/security-funds/index.tsx`)
    }
  })

  const columnData: GridColDef[] = [
    {
      field: 'site name',
      headerName: TranslateString('Site Name'),
      flex: 0.35,
      minWidth: 170,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.site?.name 
    },
    {
      field: 'amount',
      headerName: TranslateString('Amount'),
      headerAlign: 'center',
      align: 'center',
      minWidth: 150,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.amount 
    },
    {
      field: 'balance',
      headerName: TranslateString('Balance'),
      headerAlign: 'center',
      align: 'center',
      minWidth: 150,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.balance 
    },
    {
      field: 'type',
      headerName: TranslateString('Type'),
      headerAlign: 'center',
      align: 'center',
      minWidth: 150,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.type 
    },
    {
      field: 'created_at',
      headerName: TranslateString('Date Created'),
      flex: 0.35,
      minWidth: 200,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => formatDate(params.row?.created_at)  
    },
    {
      field: 'updated_at',
      headerName: TranslateString('Last Update'),
      flex: 0.35,
      minWidth: 200,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => formatDate(params.row?.updated_at)
    },
    {
      field: 'edit',
      headerName: TranslateString('Edit'),
      headerAlign: 'center',
      align: 'center',
      minWidth: 40,
      sortable: false,
      renderCell: () => 
        <Box display='flex' alignItems='center' justifyContent='center' width='100%'>
          <Button onClick={() => setOpen(true)}>
            <Icon fontSize={30} icon='la:pen' color='98A9BC' />
          </Button>
        </Box>
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
        setOpen={setOpen}
      />
      {open ? <EditDrawer open={open} setOpen={setOpen} /> : null}
    </>
  )
}

index.acl = {
  action: 'read',
  subject: 'shared-page'
}

export default index
