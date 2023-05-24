import React from 'react'
import { Typography, ToggleButtonGroup, ToggleButton } from '@mui/material'
import { useTranslateString } from '@/utils/TranslateString';
import { reportsTimespanStore } from '../../../zustand/reportsTimespanStore'

type Props = {
  title: string
}

const ReportsHeader = (props: Props) => {
  const { title } = props
  const TranslateString = useTranslateString()
  const [timespan, setTimespan] = reportsTimespanStore((state) => [state.timespan, state.setTimespan]);
  
  const handleOnChange = (event: React.MouseEvent<HTMLElement>, newTimespan: string) => {
    setTimespan(newTimespan)
  }

  return (
    <React.Fragment>
      <Typography variant='h4' component='h4'>{TranslateString('Reports')} - {TranslateString(`${title}`)}</Typography>
      <ToggleButtonGroup color='primary' value={timespan} exclusive onChange={handleOnChange} size='small' sx={{alignSelf: 'center'}}>
        <ToggleButton value='today' sx={{ textTransform: 'capitalize' }}>Today</ToggleButton>
        <ToggleButton value='weekly' sx={{ textTransform: 'capitalize' }}>Weekly</ToggleButton>
        <ToggleButton value='monthly' sx={{ textTransform: 'capitalize' }}>Monthly</ToggleButton>
        <ToggleButton value='yearly' sx={{ textTransform: 'capitalize' }}>Yearly</ToggleButton>
      </ToggleButtonGroup>
    </React.Fragment>
  )
}

export default ReportsHeader