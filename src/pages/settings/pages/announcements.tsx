import React, { useState } from 'react'
import { Box, Card, Grid, Divider, Typography, Button, Switch } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import AnnouncementModal from '../components/modal/AnnouncementModal'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { GridRenderCellParams } from '@mui/x-data-grid'

const Announcements = () => {
  const [pageSize, setPageSize] = useState<number>(5)
  const [rowCount, setRowCount] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [data, setData] = useState<any>([])
  const [modalInfo, setModalInfo] = useState({
    id: "",
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    active: true
  })

  const openEditModal = (id: string, title: string, description: string, start_date: string, end_date: any, active: boolean) => {
    setIsEditing(true)
    setOpenModal(true)

    // PASS THIS DATA TO THE MODAL
    setModalInfo({
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
    // MUTATE QUERY
    console.log(id)
    console.log(active)
  }

  const columns = [
    { field: 'title', headerName: 'Title', minWidth: 100, flex: 0.03, },
    { field: 'description', headerName: 'Description', minWidth: 200, flex: 0.15, },
    { field: 'start_date', headerName: 'Start Date', minWidth: 120, flex: 0.03, },
    {
      field: 'end_date',
      headerName: 'End Date',
      minWidth: 120,
      flex: 0.03,
      renderCell: (params: GridRenderCellParams) => params.row.end_date === null ? "None" : params.row.end_date
    },
    {
      field: 'active',
      headerName: 'Active',
      minWidth: 85,
      flex: 0.02,
      renderCell: (params: GridRenderCellParams) =>
        <Switch checked={params.value} onClick={() => activateDeactivateAnnouncement(params.row.id, !params.value)} />
    },
    {
      field: 'action',
      headerName: 'Action',
      minWidth: 85,
      flex: 0.02,
      renderCell: (params: GridRenderCellParams) => 
        <Box>
          <Button onClick={() => openEditModal(
              params.row.id,
              params.row.title,
              params.row.description,
              params.row.start_date,
              params.row.end_date,
              params.row.active)}>
            <EditOutlinedIcon sx={styles.icon} />
          </Button>
        </Box>
    },
  ]

  // FAKE DATA
  const announcementRows = [
    {
      id: "1",
      title: 'Title 1',
      description: "Et facere et cumque illum aut dolores. Dicta quo eius et modi eveniet. Quasi ipsam exercitationem tempora aspernatur. Sit alias aut quo. Facilis quia culpa voluptate. Aspernatur odit ipsa nulla.",
      start_date: "2023-05-15",
      end_date: null,
      active: true

    },
    {
      id: "2",
      title: 'Title 2',
      description: "Et facere et cumque illum aut dolores. Dicta quo eius et modi eveniet. Quasi ipsam exercitationem tempora aspernatur. Sit alias aut quo. Facilis quia culpa voluptate. Aspernatur odit ipsa nulla.",
      start_date: "2023-04-12",
      end_date: "2023-07-07",
      active: false
    },
    {
      id: "3",
      title: 'Title 3',
      description: "Et facere et cumque illum aut dolores. Dicta quo eius et modi eveniet. Quasi ipsam exercitationem tempora aspernatur. Sit alias aut quo. Facilis quia culpa voluptate. Aspernatur odit ipsa nulla.",
      start_date: "2024-01-02",
      end_date: "2024-05-05",
      active: false
    },
    {
      id: "4",
      title: 'Title 4',
      description: "Et facere et cumque illum aut dolores. Dicta quo eius et modi eveniet. Quasi ipsam exercitationem tempora aspernatur. Sit alias aut quo. Facilis quia culpa voluptate. Aspernatur odit ipsa nulla.",
      start_date: "2023-02-05",
      end_date:null,
      active: false
    },
    {
      id: "5",
      title: 'Title 5',
      description: "Et facere et cumque illum aut dolores. Dicta quo eius et modi eveniet. Quasi ipsam exercitationem tempora aspernatur. Sit alias aut quo. Facilis quia culpa voluptate. Aspernatur odit ipsa nulla.",
      start_date: "2023-07-05",
      end_date: "2023-08-17",
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
            onPageChange={newPage => setPage(newPage + 1)}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
            sx={styles.dataGrid}
            loading={false}
            getRowId={row => row.id}
            rowCount={rowCount} //total of data
            paginationMode='server'
            pagination
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

export default Announcements
