// ** React Imports
import React, { useState } from 'react'

import { Box, Button, Modal, Typography } from '@mui/material'
import { DataGrid, GridColumns, GridRenderCellParams, useGridApiRef } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import VideoService from '@/services/api/VideoService'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils import
import formatDate from '@/utils/formatDate'

const columns: GridColumns = [
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
  }
]

function WorkList({ modalOpen, setModalOpen, setSelectedInModal, setSelectedRows }: any) {
  const apiRef = useGridApiRef()
  const [selectedVideos, setSelectedVideos] = useState([])
  const [data, setData] = useState([])
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState(10)
  const [rowCount, setRowCount] = useState(0)
  const { getAllVideos } = VideoService()
  const { isLoading } = useQuery({
    queryKey: ['worklist', page],
    queryFn: () => getAllVideos({ data: { sort: 'created_at', sort_by: 'desc', with: 'user' } }),
    onError: err => {
      console.log('Modal', err)
    },
    onSuccess: data => {
      setData(data.data)
      setRowCount(data.total)
      setPageSize(data.per_page)
      setPage(data.current_page)
    }
  })

  const handleClose = () => {
    setModalOpen(false)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage + 1)
  }

  const handleSave = () => {
    if (data.length > 0) {
      const selectedVid = data?.filter((item: any) => {
        if (selectedVideos.includes(item?._id)) {
          return item
        }
      })
      setSelectedInModal(selectedVid)
      setSelectedRows(selectedVideos)
      setModalOpen(false)
    }
  }

  return (
    <Modal
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      open={modalOpen}
      onClose={handleClose}
    >
      <Box width={1200} sx={{ background: 'white' }}>
        <DataGrid
          rowCount={rowCount}
          pageSize={pageSize}
          paginationMode='server'
          getRowId={row => row._id}
          checkboxSelection={true}
          disableSelectionOnClick
          autoHeight
          loading={isLoading}
          rows={data}
          columns={columns}
          pagination
          onPageChange={handlePageChange}
          onStateChange={e => setSelectedVideos(e.selection)}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} mb={5}>
          <Button size='large' variant='contained' sx={{ mr: 3 }} onClick={handleSave}>
            Save
          </Button>
          <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default WorkList
