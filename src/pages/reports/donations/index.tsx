/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

// import { useTranslateString } from '@/utils/TranslateString'
import { useQuery } from '@tanstack/react-query'
import { ReportsService } from '@/services/api/ReportsService'
import { useErrorHandling } from '@/hooks/useErrorHandling'
import Container from '@/pages/components/Container'

// import { FILE_SERVER_URL } from '@/lib/baseUrls'
import DonationsTableToolbar from '../components/DonationsTableToolbar'
import ReportsHeader from '../components/ReportsHeader'
import { reportsHeaderStore } from '../../../zustand/reportsHeaderStore'
import moment from 'moment'

function index() {
  const [data, setData] = useState([])
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState(10)
  const [rowCount, setRowCount] = useState(0)

  // const TranslateString = useTranslateString()
  const { handleError } = useErrorHandling()
  const [timespan, fromDate, toDate] = reportsHeaderStore(state => [state.timespan, state.fromDate, state.toDate])

  const { getReportsDonations } = ReportsService()
  const { isLoading, isFetching } = useQuery({
    queryKey: ['reportsDonations', pageSize, page, timespan, fromDate, toDate],
    queryFn: () =>
      getReportsDonations({
        data: {
          report: true,
          timespan: timespan,
          with: 'users,sites',
          from: moment(fromDate).format('YYYY-MM-D'),
          to: moment(toDate).format('YYYY-MM-D'),
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
      handleError(e, `getReportsDonations() reports/donations/index.tsx`)
    }
  })

  const columnData: GridColDef[] = [
    {
      field: 'date',
      headerName: 'Date',
      flex: 0.15,
      minWidth: 150,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => {
        if (timespan === 'daily') {
          return moment(params.row?.created_at).format('MMM D, YYYY')
        } else if (timespan === 'monthly') {
          return `${moment(params?.row?.month).format('MMMM')} ${params?.row?.year}`
        } else {
          return params.row?.year
        }
      }
    },
    {
      field: 'site name',
      headerName: 'Site Name',
      flex: 0.2,
      minWidth: 150,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.sites?.name
    },
    {
      field: 'content creator',
      headerName: 'Content Creator',
      flex: 0.15,
      minWidth: 170,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.users?.username
    },
    {
      field: 'account id',
      headerName: 'Account ID',
      headerAlign: 'center',
      align: 'center',
      flex: 0.15,
      minWidth: 150,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.user_id
    },
    {
      field: 'total coin',
      headerName: 'Total Coin',
      flex: 0.15,
      minWidth: 150,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.total_coin_amount
    },
    {
      field: 'coin transactions',
      headerName: 'Coin Transactions',
      flex: 0.15,
      minWidth: 170,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.total_coin_transactions_count
    },
    {
      field: 'site coin share',
      headerName: 'Site Coin Share',
      flex: 0.15,
      minWidth: 150,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.total_coin_partner_share
    },
    {
      field: 'coin average',
      headerName: 'Site Coin Share',
      flex: 0.15,
      minWidth: 150,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.total_coin_avg
    },
    {
      field: 'avg site share',
      headerName: 'Avg Site Share',
      flex: 0.15,
      minWidth: 150,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.total_coin_partner_share_avg
    }
  ]

  const handlePageChange = (newPage: number) => {
    setPage(newPage + 1)
  }

  const handlePageSizeChange = (pageSize: number) => {
    setPageSize(pageSize)
  }

  return (
    <Container>
      <ReportsHeader title='Donations' />
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
        components={{ Toolbar: DonationsTableToolbar }}
      />
    </Container>
  )
}

export default index
