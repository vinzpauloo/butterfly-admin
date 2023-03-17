// ** React Imports
import React, { useState } from 'react'

// ** MUI Imports
import { Box, Card, Grid, Divider, Typography, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

// ** Other Imports
import feedFeatureColumns from '../data/FeedFeatureColumns'
import feedFeatureRows from '../data/FeedFeatureRows'
import SelectFeedsModal from '../components/modal/SelectFeedsModal'
import CreateFeedModal from '../components/modal/CreateFeedModal'

// ** Style Imports
import styles from '../styles/feedFeatureStyles'

type ModalType = 'select' | 'create' | null

const FeedFeatures = () => {
  const [pageSize, setPageSize] = useState<number>(10)

  const [openModal, setOpenModal] = useState<ModalType>(null)

  const handleModalToggle = (modalType: ModalType) => {
    setOpenModal(prevModal => (prevModal === modalType ? null : modalType))
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <Box sx={styles.header}>
            <Box sx={styles.feeds}>
              <Typography sx={styles.feedText}>Feed Features</Typography>
            </Box>

            <Box sx={styles.buttonContainer}>
              <Button sx={styles.button} onClick={() => handleModalToggle('select')}>
                Select Featured Feeds
              </Button>

              <Button sx={styles.button} onClick={() => handleModalToggle('create')}>
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
      <SelectFeedsModal isOpen={openModal === 'select'} onClose={() => handleModalToggle('select')} />
      <CreateFeedModal isOpen={openModal === 'create'} onClose={() => handleModalToggle('create')} />
    </Grid>
  )
}

export default FeedFeatures
