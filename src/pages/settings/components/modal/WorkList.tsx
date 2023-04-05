// ** React Imports
import React, { useState } from 'react'

import { Box, Button, Checkbox, Modal, Typography } from '@mui/material'
import { DataGrid, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import { useMutation, useQuery } from '@tanstack/react-query'
import VideoService from '@/services/api/VideoService'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils import
import formatDate from '@/utils/formatDate'
import WorkgroupService from '@/services/api/Workgroup'
import { log } from 'console'

const CheckboxContent = ({ data, header, allId, setAllId, id, sectionID, setSelectedData }: any) => {
  const [isCheck, setIsCheck] = useState(allId.includes(id))
  const { deleteCheckWorkgroup, postCheckWorkgroup } = WorkgroupService()

  const { mutate: checkMutate } = useMutation(postCheckWorkgroup)
  const { mutate: uncheckMutate } = useMutation(deleteCheckWorkgroup)

  const handleCheck = () => {
    if (isCheck) {
      setAllId((prev: any) => {
        const removeId = prev.filter((item: any) => item !== id)

        return removeId
      })

      setSelectedData((prev: any) => {
        const removeId = prev.filter((item: any) => item !== id)
        const newData = data.filter((item: any) => removeId.includes(item._id))

        return newData
      })

      if (header === 'Edit') {
        uncheckMutate({
          id: sectionID,
          data: { work: id }
        })
      }
      setIsCheck((prev: boolean) => !prev)
    } else {
      setAllId((prev: any) => [...prev, id])
      setSelectedData((prev: any) => {
        const newData = data.filter((item: any) => item._id === id)

        return [...prev, ...newData]
      })

      if (header === 'Edit') {
        checkMutate({
          id: sectionID,
          data: { work: id }
        })
      }
      setIsCheck((prev: boolean) => !prev)
    }
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Checkbox checked={isCheck} onClick={handleCheck} />
    </Box>
  )
}

function WorkList({ header, allId, modalOpen, setModalOpen, sectionID, refetchAll, setAllId, setModalData }: any) {
  const [data, setData] = useState([])
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState(10)
  const [modalRowCount, setModalRowCount] = useState(0)
  const { getAllVideos } = VideoService()
  const [selectedData, setSelectedData] = useState([])
  const { isLoading, isFetching } = useQuery({
    queryKey: ['worklist', page],
    queryFn: () => getAllVideos({ data: { sort: 'desc', sort_by: 'title', with: 'user', page: page } }),
    onError: err => {
      console.log('Modal', err)
    },
    onSuccess: data => {
      setData(data.data)
      setModalRowCount(data.total)
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
    setModalData(selectedData)
    setModalOpen(false)
    if (header === 'Edit') {
      refetchAll()
    }
  }

  // ** table columns
  const columns: GridColumns = [
    {
      flex: 0.01,
      minWidth: 20,
      field: 'action',
      headerName: '',
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <CheckboxContent
          allId={allId}
          id={params.id}
          sectionID={sectionID}
          setAllId={setAllId}
          setModalData={setModalData}
          data={data}
          header={header}
          setSelectedData={setSelectedData}
        />
      )
    },
    {
      flex: 0.02,
      minWidth: 70,
      field: 'thumbnail_url',
      headerName: 'Video Thumbnail',
      sortable: false,
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
      sortable: false,
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
      sortable: false,
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
      headerName: 'Last Update',
      sortable: false,
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
          pageSize={pageSize}
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
