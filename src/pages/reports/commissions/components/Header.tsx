// ** React Imports
import React from 'react'

// ** MUI Imports
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'

// ** Utils Imports
import { useTranslateString } from '@/utils/TranslateString'

// ** Other Imports
import { FILE_SERVER_URL } from '@/lib/baseUrls'

// ** TanStack Query
import { useQuery } from '@tanstack/react-query'

// ** Hooks/Services
import { ApkService } from '@/services/api/ApkService'
import { useErrorHandling } from '@/hooks/useErrorHandling'
import { useReportsCommissionsStore } from '@/zustand/reportsCommissionsStore'

const Header = () => {
  // ** Zustand Store
  const { siteName, setSiteName, selectedSite } = useReportsCommissionsStore()
  const { handleChange } = useReportsCommissionsStore(state => ({
    handleChange: state.handleChange
  }))

  // ** Hooks/Services
  const { handleError } = useErrorHandling()
  const { getAllSites } = ApkService()

  // ** Utilities
  const TranslateString = useTranslateString()

  // ** API methods
  useQuery({
    queryKey: ['getAllSites'],
    queryFn: () => getAllSites(),
    onSuccess: (data: any) => {
      setSiteName(data)
    },
    onError: (e: any) => {
      handleError(e, `getAllSites() Security Funds Header, Select Site`)
    }
  })

  return (
    <Box mb={5}>
      <Typography variant='h4' component='h4'>
        {TranslateString('Commissions')}
      </Typography>
      <Box mt={5} sx={styles.wrapper}>
        <FormControl size='small' sx={styles.formControl}>
          <InputLabel id='demo-simple-select-label'>{TranslateString('Select Site')}</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            label='Select Site'
            value={selectedSite || ''}
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
    </Box>
  )
}

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: {
      xs: 'column',
      sm: 'column',
      md: 'column',
      lg: 'row'
    }
  },
  formControl: {
    width: {
      xs: '100%',
      lg: '25%'
    }
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

export default Header
