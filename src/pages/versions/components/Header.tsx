// ** React Imports
import React, { useState } from 'react'

// ** MUI Imports
import { Box, FormControl, InputLabel, MenuItem, Select, Typography, Button } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'

// ** Utils Imports
import { useTranslateString } from '@/utils/TranslateString'

// ** Other Imports
import { MenuItemData } from '../data/MenuItemData'
import { useSiteContext } from '../context/SiteContext'
import VersionsDrawer from './CreateDrawer'

const Header = () => {
  const { selectedSite, setSelectedSite } = useSiteContext()
  const { siteData } = MenuItemData()

  const TranslateString = useTranslateString()

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedSite(event.target.value as string)
  }

  const [openDrawer, setOpenDrawer] = useState(false)
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
          >
            <MenuItem value='' sx={{ ...styles.menuItem, fontWeight: '600', textTransform: 'uppercase' }}>
              <em>None</em>
            </MenuItem>
            {siteData.map((item, index) => (
              <MenuItem key={index} value={item.value} sx={styles.menuItem}>
                <img src={item.image} alt='' width={40} />
                {item.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={styles.buttonWrapper}>
          <Button sx={styles.button} variant='contained' onClick={handleDrawerToggle}>
            {TranslateString('Add') + ' ' + TranslateString('New')}
          </Button>
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
  menuItem: {
    display: 'flex',
    justifyContent: 'space-between'
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
  }
}

export default Header
