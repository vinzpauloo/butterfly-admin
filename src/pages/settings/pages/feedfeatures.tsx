// ** React Imports
import React, { useState } from 'react'

// ** MUI Imports
import { Box, Card, Grid, Divider, Typography, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

// ** Other Imports
import SelectFeedsModal from '../components/modal/SelectFeedsModal'
import { useTranslateString } from '@/utils/TranslateString';
import Translations from '@/layouts/components/Translations'

// ** Style Imports

import ToggleButton from '@/pages/user/components/button/ToggleButton'
import EditBtn from '@/pages/user/components/button/EditButton'
import EditFeedModal from '../components/modal/EditFeedModal'

// ** global featured feed store
import { useFeaturedFeedStore } from '@/zustand/featuredFeedGlobalStore'

interface feedFeatureData {
  id: any
  title: string
  MobileNumber: any
  Email: string
  dateCreated: any
  lastLogIn: any
}

function createFeedFeatureData(
  id: any,
  title: string,
  MobileNumber: any,
  Email: string,
  dateCreated: number,
  lastLogIn: number
): feedFeatureData {
  const formattedMobileNumber = `+${MobileNumber.toString().substring(0, 2)} ${MobileNumber.toString().substring(
    2,
    5
  )} ${MobileNumber.toString().substring(5, 8)} ${MobileNumber.toString().substring(8)}`
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
    MobileNumber: formattedMobileNumber,
    Email,
    dateCreated: formattedDateCreated,
    lastLogIn: formattedLastLog
  }
}

const feedFeatureRows = [
  { ...createFeedFeatureData(1, 'Title 1', +639173263512, `cc@account.com`, 1641812403000, 1643620222000) },
  { ...createFeedFeatureData(2, 'Title 2', +639173263512, `cc@account.com`, 1641812403000, 1643620222000) },
  { ...createFeedFeatureData(3, 'Title 3', +639173263512, `cc@account.com`, 1661640621000, 1643620222000) },
  { ...createFeedFeatureData(4, 'Title 4', +639173263512, `cc@account.com`, 1645137632000, 1643620222000) },
  { ...createFeedFeatureData(5, 'Title 5', +639173263512, `cc@account.com`, 1648314258000, 1643620222000) }
]

const feedFeatureColumns = [
  { field: 'title', headerName: <Translations text='Title' />, width: 200 },
  { field: 'MobileNumber', headerName: <Translations text='Mobile Number' />, width: 200 },
  { field: 'Email', headerName: <Translations text='Email' />, width: 200 },
  { field: 'dateCreated', headerName: <Translations text='Date Created' />, width: 250 },
  { field: 'lastLogIn', headerName: <Translations text='Last Login' />, width: 250 },
  {
    field: 'action',
    headerName: <Translations text='Action' />,
    width: 100,
    renderCell: () => (
      <Box>
        <ToggleButton />
      </Box>
    )
  },
  {
    field: 'status',
    headerName: <Translations text='Status' />,
    width: 100,
    renderCell: () => (
      <Box>
        <EditBtn modal={EditFeedModal} />
      </Box>
    )
  }
]

const FeedFeatures = () => {
  
  // feed features
  const { toggleFeedModal, isFeedModalOpen } = useFeaturedFeedStore()

  const [pageSize, setPageSize] = useState<number>(10)



  const TranslateString = useTranslateString()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <Box sx={styles.header}>
            <Box sx={styles.feeds}>
              <Typography sx={styles.feedText}>{TranslateString('Feed Features')}</Typography>
            </Box>

            <Box sx={styles.buttonContainer}>
              <Button sx={styles.button} onClick={() => toggleFeedModal()}>
                {TranslateString('Select Featured Feeds')}
              </Button>
            </Box>
          </Box>
          <Divider />

          <DataGrid
            autoHeight
            rows={feedFeatureRows}
            // @ts-ignore
            columns={feedFeatureColumns}
            pageSize={pageSize}
            disableSelectionOnClick
            checkboxSelection={false}
            sx={styles.dataGrid}
          />
        </Card>
      </Grid>
      <SelectFeedsModal isOpen={isFeedModalOpen} onClose={() => toggleFeedModal()} />
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
  feeds: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  feedText: {
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: 500
  },
  linkButton: {
    textDecoration: 'none'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'column',
      md: 'row',
      lg: 'row'
    },
    gap: 5
  },
  button: {
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

export default FeedFeatures
