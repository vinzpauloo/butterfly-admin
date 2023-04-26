// ** React Imports
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'

// ** MUI Imports
import { Box, Card, CardHeader, CardContent } from '@mui/material'

// ** Third Party Imports
import { Bar } from 'react-chartjs-2'
import { ChartData, ChartOptions } from 'chart.js'

// ** Project/Other Imports
import DatePickerWrapper from '@/@core/styles/libs/react-datepicker'
import PickersComponent from '@/layouts/components/shared-components/Picker/CustomPickerInput'
import { DashboardService } from '@/services/api/DashboardService'

// ** TanStack Query Imports
import { useQuery } from '@tanstack/react-query'

interface VerticalBarProps {
  info: string
  warning: string
  labelColor: string
  borderColor: string
  legendColor: string
}

const generateChartData = (startDate: Date, endDate: Date, warning: string, info: string) => {
  const monthsBetween = Math.abs(
    startDate.getMonth() - endDate.getMonth() + 12 * (startDate.getFullYear() - endDate.getFullYear())
  )

  const labels = Array.from({ length: monthsBetween + 1 }, (_, i) => {
    const currentMonth = new Date(startDate).setMonth(startDate.getMonth() + i)
    const month = new Date(currentMonth).toLocaleString('default', { month: 'long' })
    const year = new Date(currentMonth).getFullYear()

    return `${month} ${year}`
  })

  const vipData = Array.from({ length: monthsBetween + 1 }, () => Math.floor(Math.random() * 1000))
  const guestsData = Array.from({ length: monthsBetween + 1 }, () => Math.floor(Math.random() * 1000))

  return {
    labels,
    datasets: [
      {
        maxBarThickness: 45,
        label: 'VIP Member',
        backgroundColor: warning,
        borderColor: 'transparent',
        data: vipData
      },
      {
        maxBarThickness: 45,
        backgroundColor: info,
        label: 'Guests',
        borderColor: 'transparent',
        data: guestsData
      }
    ]
  }
}

const VipAndGuestsData = (props: VerticalBarProps) => {
  const { info, warning, labelColor, borderColor } = props
  const { getVIPandGuestChart } = DashboardService()

  const [fromDate, setFromDate] = useState<string | undefined>()
  const [toDate, setToDate] = useState<string | undefined>()

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  useQuery({
    queryKey: [`VIPandGuest`, fromDate, toDate],
    queryFn: () =>
      getVIPandGuestChart({
        data: {
          from: fromDate,
          to: toDate
        }
      })
  })

  const updateDates = (from: Date, to: Date) => {
    setFromDate(from.toISOString().slice(0, 10))
    setToDate(to.toISOString().slice(0, 10))
  }

  useEffect(() => {
    updateDates(startDate, endDate)
  }, [startDate, endDate])

  const [chartData, setChartData] = useState<ChartData<'bar'>>(generateChartData(startDate, endDate, warning, info))

  const options: ChartOptions<'bar'> = {
    indexAxis: 'x',
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
    layout: {
      padding: { top: -4 }
    },
    scales: {
      x: {
        min: 0,
        grid: {
          drawTicks: false,
          drawBorder: false,
          color: borderColor
        },
        ticks: { color: labelColor }
      },
      y: {
        grid: {
          borderColor,
          display: false,
          drawBorder: false
        },
        ticks: { color: labelColor }
      }
    },
    plugins: {
      legend: {
        align: 'end',
        position: 'top',
        labels: { color: labelColor }
      }
    }
  }

  return (
    <DatePickerWrapper>
      <Card>
        <Box sx={styles.headerWrapper}>
          <CardHeader title='VIP Members and Guests Data' />
          <Box sx={styles.datePicker}>
            <Box>
              <DatePicker
                customInput={<PickersComponent customwidth='100%' label='Select Start Date' />}
                selected={startDate}
                onChange={date => {
                  if (date) {
                    setStartDate(date)
                    setChartData(generateChartData(date, endDate, warning, info))
                  }
                }}
              />
            </Box>
            <Box>
              <DatePicker
                customInput={<PickersComponent customwidth='100%' label='Select End Date' />}
                selected={endDate}
                onChange={date => {
                  if (date) {
                    setEndDate(date)
                    setChartData(generateChartData(startDate, date, warning, info))
                  }
                }}
              />
            </Box>
          </Box>
        </Box>
        <CardContent>
          <Bar data={chartData} height={400} options={options} />
        </CardContent>
      </Card>
    </DatePickerWrapper>
  )
}

const styles = {
  headerWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    p: 2,
    flexDirection: {
      xs: 'column',
      sm: 'column',
      md: 'column',
      lg: 'row'
    }
  },
  datePicker: {
    display: 'flex',
    width: {
      xs: '100%',
      sm: '100%',
      md: '100%',
      lg: '50%'
    },
    flexDirection: {
      xs: 'column',
      sm: 'column',
      md: 'column',
      lg: 'row'
    },
    gap: 3
  }
}

export default VipAndGuestsData
