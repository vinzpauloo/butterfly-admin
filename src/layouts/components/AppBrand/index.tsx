import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'

const AppBrand = () => {

    // ** Hook
    const { settings, saveSettings } = useSettings()
    
    return (
      <Box
        
        sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant='h6' sx={{ ml: 2 }}>
          Main Admin
        </Typography>
      </Box>
    )
  }

export default AppBrand;