import React from 'react'
import { Typography, ToggleButtonGroup, ToggleButton, Stack, Box } from '@mui/material'
import { useTranslateString } from '@/utils/TranslateString';
import { reportsHeaderStore } from '../../../zustand/reportsHeaderStore'
import DatePickerWrapper from '@/@core/styles/libs/react-datepicker';
import DatePicker from 'react-datepicker'
import CustomInput from '@/layouts/components/shared-components/Picker/CustomPickerInput'

type Props = {
  title: string
}

const ReportsHeader = (props: Props) => {
  const { title } = props
  const TranslateString = useTranslateString()
  const [timespan, setTimespan, fromDate, toDate, setFromDate, setToDate] =
    reportsHeaderStore((state) =>
      [state.timespan, state.setTimespan, state.fromDate, state.toDate, state.setFromDate, state.setToDate]);
    
  const handleOnChange = (event: React.MouseEvent<HTMLElement>, newTimespan: string) => {
    setTimespan(newTimespan)
  }

  return (
    <DatePickerWrapper>
      <Stack gap={4} mb={4}>
        <Typography variant='h4' component='h4'>{TranslateString('Reports')} - {TranslateString(`${title}`)}</Typography>
        <Stack direction='row' gap={4} alignItems='flex-end'>
          <Box>
            <Typography variant='subtitle2'>From</Typography>
            <DatePicker
              dateFormat='dd/MM/yyyy'
              selected={fromDate}
              onChange={(date: Date) => setFromDate(date)}
              placeholderText='Click to select a date'
              customInput={<CustomInput customwidth={'160px'} customSize='small' />}
              minDate={new Date()}
            />
          </Box>
          <Box>
            <Typography variant='subtitle2'>To</Typography>
            <DatePicker
              dateFormat='dd/MM/yyyy'
              selected={toDate}
              onChange={(date: Date) => setToDate(date)}
              placeholderText='Click to select a date'
              customInput={<CustomInput customwidth={'160px'} customSize='small' />}
              minDate={new Date()}
            />
          </Box>
          <ToggleButtonGroup color='primary' value={timespan} exclusive onChange={handleOnChange} size='small'>
            <ToggleButton value='today' sx={{ textTransform: 'capitalize' }}>Today</ToggleButton>
            <ToggleButton value='weekly' sx={{ textTransform: 'capitalize' }}>Weekly</ToggleButton>
            <ToggleButton value='monthly' sx={{ textTransform: 'capitalize' }}>Monthly</ToggleButton>
            <ToggleButton value='yearly' sx={{ textTransform: 'capitalize' }}>Yearly</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Stack>
        
      
      
    </DatePickerWrapper>
  )
}

export default ReportsHeader