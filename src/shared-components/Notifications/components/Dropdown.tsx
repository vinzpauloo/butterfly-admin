// ** React Imports
import React, { ReactNode } from 'react'
import PerfectScrollbarComponent from 'react-perfect-scrollbar'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import { Box, Button, Divider, Menu, MenuItem, Typography, TypographyProps, useMediaQuery } from '@mui/material'
import { styled, Theme } from '@mui/material/styles'

// ** Type Imports
import { NotificationDropdownProps } from '@/types/notificationTypes'

// ** Styled PerfectScrollbar component
const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  maxHeight: 349
})

import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Styled component for the title in MenuItems
const MenuItemTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  flex: '1 1 100%',
  overflow: 'hidden',
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  marginBottom: theme.spacing(0.75)
}))

// ** Styled component for the subtitle in MenuItems
const MenuItemSubtitle = styled(Typography)<TypographyProps>({
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
})

const ScrollWrapper = ({ children, hidden }: { children: ReactNode; hidden: boolean }) => {
  if (hidden) {
    return <Box sx={{ maxHeight: 349, overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
  } else {
    return <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>
  }
}

// ** Main Component
const NotificationsDropdown = ({ anchorEl, handleClose, open, menuItems }: NotificationDropdownProps) => {
  // ** Hook
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))

  // ** Router
  const router = useRouter()

  const goToNotificationsPage = () => {
    router.push('/notifications')
  }

  return (
    <Menu
      id='basic-menu'
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
    >
      <ScrollWrapper hidden={hidden}>
        {menuItems.map((item, index) => (
          <Box key={index}>
            <MenuItem onClick={handleClose}>
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                <CustomAvatar color='primary' sx={{ mr: { xs: 4, sm: 4, md: 4, lg: 4 } }} />
                <Box sx={{ mr: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                  <MenuItemTitle>{item.label}</MenuItemTitle>
                  <MenuItemSubtitle variant='body2'>{item.label}</MenuItemSubtitle>
                </Box>
                <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                  {item.label}
                </Typography>
              </Box>
            </MenuItem>
            {index < menuItems.length - 1 && <Divider />}
          </Box>
        ))}
      </ScrollWrapper>
      <MenuItem
        disableRipple
        disableTouchRipple
        sx={{
          py: 3.5,
          borderBottom: 0,
          cursor: 'default',
          userSelect: 'auto',
          backgroundColor: 'transparent !important',
          borderTop: theme => `1px solid ${theme.palette.divider}`
        }}
      >
        <Button fullWidth variant='contained' onClick={goToNotificationsPage}>
          Read All Notifications
        </Button>
      </MenuItem>
    </Menu>
  )
}

export default NotificationsDropdown
