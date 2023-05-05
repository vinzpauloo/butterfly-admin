import React, { useState } from 'react'
import { Button, Card, CardActions, CardContent, Typography, List, ListItem, ListItemText, Divider, Avatar, Stack, Box, CircularProgress, Badge } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import NotificationService from '@/services/api/NotificationService'
import { FILE_SERVER_URL } from '@/lib/baseUrls'
import formatDate from '@/utils/formatDate'
import router from 'next/router'

const NotificationsPage = () => {
  const [data, setData] = useState<any>([])
  const [page, setPage] = useState<number>(1)
  const [hasNextPage, setHasNextPage] = useState<boolean>(false)

  const { getAllAdminNotifs } = NotificationService()
  const { isLoading } = useQuery({
    queryKey: ['allAdminNotifs', page],
    queryFn: () => getAllAdminNotifs({
      data: {
        with: 'from',
        page: page
      }
    }),
    onSuccess: data => {
      setData((prev: any) => prev.concat(data?.data))
      setHasNextPage(data?.next_page_url !== null ? true : false)
    },
    onError: error => { console.log(error) }
  })

  const navigateToPage = (type: string) => {
    console.log(type)
    if (type === 'work_approval') router.push('/studio/content')
  }

  return (
    <Box>
      <Typography variant='h4' mb={4}>Notifications</Typography>
      <Card>
        <CardContent>
          <List>
            {data?.map((item: any, index: number) => (
              <React.Fragment key={item?._id}>
                <ListItem sx={{ padding: 0, display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => navigateToPage(item?.type)}>
                  <Stack direction='row' gap={4} alignItems='center'>
                    <Badge color={'primary'} variant='dot'/>
                    <Avatar alt={item?.from?.username} src={FILE_SERVER_URL + item?.from?.photo} />
                    <ListItemText sx={{textTransform: 'capitalize'}} primary={item?.from?.username} secondary={item?.type.replace(/_/g, ' ')} />
                  </Stack>
                  <Typography variant='caption' color={'primary'}>{formatDate(item?.created_at)}</Typography>
                </ListItem>
                {index < data.length - 1 && <Divider />}
              </React.Fragment>
            ))}
            {isLoading &&
              <Stack direction='row' justifyContent='center' py={6}>
                <CircularProgress />
              </Stack>
            }
          </List>
        </CardContent>
        {hasNextPage && 
          <CardActions sx={{ display: 'flex', justifyContent: 'center'}}>
            <Button color='primary' variant='outlined' onClick={() => hasNextPage && setPage(prev => prev + 1)}>View More</Button>
          </CardActions>
        }
      </Card>
    </Box>
  )
}

export default NotificationsPage
