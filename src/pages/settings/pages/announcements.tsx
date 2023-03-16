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
import announcementColumns from '../data/AnnouncementColumns'
import announcementRows from '../data/AnnouncementRows'
import AnnouncementModal from '../components/modal/AnnouncementModal'

// ** Style Imports
import styles from '../styles/announcementStyles'

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
            columns={announcementColumns}
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

export default Announcements
