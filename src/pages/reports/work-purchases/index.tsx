/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useTranslateString } from '@/utils/TranslateString'
import { useQuery } from '@tanstack/react-query'
import { ReportsService } from '@/services/api/ReportsService'
import { useErrorHandling } from '@/hooks/useErrorHandling'
import formatDate from '@/utils/formatDate'
import { Avatar, Stack, Typography } from '@mui/material'
import Container from '@/pages/components/Container'
import { FILE_SERVER_URL } from '@/lib/baseUrls'
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

  // TEMPORARY FOR NOW
  const { getReportsDonations } = ReportsService()
  const { isLoading, isFetching } = useQuery({
    queryKey: ['reportsWorkPurchases', pageSize, page, timespan, fromDate, toDate],
    queryFn: () =>
      getReportsDonations({
        data: {
          report: true,
          timespan: timespan,
          with: 'users,customers,sites',
          select: 'id,customer_id,user_id,site_id,coin_amount,created_at',
          from: format(fromDate, 'yyyy-MM-dd'),
          to: format(toDate, 'yyyy-MM-dd'),
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
      field: 'site id',
      headerName: TranslateString('Site ID'),
      flex: 0.1,
      minWidth: 50,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.site_id
    },
    {
      field: 'site name',
      headerName: TranslateString('Site Name'),
      flex: 0.15,
      minWidth: 150,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.sites?.name
    },
    {
      field: 'content creator',
      headerName: TranslateString('Content Creator'),
      flex: 0.2,
      minWidth: 150,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.users?.username,
      renderCell: (params: GridRenderCellParams) =>
        <Stack direction='row' alignItems='center' gap={2}>
          <Avatar src={FILE_SERVER_URL + params.row?.users?.photo} />
          <Typography variant='subtitle2'>{params.row?.users?.username}</Typography>
        </Stack>
    },
    {
      field: 'donator',
      headerName: TranslateString('Donator'),
      flex: 0.15,
      minWidth: 170,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.customers?.username,
      renderCell: (params: GridRenderCellParams) =>
        <Stack direction='row' alignItems='center' gap={2}>
          <Avatar src={FILE_SERVER_URL + params.row?.customers?.photo} />
          <Typography variant='subtitle2'>{params.row?.customers?.username}</Typography>
        </Stack>
    },
    {
      field: 'coin amount',
      headerName: TranslateString('Coin Amount'),
      headerAlign: 'center',
      align: 'center',
      flex: 0.15,
      minWidth: 150,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.coin_amount
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
      <ReportsHeader title='Work Purchases'/>
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