/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useTranslateString } from '@/utils/TranslateString'
import { useQuery } from '@tanstack/react-query'
import { ReportsService } from '@/services/api/ReportsService'
import { useErrorHandling } from '@/hooks/useErrorHandling'
import formatDate from '@/utils/formatDate'
import Container from '@/pages/components/Container'
import CustomToolbar from '../components/CustomToolbar'
import ReportsHeader from '../components/ReportsHeader'
import { reportsHeaderStore } from '../../../zustand/reportsHeaderStore'
import format from 'date-fns/format'

function index() {
  const [data, setData] = useState([])
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState(10)
  const [rowCount, setRowCount] = useState(0)
  const TranslateString = useTranslateString()
  const { handleError } = useErrorHandling()
  const [timespan, fromDate, toDate] = reportsHeaderStore((state) => [state.timespan, state.fromDate, state.toDate])

  const { getReportsCustomerTransaction } = ReportsService()
  const { isLoading, isFetching } = useQuery({
    queryKey: ['reportsVIPBundle', pageSize, page, timespan, fromDate, toDate],
    queryFn: () =>
      getReportsCustomerTransaction({
        data: {
          report: true,
          timespan: timespan,
          select: 'id,transaction_type,bundle_name,customer_username,agent_username,amount,created_at,site_id',
          from: format(fromDate, 'yyyy-MM-dd'),
          to: format(toDate, 'yyyy-MM-dd'),
          search_by: 'transaction_type',
          search_value: 'subscription',
          page: page,
          paginate: pageSize
        }
      }),
    onSuccess: data => {
      console.log(data.data)
      setData(data.data)
      setRowCount(data.total)
      setPageSize(data.per_page)
      setPage(data.current_page)
    },
    onError: (e: any) => {
      handleError(e, `getReportsCustomerTransaction() reports/vip-bundles/index.tsx`)
    }
  })

  const columnData: GridColDef[] = [
    {
      field: 'site id',
      headerName: TranslateString('Site ID'),
      flex: 0.07,
      minWidth: 70,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.site_id,
    },
    {
      field: 'transaction type',
      headerName: TranslateString('Transaction Type'),
      headerAlign: 'center',
      align: 'center',
      flex: 0.15,
      minWidth: 150,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.transaction_type
    },
    {
      field: 'bundle name',
      headerName: TranslateString('Bundle Name'),
      flex: 0.15,
      minWidth: 150,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.bundle_name
    },
    {
      field: 'customer',
      headerName: TranslateString('Customer'),
      flex: 0.1,
      minWidth: 100,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.customer_username,
    },
    {
      field: 'agent',
      headerName: TranslateString('Agent'),
      flex: 0.1,
      minWidth: 100,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.agent_username,
    },
    {
      field: 'amount',
      headerName: TranslateString('Amount'),
      headerAlign: 'center',
      align: 'center',
      flex: 0.1,
      minWidth: 100,
      sortable: true,
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

  const handlePageChange = (newPage: number) => {
    setPage(newPage + 1)
  }

  const handlePageSizeChange = (pageSize: number) => {
    setPageSize(pageSize)
  }

  return (
    <Container>
      <ReportsHeader title='VIP Bundles' />
      <DataGrid
        autoHeight
        columns={columnData}
        checkboxSelection={false}
        disableSelectionOnClick
        disableColumnMenu
        getRowId={row => row.id}
        loading={isLoading || isFetching}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        pageSize={pageSize}
        pagination
        paginationMode='server'
        rowCount={rowCount}
        rows={data}
        rowsPerPageOptions={[10, 25, 50]}
        components={{ Toolbar: CustomToolbar }}
      />
    </Container>
  )
}

export default index