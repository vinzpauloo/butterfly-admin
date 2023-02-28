// ** MUI Imports
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const AppBrand = () => {

    // ** Hook
    const { settings, saveSettings } = useSettings()
    const { navCollapsed } = settings
    const theme = useTheme()

    return (
      <Box
        sx={{ display: 'flex', alignItems: 'center' }}>
        
          {
            navCollapsed 
            ? 
              <Box 
              onClick={() => saveSettings({ ...settings, navCollapsed: !navCollapsed })}
                sx={{ cursor:'pointer', ml: 6 , display: 'flex', color: theme => theme.palette.primary.main }}>
                <Icon icon='mdi:menu' fontSize={20} />
              </Box>
            : 
              <Typography variant='h6' sx={{ ml: 2 }}>MAIN ADMIN</Typography>
          }
        
      </Box>
    )
  }

export default AppBrand;