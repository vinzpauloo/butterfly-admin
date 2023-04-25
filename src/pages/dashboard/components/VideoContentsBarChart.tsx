// ** React Imports
import React, { useState, useEffect } from 'react'

// ** MUI Imports
import { Card, CardHeader, CardContent, ToggleButtonGroup, ToggleButton } from '@mui/material'

// ** Third Party Imports
import { Bar } from 'react-chartjs-2'
import { ChartData, ChartOptions } from 'chart.js'
import { DashboardService } from '@/services/api/DashboardService'

// ** TanStack
import { useQuery } from '@tanstack/react-query'

interface VerticalBarProps {
  info: string
  warning: string
  labelColor: string
  borderColor: string
  legendColor: string
}

// Helper Functions
const subtractDays = (date: Date, days: number): Date => {
  const result = new Date(date)
  result.setDate(date.getDate() - days)

  return result
}

const VideoContentsBarChart = (props: VerticalBarProps) => {
  const { warning, labelColor, borderColor, legendColor } = props

  const { getVideoBarChart } = DashboardService()

  const [fromDate, setFromDate] = useState<string | undefined>()
  const [toDate, setToDate] = useState<string | undefined>()
  const [isWeekly, setIsWeekly] = useState<string | undefined>()
  const [isDaily, setIsDaily] = useState<string | undefined>()

  const [videoContentData, setVideoContentData] = useState<[]>([])

  useQuery({
    queryKey: [`VideoBarChart`, fromDate, toDate, isWeekly],
    queryFn: () =>
      getVideoBarChart({
        data: {
          from: fromDate,
          to: toDate,
          weekly: isWeekly,
          daily: isDaily
        }
      }),
    onSuccess: (data: any) => {
      setVideoContentData(data)
    }
  })

  const [active, setActive] = useState<string>('daily')
  const handleActive = (event: React.MouseEvent<HTMLElement>, newActive: string) => {
    setActive(newActive)
  }

  const [data, setData] = useState<ChartData<'bar'>>({
    labels: ['2020', '2021', '2022', '2023'],
    datasets: [
      {
        maxBarThickness: 200,
        label: 'Total Views',
        backgroundColor: warning,
        borderColor: 'transparent',
        data: []
      }
    ]
  })

  useEffect(() => {
    const newData: ChartData<'bar'> = {
      labels: ['2020', '2021', '2022', '2023'],
      datasets: [
        {
          maxBarThickness: 200,
          label: 'Total Views',
          backgroundColor: warning,
          borderColor: 'transparent',
          data: []
        }
      ]
    }

    const today = new Date()

    switch (active) {
      case 'daily':
        const dailyStartDate = subtractDays(today, 7)
        setIsDaily('true')
        setIsWeekly(undefined)
        setFromDate(dailyStartDate?.toISOString().slice(0, 10))
        setToDate(new Date().toISOString().slice(0, 10))
        const dayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'long' })
        const dateFormatter = new Intl.DateTimeFormat(['ban', 'id'])

        console.log(`TODATE`, toDate)

        newData.labels = videoContentData?.map((item: any) => {
          const date = new Date(item?.created_at)

          return dateFormatter.format(date) + ' ' + dayFormatter.format(date)
        })

        newData.datasets[0].data = videoContentData?.map((item: any) => item?.total_watched)

        console.log(`DAILY`, videoContentData)

        break

      case 'weekly':
        setFromDate(undefined)
        setToDate(undefined)
        setIsWeekly('true')
        setIsDaily(undefined)

        console.log(`WEEKLY`, videoContentData)

        break

      case 'monthly':
        newData.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
        newData.datasets[0].data = [500, 700, 900, 1100, 500, 700, 900, 1100, 500, 700, 900, 1100]
        break

      case 'yearly':
        newData.datasets[0].data = [2000, 2500, 3000, 3500]
        break
    }
    setData(newData)
  }, [active, toDate, videoContentData])

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
        labels: { color: legendColor }
      }
    }
  }

  return (
    <Card>
      <CardHeader
        title='Video Contents Total Views'
        subheader={`${fromDate} - ${toDate}`}
        action={
          <ToggleButtonGroup exclusive value={active} onChange={handleActive} sx={styles.toggle}>
            <ToggleButton value='daily'>Daily</ToggleButton>
            <ToggleButton value='weekly'>Weekly</ToggleButton>
            <ToggleButton value='monthly'>Monthly</ToggleButton>
            <ToggleButton value='yearly'>Yearly</ToggleButton>
          </ToggleButtonGroup>
        }
      />
      <CardContent>
        <Bar data={data} height={400} options={options} />
      </CardContent>
    </Card>
  )
}

const styles = {
  toggle: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'row',
      md: 'row',
      lg: 'row'
    },
    marginLeft: 10
  }
}

export default VideoContentsBarChart
