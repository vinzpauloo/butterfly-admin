/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useTranslateString } from '@/utils/TranslateString'
import { useQuery } from '@tanstack/react-query'
import { ReportsService } from '@/services/api/ReportsService'
import { useErrorHandling } from '@/hooks/useErrorHandling'
import formatDate from '@/utils/formatDate'
import Container from '@/pages/components/Container'
import CustomToolbar from '../components/CustomToolbar'
import ReportsHeader from '../components/ReportsHeader'
import TabLists from '@/pages/components/tab-list/TabLists'
import ReportsTabLists from '@/data/ReportsTabLists'
import { useRouter } from 'next/router'

function index() {
  const [data, setData] = useState([])
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState(10)
  const [rowCount, setRowCount] = useState(0)
  const TranslateString = useTranslateString()
  const { handleError } = useErrorHandling()

  const { getReportsCommissions } = ReportsService()
  const { isLoading, isFetching } = useQuery({
    queryKey: ['reportsCommissions', pageSize, page],
    queryFn: () =>
      getReportsCommissions({
        data: {
          report: true,
          today: true,
          select: 'id,transaction_type,status,gold_amount,role,new_gold_balance,created_at',
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
      handleError(e, `getReportsCommissions() reports/commissions/index.tsx`)
    }
  })

  const columnData: GridColDef[] = [
    {
      field: 'transaction type',
      headerName: TranslateString('Transaction Type'),
      headerAlign: 'center',
      align: 'center',
      flex: 0.2,
      minWidth: 200,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.transaction_type
    },
    {
      field: 'gold amount',
      headerName: TranslateString('Gold Amount'),
      flex: 0.15,
      minWidth: 150,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.gold_amount
    },
    {
      field: 'role',
      headerName: TranslateString('Role'),
      headerAlign: 'center',
      align: 'center',
      flex: 0.1,
      minWidth: 100,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.role,
    },
    {
      field: 'new_gold_balance',
      headerName: TranslateString('New Gold Balance'),
      flex: 0.15,
      minWidth: 150,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.new_gold_balance,
    },
    {
      field: 'status',
      headerName: TranslateString('Status'),
      headerAlign: 'center',
      align: 'center',
      flex: 0.1,
      minWidth: 100,
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
  ]

  const handlePageChange = (newPage: number) => {
    setPage(newPage + 1)
  }

  const handlePageSizeChange = (pageSize: number) => {
    setPageSize(pageSize)
  }

  const router = useRouter()
  const [activeTab, setActiveTab] = useState<any>('donations')

  useEffect(() => {
    const path = router.pathname.split('/')
    const pathName = path[path.length - 1] // get the pathname in end of the array
    setActiveTab(pathName)
  }, [router.pathname])

  return (
    <Container>
      <ReportsHeader />
      <TabLists originRoute='reports' tabData={ReportsTabLists} activeTab={activeTab} setActiveTab={setActiveTab} />
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