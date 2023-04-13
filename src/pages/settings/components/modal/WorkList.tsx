// ** React Imports
import React, { useState } from 'react'

import { Box, Button, Checkbox, Modal, Typography } from '@mui/material'
import { DataGrid, GridColumns, GridRenderCellParams } from '@mui/x-data-grid'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import VideoService from '@/services/api/VideoService'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils import
import formatDate from '@/utils/formatDate'
import WorkgroupService from '@/services/api/Workgroup'

const CheckboxContent = ({ header, allId, setAllId, id, sectionID }: any) => {
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

      if (header === 'Edit') {
        uncheckMutate({
          id: sectionID,
          data: { work: id }
        })
      }
      setIsCheck((prev: boolean) => !prev)
    } else {
      setAllId((prev: any) => [...prev, id])

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

const RandomVideoPicker = (num: number, all: string[]) => {
  const choosenID: string[] = []

  while (choosenID.length !== num) {
    const pick = Math.floor(Math.random() * all.length)
    if (choosenID.includes(all[pick])) continue
    choosenID.push(all[pick])
  }

  return choosenID
}

function WorkList({
  header,
  allId,
  modalOpen,
  setModalOpen,
  sectionID,
  refetchAll,
  setAllId,
  control,
  navbar,
  template,
  reset,
  setNavbar,
  setTemplate,
  setOpen
}: any) {
  const queryClient = useQueryClient()
  const [data, setData] = useState([])
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState(10)
  const [modalRowCount, setModalRowCount] = useState(0)
  const { getAllVideos } = VideoService()
  const { postWorkgroup } = WorkgroupService()
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

  // @ts-ignore
  const layoutPattern = template => {
    switch (template) {
      case 'videoSlider':
        return RandomVideoPicker(6, allId)
      case 'reelslider':
        return RandomVideoPicker(6, allId)
      case 'singleVideoWithGrid':
        return RandomVideoPicker(5, allId)
      case 'singleVideoList':
        return RandomVideoPicker(10, allId)
      case 'grid':
        return RandomVideoPicker(4, allId)
    }
  }

  // ** use to POST new workgroup
  const { mutate: mutateWorkgroup } = useMutation(postWorkgroup, {
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['search-workgroup'] })
  })

  const handleClose = () => {
    setModalOpen(false)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage + 1)
  }

  const handleSave = () => {
    setModalOpen(false)
    if (header === 'Edit') {
      refetchAll()
    } else {
      // @ts-ignore
      const vid: string[] = layoutPattern(template)
      if ('singleVideoList' === template || 'singleVideoWithGrid' === template) {
        mutateWorkgroup({
          title: control._fields.title._f.value,
          navbar: navbar,
          template_id: template,
          single: vid[0],
          multiple: vid?.slice(1),
          all: allId
        })
      } else {
        mutateWorkgroup({
          title: control._fields.title._f.value,
          navbar: navbar,
          template_id: template,
          multiple: vid,
          all: allId
        })
      }
      reset()
      setTemplate('videoSlider')
      setNavbar('selection')
      setAllId([])
      setOpen(false)
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
        <CheckboxContent allId={allId} id={params.id} sectionID={sectionID} setAllId={setAllId} header={header} />
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

  const videoCountChecker = (template: string) => {
    switch (template) {
      case 'videoSlider':
        return 6
      case 'reelslider':
        return 6
      case 'singleVideoWithGrid':
        return 5
      case 'singleVideoList':
        return 10
      case 'grid':
        return 4

      default:
        return 4
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
          <Button
            disabled={!(allId.length >= videoCountChecker(template))}
            size='large'
            variant='contained'
            sx={{ mr: 3 }}
            onClick={handleSave}
          >
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
