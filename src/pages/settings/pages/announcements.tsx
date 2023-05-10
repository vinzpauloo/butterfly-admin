// ** React Imports
import React, { useState } from 'react'

// ** MUI Imports
import { Box, Card, Grid, Divider, Typography, Button, Switch, Stack, IconButton } from '@mui/material'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

// ** Project/Other Imports
import AnnouncementModal from '../components/modal/AnnouncementModal'
import Translations from '../../../layouts/components/Translations'

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

  const { handleError } = useErrorHandling()

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
  const { isLoading } = useQuery({
    queryKey: ['allAnnouncement'],
    queryFn: () => getAllAnnouncement({ data: {} }),
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
      active: active
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
    { field: 'site_id', headerName: 'Site ID', minWidth: 100, flex: 0.03 },
    { field: 'title', renderHeader: () => <Translations text='Title' />, minWidth: 150, flex: 0.08 },
    { field: 'description', renderHeader: () => <Translations text='Description' />, minWidth: 200, flex: 0.15 },
    {
      field: 'start_date',
      renderHeader: () => <Translations text='Start Date' />,
      minWidth: 120,
      flex: 0.03,
      renderCell: (params: GridRenderCellParams) => params.row.start_date?.split('T')[0]
    },
    {
      field: 'end_date',
      renderHeader: () => <Translations text='End Date' />,
      minWidth: 120,
      flex: 0.03,
      renderCell: (params: GridRenderCellParams) =>
        params.row.end_date === null ? 'None' : params.row.end_date?.split('T')[0]
    },
    {
      field: 'active',
      renderHeader: () => <Translations text='Active' />,
      minWidth: 85,
      flex: 0.02,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => (
        <Switch checked={params.value} onClick={() => activateDeactivateAnnouncement(params.row._id, !params.value)} />
      )
    },
    {
      field: 'action',
      renderHeader: () => <Translations text='Action' />,
      minWidth: 90,
      flex: 0.025,
      disableColumnMenu: true,
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
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <Box sx={styles.header}>
            <Box sx={styles.announcements}>
              <Typography sx={styles.announceText}>
                <Translations text={'Announcement'} />
              </Typography>
            </Box>
            <Button variant='contained' onClick={handleOpen}>
              + <Translations text='Add New Announcements' />
            </Button>
          </Box>
          <Divider />
          <DataGrid
            autoHeight
            rows={data}
            columns={columns}
            disableSelectionOnClick
            checkboxSelection={false}
            sx={styles.dataGrid}
            loading={isLoading || updateLoading || deleteLoading}
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
        </Card>
      </Grid>
      <AnnouncementModal modalInfo={modalInfo} isEditing={isEditing} isOpen={openModal} onClose={handleClose} />
    </Grid>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    overflow: 'hidden'
  },
  header: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'row',
      md: 'row',
      lg: 'row'
    },
    justifyContent: {
      xs: 'flex-start',
      sm: 'space-between',
      md: 'space-between',
      lg: 'space-between'
    },
    alignItems: 'center',
    padding: 10,
    gap: [5, 5, 0]
  },
  announcements: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  announceText: {
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: 500
  },
  linkButton: {
    textDecoration: 'none'
  },
  createAccount: {
    border: 1,
    height: '56px',
    minWidth: '224px',
    width: {
      xs: '100%',
      md: '100%',
      lg: '324px'
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    textTransform: 'uppercase',
    color: 'black',
    backgroundColor: '#FFF',
    '&:hover': {
      backgroundColor: `#9747FF`,
      color: 'white'
    }
  },
  dataGrid: {
    padding: 5
  },
  icon: {
    color: '#98A9BC',
    fontSize: 30
  }
}

Announcements.acl = {
  action: 'read',
  subject: 'sa-page'
}

export default Announcements
