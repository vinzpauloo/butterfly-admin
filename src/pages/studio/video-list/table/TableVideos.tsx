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
import EditVideoDrawer from '../views/EditVideoDrawer'

// ** import types
import Icon from 'src/@core/components/icon'

// ** Interfaces
import { IVideoRow } from '@/context/types'
import useDebounce from '@/hooks/useDebounce'
import { useTranslateString } from '@/utils/TranslateString'
import { FILE_SERVER_URL } from '@/lib/baseUrls'

// ** AuthContext
import { useAuth } from '@/services/useAuth'

const navData = [
  {
    value: 'selection',
    text: 'selection'
  },
  {
    value: 'latest',
    text: 'latest'
  },
  {
    value: 'original',
    text: 'original'
  },
  {
    value: 'homemade',
    text: 'homemade'
  },
  {
    value: 'hot',
    text: 'hot'
  },
  {
    value: 'local',
    text: 'local'
  },
  {
    value: 'pornstar',
    text: 'pornstar'
  },
  {
    value: 'loli',
    text: 'loli'
  },
  {
    value: 'av',
    text: 'av'
  },
  {
    value: 'animation',
    text: 'animation'
  }
]

const templateData = [
  {
    value: 'videoslider',
    text: 'videoSlider'
  },
  {
    value: 'reelslider',
    text: 'reelSlider'
  },
  {
    value: 'singlevideo',
    text: 'singleVideo'
  },
  {
    value: 'singlevideowithgrid',
    text: 'singleVideoWithGrid'
  },
  {
    value: 'singlevideolist',
    text: 'singleVideoList'
  },
  {
    value: 'grid',
    text: 'grid'
  }
]

const Header = ({ searchCreator, setSearchCreator, searchTitle, setSearchTitle, searchTag, setSearchTag }: any) => {
  // ** Auth Hook
  const auth = useAuth()

  const handleClear = () => {
    setSearchCreator('')
    setSearchTitle('')
    setSearchTag('')
  }

  const TranslateString = useTranslateString()

  return (
    <Box mb={2}>
      <Typography variant='h4' component='h4' mb={5}>
        {TranslateString('Video List')}
      </Typography>
      <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} width={900}>
          
          {auth.user?.role != 'CC' && (
            <OutlinedInput
              fullWidth
              style={{ marginRight: 10 }}
              placeholder={TranslateString('Search') + ' ' + TranslateString('Content Creator')}
              size='small'
              value={searchCreator}
              onChange={e => setSearchCreator(e.target.value)}
            />
          )}

          <OutlinedInput
            fullWidth
            style={{ marginRight: 10 }}
            placeholder={TranslateString('Search') + ' ' + TranslateString('Title')}
            size='small'
            value={searchTitle}
            onChange={e => setSearchTitle(e.target.value)}
          />
          <OutlinedInput
            fullWidth
            style={{ marginRight: 10 }}
            placeholder={TranslateString('Search') + ' ' + TranslateString('Tags')}
            size='small'
            value={searchTag}
            onChange={e => setSearchTag(e.target.value)}
          />
          <Button variant='contained' color='error' sx={{ width: 150 }} onClick={handleClear}>
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
      flex: 0.02,
      minWidth: 70,
      field: 'thumbnail_url',
      headerName: TranslateString('Video Thumbnail'),
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CustomAvatar
                src={FILE_SERVER_URL + params.row.thumbnail_url}
                sx={{ borderRadius: '10px', mr: 3, width: '5.875rem', height: '3rem' }}
              />
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.02,
      minWidth: 90,
      headerName: TranslateString('Content Creator'),
      sortable: false,
      field: 'content_creator',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.user.username}
        </Typography>
      )
    },
    {
      flex: 0.03,
      minWidth: 60,
      field: 'title',
      headerName: TranslateString('Title'),
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.title}
        </Typography>
      )
    },
    {
      flex: 0.04,
      field: 'tag',
      minWidth: 80,
      headerName: TranslateString('Tags'),
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params?.row?.tags?.join(', ')}
        </Typography>
      )
    },
    {
      flex: 0.04,
      minWidth: 140,
      field: 'last_update',
      headerName: TranslateString('Last Update'),
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {formatDate(params.row.updated_at)}
        </Typography>
      )
    },
    {
      flex: 0.01,
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
          icon='mdi:eye-outline'
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
        getRowId={row => row._id}
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
      {editVideoRow && <EditVideoDrawer open={editVideoOpen} toggle={toggleEditVideoDrawer} row={editVideoRow} />}
    </>
  )
}

function TableVideos() {
  const { getWorkgroup } = WorkgroupService()
  const { getAllVideos } = VideoService()
  const [data, setData] = useState([])
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState(10)
  const [rowCount, setRowCount] = useState(0)
  const [postStatus, setPostStatus] = useState<'Approved' | 'Pending' | 'Declined'>('Approved')

  const [searchCreator, setSearchCreator] = useState('')
  const [searchTitle, setSearchTitle] = useState('')
  const [searchTag, setSearchTag] = useState('')
  const debouncedCreator = useDebounce(searchCreator, 1000)
  const debouncedTitle = useDebounce(searchTitle, 1000)
  const debouncedTag = useDebounce(searchTag, 1000)

  const filterParams = () => {
    const username = !!searchCreator && { username: searchCreator }
    const title = !!searchTitle && { title: searchTitle }
    const tags = !!searchTag && { tags: searchTag }

    return { ...username, ...title, ...tags }
  }

  const { isLoading, isRefetching } = useQuery({
    queryKey: ['videosList', page, pageSize, debouncedCreator, debouncedTitle, debouncedTag, postStatus],
    queryFn: () => getAllVideos({ data: { with: 'user', page, approval : postStatus, paginate: pageSize, ...filterParams() } }),
    onSuccess: data => {
      setData(data.data)
      setRowCount(data.total)
      setPageSize(data.per_page)
      setPage(data.current_page)
      console.log('@@@', data)
    },
    onError: err => {
      console.log('videosList error: ', err)
    }
  })

  return (
    <>
      <Container>
        <Header
          searchCreator={searchCreator}
          setSearchCreator={setSearchCreator}
          searchTitle={searchTitle}
          setSearchTitle={setSearchTitle}
          searchTag={searchTag}
          setSearchTag={setSearchTag}
        />
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

const styles = {
  button: {
    background: 'transparent',
    border: 'none'
  },
  icon: {
    color: '#98A9BC',
    fontSize: 30
  }
}

export default TableVideos
