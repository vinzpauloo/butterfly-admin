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

const getMonthName = (monthNumber: number) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  return monthNames[monthNumber - 1]
}

interface VideoContentDataProps {
  total_watched: string
  created_at: number
  week: number
  month: number
  year: number
}

const VideoContentsBarChart = (props: VerticalBarProps) => {
  const { warning, labelColor, borderColor, legendColor } = props

  const { getVideoBarChart } = DashboardService()

  const [fromDate, setFromDate] = useState<string | undefined>()
  const [toDate, setToDate] = useState<string | undefined>()

  const [isDaily, setIsDaily] = useState<string | undefined>()
  const [isWeekly, setIsWeekly] = useState<string | undefined>()
  const [isMonthly, setIsMonthly] = useState<string | undefined>()
  const [isYearly, setIsYearly] = useState<string | undefined>()

  const [showLoadingText, setShowLoadingText] = useState(false)

  const [videoContentData, setVideoContentData] = useState<VideoContentDataProps[]>([])

  useQuery({
    queryKey: [`VideoBarChart`, fromDate, toDate, isDaily, isWeekly, isMonthly, isYearly],
    queryFn: () =>
      getVideoBarChart({
        data: {
          from: fromDate,
          to: toDate,
          weekly: isWeekly,
          daily: isDaily,
          monthly: isMonthly,
          yearly: isYearly
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
        setIsMonthly(undefined)
        setIsYearly(undefined)
        setFromDate(dailyStartDate?.toISOString().slice(0, 10))
        setToDate(new Date().toISOString().slice(0, 10))
        const dayFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'long' })
        const dateFormatter = new Intl.DateTimeFormat(['ban', 'id'])

        const isValidDate = (dateString: any) => {
          const timestamp = Date.parse(dateString)

          return !isNaN(timestamp)
        }

        if (videoContentData.length > 0 && isValidDate(videoContentData[0]?.created_at)) {
          newData.labels = videoContentData.map((item: VideoContentDataProps) => {
            const date = new Date(item?.created_at)

            return dateFormatter.format(date) + ' ' + dayFormatter.format(date)
          })
          newData.datasets[0].data = videoContentData.map((item: VideoContentDataProps) =>
            parseFloat(item?.total_watched)
          )
        }

        break

      case 'weekly':
        setFromDate(undefined)
        setToDate(undefined)
        setIsDaily(undefined)
        setIsWeekly('true')
        setIsMonthly(undefined)
        setIsYearly(undefined)

        newData.labels = videoContentData.map((item: VideoContentDataProps) => {
          return `Week` + ` ` + item.week
        })

        newData.datasets[0].data = videoContentData.map((item: VideoContentDataProps) =>
          parseFloat(item?.total_watched)
        )

        break

      case 'monthly':
        setFromDate(undefined)
        setToDate(undefined)
        setIsDaily(undefined)
        setIsWeekly(undefined)
        setIsMonthly('true')
        setIsYearly(undefined)

        newData.labels = videoContentData.map((item: VideoContentDataProps) => getMonthName(item?.month))

        newData.datasets[0].data = videoContentData.map((item: VideoContentDataProps) =>
          parseFloat(item?.total_watched)
        )

        break

      case 'yearly':
        setFromDate(undefined)
        setToDate(undefined)
        setIsDaily(undefined)
        setIsWeekly(undefined)
        setIsMonthly(undefined)
        setIsYearly('true')

        newData.labels = videoContentData.map((item: VideoContentDataProps) => item?.year)

        newData.datasets[0].data = videoContentData.map((item: VideoContentDataProps) =>
          parseFloat(item?.total_watched)
        )

        break
    }
    setData(newData)

    // Set a loader for the title
    setShowLoadingText(true)
    const timer = setTimeout(() => {
      setShowLoadingText(false)
    }, 600)

    // Cleanup
    return () => {
      clearTimeout(timer)
    }
  }, [active, toDate, videoContentData, warning])

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

  const weeklyTitle =
    videoContentData.length > 0
      ? [`Week ${videoContentData[0]?.week} - Week ${videoContentData[videoContentData.length - 1]?.week}`]
      : []

  const monthlyTitle =
    videoContentData.length > 0
      ? [
          `${getMonthName(videoContentData[0]?.month)} - ${getMonthName(
            videoContentData[videoContentData.length - 1]?.month
          )} of ${videoContentData[0]?.year}`
        ]
      : []

  const yearlyTitle =
    videoContentData.length > 0
      ? [`${videoContentData[0]?.year} - ${videoContentData[videoContentData.length - 1]?.year}`]
      : []

  return (
    <Card>
      <CardHeader
        title='Video Contents Total Views'
        subheader={
          showLoadingText
            ? 'Loading...'
            : active === 'daily'
            ? `${fromDate} - ${toDate}`
            : active === 'weekly'
            ? `${weeklyTitle}`
            : active === 'monthly'
            ? `${monthlyTitle}`
            : `${yearlyTitle}`
        }
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
