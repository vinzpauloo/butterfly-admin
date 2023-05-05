import React, { ReactNode } from 'react'
import { Avatar, Box, Button, Divider, Menu, MenuItem, Typography, TypographyProps, useMediaQuery, Stack } from '@mui/material'
import PerfectScrollbarComponent from 'react-perfect-scrollbar'
import { useRouter } from 'next/router'
import { styled, Theme } from '@mui/material/styles'
import { FILE_SERVER_URL } from '@/lib/baseUrls'
import formatDate from '@/utils/formatDate'


// ** Styled PerfectScrollbar component
const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  maxHeight: 349
})

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

const NotificationsDropdown = ({ anchorEl, handleClose, open, menuItems }: any) => {
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'))
  const router = useRouter()

  const goToNotificationsPage = () => {
    handleClose()
    router.push('/notifications')
  }

  const navigateToSpecificNotification = (type: string) => {
    console.log(type)
    handleClose()
  } 

  return (
    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}
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
        {menuItems.length === 0 && 
          <Stack direction='row' justifyContent='center' p={12}>
            <Typography>You have no New Notification</Typography>
          </Stack>
        }
        {menuItems.map((item: any, index: number) => (
          <Box key={item?._id}>
            <MenuItem onClick={() => navigateToSpecificNotification('test')}>
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Avatar alt="Remy Sharp" src={FILE_SERVER_URL + item?.from?.photo} />
                <Box sx={{ mr: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                  <MenuItemTitle>{item?.from?.username}</MenuItemTitle>
                  <MenuItemSubtitle variant='body2' sx={{textTransform: 'capitalize'}}>
                    {item?.type.replace(/_/g, ' ')}
                  </MenuItemSubtitle>
                </Box>
                <Typography variant='caption' sx={{ color: 'text.disabled' }}>{formatDate(item?.created_at)}</Typography>
              </Box>
            </MenuItem>
            {index < menuItems.length - 1 && <Divider />}
          </Box>
        ))}
      </ScrollWrapper>
      <MenuItem disableRipple disableTouchRipple
        sx={{
          py: 3.5,
          borderBottom: 0,
          cursor: 'default',
          userSelect: 'auto',
          backgroundColor: 'transparent !important',
          borderTop: theme => `1px solid ${theme.palette.divider}`
        }}
      >
        <Button fullWidth variant='contained' onClick={goToNotificationsPage}>View All Notifications</Button>
      </MenuItem>
    </Menu>
  )
}

export default NotificationsDropdown
