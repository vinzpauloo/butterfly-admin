// ** React Imports
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'

// ** MUI Imports
import { Box, Card, CardContent, CardHeader } from '@mui/material'

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

const generateChartData = (
  startDate: Date,
  endDate: Date,
  warning: string,
  info: string,
  date: string[] = [],
  guest: number[] = [],
  vip: number[] = []
) => {
  const labels = date?.map(d => {
    const currentMonth = new Date(d)
    const month = currentMonth.toLocaleString('default', { month: 'long' })
    const year = currentMonth.getFullYear()
    const day = currentMonth.getDate()

    return `${month} ${day} ${year}`
  })

  return {
    labels,
    datasets: [
      {
        maxBarThickness: 45,
        label: 'VIP Member',
        backgroundColor: warning,
        borderColor: 'transparent',
        data: vip
      },
      {
        maxBarThickness: 45,
        backgroundColor: info,
        label: 'Gold',
        borderColor: 'transparent',
        data: guest
      }
    ]
  }
}

type SortType = 'asc' | 'desc' | undefined | null

const DatePickerBarChart = (props: VerticalBarProps) => {
  const { info, warning, labelColor, borderColor } = props
  const { getVIPandGuestChart } = DashboardService()

  const [fromDate, setFromDate] = useState<string | undefined>()
  const [toDate, setToDate] = useState<string | undefined>()

  const [startDate, setStartDate] = useState(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
  const [endDate, setEndDate] = useState(new Date())

  const [sort] = useState<SortType>('asc')
  const [sortName] = useState<string>('created_at')

  useQuery({
    queryKey: [`VIPandGuest`, fromDate, toDate, sort, sortName],
    queryFn: () =>
      getVIPandGuestChart({
        data: {
          from: fromDate,
          to: toDate,
          sort: sort,
          sort_by: sortName
        }
      }),
    onSuccess: (data: any) => {
      const date = data?.map((item: any) => item?.created_at)
      const guest = data?.map((item: any) => item?.total_new_guest)
      const vip = data?.map((item: any) => item?.total_new_vip)
      setChartData(generateChartData(startDate, endDate, warning, info, date, guest, vip))
    }
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
          <CardHeader title='Revenue' />
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
          <Bar data={chartData} height={248} options={options} />
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

export default DatePickerBarChart
