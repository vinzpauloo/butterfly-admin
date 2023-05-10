import React, { ReactNode } from 'react'
import { Avatar, Box, Button, Divider, Menu, MenuItem, Typography, TypographyProps, useMediaQuery, Stack, Badge } from '@mui/material'
import PerfectScrollbarComponent from 'react-perfect-scrollbar'
import { useRouter } from 'next/router'
import { styled, Theme } from '@mui/material/styles'
import { FILE_SERVER_URL } from '@/lib/baseUrls'
import formatDate from '@/utils/formatDate'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import NotificationService from '@/services/api/NotificationService'


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

  const { makeNotificationSeen } = NotificationService()
  const queryClient = useQueryClient()
  const { mutate: mutateMakeNotificationSeen } = useMutation(makeNotificationSeen, {
    onSuccess: data => {
      console.log(data)
      queryClient.invalidateQueries({ queryKey: ['allAdminNotifs'] })
      queryClient.invalidateQueries({ queryKey: ['newNotifsCount'] })
    },
    onError: error => { console.log(error) },
  },)

  const seeNotification = (id: string, type: string) => {
    handleClose()
    mutateMakeNotificationSeen({ id: id, data: { _method: 'put'} })

    // navigate to certain page base on the type of notification - WIP
    if (type === 'work_approval') router.push('/studio/content')
  }

  const goToNotificationsPage = () => {
    handleClose()
    router.push('/notifications')
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
            <MenuItem disableRipple={item?.is_seen} onClick={item?.is_seen ? undefined : () => seeNotification(item?._id, item?.type)}>
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Badge color={item?.is_seen ? undefined : 'primary'} variant='dot' />
                <Avatar alt={item?.from?.username} src={FILE_SERVER_URL + item?.from?.photo} />
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
