import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { useTheme } from '@mui/material/styles'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Components
import CustomUserDropdown from 'src/layouts/components/shared-components/CustomUserDropdown'
import LanguageFlagsDropdown from 'src/layouts/components/shared-components/LanguageFlagsDropdown';
import AppBarDate from 'src/layouts/components/shared-components/AppBarDate';
import CustomNotificationDropdown, {
  NotificationsType
} from 'src/layouts/components/shared-components/CustomNotificationDropdown'
import { Grid, Typography } from '@mui/material'

// ** Date
import { toDate, format } from 'date-fns';


interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

const notifications: NotificationsType[] = [
  {
    meta: '25 May',
    title: 'Paypal',
    avatarAlt: 'paypal',
    subtitle: 'Received Payment',
    avatarImg: '/images/misc/paypal.png'
  },
  {
    meta: '19 Mar',
    avatarAlt: 'order',
    title: 'Received Order 📦',
    avatarImg: '/images/avatars/3.png',
    subtitle: 'New VIP member'
  },
  {
    meta: '27 Dec',
    avatarAlt: 'chart',
    subtitle: '25 hrs ago',
    avatarImg: '/images/misc/chart.png',
    title: 'Finance report has been generated'
  }
]


const AppBarContent = (props: Props) => {

  // ** Hook
  const theme = useTheme()

  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props

  const currentDate = toDate(new Date())
  const formattedDate = format(currentDate, 'MMMM d, yyyy');

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden && !settings.navHidden ? (
          <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
            <Icon icon='mdi:menu' />
          </IconButton>
        ) : null}
        <Typography
          sx={{ color:'##111111', paddingLeft:'3rem'}}>HOME</Typography>
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
          
        <Box gap={3} className='' sx={{ display: 'flex', flexDirection:'column', alignItems: 'center',paddingBlock:'1rem' }}>

          <Box sx={{display:'flex', alignItems:'flex-start'}} gap={2}>

            <img width={28} src='/images/topbar/msg.png' />
            <CustomNotificationDropdown settings={settings} notifications={notifications} />
            <Box alignItems='flex-end' flexDirection='column' display='flex' justifyContent='flex-end'>
              <Typography lineHeight={1} variant='body2'>Juan Pablo Dela Cruz</Typography>
              <Typography variant='body2'>Administrator</Typography>
            </Box>
            
            <CustomUserDropdown settings={settings} />
          </Box>

          <Grid sx={{display:'flex', justifyContent:'flex-end',alignItems:'center'}} container spacing={2}>
            <Grid padding={0} item>
              <LanguageFlagsDropdown />
            </Grid>
            <Grid item>
              <AppBarDate />
            </Grid>
          </Grid>

        </Box>

      </Box>
    </Box>
  )
}

export default AppBarContent
