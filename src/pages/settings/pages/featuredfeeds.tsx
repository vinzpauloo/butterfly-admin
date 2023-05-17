// ** React Imports
import React, { ChangeEvent } from 'react'

// ** MUI Imports
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

// ** Project/Other Imports
import { FeaturedFeedsColumns } from '@/data/FeaturedFeedsColumns'
import SelectFeedsModal from '../components/modal/SelectFeedsModal'
import Container from '@/pages/components/Container'
import FeaturedFeedsToolbar from '../components/toolbar/FeaturedFeedsToolbar'

// ** Zustand Store
import { useFeaturedFeedStore } from '@/zustand/featuredFeedGlobalStore'

// ** Hooks/Services
import { useErrorHandling } from '@/hooks/useErrorHandling'
import FeedsService from '@/services/api/FeedsService'
import { ApkService } from '@/services/api/ApkService'
import useDebounce from '@/hooks/useDebounce'

// ** Utils Imports
import { useTranslateString } from '@/utils/TranslateString'

// ** TanStack Imports
import { useQuery } from '@tanstack/react-query'

// ** Lib Imports
import { FILE_SERVER_URL } from '@/lib/baseUrls'

const FeaturedFeeds = () => {
  // ** Services
  const { getFeaturedFeeds } = FeedsService()
  const { handleError } = useErrorHandling()

  // ** Data
  const { columns } = FeaturedFeedsColumns()

  // ** Zustand Store
  const { toggleFeedModal, isFeedModalOpen, selectedSite, pageSize, rowData, setRowData, titleSearchValue } =
    useFeaturedFeedStore()
  const handleSearch = useFeaturedFeedStore(state => state.handleSearch)

  // ** Debounce Service
  const debouncedTitle = useDebounce(titleSearchValue, 1000)

  // ** API Methods
  const { isLoading, isRefetching } = useQuery({
    queryKey: [`featuredFeeds`, selectedSite, debouncedTitle],
    queryFn: () =>
      getFeaturedFeeds({
        site_id: selectedSite,
        search: debouncedTitle
      }),
    onSuccess: data => {
      setRowData(data?.data)
    },
    onError: (e: any) => {
      handleError(e, `getFeaturedFeeds() settings/pages/featuredfeeds.tsx`)
    }
  })

  return (
    <Container>
      <Typography variant='h4' component='h4'>
        Featured Feeds
      </Typography>

      <SelectSite />

      <DataGrid
        disableColumnMenu
        loading={isLoading || isRefetching}
        checkboxSelection={false}
        disableSelectionOnClick
        autoHeight
        rows={rowData ?? []}
        getRowId={(row: any) => row?.featured_id}
        columns={columns}
        pageSize={pageSize || 10}
        pagination
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

function SelectSite() {
  // ** Service
  const { getAllSites } = ApkService()

  // ** Hooks
  const { handleError } = useErrorHandling()

  // ** Utils
  const TranslateString = useTranslateString()

  // ** Zustand Store
  const { selectedSite, siteName, setSiteName } = useFeaturedFeedStore()
  const handleChange = useFeaturedFeedStore(state => state.handleChange)

  // ** API methods
  useQuery({
    queryKey: ['getAllSites'],
    queryFn: () => getAllSites(),
    onSuccess: (data: any) => {
      setSiteName(data)
    },
    onError: (e: any) => {
      handleError(e, `getAllSites() Feature Feeds, Select Site`)
    }
  })

  return (
    <Box mt={5} sx={styles.wrapper}>
      <FormControl size='small' sx={styles.formControl}>
        <InputLabel id='demo-simple-select-label'>{TranslateString('Select Site')}</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          label='Select Site'
          value={selectedSite ?? ''}
          onChange={handleChange}
          sx={styles.menuSelect}
          MenuProps={{
            sx: { ...styles.menuList }
          }}
        >
          {siteName &&
            siteName?.map((item, index) => (
              <MenuItem key={index} value={item.id}>
                {item.logo ? (
                  <img src={FILE_SERVER_URL + item.logo} alt='Logo' width={40} />
                ) : (
                  <img src='/images/studio/butterfly_file_upload.png' alt='Placeholder Logo' width={40} />
                )}
                {item.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
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
  },

  //
  wrapper: {
    mb: 4
  },
  formControl: {
    width: {
      xs: '100%',
      lg: '25%'
    }
  },
  buttonWrapper: {
    mt: {
      xs: 2,
      sm: 2,
      md: 2,
      lg: 0
    }
  },
  button: {
    width: {
      xs: 'auto',
      sm: 'auto',
      md: 'auto',
      lg: 150
    },
    float: 'right'
  },
  menuSelect: {
    '& .MuiSelect-select': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  },
  menuList: {
    '& .MuiMenuItem-root': {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }
}

export default FeaturedFeeds
