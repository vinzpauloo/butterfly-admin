/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'

import Transaction from '@/pages/transactions'
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
  const TranslateString = useTranslateString()
  const { handleError } = useErrorHandling()

  const { getCustomerTransaction } = TransactionsService()
  const { isLoading, isFetching } = useQuery({
    queryKey: ['transactionVIPBundles', pageSize, page],
    queryFn: () =>
      getCustomerTransaction({
        data: {
          select: 'id,transaction_type,bundle_name,customer_username,agent_username,amount,created_at',
          search_by: 'transaction_type',
          search_value: 'subscription',
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
      field: 'transaction type',
      headerName: TranslateString('Transaction Type'),
      flex: 0.15,
      minWidth: 110,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.transaction_type
    },
    {
      field: 'bundle name',
      headerName: TranslateString('Bundle Name'),
      headerAlign: 'center',
      align: 'center',
      flex: 0.15,
      minWidth: 170,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.bundle_name
    },
    {
      field: 'customer username',
      headerName: TranslateString('Customer Username'),
      headerAlign: 'center',
      align: 'center',
      flex: 0.15,
      minWidth: 150,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.customer_username
    },
    {
      field: 'agent username',
      headerName: TranslateString('Agent Username'),
      headerAlign: 'center',
      align: 'center',
      flex: 0.15,
      minWidth: 110,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.agent_username
    },
    {
      field: 'amount',
      headerName: TranslateString('Amount'),
      headerAlign: 'center',
      align: 'center',
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      valueGetter: (params: GridRenderCellParams) => params.row?.amount
    },
    {
      field: 'date created',
      headerName: TranslateString('Date Created'),
      flex: 0.25,
      minWidth: 200,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => formatDate(params.row?.created_at)
    },
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
    </>
  )
}

index.acl = {
  action: 'read',
  subject: 'shared-page'
}

export default index
