// ** React Imports
import React from 'react'

// ** MUI Imports
import { Stack, Box, Typography, Avatar, LinearProgress } from '@mui/material'

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

const TopDonatorsLinearProgress = () => {
  return (
    <Stack width={styles.width} boxShadow={4}>
      <Box sx={styles.wrapper}>
        <Typography mb={4}>Top 10 Donators for the month of March</Typography>
        <Stack gap={6}>
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
      </Box>
    </Stack>
  )
}

const styles = {
  width: ['100%', '100%', '30%'],
  wrapper: {
    px: 4,
    py: 4,
    borderRadius: 1.5
  },
  linearProgress: {
    height: 12,
    borderRadius: {
      xs: '0px',
      sm: '6px',
      md: '6px',
      lg: '0px'
    }
  }
}

export default TopDonatorsLinearProgress
