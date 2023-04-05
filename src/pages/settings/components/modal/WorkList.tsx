// ** React Imports
import React, { useState } from 'react'

import { Box, Button, Checkbox, Modal, Typography } from '@mui/material'
import { DataGrid, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import VideoService from '@/services/api/VideoService'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils import
import formatDate from '@/utils/formatDate'

const CheckboxContent = ({ allId, id, setAllId }: any) => {
  const [isCheck, setIsCheck] = useState(allId.includes(id))

  const handleCheck = () => {
    if (isCheck) {
      setAllId((prev: any) => {
        const removeId = prev.filter((item: any) => item !== id)

        return removeId
      })
      setIsCheck((prev: boolean) => !prev)
    } else {
      setAllId((prev: any) => [...prev, id])
      setIsCheck((prev: boolean) => !prev)
    }
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Checkbox checked={isCheck} onClick={handleCheck} />
    </Box>
  )
}

function WorkList({
  modalOpen,
  setModalOpen,
  setSelectedInModal,
  allId,
  setAllId,
  setHasSave,
  setPageSize,
  setPage,
  setRowCount
}: any) {
  const [data, setData] = useState([])
  const [modalPage, setModalPage] = useState<number>(1)
  const [modalPageSize, setModalPageSize] = useState(10)
  const [modalRowCount, setModalRowCount] = useState(0)
  const [saveData, setSaveData] = useState([])
  const [prevPage, setPrevPage] = useState(0)
  const { getAllVideos } = VideoService()
  const { isLoading, isFetching } = useQuery({
    queryKey: ['worklist', modalPage],
    queryFn: () => getAllVideos({ data: { sort: 'desc', sort_by: 'title', with: 'user', page: modalPage } }),
    onError: err => {
      console.log('Modal', err)
    },
    onSuccess: data => {
      setData(data.data)
      setModalRowCount(data.total)
      setModalPageSize(data.per_page)
      setModalPage(data.current_page)
      if (prevPage < modalPage) {
        setSaveData(prev => prev.concat(data.data))
        setPrevPage(prev => prev + 1)
      }
    }
  })

  const handleClose = () => {
    setModalOpen(false)
  }

  const handlePageChange = (newPage: number) => {
    setModalPage(newPage + 1)
  }

  const handleSave = () => {
    if (data.length > 0) {
      const selectedVid = saveData?.filter((item: any) => {
        if (allId.includes(item?._id)) {
          return item
        }
      })
      setSelectedInModal(selectedVid)
      setPageSize(10)
      setPage(1)
      setRowCount(selectedVid.length)
      setHasSave(false)
      setModalOpen(false)
    }
  }

  // ** table columns
  const columns: GridColumns = [
    {
      flex: 0.01,
      minWidth: 20,
      field: 'action',
      headerName: '',
      renderCell: (params: GridRenderCellParams) => <CheckboxContent allId={allId} id={params.id} setAllId={setAllId} />
    },
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
                sx={{ borderRadius: '5px', mr: 3, width: '5.875rem', height: '3rem' }}
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

  return (
    <Modal
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      open={modalOpen}
      onClose={handleClose}
    >
      <Box width={1200} sx={{ background: 'white' }}>
        <DataGrid
          rowCount={modalRowCount}
          pageSize={modalPageSize}
          paginationMode='server'
          getRowId={row => row._id}
          disableSelectionOnClick
          autoHeight
          loading={isLoading || isFetching}
          rows={data}
          columns={columns}
          pagination
          onPageChange={handlePageChange}
          disableColumnMenu
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
