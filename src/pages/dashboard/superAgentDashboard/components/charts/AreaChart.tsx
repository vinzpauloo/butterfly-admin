// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import { Box, Card, CardHeader, CardContent, Divider, InputAdornment, TextField, Typography } from '@mui/material'

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import { useQuery } from '@tanstack/react-query'
import { DashboardService } from '@/services/api/DashboardService'
import { useErrorHandling } from '@/hooks/useErrorHandling'
import formatDate from '@/utils/formatDate'

interface Props {
  direction: 'ltr' | 'rtl'
}

interface PickerProps {
  start: Date | number
  end: Date | number
}

const CustomTooltip = (data: TooltipProps<any, any>) => {
  const { active, payload } = data

  if (active && payload) {
    return (
      <div className='recharts-custom-tooltip'>
        <Typography>{data.label}</Typography>
        <Divider />
        {data &&
          data.payload &&
          data.payload.map((i: any) => {
            return (
              <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { color: i.fill, mr: 2.5 } }} key={i.dataKey}>
                <Icon icon='mdi:circle' fontSize='0.6rem' />
                <Typography variant='body2'>{`${i.dataKey} : ${i.payload[i.dataKey]}`}</Typography>
              </Box>
            )
          })}
      </div>
    )
  }

  return null
}

const RechartsAreaChart = ({ direction }: Props) => {
  const { getVIPandGuestChart } = DashboardService()
  const { handleError } = useErrorHandling()

  // ** States
  const [endDate, setEndDate] = useState(new Date())
  const [startDate, setStartDate] = useState(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))

  const [chartData, setChartData] = useState()

  const CustomInput = forwardRef((props: PickerProps, ref) => {
    const startDate = props.start !== null ? format(props.start, 'yyyy-MM-dd') : ''
    const endDate = props.end !== null ? format(props.end, 'yyyy-MM-dd') : ''

    const value = startDate && endDate ? `${startDate} - ${endDate}` : `${startDate}${endDate}`

    useQuery({
      queryKey: [`UsersMonitoring`],
      queryFn: () =>
        getVIPandGuestChart({
          data: {
            daily: 'true',
            from: startDate,
            to: endDate,
            select: 'total_active,total_new_vip,total_new_guest,created_at'
          }
        }),
      onSuccess: (data: any) => {
        console.log(`chartData`, data)
        setChartData(data)
      },
      onError: (e: any) => {
        handleError(e, `getVIPandGuestChart() AreaChart.tsx superAgentDashboard`)
      }
    })

    return (
      <TextField
        {...props}
        size='small'
        value={value}
        inputRef={ref}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Icon icon='mdi:bell-outline' />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position='end'>
              <Icon icon='mdi:chevron-down' />
            </InputAdornment>
          )
        }}
      />
    )
  })

  const handleOnChange = (dates: any) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }

  return (
    <Card>
      <CardHeader
        title='Monthly Monitoring'
        sx={{
          flexDirection: ['column', 'column'],
          alignItems: ['flex-start', 'flex-start'],
          '& .MuiCardHeader-action': { mb: 0 },
          '& .MuiCardHeader-content': { mb: [2, 0] }
        }}
        action={
          <DatePicker
            selectsRange
            id='recharts-area'
            selected={startDate}
            startDate={startDate}
            endDate={endDate}
            onChange={handleOnChange}
            placeholderText='Click to select a date'
            customInput={<CustomInput start={startDate as Date | number} end={endDate as Date | number} />}
          />
        }
      />
      <CardContent>
        <Box sx={{ display: 'flex', mb: 4 }}>
          <Box sx={{ mr: 6, display: 'flex', alignItems: 'center', '& svg': { mr: 1.5, color: 'rgb(115, 103, 240)' } }}>
            <Icon icon='mdi:circle' fontSize='0.75rem' />
            <Typography variant='body2'>Active</Typography>
          </Box>
          <Box
            sx={{
              mr: 6,
              display: 'flex',
              alignItems: 'center',
              '& svg': { mr: 1.5, color: 'rgba(115, 103, 240, .5)' }
            }}
          >
            <Icon icon='mdi:circle' fontSize='0.75rem' />
            <Typography variant='body2'>New VIPs</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 1.5, color: 'rgba(115, 103, 240, .2)' } }}>
            <Icon icon='mdi:circle' fontSize='0.75rem' />
            <Typography variant='body2'>New Guests</Typography>
          </Box>
        </Box>
        <Box sx={{ height: 420 }}>
          <ResponsiveContainer>
            <AreaChart height={300} data={chartData} style={{ direction }} margin={{ left: -20 }}>
              <CartesianGrid />
              <XAxis
                dataKey='created_at'
                reversed={direction === 'rtl'}
                tickFormatter={unixTime => formatDate(unixTime)}
              />
              <YAxis orientation={direction === 'rtl' ? 'right' : 'left'} />
              <Tooltip content={CustomTooltip} />
              <Area dataKey='total_active' stackId='Active' stroke='0' fill='rgb(115, 103, 240)' />
              <Area dataKey='total_new_vip' stackId='New VIPs' stroke='0' fill='rgba(115, 103, 240, .5)' />
              <Area dataKey='total_new_guest' stackId='New Guests' stroke='0' fill='rgba(115, 103, 240, .2)' />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  )
}

export default RechartsAreaChart
