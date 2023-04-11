import React, { useState } from 'react'
import { Box, Card, Grid, Divider, Typography, Button, Switch } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import AnnouncementModal from '../components/modal/AnnouncementModal'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { GridRenderCellParams } from '@mui/x-data-grid'

const Announcements = () => {
  const [pageSize, setPageSize] = useState<number>(5)
  const [openModal, setOpenModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [data, setData] = useState([])

  const openEditModal = () => {
    setIsEditing(true)
    setOpenModal(true)
  }

  const handleOpen = () => {
    setIsEditing(false)
    setOpenModal(true)
  }

  const handleClose = () => {
    setOpenModal(false)
  }

  const columns = [
    { field: 'title', headerName: 'Title', minWidth: 100, flex: 0.03, },
    { field: 'description', headerName: 'Description', minWidth: 200, flex: 0.15, },
    { field: 'start_date', headerName: 'Start Date', minWidth: 120, flex: 0.03, },
    { field: 'end_date', headerName: 'End Date', minWidth: 120, flex: 0.03, },
    {
      field: 'active',
      headerName: 'Active',
      minWidth: 85,
      flex: 0.02,
      renderCell: (params: GridRenderCellParams) => <Switch checked={params.value} />
    },
    {
      field: 'action',
      headerName: 'Action',
      minWidth: 85,
      flex: 0.02,
      renderCell: () => (
        <Box>
          <Button onClick={openEditModal}>
            <EditOutlinedIcon sx={styles.icon} />
          </Button>
        </Box>
      )
    },
  ]

  // FAKE DATA
  const announcementRows = [
    {
      id: 1,
      title: 'Title 1',
      description: "Et facere et cumque illum aut dolores. Dicta quo eius et modi eveniet. Quasi ipsam exercitationem tempora aspernatur. Sit alias aut quo. Facilis quia culpa voluptate. Aspernatur odit ipsa nulla.",
      start_date: "2023-04-05",
      end_date: "2023-04-07",
      active: true

    },
    {
      id: 2,
      title: 'Title 2',
      description: "Et facere et cumque illum aut dolores. Dicta quo eius et modi eveniet. Quasi ipsam exercitationem tempora aspernatur. Sit alias aut quo. Facilis quia culpa voluptate. Aspernatur odit ipsa nulla.",
      start_date: "2023-04-05",
      end_date: "2023-04-07",
      active: false
    },
    {
      id: 3,
      title: 'Title 3',
      description: "Et facere et cumque illum aut dolores. Dicta quo eius et modi eveniet. Quasi ipsam exercitationem tempora aspernatur. Sit alias aut quo. Facilis quia culpa voluptate. Aspernatur odit ipsa nulla.",
      start_date: "2023-04-05",
      end_date: "2023-04-07",
      active: false
    },
    {
      id: 4,
      title: 'Title 4',
      description: "Et facere et cumque illum aut dolores. Dicta quo eius et modi eveniet. Quasi ipsam exercitationem tempora aspernatur. Sit alias aut quo. Facilis quia culpa voluptate. Aspernatur odit ipsa nulla.",
      start_date: "2023-04-05",
      end_date: "2023-04-07",
      active: false
    },
    {
      id: 5,
      title: 'Title 5',
      description: "Et facere et cumque illum aut dolores. Dicta quo eius et modi eveniet. Quasi ipsam exercitationem tempora aspernatur. Sit alias aut quo. Facilis quia culpa voluptate. Aspernatur odit ipsa nulla.",
      start_date: "2023-04-05",
      end_date: "2023-04-07",
      active: true
    },
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <Box sx={styles.header}>
            <Box sx={styles.announcements}>
              <Typography sx={styles.announceText}>Announcements</Typography>
            </Box>
            <Button variant="contained" onClick={handleOpen}>+ Add New Announcements</Button>
          </Box>
          <Divider />
          <DataGrid
            autoHeight
            rows={announcementRows}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[5, 10, 15]}
            disableSelectionOnClick
            checkboxSelection={false}
            sx={styles.dataGrid}
          />
        </Card>
      </Grid>
      <AnnouncementModal isEditing={isEditing} isOpen={openModal} onClose={handleClose} />
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

export default Announcements
