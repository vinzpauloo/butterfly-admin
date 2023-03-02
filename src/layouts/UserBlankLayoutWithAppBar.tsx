// ** MUI Imports
import Box, { BoxProps } from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles'

// ** Types
import { BlankLayoutWithAppBarProps } from 'src/@core/layouts/types'
import LanguageFlagsDropdown from './components/shared-components/LanguageFlagsDropdown';
import { Settings } from 'src/@core/context/settingsContext'
import AppBarDate from './components/shared-components/AppBarDate';

// Styled component 
const UserBlankLayoutWithAppBarWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    height: '100vh',
  
    // For V1 Blank layout pages
    '& .content-center': {
      display: 'flex',
      minHeight: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing(5)
    },
  
    // For V2 Blank layout pages
    '& .content-right': {
      display: 'flex',
      minHeight: '100vh',
      overflowX: 'hidden',
      position: 'relative'
    }
}))


const UserBlankLayoutWithAppBar = (props: BlankLayoutWithAppBarProps) => {
  // ** Props
  const { children } = props

  return (
    <UserBlankLayoutWithAppBarWrapper className='layout-wrapper'>
      <AppBar elevation={0} sx={{ backgroundColor:'transparent'}} position="fixed">
        <Toolbar
            sx={{
                display:'flex', 
                justifyContent:'flex-end',
                paddingTop:[null,null,null,8],
                paddingRight: [null,null,null,'5rem']
            }}
        >
            <LanguageFlagsDropdown />
            <AppBarDate />
          
        </Toolbar>
      </AppBar>
      <Box className='app-content' sx={{ overflowX: 'hidden', position: 'relative' }}>
        {children}
      </Box>
    </UserBlankLayoutWithAppBarWrapper>
  )
}

export default UserBlankLayoutWithAppBar
