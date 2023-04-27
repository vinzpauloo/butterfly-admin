// ** React Imports
import React from 'react'

// ** MUI Imports
import { Box, Stack, Typography, LinearProgress, Avatar } from '@mui/material'

// ** Project/Other Imports
import Header from './components/Header'
import SalesAndAddedUsers from './components/SalesAndAddedUsers'
import MonthlyProgressBarChart from './components/MonthlyProgress'
import UsersGrowthDonutChart from './components/UsersGrowth'
import CommissionDataBarChart from './components/CommissionData'
import TopDonatorsLinearProgress from './components/TopDonatorsLinearProgress'

// FAKE DATA
const Donators = [
  { name: 'Xiaomi Meng', amount: 100 },
  { name: 'Xiaomi Meng', amount: 80 },
  { name: 'Xiaomi Meng', amount: 70 },
  { name: 'Xiaomi Meng', amount: 60 },
  { name: 'Xiaomi Meng', amount: 50 },
  { name: 'Xiaomi Meng', amount: 40 },
  { name: 'Xiaomi Meng', amount: 30 },
  { name: 'Xiaomi Meng', amount: 20 },
  { name: 'Xiaomi Meng', amount: 10 }
]

const AgentDashboard = () => {
  return (
    <Stack>
      <Header />
      <Stack sx={styles.container}>
        {/* First Column Start */}
        <Stack sx={styles.leftWrap} gap={styles.gap244}>
          <SalesAndAddedUsers />
          <CommissionDataBarChart />
          {/* <MonthlyProgressBarChart /> */}
          <Stack>
            {Donators.map((item, index) => (
              <Stack key={index} direction='row' gap={4}>
                <Avatar />
                <Box width='100%'>
                  <Typography>{item.name}</Typography>
                  <LinearProgress
                    valueBuffer={100}
                    variant='buffer'
                    color={index === 0 ? 'primary' : 'secondary'}
                    value={item.amount}
                    sx={styles.linearProgress}
                  />
                </Box>
              </Stack>
            ))}
          </Stack>
        </Stack>
        {/* First Column End */}
        {/* Start of Second Column */}
        <Stack sx={styles.rightWrap} gap={styles.gap244}>
          <Box sx={styles.containers}>
            <Typography variant='subtitle2'>Live update of the Added Users</Typography>
            <Typography variant='h6'>New Users: 500</Typography>
            <Typography fontWeight={500}>Total Users: 2500</Typography>
          </Box>
          <MonthlyProgressBarChart />
          <UsersGrowthDonutChart />
        </Stack>
        {/* End of Second Column */}
      </Stack>
    </Stack>
  )
}

const styles = {
  gap244: [2, 4, 4],
  container: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'column',
      md: 'row',
      lg: 'row'
    },
    width: '100%',
    gap: {
      xs: 2,
      sm: 2,
      md: 4,
      lg: 6
    }
  },
  leftWrap: {
    width: {
      xs: '100%',
      sm: '100%',
      md: '70%',
      lg: '70%'
    }
  },
  rightWrap: {
    width: {
      xs: '100%',
      sm: '100%',
      md: '30%',
      lg: '30%'
    }
  },

  linearProgress: {
    height: 12,
    borderRadius: {
      xs: '0px',
      sm: '6px',
      md: '6px',
      lg: '0px'
    }
  },
  //

  containers: {
    width: {
      xs: '100%',
      sm: '100%',
      md: '100%',
      lg: '100%'
    },
    boxShadow: 4,
    px: 6,
    py: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    borderRadius: 1.5
  }
}

export default AgentDashboard
