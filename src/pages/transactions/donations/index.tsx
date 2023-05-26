/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'

import { Stack, Button, Typography, Autocomplete, TextField, Avatar } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'

import formatDate from '@/utils/formatDate'
import Transaction from '@/pages/transactions'
import TransactionsService from '@/services/api/Transactions'
import { useTranslateString } from '@/utils/TranslateString'

import { useErrorHandling } from '@/hooks/useErrorHandling'
import { FILE_SERVER_URL } from '@/lib/baseUrls'
import UserService from '@/services/api/UserService'
import SitesService from '@/services/api/SitesService'
import { UserTableService } from '@/services/api/UserTableService'

const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

function index() {
  const { handleError } = useErrorHandling()

  const [CCList, setCCList] = useState<string []>([])
  const [customerList, setCustomerList] = useState<string []>([])
  const [siteList, setSiteList] = useState<string []>([])
  
  const [contentCreator, setContentCreator] = useState<string | null>('')
  const [customer, setCustomer] = useState<string | null>('')
  const [sitename, setSiteName] = useState<string | null>('')
  const [data, setData] = useState([])
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState(10)
  const [rowCount, setRowCount] = useState(0)
  const { getDonations } = TransactionsService()
  const { getUsersList } = UserService()
  const { getSitesList } = SitesService()
  const { getAllCustomers } = UserTableService()
  const TranslateString = useTranslateString()

  const filterParams = () => {
    const userUsername = !!contentCreator && { user_username: contentCreator }
    const customerUsername = !!customer && { customer_username: customer }
    const siteName = !!sitename && { site_name: sitename }

    return { ...userUsername, ...customerUsername, ...siteName }
  }

  const debouncedContentCreator = useDebounce(contentCreator, 1000)
  const debouncedCustomer = useDebounce(customer, 1000)
  const debouncedSitename = useDebounce(sitename, 1000)

  const { isLoading, isFetching } = useQuery({
    queryKey: ['donations', debouncedContentCreator, debouncedCustomer, debouncedSitename, pageSize, page],
    queryFn: () =>
      getDonations({ data: { with: 'users,customers,sites', page: page, paginate: pageSize, ...filterParams() } }),
    onSuccess: data => {
      setData(data.data)
      setRowCount(data.total)
      setPageSize(data.per_page)
      setPage(data.current_page)
    },
    onError: (e: any) => {
      handleError(e, `getDonations() transactions/donations/index.tsx`)
    }
  })

  // GET 20 CONTENT CREATORS
  const { } = useQuery({
    queryKey: ['CCList'],
    queryFn: () => getUsersList({ data: { role: 'CC', paginate: 20 } }), //hardcode to 20 for now
    onSuccess: data => {
      const allUsernames = data?.data?.map((item : any) => item.username)
      setCCList(allUsernames)
    },
    onError: (e: any) => {
      handleError(e, `getUsersList() transactions/donations/index.tsx`)
    }
  })

  // GET 20 CUSTOMERS
  const { } = useQuery({
    queryKey: ['CustomerList'],
    queryFn: () => getAllCustomers({ data: { paginate: 20 } }), //hardcode to 20 for now
    onSuccess: data => {
      console.log(data?.data)
      const allUsernames = data?.data?.map((item: any) => item.username)
      setCustomerList(allUsernames)
    },
    onError: (e: any) => {
      handleError(e, `getAllCustomers() transactions/donations/index.tsx`)
    }
  })

  // GET 20 SITES
  const { } = useQuery({
    queryKey: ['SitesList'],
    queryFn: () => getSitesList({ data: { paginate: 20 } }), //hardcode to 20 for now
    onSuccess: data => {
      console.log(data?.data)
      const allsiteNames = data?.data?.map((item: any) => item.name)
      setSiteList(allsiteNames)
    },
    onError: (e: any) => {
      handleError(e, `getSitesList() transactions/donations/index.tsx`)
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
      flex: 1,
      minWidth: 170,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.users?.username,
      renderCell: (params: GridRenderCellParams) =>
        <Stack direction='row' alignItems='center' gap={2}>
          <Avatar src={FILE_SERVER_URL + params.row?.users?.photo} />
          <Typography variant='subtitle2'>{params.row?.users?.username}</Typography>
        </Stack>
    },
    {
      field: 'customer',
      headerName: TranslateString('Customer'),
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
      field: 'site name',
      headerName: TranslateString('Site Name'),
      minWidth: 170,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.sites?.name
    },
    {
      field: 'coin amount',
      headerName: TranslateString('Amount (Gold)'),
      headerAlign: 'center',
      align: 'center',
      minWidth: 150,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.coin_amount
    },
    {
      field: 'money amount',
      headerName: TranslateString('Amount (CNY)'),
      headerAlign: 'center',
      align: 'center',
      minWidth: 150,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => params.row?.money_amount
    },
    {
      field: 'created at',
      headerName: TranslateString('Date Created'),
      minWidth: 225,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => formatDate(params.row?.created_at)
    },
    {
      field: 'updated_at',
      headerName: TranslateString('Last Update'),
      minWidth: 225,
      sortable: true,
      valueGetter: (params: GridRenderCellParams) => formatDate(params.row?.updated_at)
    }
  ]

  return (
    <Transaction
      title='Donations'
      isLoading={isLoading}
      isFetching={isFetching}
      rowData={data}
      columnData={columnData}
      rowCount={rowCount}
      pageSize={pageSize}
      setPage={setPage}
      setPageSize={setPageSize}
    >
      <Stack direction={['column', 'row', 'row']} gap={2.5} alignItems={['flex-start', 'center']} mb={5}>
        <Autocomplete
          sx={{ width: 200 }}
          disablePortal
          clearOnBlur={false}
          options={CCList}
          value={contentCreator}
          onChange={(event, value) => setContentCreator(value)}
          onInputChange={(event, value) => setContentCreator(value)}
          renderInput={(params) => <TextField {...params} label='Content Creator' size='small' />}
        />
        <Autocomplete
          sx={{ width: 200 }}
          disablePortal
          clearOnBlur={false}
          options={customerList}
          value={customer}
          onChange={(event, value) => setCustomer(value)}
          onInputChange={(event, value) => setCustomer(value)}
          renderInput={(params) => <TextField {...params} label='Customer' size='small' />}
        />
        <Autocomplete
          sx={{ width: 200 }}
          disablePortal
          clearOnBlur={false}
          options={siteList}
          value={sitename}
          onChange={(event, value) => setSiteName(value)}
          onInputChange={(event, value) => setSiteName(value)}
          renderInput={(params) => <TextField {...params} label='Site Name' size='small' />}
        />
        <Button variant='contained' color='error' sx={{ width: 100 }} onClick={handleClear}>
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
