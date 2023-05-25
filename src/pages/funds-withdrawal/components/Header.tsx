// ** React Imports
import React from 'react'

// ** MUI Imports
import { Box, Typography } from '@mui/material'

// ** Utils Imports
import { useTranslateString } from '@/utils/TranslateString'

interface HeaderProps {
    title : string
}

const Header = ({title} : HeaderProps) => {
  const TranslateString = useTranslateString()

  return (
    <Box mb={5}>
      <Typography variant='h4' component='h4'>
        {title}
      </Typography>
    </Box>
  )
}

export default Header
