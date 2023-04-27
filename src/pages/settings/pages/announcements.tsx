import React, { useState } from 'react'
import { Box, Card, Grid, Divider, Typography, Button, Switch } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import AnnouncementModal from '../components/modal/AnnouncementModal'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { GridRenderCellParams } from '@mui/x-data-grid'
import Translations from '../../../layouts/components/Translations'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnnoucementsService from '../../../services/api/AnnoucementsService'

const Announcements = () => {
  // in case pagination is added on backend
  // const [pageSize, setPageSize] = useState<number>(5)
  // const [rowCount, setRowCount] = useState<number>(0)
  // const [page, setPage] = useState<number>(1)

  const [openModal, setOpenModal] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [data, setData] = useState([])
  const [announcementID, setAnnouncementID] = useState<string>('')
  const [modalInfo, setModalInfo] = useState({
    parentID: '',
    id: '',
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    active: true
  })

  // FETCH ALL ADMIN ANNOUNCEMENT
  const { getAllAnnouncement, updateAnnouncement } = AnnoucementsService()
  const { isLoading } = useQuery({
    queryKey: ['allAnnouncement'],
    queryFn: () => getAllAnnouncement({ data: { with: 'introductions', site_id: 0 } }),
    onSuccess: data => {
      setAnnouncementID(data?._id)
      setData(data?.introductions)
    },
    onError: error => {
      console.log(error)
    }
  })

  // Get QueryClient from the context
  const queryClient = useQueryClient()

  const { mutate: mutateUpdateAnnouncement, isLoading: updateLoading } = useMutation(updateAnnouncement, {
    onSuccess: data => {
      console.log(data)
      queryClient.invalidateQueries({
        queryKey: ['allAnnouncement']
      })
    },
    onError: error => {
      console.log(error)
    }
  })

  const openEditModal = (
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
      parentID: announcementID,
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
    mutateUpdateAnnouncement({
      parentID: announcementID,
      announcementID: id,
      data: {
        active: active === true ? 1 : 0,
        _method: 'put'
      }
    })
  }

  const columns = [
    { field: 'title', renderHeader: () => <Translations text='Title' />, minWidth: 100, flex: 0.05 },
    { field: 'description', renderHeader: () => <Translations text='Description' />, minWidth: 200, flex: 0.15 },
    {
      field: 'start_date',
      renderHeader: () => <Translations text='Start Date' />,
      minWidth: 120,
      flex: 0.03,
      renderCell: (params: GridRenderCellParams) => params.row.start_date.split('T')[0]
    },
    {
      field: 'end_date',
      renderHeader: () => <Translations text='End Date' />,
      minWidth: 120,
      flex: 0.03,
      renderCell: (params: GridRenderCellParams) =>
        params.row.end_date === null ? 'None' : params.row.end_date.split('T')[0]
    },
    {
      field: 'active',
      renderHeader: () => <Translations text='Active' />,
      minWidth: 85,
      flex: 0.02,
      renderCell: (params: GridRenderCellParams) => (
        <Switch checked={params.value} onClick={() => activateDeactivateAnnouncement(params.row._id, !params.value)} />
      )
    },
    {
      field: 'action',
      renderHeader: () => <Translations text='Action' />,
      minWidth: 85,
      flex: 0.02,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Button
            onClick={() =>
              openEditModal(
                params.row._id,
                params.row.title,
                params.row.description,
                params.row.start_date,
                params.row.end_date,
                params.row.active
              )
            }
          >
            <EditOutlinedIcon sx={styles.icon} />
          </Button>
        </Box>
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
            loading={isLoading || updateLoading}
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
