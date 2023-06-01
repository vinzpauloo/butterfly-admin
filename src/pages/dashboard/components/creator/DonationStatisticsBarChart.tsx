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
  coin_amount: string
}

const DonationStatisticsBarChart = (props: VerticalBarProps) => {
  const { warning, labelColor, borderColor, legendColor } = props

  const { getTopDonators } = DashboardService()

  const [fromDate, setFromDate] = useState<string | undefined>()
  const [toDate, setToDate] = useState<string | undefined>()

  const [isDaily, setIsDaily] = useState<string | undefined>()
  const [isWeekly, setIsWeekly] = useState<string | undefined>()
  const [isMonthly, setIsMonthly] = useState<string | undefined>()
  const [isYearly, setIsYearly] = useState<string | undefined>()

  const [showLoadingText, setShowLoadingText] = useState(false)

  const [donationData, setDonationData] = useState<VideoContentDataProps[]>([])
  const [paginate, setPaginate] = useState('')
  const [select, setSelect] = useState('coin_amount,created_at')

  useQuery({
    queryKey: [`DonationStatisticsBarChart`, fromDate, toDate, isDaily, isWeekly, isMonthly, isYearly, select],
    queryFn: () =>
      getTopDonators({
        data: {
          from: fromDate,
          to: toDate,
          weekly: isWeekly,
          daily: isDaily,
          monthly: isMonthly,
          yearly: isYearly,
          select: select,
          paginate: paginate
        }
      }),
    onSuccess: (data: any) => {
      if (data.data) {
        setDonationData(
          data?.data.map((item: any) => {
            return item
          })
        )
      } else {
        setDonationData(data)
      }
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
        label: 'Total Donations',
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
          label: 'Total Donations',
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
        setSelect('coin_amount,created_at')

        if (donationData.length > 0) {
          newData.labels = donationData
            .filter((item: VideoContentDataProps) => item?.created_at)
            .map((item: VideoContentDataProps) => {
              const date = new Date(item.created_at)

              return date.toISOString().slice(0, 10)
            })

          newData.datasets[0].data = donationData
            .filter((item: VideoContentDataProps) => item?.created_at)
            .map((item: VideoContentDataProps) => parseFloat(item.coin_amount))
        }

        break

      case 'weekly':
        setFromDate(undefined)
        setToDate(undefined)
        setIsDaily(undefined)
        setIsWeekly('true')
        setIsMonthly(undefined)
        setIsYearly(undefined)
        setPaginate('false')
        setSelect('coin_amount,week,month,year')

        newData.labels = donationData.map((item: VideoContentDataProps) => {
          return `Week` + ` ` + item.week
        })

        newData.datasets[0].data = donationData.map((item: VideoContentDataProps) => parseFloat(item?.coin_amount))

        break

      case 'monthly':
        setFromDate(undefined)
        setToDate(undefined)
        setIsDaily(undefined)
        setIsWeekly(undefined)
        setIsMonthly('true')
        setIsYearly(undefined)
        setSelect('coin_amount,month,year')

        newData.labels = donationData.map((item: VideoContentDataProps) => getMonthName(item?.month))

        newData.datasets[0].data = donationData.map((item: VideoContentDataProps) => parseFloat(item?.coin_amount))

        break

      case 'yearly':
        setFromDate(undefined)
        setToDate(undefined)
        setIsDaily(undefined)
        setIsWeekly(undefined)
        setIsMonthly(undefined)
        setIsYearly('true')
        setSelect('coin_amount,year')

        newData.labels = donationData.map((item: VideoContentDataProps) => item?.year)

        newData.datasets[0].data = donationData.map((item: VideoContentDataProps) => parseFloat(item?.coin_amount))

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
  }, [active, toDate, donationData, warning])

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
    donationData.length > 0
      ? [`Week ${donationData[0]?.week} - Week ${donationData[donationData.length - 1]?.week}`]
      : []

  const monthlyTitle =
    donationData.length > 0
      ? [
          `${getMonthName(donationData[0]?.month)} - ${getMonthName(donationData[donationData.length - 1]?.month)} of ${
            donationData[0]?.year
          }`
        ]
      : []

  const yearlyTitle =
    donationData.length > 0 ? [`${donationData[0]?.year} - ${donationData[donationData.length - 1]?.year}`] : []

  return (
    <Card>
      <CardHeader
        title='Donation Statistics'
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

export default DonationStatisticsBarChart
