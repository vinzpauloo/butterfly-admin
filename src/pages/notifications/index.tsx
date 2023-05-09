// ** React Imports
import React, { useState } from 'react'

// ** Next Imports
import router, { useRouter } from 'next/router'

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
  Badge,
  IconButton
} from '@mui/material'
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

// ** Lib and Utils Imports
import { FILE_SERVER_URL } from '@/lib/baseUrls'
import formatDate from '@/utils/formatDate'

// ** TanStack Imports
import { useQuery } from '@tanstack/react-query'

// ** Hooks/Services Imports
import NotificationService from '@/services/api/NotificationService'
import { captureError } from '@/services/Sentry'

type response = {
  _id: string
  type: string
  message: string
  created_at: string
  from: {
    id: number
    photo: string
    username: string
  }
}

const NotificationsPage = () => {
  const route = useRouter()
  const currentLocation = route.asPath

  const [data, setData] = useState<response[]>([])
  const [page, setPage] = useState<number>(1)
  const [hasNextPage, setHasNextPage] = useState<boolean>(false)

  const { getAllAdminNotifs } = NotificationService()
  const { isLoading } = useQuery({
    queryKey: ['allAdminNotifs', page],
    queryFn: () =>
      getAllAdminNotifs({
        data: {
          with: 'from',
          page: page
        }
      }),
    onSuccess: data => {
      setData((prev: response[]) => prev.concat(data?.data))
      setHasNextPage(data?.next_page_url !== null ? true : false)
    },
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

  const navigateToPage = (id: string, type: string) => {
    console.log(type)
    console.log('PUT as READ', id)
    if (type === 'work_approval') router.push('/studio/content')
  }

  const deleteNotification = (id: string) => {
    console.log('delete', id)
  }

  const markAllAsRead = () => {
    data.map((item: response) => {
      console.log('PUT as READ', item?._id)
    })
  }

  const deleteAll = () => {
    data.map((item: response) => {
      console.log('DELETE', item?._id)
    })
  }

  return (
    <Box>
      <Stack direction={['column', 'row']} mb={4} justifyContent='space-between' gap={4}>
        <Typography variant='h4'>Notifications</Typography>
        <Button
          variant='outlined'
          size='small'
          color='secondary'
          startIcon={<MarkEmailReadIcon />}
          onClick={markAllAsRead}
        >
          Mark all as Read
        </Button>
        <Button variant='outlined' size='small' color='error' startIcon={<DeleteForeverIcon />} onClick={deleteAll}>
          Delete All
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
                    onClick={() => navigateToPage(item?._id, item?.type)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <Badge color={'primary'} variant='dot' />
                    <Avatar alt={item?.from?.username} src={FILE_SERVER_URL + item?.from?.photo} />
                    <ListItemText
                      sx={{ textTransform: 'capitalize' }}
                      primary={item?.from?.username}
                      primaryTypographyProps={{ fontWeight: 500 }}
                      secondary={item?.type.replace(/_/g, ' ')}
                    />
                  </Stack>
                  <Stack direction='row' gap={4} alignItems='center'>
                    <Typography variant='caption' color={'primary'}>
                      {formatDate(item?.created_at)}
                    </Typography>
                    <IconButton size='small' onClick={() => deleteNotification(item?._id)}>
                      <DeleteForeverIcon fontSize='small' />
                    </IconButton>
                  </Stack>
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
