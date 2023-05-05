import React, { useState } from 'react'
import { Badge, IconButton, Tooltip } from '@mui/material'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import NotificationsDropdown from './components/NotificationsDropdown'
import NotificationService from '@/services/api/NotificationService'
import { useQuery } from '@tanstack/react-query'

const Notifications = () => {
  const [data, setData] = useState<any>([])
  const [totalNotifs, setTotalNotifs] = useState<number>(0)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const newNotifications = `You have ${data.length} new notifications!`
  const noNotifications = `No new notifications.`

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const { getAllAdminNotifs } = NotificationService()
  const { } = useQuery({
    queryKey: ['allAdminNotifs'],
    queryFn: () => getAllAdminNotifs({
      data: {
        with: 'from',
        page: 1
      }
    }),
    onSuccess: data => {
      setData(data?.data)
      setTotalNotifs(data?.total)
    },
    onError: error => { console.log(error) }
  })

  return (
    <div>
      <Tooltip title={totalNotifs > 0 ? newNotifications : noNotifications}>
        <IconButton color='inherit' onClick={totalNotifs > 0 ? handleOpen : undefined}>
          <Badge badgeContent={totalNotifs} color='error'>
            <NotificationsNoneIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <NotificationsDropdown
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        handleClose={handleClose}
        menuItems={data}
      />
    </div>
  )
}

export default Notifications
