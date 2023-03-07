
// ** React import
import React from 'react'

// ** MUI Imports
import Typography from '@mui/material/Typography'

// ** Layout imports
import BasicCard from '@/layouts/components/shared-components/Card/BasicCard'

type Props = {}

const LoadingScreen = (props: Props) => {
  return (
    <BasicCard>
        <Typography color={theme => theme.palette.common.white}>Sending data... please wait</Typography>
    </BasicCard>
  )
}

export default LoadingScreen