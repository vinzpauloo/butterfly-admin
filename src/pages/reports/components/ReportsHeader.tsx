import React, { useState } from 'react'
import { Typography, ToggleButtonGroup, ToggleButton } from '@mui/material'
import { useTranslateString } from '@/utils/TranslateString';

// SHOULD BE GLOBAL - WIP
const ReportsHeader = () => {
  const [timespan, setTimespan] = useState<string | null>('Today');
  const TranslateString = useTranslateString()
  
  const handleOnChange = (event: React.MouseEvent<HTMLElement>, newTimespan: string) => {
    setTimespan(newTimespan)
  }

  return (
    <React.Fragment>
    <Typography variant='h4' component='h4'>{TranslateString(`Reports`)}</Typography>
      <ToggleButtonGroup color='primary' value={timespan} exclusive onChange={handleOnChange} size='small' sx={{alignSelf: 'center', marginBottom: 5}}>
        <ToggleButton value='Today' sx={{ textTransform: 'capitalize' }}>Today</ToggleButton>
        <ToggleButton value='Weekly' sx={{ textTransform: 'capitalize' }}>Weekly</ToggleButton>
        <ToggleButton value='Monthly' sx={{ textTransform: 'capitalize' }}>Monthly</ToggleButton>
        <ToggleButton value='Yearly' sx={{ textTransform: 'capitalize' }}>Yearly</ToggleButton>
      </ToggleButtonGroup>
    </React.Fragment>
  )
}

export default ReportsHeader