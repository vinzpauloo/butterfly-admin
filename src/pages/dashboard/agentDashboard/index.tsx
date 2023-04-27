// ** React Imports
import React from 'react'

// ** MUI Imports
import { Stack } from '@mui/material'

// ** Project/Other Imports
import Header from './components/Header'
import SalesAndAddedUsers from './components/SalesAndAddedUsers'
import MonthlyProgressBarChart from './components/MonthlyProgress'
import UsersGrowthDonutChart from './components/UsersGrowth'
import CommissionDataBarChart from './components/CommissionData'
import TopDonatorsLinearProgress from './components/TopDonatorsLinearProgress'

const AgentDashboard = () => {
  return (
    <Stack>
      <Header />
      <Stack direction={styles.direction} gap={styles.gap246}>
        <Stack width={styles.width} gap={styles.gap244}>
          <SalesAndAddedUsers />
          <MonthlyProgressBarChart />
          <Stack direction={styles.direction} gap={styles.gap246}>
            <UsersGrowthDonutChart />
            <CommissionDataBarChart />
          </Stack>
        </Stack>
        <TopDonatorsLinearProgress />
      </Stack>
    </Stack>
  )
}

const styles = {
  direction: ['column', 'column', 'row', 'row'] as ('column' | 'row' | 'row-reverse' | 'column-reverse' | null)[],
  width: ['100%', '100%', '70%'],
  gap246: [2, 4, 6],
  gap244: [2, 4, 4],
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
}

export default AgentDashboard
