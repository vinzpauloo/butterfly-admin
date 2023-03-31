import React, { useState } from 'react'

import * as yup from 'yup'
import { Box, Button, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Typography } from '@mui/material'
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'

import Container from '@/pages/components/Container'
import WorkgroupService from '@/services/api/Workgroup'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import VideoService from '@/services/api/VideoService'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils import
import formatDate from '@/utils/formatDate'
import DialogEdit from '../views/DialogEdit'

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

const Header = ({ setOpen, setHeader }: any) => {
  return (
    <Box mb={2}>
      <Typography variant='h4' component='h4' mb={5}>
        Video List
      </Typography>
      <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} width={900}>
          <OutlinedInput fullWidth style={{ marginRight: 10 }} placeholder='Search Creator' size='small' />
          <OutlinedInput fullWidth style={{ marginRight: 10 }} placeholder='Search Title' size='small' />
          <OutlinedInput fullWidth style={{ marginRight: 10 }} placeholder='Search Category' size='small' />
        </Box>
      </Box>
    </Box>
  )
}

const Table = ({ data, isLoading, setPage, pageSize, setPageSize, rowCount, setOpen, setHeader }: any) => {
  const columnData = [
    {
      flex: 0.02,
      minWidth: 70,
      field: 'thumbnail_url',
      headerName: 'Video Thumbnail',
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CustomAvatar
                src={params.row.thumbnail_url}
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
      headerName: 'Content Creator',
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
      headerName: 'Title',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.title}
        </Typography>
      )
    },
    {
      flex: 0.04,
      field: 'category',
      minWidth: 80,
      headerName: 'Category',
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
      headerName: 'Last Update',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {formatDate(params.row.updated_at)}
        </Typography>
      )
    },
    // {
    //   field: 'action',
    //   headerName: 'Action',
    //   width: 100,
    //   renderCell: (params: any) => {
    //     return (
    //       <Box>
    //         <Button
    //           onClick={() => {
    //             setHeader('Edit')
    //             setOpen(true)
    //           }}
    //         >
    //           <EditOutlinedIcon sx={styles.icon} />
    //         </Button>
    //       </Box>
    //     )
    //   }
    // },
    {
      flex: 0.01,
      minWidth: 60,
      field: 'action',
      headerName: 'Action',
      renderCell: (params: GridRenderCellParams) => (
        <>
          <DialogEdit params={params.row} />
        </>
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
    <DataGrid
      rowCount={rowCount}
      pageSize={pageSize}
      paginationMode='server'
      getRowId={row => row._id}
      checkboxSelection={false}
      disableSelectionOnClick
      autoHeight
      loading={isLoading}
      rows={data}
      rowsPerPageOptions={[10, 25, 50]}
      columns={columnData}
      pagination
      onPageChange={handlePageChange}
      onPageSizeChange={handlePageSizeChange}
    />
  )
}

function TableVideos() {
  const { getWorkgroup } = WorkgroupService()
  const { getAllVideos } = VideoService()
  const [data, setData] = useState([])
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState(10)
  const [rowCount, setRowCount] = useState(0)
  const [open, setOpen] = useState(false)
  const [header, setHeader] = useState('')

  const { isLoading, isRefetching } = useQuery({
    queryKey: ['videosList', page, pageSize],
    queryFn: () => getAllVideos({ data: { with: 'user', page, paginate: pageSize } }),
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
        <Header setOpen={setOpen} setHeader={setHeader} />
        <Table
          data={data}
          isLoading={isLoading || isRefetching}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          rowCount={rowCount}
          setOpen={setOpen}
          setHeader={setHeader}
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
