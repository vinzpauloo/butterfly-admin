import React from 'react'
import { Box, Stack, Typography, TextField, Button } from '@mui/material'
import { useAuth } from '@/services/useAuth'

const SuperAgentProfile = () => {
  const auth = useAuth()

  return (
    <Box>
      <Stack gap={2} mb={8}>
        <Typography variant="h5">Good Morning, {auth?.user?.username}</Typography>
        <Typography fontWeight={500}>Welcome back, nice to see you again!</Typography>
      </Stack>
      <Stack direction={["column", "column", "row"]} gap={[10, 10, "10%"]}>
        <Stack width={["100%", "100%", "60%"]} gap={6}>
          <TextField label="Username" variant="outlined" fullWidth />
          <Box display="flex" justifyContent="space-between" gap={[2, 6, 6]}>
            <TextField label="Password" type="password" variant="outlined" fullWidth />
            <TextField label="Re-enter password" type="password" variant="outlined" fullWidth />
          </Box>
          <Box display="flex" justifyContent="space-between" gap={[2, 6, 6]}>
            <TextField label="Name of Site" variant="outlined" fullWidth />
            <TextField label="Email Adress" type="email" variant="outlined" fullWidth />
          </Box>
          <Box display="flex" justifyContent="space-between" gap={[2, 6, 6]}>
            <TextField label="Company Name" variant="outlined" fullWidth />
            <TextField label="Company Code" variant="outlined" fullWidth />
          </Box>
          <Stack justifyContent="center" alignItems="center" direction="row" gap={[2, 6, 6]}>
            <Button variant="outlined" color="error" sx={{ textTransform: "uppercase" }}>Cancel</Button>
            <Button variant="outlined" color="primary" sx={{ textTransform: "uppercase" }}>Update</Button>
          </Stack>
        </Stack>
        <Stack width={["100%", "100%", "30%"]} gap={6}>
          <Box bgcolor="white" boxShadow={4} borderRadius={1} p={6}>
            <Typography fontWeight={500} textTransform="uppercase" variant="caption">Latest Deposit</Typography>
            <Typography fontWeight={500} fontSize={24}>¥125,000</Typography>
            <Typography variant="subtitle2">Compared to (¥100,000 last month)</Typography>
            <Typography variant="subtitle2">Date Deposited: 2023-03-03 12:00:00</Typography>
          </Box>
          <Box bgcolor="white" boxShadow={4} borderRadius={1} p={6}>
            <Typography fontWeight={500} textTransform="uppercase" variant="caption">Income (VIP and Gold Coins)</Typography>
            <Typography fontWeight={500} fontSize={24}>¥30,000</Typography>
            <Typography variant="subtitle2">As of 2023-03-03 12:00:00</Typography>
            <Button variant="outlined" size="small" sx={{ mt: 2 }}>Track</Button>
          </Box>
          <Box bgcolor="white" boxShadow={4} borderRadius={1} p={6}>
            <Typography fontWeight={500} textTransform="uppercase" variant="caption">Total Donations - Live</Typography>
            <Typography fontWeight={500} fontSize={24}>¥100,000</Typography>
            <Button variant="outlined" size="small" sx={{ mt: 2 }}>Track</Button>
          </Box>
        </Stack>
      </Stack>
    </Box>
  )
}

export default SuperAgentProfile