// ** React Imports
import React from 'react'

// ** MUI Imports
import { Stack, Typography, Box } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { DashboardService } from '@/services/api/DashboardService'

const SalesAndAddedUsers = () => {
  const { getMostActiveUsers } = DashboardService()
  const [users, setUsers] = React.useState()

  useQuery({
    queryKey: [`agentUsers`],
    queryFn: () => getMostActiveUsers(),
    onSuccess: (data: any) => {
      setUsers(data)
    }
  })

  return (
    <Stack sx={styles.wrapper}>
      <Box sx={styles.containers}>
        <Stack sx={styles.textWrapper}>
          <Typography>Overall Purchase</Typography>
          <Typography>Commission</Typography>
        </Stack>
        <Stack sx={styles.textWrapper}>
          <Typography fontWeight={500} variant='h6'>
            ¥0
          </Typography>
          <Typography fontWeight={500} variant='h6'>
            ¥0
          </Typography>
        </Stack>
        <Typography variant='subtitle2'>Refresh every 1st of the month</Typography>
      </Box>
      <Box sx={styles.containers}>
        <Typography variant='subtitle2'>Live update of the Added Users</Typography>
        <Typography variant='h6'>New Users: {users}</Typography>
        <Typography fontWeight={500}>Total Users: {users} </Typography>
      </Box>
    </Stack>
  )
}

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'column',
      md: 'row',
      lg: 'row'
    },
    gap: {
      xs: 2,
      sm: 2,
      md: 4,
      lg: 6
    }
  },
  containers: {
    width: {
      xs: '100%',
      sm: '100%',
      md: '50%',
      lg: '50%'
    },
    boxShadow: 4,
    px: 6,
    py: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    borderRadius: 1.5
  },
  textWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12
  }
}

export default SalesAndAddedUsers
