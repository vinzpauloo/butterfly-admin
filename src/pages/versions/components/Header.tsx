// ** React Imports
import React, { useState } from 'react'

// ** MUI Imports
import { Box, FormControl, InputLabel, MenuItem, Select, Typography, Button } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'

// ** Utils Imports
import { useTranslateString } from '@/utils/TranslateString'

// ** Other Imports
import { useSiteContext } from '../../../context/SiteContext'
import VersionsDrawer from './CreateDrawer'
import { FILE_SERVER_URL } from '@/lib/baseUrls'

// ** TanStack Query
import { useQuery } from '@tanstack/react-query'

// ** Hooks/Services
import { ApkService } from '@/services/api/ApkService'
import { useErrorHandling } from '@/hooks/useErrorHandling'

interface SiteNameProps {
  name: string
  id: number
  logo: string
}

const Header = () => {
  // ** Context
  const { selectedSite, setSelectedSite } = useSiteContext()

  // ** State Variables
  const [openDrawer, setOpenDrawer] = useState(false)
  const [siteName, setSiteName] = useState<SiteNameProps[]>([])

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
      handleError(e, `getAllSites() Versions Header, Select Site`)
    }
  })

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedSite(event.target.value as string)
  }

  const handleDrawerToggle = () => {
    setOpenDrawer(isDrawerOpen => !isDrawerOpen)
  }

  return (
    <Box mb={5}>
      <Typography variant='h4' component='h4'>
        {TranslateString('Mobile App')}
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
        <Box sx={styles.buttonWrapper}>
          {selectedSite === '' ? (
            false
          ) : (
            <Button sx={styles.button} variant='contained' onClick={handleDrawerToggle}>
              {TranslateString('Add') + ' ' + TranslateString('New')}
            </Button>
          )}
        </Box>
        <VersionsDrawer open={openDrawer} toggle={handleDrawerToggle} />
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

export default Header
