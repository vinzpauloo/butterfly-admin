// ** MUI Imports
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'
import { NewDashboardService } from '@/services/api/NewDashboardService'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import formatDate from '@/utils/formatDate'

interface ResponseProps {
  total_new_vip: string
  total_new_guest: string
  created_at: string
}

const AnalyticsNewUsers = () => {
  // ** Hook
  const theme = useTheme()

  const { getNewUsers } = NewDashboardService()

  const [response, setResponse] = useState<ResponseProps[]>([])

  useQuery({
    queryKey: [`getNewUsers`],
    queryFn: () =>
      getNewUsers({
        params: {
          daily: `true`,
          select: `total_active,total_new_vip,total_new_guest,created_at`,
          from: `2023-05-19`,
          to: `2023-05-26`
        }
      }),
    onSuccess: (data: any) => {
      setResponse(data)
    }
  })

  const vipUsers = response.map(item => Number(item?.total_new_vip))
  const guestUsers = response.map(
    item => Number(item?.total_new_guest) / 2
  ) /* Temporarily divides the data by 2 in order to produce the graph design */
  const CreatedAt = response.map(item => formatDate(item?.created_at).slice(0, 10))

  const series = [
    {
      name: 'VIP',
      data: vipUsers
    },
    {
      name: 'Guests',
      data: guestUsers
    }
  ]

  const options: ApexOptions = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: true }
    },
    colors: [theme.palette.primary.main, theme.palette.info.main],
    plotOptions: {
      radar: {
        size: 110,
        polygons: {
          connectorColors: theme.palette.divider,
          strokeColors: [
            theme.palette.divider,
            'transparent',
            'transparent',
            'transparent',
            'transparent',
            'transparent'
          ]
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        gradientToColors: [theme.palette.primary.main, theme.palette.info.main],
        shadeIntensity: 1,
        type: 'vertical',
        opacityFrom: 1,
        opacityTo: 0.9,
        stops: [0, 100]
      }
    },
    labels: CreatedAt,
    markers: { size: 0 },
    legend: {
      labels: { colors: theme.palette.text.secondary }
    },
    grid: { show: false },
    xaxis: {
      labels: {
        show: true,
        style: {
          fontSize: '14px',
          colors: [
            theme.palette.text.disabled,
            theme.palette.text.disabled,
            theme.palette.text.disabled,
            theme.palette.text.disabled,
            theme.palette.text.disabled,
            theme.palette.text.disabled
          ]
        }
      }
    },
    yaxis: { show: false }
  }

  return (
    <Card>
      <CardHeader
        title='New Users'
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
        }}
      />
      <CardContent>
        <ReactApexcharts type='radar' height={305} series={series} options={options} />
      </CardContent>
    </Card>
  )
}

export default AnalyticsNewUsers
