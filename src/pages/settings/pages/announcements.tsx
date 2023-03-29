// ** React Imports
import React, { useState } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import { Box, Card, Grid, Divider, Typography, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

// ** Third Party Components
import axios from 'axios'

// ** Other Imports
import AnnouncementModal from '../components/modal/AnnouncementModal'

// ** Style Imports

import ToggleButton from '@/pages/user/components/button/ToggleButton'
import EditBtn from '@/pages/user/components/button/EditButton'

const columns = [
  { field: 'title', headerName: 'Title', width: 400 },
  { field: 'dateCreated', headerName: 'Date Created', width: 350 },
  { field: 'lastLogIn', headerName: 'Last Log In', width: 350 },
  {
    field: 'action',
    headerName: 'Action',
    width: 100,
    renderCell: () => (
      <Box>
        <ToggleButton />
      </Box>
    )
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 100,
    renderCell: () => (
      <Box>
        <EditBtn modal={AnnouncementModal} />
      </Box>
    )
  }
]

interface announcementData {
  id: any
  title: string
  dateCreated: any
  lastLogIn: any
}

function createAnnouncementData(id: any, title: string, dateCreated: number, lastLogIn: number): announcementData {
  const date = new Date(dateCreated)
  const lastLog = new Date(lastLogIn)
  const hours = date.getHours()
  const formattedHours = (hours % 12 || 12).toString().padStart(2, '0')
  const formattedDateCreated = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
    .getDate()
    .toString()
    .padStart(2, '0')} ${formattedHours}:${date.getMinutes().toString().padStart(2, '0')}:${date
    .getSeconds()
    .toString()
    .padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`
  const formattedLastLog = `${lastLog.getFullYear()}-${(lastLog.getMonth() + 1).toString().padStart(2, '0')}-${lastLog
    .getDate()
    .toString()
    .padStart(2, '0')} ${formattedHours}:${lastLog.getMinutes().toString().padStart(2, '0')}:${lastLog
    .getSeconds()
    .toString()
    .padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`

  return {
    id,
    title,
    dateCreated: formattedDateCreated,
    lastLogIn: formattedLastLog
  }
}

const announcementRows = [
  { ...createAnnouncementData(1, 'Title 1', 1641812403000, 1643620222000) },
  { ...createAnnouncementData(2, 'Title 2', 1641812403000, 1643620222000) },
  { ...createAnnouncementData(3, 'Title 3', 1661640621000, 1643620222000) },
  { ...createAnnouncementData(4, 'Title 4', 1645137632000, 1643620222000) },
  { ...createAnnouncementData(5, 'Title 5', 1648314258000, 1643620222000) }
]

const Announcements = () => {
  const [pageSize, setPageSize] = useState<number>(10)

  const [openModal, setOpenModal] = useState(false)

  const handleOpen = () => {
    setOpenModal(true)
  }

  const handleClose = () => {
    setOpenModal(false)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <Box sx={styles.header}>
            <Box sx={styles.announcements}>
              <Typography sx={styles.announceText}>Announcements</Typography>
            </Box>

            <Button sx={styles.createAccount} onClick={handleOpen}>
              +Add New Announcements
            </Button>
          </Box>
          <Divider />

          <DataGrid
            autoHeight
            rows={announcementRows}
            columns={columns}
            pageSize={pageSize}
            disableSelectionOnClick
            checkboxSelection={false}
            sx={styles.dataGrid}
          />
        </Card>
      </Grid>
      <AnnouncementModal isOpen={openModal} onClose={handleClose} />
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
      sm: 'column',
      md: 'row',
      lg: 'row'
    },
    justifyContent: {
      xs: 'flex-start',
      sm: 'flex-start',
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
  }
}

export default Announcements
