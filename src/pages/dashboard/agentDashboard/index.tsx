import React from 'react'
import { Stack, Typography, Box, Button, Avatar, LinearProgress } from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download';

// FAKE DATA
const Donators = [
  { name: 'Xiaomi Meng', amount: 100},
  { name: 'Xiaomi Meng', amount: 80},
  { name: 'Xiaomi Meng', amount: 70},
  { name: 'Xiaomi Meng', amount: 60},
  { name: 'Xiaomi Meng', amount: 50},
  { name: 'Xiaomi Meng', amount: 40},
  { name: 'Xiaomi Meng', amount: 30},
  { name: 'Xiaomi Meng', amount: 20},
  { name: 'Xiaomi Meng', amount: 10},
]

const AgentDashboard = () => {
  return (
    <Stack>
      <Stack justifyContent="space-between" direction={['column', 'row', 'row']} alignItems="center" gap={4} mb={4}>
        <Box>
          <Typography fontWeight={500} variant='h5'>Good Morning, Agent #01</Typography>
          <Typography variant='subtitle1'>Welcome back, nice to see you again!</Typography>
        </Box>
        <Button variant='outlined' endIcon={<DownloadIcon/>}>Download Report</Button>
      </Stack>
      <Stack direction={['column', 'column', 'row']} gap={[2,4,6]}>
        <Stack width={['100%', '100%', '70%']} gap={[2,4,4]}>
          <Stack direction={['column', 'row', 'row']} gap={[2,4,6]}>
            <Box width={['100%', "50%", "50%"]} boxShadow={4} px={6} py={4} display='flex' flexDirection='column' gap={1} borderRadius={1.5}>
              <Stack direction='row' justifyContent='space-between' gap={12}>
                <Typography>Overall Purchase</Typography>
                <Typography>Commission</Typography>
              </Stack>
              <Stack direction='row' justifyContent='space-between' gap={12}>
                <Typography fontWeight={500} variant='h6'>¥50,000</Typography>
                <Typography fontWeight={500} variant='h6'>¥2,500</Typography>
              </Stack>
              <Typography variant='subtitle2'>Refresh every 1st of the month</Typography>
            </Box>
            <Box width={['100%', "50%", "50%"]} boxShadow={4} px={6} py={4} display='flex' flexDirection='column' gap={1} borderRadius={1.5}>
              <Typography variant='subtitle2'>Live update of the Added Users</Typography>
              <Typography variant='h6'>New Users: 500</Typography>
              <Typography fontWeight={500}>Total Users: 2500</Typography>
            </Box>
          </Stack>
          <Box width={"100%"} height={300} boxShadow={4} p={4} borderRadius={1.5}>
            <Typography>Monthly Progress</Typography>
          </Box>
          <Stack direction={['column', 'row', 'row']} gap={[2, 4, 6]}>
            <Box width={['100%', "50%", "50%"]} height={300} boxShadow={4} p={4} borderRadius={1.5}>
              <Typography>Users Growth</Typography>
            </Box>
            <Box width={['100%', "50%", "50%"]} height={300} boxShadow={4} p={4} borderRadius={1.5}>
              <Typography>Commission Data</Typography>
            </Box>
          </Stack>
        </Stack>
        <Stack width={['100%', '100%', '30%']}>
          <Box boxShadow={4} px={4} py={4} borderRadius={1.5}>
            <Typography mb={4}>Top 10 Donators for the month of March</Typography>
            <Stack gap={6}>
              {Donators.map((item, index) =>
                <Stack key={index} direction='row' gap={4}>
                  <Avatar />
                  <Box width='100%'>
                    <Typography>{item.name}</Typography>
                    <LinearProgress variant='buffer' color={index === 0 ? 'primary' : 'secondary'} value={item.amount} sx={{ height: 12, borderRadius: "0px 6px 6px 0" }} />
                  </Box>
                </Stack>
              )}
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default AgentDashboard