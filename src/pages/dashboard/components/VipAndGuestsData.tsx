// ** React Imports
import React from "react";

// ** MUI Imports
import { Card, CardHeader, CardContent} from '@mui/material'

// ** Third Party Imports
import { Bar } from 'react-chartjs-2'
import { ChartData, ChartOptions } from 'chart.js'

interface VerticalBarProps {
  info: string
  warning: string
  labelColor: string
  borderColor: string
  legendColor: string
}

const VipAndGuestsData = (props: VerticalBarProps) => {
  const { info, warning, labelColor, borderColor, legendColor } = props

  const options: ChartOptions<'bar'> = {
    indexAxis: 'x',
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
    elements: {
      bar: {
        borderRadius: {
          topRight: 15,
          bottomRight: 15,
        },
      },
    },
    layout: {
      padding: { top: -4 },
    },
    scales: {
      x: {
        min: 0,
        grid: {
          drawTicks: false,
          drawBorder: false,
          color: borderColor,
        },
        ticks: { color: labelColor },
      },
      y: {
        grid: {
          borderColor,
          display: false,
          drawBorder: false,
        },
        ticks: { color: labelColor },
      },
    },
    plugins: {
      legend: {
        align: 'end',
        position: 'top',
        labels: { color: legendColor },
      },
    },
  }

  const data: ChartData<'bar'> = {
    labels: ['January', 'February', 'March ', 'April', 'May'],
    datasets: [
      {
        maxBarThickness: 45,
        label: 'VIP Member',
        backgroundColor: warning,
        borderColor: 'transparent',
        data: [710, 350, 580, 460, 120]
      },
      {
        maxBarThickness: 45,
        backgroundColor: info,
        label: 'Guests',
        borderColor: 'transparent',
        data: [430, 590, 510, 240, 360]
      }
    ]
  }

  return (
    <Card>
      <CardHeader
        title='VIP Members and Guests Data'
      />
      <CardContent>
        <Bar data={data} height={400} options={options} />
      </CardContent>
    </Card>
  )
}

export default VipAndGuestsData
