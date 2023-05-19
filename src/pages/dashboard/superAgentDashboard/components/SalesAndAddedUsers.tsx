// ** React Imports
import React from 'react'

// ** MUI Imports
import { Stack, Typography, Box } from '@mui/material'
import { useAuth } from '@/services/useAuth'

interface SalesAndAddedUsersProps {
  income: string | undefined
}

const SalesAndAddedUsers = (props: SalesAndAddedUsersProps) => {
  const [formatDate, setFormatDate] = React.useState('')

  const { income } = props

  const { user } = useAuth()

  const currentDate = new Date()
  const sevenDaysAgo = new Date()

  // Subtract 7 days from the current date
  sevenDaysAgo.setDate(currentDate.getDate() - 7)

  const [testDate] = React.useState(sevenDaysAgo)

  // Function to format the date
  const updateDate = () => {
    const date = new Date()
    const time = date.toLocaleTimeString()
    const formattedDate = date.toISOString().slice(0, 10) + ' ' + time
    setFormatDate(formattedDate)
  }

  // Run once on initial render
  React.useEffect(() => {
    updateDate()

    // Update every second (1000 milliseconds)
    const interval = setInterval(updateDate, 1000)

    // Cleanup function to clear the interval
    return () => clearInterval(interval)
  }, [])

  return (
    <Stack sx={styles.wrapper}>
      <Box sx={styles.containers}>
        <Stack sx={styles.textWrapper}>
          <Typography>Latest Deposit</Typography>
          {/* <Typography>Commission</Typography> */}
        </Stack>
        <Stack sx={styles.textWrapper}>
          <Typography fontWeight={500} variant='h6'>
            ¥{user?.id}
          </Typography>
          {/* <Typography fontWeight={500} variant='h6'>
            ¥2,500
          </Typography> */}
        </Stack>
        <Typography variant='subtitle2'>Date Deposited: {testDate.toISOString().slice(0, 10)}</Typography>
      </Box>
      <Box sx={styles.containers}>
        <Typography variant='subtitle2'>Income (VIP and Gold coins)</Typography>
        <Typography variant='h6'>¥{income}</Typography>
        <Typography variant='subtitle2'>As of {formatDate}</Typography>
      </Box>
      {/* <Box sx={styles.containers}>
        <Typography variant='subtitle2'>Live update of the Added Users</Typography>
        <Typography variant='h6'>New Users: 500</Typography>
        <Typography fontWeight={500}>Total Users: 2500</Typography>
      </Box> */}
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
