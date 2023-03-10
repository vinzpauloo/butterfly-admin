
// ** React import
import React from 'react'

// ** MUI Imports
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress'

// ** Layout imports
import BasicCard from '@/layouts/components/shared-components/Card/BasicCard'

type Props = {}

const LinearProgressWithLabel = (props: LinearProgressProps & { value: number }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant='determinate' {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography color={theme => theme.palette.common.white}>{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  )
}

const LoadingScreen = (props: Props) => {

  // ** State
  const [progress, setProgress] = React.useState<number>(10)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prevProgress => (prevProgress >= 100 ? 10 : prevProgress + 10))
    }, 800)

    return () => {
      clearInterval(timer)
    }
  }, [])


  return (
    <BasicCard sx={{minWidth: '500px'}}>
        <LinearProgressWithLabel value={progress} />
        <Typography color={theme => theme.palette.common.white}>Uploading File...</Typography>
    </BasicCard>
  )
}

export default LoadingScreen