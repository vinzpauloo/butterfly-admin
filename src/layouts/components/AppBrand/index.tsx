// ** MUI Imports
import { useTheme, styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

// ** Hook Import
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Styled component for the image
const Img = styled('img')({
  width: 80,
  height:'auto',
  position: 'relative',
  left:'11px'
})
const Butterfly = styled('img')({
  width: 30,
  height:'auto',
  position: 'relative',
  left:'20px'
})

const AppBrand = () => {

    // ** Hook
    const { settings } = useSettings()
    const { navCollapsed } = settings
    
    return (
      <Box
        sx={{ display: 'flex', alignItems: 'center' }}>
        
          {
            navCollapsed 
            ? 
              <Butterfly src='/images/butterfly_icon.png' />
              
            : 
            <Img src='/images/drawer-logo.png' />
          }
        
      </Box>
    )
  }

export default AppBrand;