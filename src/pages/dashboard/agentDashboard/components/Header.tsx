// ** React Imports
import React from 'react'

// ** MUI Imports
import { Stack, Typography, Box } from '@mui/material'

// ** Hooks
import { useGreeting } from '@/hooks/useGreeting'

// ** Types
interface HeaderProps {
  username: string | undefined
}

const Header = ({ username }: HeaderProps) => {
  // ** Hooks
  const { ShowGreeting } = useGreeting()

  return (
    <Stack sx={styles.wrapper}>
      <Box>
        <Typography fontWeight={500} variant='h5'>
          {ShowGreeting()}, {username} !
        </Typography>
        <Typography variant='subtitle1'>Welcome back, nice to see you again!</Typography>
      </Box>
      {/* <Button variant='outlined' endIcon={<DownloadIcon />}>
        Download Report
      </Button> */}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 4,
    mb: 4
  }
}

export default Header
