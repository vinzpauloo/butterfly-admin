import React, { useState } from 'react'
import { Stack, Box, Avatar, Typography, Button, Grid, CircularProgress } from '@mui/material'
import UserService from '@/services/api/UserService';
import { useQuery } from '@tanstack/react-query';
import { FILE_SERVER_URL } from '@/lib/baseUrls'

const CCActiveDonatorsTab = () => {
  const [followers, setFollowers] = useState<any>([])
  const [page, setPage] = useState<number>(1)
  const [hasNextPage, setHasNextPage] = useState<boolean>(false)

  // get specific content creators donators
  const { getUserDonators } = UserService();
  const { isLoading } = useQuery({
    queryKey: ["contentCreatorDonators", page],
    queryFn: () => getUserDonators({
      data: {
        select: 'username,photo',
        page: page,
      }
    }),
    onSuccess: (data) => {
      console.log(data?.data)
      setFollowers((prev: any) => prev.concat(data?.data))
      setHasNextPage(data?.next_page_url !== null ? true : false)
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <Stack maxHeight={400} gap={12} sx={{ overflowY: "scroll" }} px={6}>
      <Grid container spacing={2}>
        {followers.map((item: any) =>
          <Grid key={item?._id} item xs={12} sm={6} md={4} lg={3}>
            <Stack gap={2} my={2}>
              <Avatar alt={item?.username} src={FILE_SERVER_URL + item?.photo} sx={{ width: 42, height: 42 }} />
              <Typography sx={{ wordBreak: 'break-word' }}>{item?.username}</Typography>
            </Stack>
          </Grid>
        )}
      </Grid>
      {isLoading &&
        <Box display='flex' alignItems='center' justifyContent='center' py={4}>
          <CircularProgress />
        </Box>
      }
      {hasNextPage && !isLoading &&
        <Button
          variant='contained'
          size='small'
          sx={{ width: 'max-content', alignSelf: 'center' }}
          onClick={() => setPage(prev => prev + 1)}>
          Load More
        </Button>
      }
    </Stack>
  )
}

export default CCActiveDonatorsTab