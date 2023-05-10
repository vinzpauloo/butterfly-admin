// ** React Imports
import React, { useState } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import { Badge, IconButton, Tooltip } from '@mui/material'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'

// ** Project/Other Imports
import NotificationsDropdown from './components/NotificationsDropdown'

// ** TanStack Imports
import { useQuery } from '@tanstack/react-query'

// Hooks/Services Imports
import NotificationService from '@/services/api/NotificationService'
import { captureError } from '@/services/Sentry'

type response = {
  _id: string
  type: string
  message: string
  created_at: string
  is_seen: boolean
  from: {
    id: number
    photo: string
    username: string
  }
}

const Notifications = () => {
  const router = useRouter()
  const currentLocation = router.asPath

  const [data, setData] = useState<response[]>([])
  const [totalNewNotifs, setTotalNewNotifs] = useState<number>(0)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const newNotifications = `You have ${totalNewNotifs} new notifications!`
  const noNotifications = `No new notifications.`

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const { getAllAdminNotifs } = NotificationService()
  const {} = useQuery({
    // seperate api for getting the amount of unseen notifs 
    // cannot combine with the fetch below, as params - will probably change?
    queryKey: ['newNotifsCount'],
    queryFn: () => getAllAdminNotifs({ data: { count_unseen: true } }),
    onSuccess: data => { setTotalNewNotifs(data) },
    onError: (e: any) => {
      const {
        data: { error }
      } = e
      for (const key in error) {
        error[key].forEach((value: any) => {
          captureError(currentLocation, `${value} getAllAdminNotifs() Notifications`)
        })
      }
    }
  })

  const {} = useQuery({
    queryKey: ['allAdminNotifs'],
    queryFn: () => getAllAdminNotifs({ data: { with: 'from', page: 1 } }),
    onSuccess: data => { setData(data?.data) },
    onError: (e: any) => {
      const {
        data: { error }
      } = e
      for (const key in error) {
        error[key].forEach((value: any) => {
          captureError(currentLocation, `${value}, getAllAdminNotifs() shared-components/Notifications`)
        })
      }
    }
  })

  return (
    <div>
      <Tooltip title={totalNewNotifs > 0 ? newNotifications : noNotifications}>
        <IconButton color='inherit' onClick={totalNewNotifs > 0 ? handleOpen : undefined}>
          <Badge badgeContent={totalNewNotifs} color='error'>
            <NotificationsNoneIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <NotificationsDropdown open={Boolean(anchorEl)} anchorEl={anchorEl} handleClose={handleClose} menuItems={data} />
    </div>
  )
}

export default Notifications
