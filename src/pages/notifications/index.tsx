// ** React Imports
import React, { useState } from 'react'

// ** Next Imports
import router from 'next/router'

// ** MUI Imports
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  Stack,
  Box,
  CircularProgress,
  Badge
} from '@mui/material'
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead'

// ** Lib and Utils Imports
import { FILE_SERVER_URL } from '@/lib/baseUrls'
import formatDate from '@/utils/formatDate'

// ** TanStack Imports
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// ** Hooks/Services Imports
import NotificationService from '@/services/api/NotificationService'
import { useErrorHandling } from '@/hooks/useErrorHandling'

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

const NotificationsPage = () => {
  const { handleError } = useErrorHandling()

  const [data, setData] = useState<response[]>([])
  const [page, setPage] = useState<number>(1)
  const [hasNextPage, setHasNextPage] = useState<boolean>(false)

  const { getAllAdminNotifs, makeNotificationSeen } = NotificationService()
  const { isLoading } = useQuery({
    queryKey: ['allAdminNotifs', page],
    queryFn: () => getAllAdminNotifs({ data: { with: 'from', page: page } }),
    onSuccess: data => {
      setData((prev: response[]) => prev.concat(data?.data))
      setHasNextPage(data?.next_page_url !== null ? true : false)
    },
    onError: (e: any) => {
      handleError(e, `getAllAdminNotifs() notifications/index.tsx`)
    }
  })

  const queryClient = useQueryClient()
  const { mutate: mutateMakeNotificationSeen } = useMutation(makeNotificationSeen, {
    onSuccess: data => {
      console.log(data)
      setData([])
      queryClient.invalidateQueries({ queryKey: ['allAdminNotifs'] })
      queryClient.invalidateQueries({ queryKey: ['newNotifsCount'] })
    },
    onError: (e: any) => {
      handleError(e, `makeNotificationSeen() notifications/index.tsx`)
    }
  })

  const seeNotification = (id: string, type: string) => {
    mutateMakeNotificationSeen({ id: id, data: { _method: 'put' } })

    // navigate to certain page base on the type of notification - WIP
    if (type === 'work_approval') router.push('/studio/content')
  }

  const markAllAsRead = () => {
    data.map((item: response) => {
      console.log('PUT as READ', item?._id)
    })
  }

  return (
    <Box>
      <Stack direction={['column', 'row']} mb={4} justifyContent='space-between' gap={4}>
        <Typography variant='h4'>Notifications</Typography>
        <Button
          variant='outlined'
          size='small'
          color='primary'
          startIcon={<MarkEmailReadIcon />}
          onClick={markAllAsRead}
        >
          Mark all as Read
        </Button>
      </Stack>
      <Card>
        <CardContent sx={{ paddingBlock: 4 }}>
          <List>
            {data?.map((item: response, index: number) => (
              <React.Fragment key={item?._id}>
                <ListItem
                  sx={{
                    padding: 0,
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: ['column', 'row'],
                    alignItems: 'flex-start',
                    gap: 2
                  }}
                >
                  <Stack
                    direction='row'
                    gap={4}
                    alignItems='center'
                    onClick={item?.is_seen ? undefined : () => seeNotification(item?._id, item?.type)}
                    sx={{ cursor: item?.is_seen ? 'default' : 'pointer' }}
                  >
                    <Badge color={item?.is_seen ? undefined : 'primary'} variant='dot' />
                    <Avatar alt={item?.from?.username} src={FILE_SERVER_URL + item?.from?.photo} />
                    <ListItemText
                      sx={{ textTransform: 'capitalize' }}
                      primary={item?.from?.username}
                      primaryTypographyProps={{ fontWeight: 500 }}
                      secondary={item?.type.replace(/_/g, ' ')}
                    />
                  </Stack>
                  <Typography variant='caption'>{formatDate(item?.created_at)}</Typography>
                </ListItem>
                {index < data.length - 1 && <Divider />}
              </React.Fragment>
            ))}
            {isLoading && (
              <Stack direction='row' justifyContent='center' py={6}>
                <CircularProgress />
              </Stack>
            )}
          </List>
        </CardContent>
        {hasNextPage && (
          <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              color='primary'
              variant='outlined'
              size='small'
              onClick={() => hasNextPage && setPage(prev => prev + 1)}
            >
              View More
            </Button>
          </CardActions>
        )}
      </Card>
    </Box>
  )
}

export default NotificationsPage
