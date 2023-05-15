// ** React Imports
import React, { ChangeEvent, useState } from 'react'

// ** MUI Imports
import { Box, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

// ** Project/Other Imports
import SelectFeedsModal from '../components/modal/SelectFeedsModal'
import ToggleButton from '@/pages/user/components/button/ToggleButton'
import Container from '@/pages/components/Container'
import FeaturedFeedsToolbar from '../components/toolbar/FeaturedFeedsToolbar'

// ** Zustand Store
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
  { flex: 0.04, minWidth: 70, sortable: false, field: 'title', headerName: `Title` },
  { flex: 0.02, minWidth: 60, sortable: false, field: 'MobileNumber', headerName: `Mobile No.` },
  { flex: 0.02, minWidth: 60, sortable: false, field: 'Email', headerName: `Email` },
  { flex: 0.03, minWidth: 80, sortable: false, field: 'dateCreated', headerName: `Date Created` },
  { flex: 0.03, minWidth: 80, sortable: false, field: 'lastLogIn', headerName: `Last Login` },
  {
    flex: 0.01,
    minWidth: 60,
    sortable: false,
    field: 'action',
    headerName: `Action`,
    renderCell: () => (
      <Box>
        <ToggleButton />
      </Box>
    )
  }
]

const FeaturedFeeds = () => {
  // feed features
  const { toggleFeedModal, isFeedModalOpen } = useFeaturedFeedStore()

  const [pageSize] = useState<number>(10)
  const [titleSearchValue, setTitleSearchValue] = useState<string | undefined>(undefined)
  const [search, setSearch] = useState<string | undefined>(undefined)

  const handleSearch = React.useCallback((value: string, type: string) => {
    setSearch(type)
    switch (type) {
      case 'title':
        setTitleSearchValue(value || undefined)
        break
    }
  }, [])

  return (
    <Container>
      <Box sx={styles.buttonContainer}>
        <Typography variant='h4' component='h4'>
          Featured Feeds
        </Typography>
      </Box>

      <DataGrid
        disableColumnMenu
        // loading={isLoading || isRefetching}
        checkboxSelection={false}
        disableSelectionOnClick
        paginationMode='server'
        sortingMode='server'
        autoHeight
        rows={feedFeatureRows ?? []}
        // rows={albumData ?? []}
        // getRowId={(row: AlbumData) => row?._id}
        // columns={albumColumns}
        columns={feedFeatureColumns}
        pageSize={pageSize || 10}
        pagination
        // onPageChange={handlePageChange}
        // rowCount={rowCount || 10}
        rowsPerPageOptions={[10]}
        components={{ Toolbar: FeaturedFeedsToolbar }}
        componentsProps={{
          toolbar: {
            titleValue: titleSearchValue,
            clearSearch: () => {
              handleSearch('', 'title')
            },
            onTitleChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value, 'title'),
            toggleFeedModal: () => toggleFeedModal()
          }
        }}
      />
      <SelectFeedsModal isOpen={isFeedModalOpen} onClose={() => toggleFeedModal()} />
    </Container>
  )
}

const styles = {
  buttonContainer: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'column',
      md: 'column',
      lg: 'row'
    },
    justifyContent: {
      xs: 'flex-start',
      md: 'flex-start',
      lg: 'space-between'
    },
    mb: 5
  }
}

export default FeaturedFeeds
