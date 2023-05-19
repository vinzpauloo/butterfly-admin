// ** React Imports
import React from 'react'

// ** MUI Imports
import { Box, Typography } from '@mui/material'

// ** Utils Imports
import { useTranslateString } from '@/utils/TranslateString'

// ** Other Imports

// ** TanStack Query

// ** Hooks/Services

const Header = () => {
  // ** Utilities
  const TranslateString = useTranslateString()

  return (
    <Box mb={5}>
      <Typography variant='h4' component='h4'>
        {TranslateString('Balance History')}
      </Typography>
    </Box>
  )
}

export default Header
