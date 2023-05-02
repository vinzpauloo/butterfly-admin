// ** React Imports
import React from 'react'
import { NotificationProps } from '@/types/notificationTypes'

// ** MUI Imports
import { Badge, IconButton, Tooltip } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'

// ** Project/Other Imports
import NotificationsDropdown from './components/Dropdown'

const Notifications = ({ notifications }: NotificationProps) => {
  const newNotifications = `You have ${notifications.length} new notifications!`
  const noNotifications = `No new notifications.`

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Tooltip title={notifications.length > 0 ? newNotifications : noNotifications}>
        <IconButton color='primary' onClick={notifications.length > 0 ? handleOpen : undefined}>
          <Badge badgeContent={notifications.length} color='error'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <NotificationsDropdown
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        handleClose={handleClose}
        menuItems={notifications}
      />
    </div>
  )
}

export default Notifications
