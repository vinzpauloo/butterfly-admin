
// ** React import
import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

// ** Layout imports
import BasicCard from '@/layouts/components/shared-components/Card/BasicCard'

type Props = {}

const ProgressCircular  = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent:'center', alignItems: 'center',textAlign:'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <CircularProgress color='success' />
      </Box>
    </Box>
  )
}

const LoadingScreen = (props: Props) => {


  return (
    <BasicCard sx={{marginInline: 'auto', minWidth: '500px'}}>
        <ProgressCircular />
    </BasicCard>
  )
}

export default LoadingScreen