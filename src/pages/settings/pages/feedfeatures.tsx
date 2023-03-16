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
import feedFeatureColumns from '../data/FeedFeatureColumns'
import feedFeatureRows from '../data/FeedFeatureRows'
import AnnouncementModal from '../components/modal/AnnouncementModal'

// ** Style Imports
import styles from '../styles/feedFeatureStyles'

const FeedFeatures = () => {
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
              <Typography sx={styles.announceText}>Feed Features</Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], gap: 5 }}>
              <Button sx={styles.createAccount} onClick={handleOpen}>
                Select Featured Feeds
              </Button>

              <Button sx={styles.createAccount} onClick={handleOpen}>
                Create Feed
              </Button>
            </Box>
          </Box>
          <Divider />

          <DataGrid
            autoHeight
            rows={feedFeatureRows}
            columns={feedFeatureColumns}
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

export default FeedFeatures
