// ** React Imports
import React, { ChangeEvent, useState } from 'react'

// ** MUI Imports
import { Box, Button, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

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
  username: any
  feed_type: string
  dateCreated: any
}

function createFeedFeatureData(
  id: any,
  title: string,
  username: string,
  feed_type: string,
  dateCreated: number
): feedFeatureData {
  const date = new Date(dateCreated)
  const hours = date.getHours()
  const formattedHours = (hours % 12 || 12).toString().padStart(2, '0')
  const formattedDateCreated = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
    .getDate()
    .toString()
    .padStart(2, '0')} ${formattedHours}:${date.getMinutes().toString().padStart(2, '0')}:${date
    .getSeconds()
    .toString()
    .padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`

  return {
    id,
    title,
    username,
    feed_type,
    dateCreated: formattedDateCreated
  }
}

const feedFeatureRows = [
  { ...createFeedFeatureData(1, 'Title 1', `JokkakeUdon`, `Story Feed`, 1641812403000) },
  { ...createFeedFeatureData(2, 'Title 2', `MarketsuShabu`, `Photo Feed`, 1641812403000) },
  { ...createFeedFeatureData(3, 'Title 3', `Dex@CC`, `Video Feed`, 1661640621000) },
  { ...createFeedFeatureData(4, 'Title 4', `Mark@CC`, `Video with Photos`, 1645137632000) },
  { ...createFeedFeatureData(5, 'Title 5', `Liyan@CC`, `Story Feed`, 1648314258000) }
]

const feedFeatureColumns = [
  { flex: 0.04, minWidth: 220, sortable: false, field: 'title', headerName: `Title` },
  { flex: 0.02, minWidth: 150, sortable: false, field: 'username', headerName: `Username` },
  { flex: 0.02, minWidth: 160, sortable: false, field: 'feed_type', headerName: `Feed Type` },
  { flex: 0.02, minWidth: 200, sortable: false, field: 'dateCreated', headerName: `Date Created` },
  {
    flex: 0.02,
    minWidth: 150,
    sortable: false,
    field: 'action',
    headerName: `Action`,
    renderCell: () => (
      <Box>
        <ToggleButton />
        <Button>
          <DeleteOutlineIcon color='secondary' />
        </Button>
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
