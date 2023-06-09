// ** React Imports
import React, { useState } from 'react'

// ** MUI Imports
import { Box, Typography, Button, Stack, IconButton, MenuItem, Select, SelectChangeEvent, InputLabel } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

// ** Project/Other Imports
import AnnouncementModal from '../components/modal/AnnouncementModal'
import { useTranslateString } from '@/utils/TranslateString'
import Container from '@/pages/components/Container'
import ToggleButton from '@/pages/user/components/button/ToggleButton'

// ** TanStack Imports
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// ** Hooks/Services Imports
import AnnouncementsService from '../../../services/api/AnnouncementsService'
import { useErrorHandling } from '@/hooks/useErrorHandling'

const Announcements = () => {
  // in case pagination is added on backend
  // const [pageSize, setPageSize] = useState<number>(5)
  // const [rowCount, setRowCount] = useState<number>(0)
  // const [page, setPage] = useState<number>(1)

  const TranslateString = useTranslateString()
  const { handleError } = useErrorHandling()
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en')
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [data, setData] = useState([])
  const [modalInfo, setModalInfo] = useState({
    site_id: 0,
    id: '',
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    active: true
  })

  // FETCH ALL ADMIN ANNOUNCEMENT FROM ALL SITES
  const { getAllAnnouncement, updateAnnouncement, deleteAnnouncement } = AnnouncementsService()
  const { isLoading, isRefetching } = useQuery({
    queryKey: ['allAnnouncement', selectedLanguage],
    queryFn: () =>
      getAllAnnouncement({
        data: {
          sort: 'desc',
          sort_by: 'created_at',
          search_by: 'locale',
          search_value: selectedLanguage,
        }
      }),
    onSuccess: data => {
      setData(data?.data)
    },
    onError: (e: any) => {
      handleError(e, `getAllAnnouncement() announcements.tsx`)
    }
  })

  // Get QueryClient from the context
  const queryClient = useQueryClient()

  const { mutate: mutateUpdateAnnouncement, isLoading: updateLoading } = useMutation(updateAnnouncement, {
    onSuccess: data => {
      console.log(data)
      queryClient.invalidateQueries({ queryKey: ['allAnnouncement'] })
    },
    onError: (e: any) => {
      handleError(e, `updateAnnouncement() announcements.tsx`)
    }
  })

  const { mutate: mutateDeleteAnnouncement, isLoading: deleteLoading } = useMutation(deleteAnnouncement, {
    onSuccess: data => {
      console.log(data)
      queryClient.invalidateQueries({ queryKey: ['allAnnouncement'] })
    },
    onError: (e: any) => {
      handleError(e, `deleteAnnouncement() announcements.tsx`)
    }
  })

  const openEditModal = (
    site_id: number,
    id: string,
    title: string,
    description: string,
    start_date: string,
    end_date: any,
    active: boolean
  ) => {
    setIsEditing(true)
    setOpenModal(true)

    // PASS THIS DATA TO THE MODAL
    setModalInfo({
      site_id: site_id,
      id: id,
      title: title,
      description: description,
      start_date: start_date,
      end_date: end_date,
      active: active,
    })
  }

  const handleOpen = () => {
    setIsEditing(false)
    setOpenModal(true)
  }

  const handleClose = () => {
    setOpenModal(false)
  }

  const activateDeactivateAnnouncement = (id: string, active: boolean) => {
    try {
      mutateUpdateAnnouncement({
        announcementID: id,
        data: {
          active: active === true ? 1 : 0,
          _method: 'put'
        }
      })
    } catch (e: any) {
      handleError(e, `updateAnnouncement() activateDeactivateAnnouncement Function in announcements`)
    }
  }

  const deleteSpecificAnnouncement = (id: string) => {
    try {
      mutateDeleteAnnouncement({ announcementID: id })
    } catch (e: any) {
      handleError(e, `deleteAnnouncement() deleteSpecificAnnouncement Function in announcements`)
    }
  }

  const columns: GridColDef[] = [
    { field: 'site_id', headerName: 'Site ID', minWidth: 100, flex: 0.03, sortable: false },
    { field: 'title', headerName: TranslateString('Title'), minWidth: 150, flex: 0.08, sortable: false },
    {
      field: 'description',
      headerName: TranslateString('Description'),
      minWidth: 200,
      flex: 0.15,
      sortable: false
    },
    {
      field: 'start_date',
      headerName: TranslateString('Start Date'),
      minWidth: 120,
      flex: 0.03,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => params.row.start_date?.split('T')[0]
    },
    {
      field: 'end_date',
      headerName: TranslateString('End Date'),
      minWidth: 120,
      flex: 0.03,
      sortable: false,
      renderCell: (params: GridRenderCellParams) =>
        params.row.end_date === null ? 'None' : params.row.end_date?.split('T')[0]
    },
    {
      field: 'active',
      headerName: TranslateString('Active'),
      minWidth: 85,
      flex: 0.02,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <ToggleButton
          checked={params.value}
          onToggle={() => activateDeactivateAnnouncement(params.row._id, !params.value)}
        />
      )
    },
    {
      field: 'action',
      headerName: TranslateString('Action'),
      minWidth: 90,
      flex: 0.025,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Stack direction='row'>
          <IconButton
            onClick={() =>
              openEditModal(
                params.row.site_id,
                params.row._id,
                params.row.title,
                params.row.description,
                params.row.start_date,
                params.row.end_date,
                params.row.active
              )
            }
          >
            <EditOutlinedIcon color='secondary' />
          </IconButton>
          <IconButton onClick={() => deleteSpecificAnnouncement(params.row._id)}>
            <DeleteOutlineIcon color='secondary' />
          </IconButton>
        </Stack>
      )
    }
  ]

  return (
    <Container>
      <Stack direction={['column', 'row']} mb={5} alignItems={['flex-start','flex-end']} gap={4} justifyContent='space-between'>
        <Typography variant='h4' component='h4'>Announcements</Typography>
        <Box sx={{ width: 200 }}>
          <InputLabel>Language</InputLabel>
          <Select
            size='small'
            fullWidth value={selectedLanguage}
            onChange={(event: SelectChangeEvent) => setSelectedLanguage(event.target.value)}
          >
            <MenuItem value='en'>English</MenuItem>
            <MenuItem value='zh_cn'>中国語</MenuItem>
          </Select>
        </Box>
        <Button variant='contained' onClick={handleOpen}>
          + {TranslateString('Add New Announcements')}
        </Button>
      </Stack>

      <DataGrid
        disableColumnMenu
        autoHeight
        rows={data}
        columns={columns}
        disableSelectionOnClick
        checkboxSelection={false}
        loading={isLoading || isRefetching || updateLoading || deleteLoading}
        getRowId={row => row._id}
        rowsPerPageOptions={[5, 10, 15]}

        // in case pagination is added on backend
        // pagination
        // pageSize={pageSize}
        // onPageChange={newPage => setPage(newPage + 1)}
        // onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        // rowCount={rowCount} //total of data
        // paginationMode='server'
      />
      <AnnouncementModal modalInfo={modalInfo} isEditing={isEditing} isOpen={openModal} onClose={handleClose} locale={selectedLanguage} />
    </Container>
  )
}

Announcements.acl = {
  action: 'read',
  subject: 'sa-page'
}

export default Announcements
