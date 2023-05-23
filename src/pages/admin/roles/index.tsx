import React, { useState } from 'react'

// ** MUI Imports
import { Box, OutlinedInput, Typography, Button } from '@mui/material'
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'

import Container from '@/pages/components/Container'
import WorkgroupService from '@/services/api/Workgroup'
import VideoService from '@/services/api/VideoService'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils import
import formatDate from '@/utils/formatDate'
// import EditVideoDrawer from '../views/EditVideoDrawer'

// ** import types
import Icon from 'src/@core/components/icon'

// ** Interfaces
import { IVideoRow } from '@/context/types'
import useDebounce from '@/hooks/useDebounce'
import { useTranslateString } from '@/utils/TranslateString'
import { FILE_SERVER_URL } from '@/lib/baseUrls'

// ** AuthContext
import { useAuth } from '@/services/useAuth'

// ** Error Handling
import { useErrorHandling } from '@/hooks/useErrorHandling'
import RolesService from '@/services/api/RolesService'

const Header = ({ searchName, setSearchName }: any) => {
  // ** Auth Hook
  const auth = useAuth()

  const handleClear = () => {
    setSearchName('')
  }

  const TranslateString = useTranslateString()

  return (
    <Box mb={2}>
      <Typography variant='h4' component='h4' mb={5}>
        Roles & Permissions
      </Typography>
      <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} width={340}>
          {auth.user?.role != 'CC' && (
            <OutlinedInput
              fullWidth
              style={{ marginRight: 10 }}
              placeholder={TranslateString('Search') + ' ' + TranslateString('Name')}
              size='small'
              value={searchName}
              onChange={e => setSearchName(e.target.value)}
            />
          )}

          <Button variant='contained' color='error' sx={{ width: 40 }} onClick={handleClear}>
            {TranslateString('Clear')}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

const Table = ({ data, isLoading, setPage, pageSize, setPageSize, rowCount }: any) => {
  // ** States
  const [editVideoOpen, setEditVideoOpen] = React.useState<boolean>(false)
  const [editVideoRow, setEditVideoRow] = React.useState<IVideoRow>()
  const toggleEditVideoDrawer = () => setEditVideoOpen(!editVideoOpen)

  const TranslateString = useTranslateString()

  const columnData = [
    {
      minWidth: 50,
      field: 'id',
      headerName: 'ID',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.id}
        </Typography>
      )
    },
    {
      flex: 0.03,
      minWidth: 60,
      field: 'name',
      headerName: 'Name',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.name}
        </Typography>
      )
    },
    {
      flex: 0.04,
      field: 'description',
      minWidth: 80,
      headerName: 'Description',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.description}
        </Typography>
      )
    },
    {
      flex: 0.04,
      minWidth: 140,
      field: 'created_at',
      headerName: 'Date Created',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {formatDate(params.row.updated_at)}
        </Typography>
      )
    },
    {
      minWidth: 60,
      field: 'action',
      headerName: TranslateString('Action'),
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Icon
          onClick={() => {
            setEditVideoRow({ ...params.row }) // pass the row value to state
            toggleEditVideoDrawer()
          }}
          icon='mdi:edit-outline'
          fontSize={20}
          cursor='pointer'
        />
      )
    }
  ]

  const handlePageChange = (newPage: number) => {
    setPage(newPage + 1)
  }

  const handlePageSizeChange = (pageSize: number) => {
    setPageSize(pageSize)
  }

  return (
    <>
      <DataGrid
        rowCount={rowCount}
        pageSize={pageSize}
        paginationMode='server'
        getRowId={row => row.id}
        checkboxSelection={false}
        disableSelectionOnClick
        disableColumnMenu
        autoHeight
        loading={isLoading}
        rows={data}
        rowsPerPageOptions={[10, 25, 50]}
        columns={columnData}
        pagination
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
      {/* {editVideoRow && <EditVideoDrawer open={editVideoOpen} toggle={toggleEditVideoDrawer} row={editVideoRow} />} */}
    </>
  )
}

function index() {
  const { handleError } = useErrorHandling()
  const { getWorkgroup } = WorkgroupService()
  const { getAllVideos } = VideoService()
  const { getAllRoles } = RolesService()
  const [data, setData] = useState([])
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState(10)
  const [rowCount, setRowCount] = useState(0)
  const [postStatus, setPostStatus] = useState<'Approved' | 'Pending' | 'Declined'>('Approved')

  const [searchName, setSearchName] = useState('')
  const debouncedName = useDebounce(searchName, 1000)

  const filterParams = () => {
    const name = !!searchName && { name: searchName }

    return { ...name }
  }

  const { isLoading, isRefetching } = useQuery({
    queryKey: ['videosList', page, pageSize, debouncedName, postStatus],
    queryFn: () =>
      getAllRoles({
        page,
        paginate: pageSize,
        ...filterParams()
      }),
    onSuccess: data => {
      setData(data.data)
      setRowCount(data.total)
      setPageSize(data.per_page)
      setPage(data.current_page)
      console.log('@@@', data)
    },
    onError: (e: any) => {
      handleError(e, `getAllVideos() video-list/table/TableVideos.tsx`)
    }
  })

  return (
    <>
      <Container>
        <Header searchName={searchName} setSearchName={setSearchName} />
        <Table
          data={data}
          isLoading={isLoading || isRefetching}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          rowCount={rowCount}
        />
      </Container>
    </>
  )
}

index.acl = {
  action: 'read',
  subject: 'cc-page'
}

export default index
