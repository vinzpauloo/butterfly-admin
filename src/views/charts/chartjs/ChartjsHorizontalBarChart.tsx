// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { Bar } from 'react-chartjs-2'
import { ChartData, ChartOptions } from 'chart.js'
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import React, {MouseEvent, useState, useEffect} from "react";

interface VerticalBarProps {
  info: string
  warning: string
  labelColor: string
  borderColor: string
  legendColor: string
}

const ChartjsHorizontalBarChart = (props: VerticalBarProps) => {
  // ** Props
  const { info, warning, labelColor, borderColor, legendColor } = props

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
        data: [710, 350, 580, 460],
      },
    ],
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
          data: [],
        },
      ],
    }
    switch (active) {
      case 'daily':
        newData.labels = ['Mon', 'Tue','Wed','Thur', 'Fri', 'Sat']
        newData.datasets[0].data = [710, 350, 580, 460, 250,632]
        break
      case 'weekly':
        newData.labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4']
        newData.datasets[0].data = [200, 400, 600, 800]
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
  }, [active, warning])

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

  return (
    <Card>
      <CardHeader
        title='Video Contents Total Views'
        subheader='January 1, 2020 - January 1, 2023'
        action={
          <ToggleButtonGroup
            exclusive
            value={active}
            onChange={handleActive}
            sx={{display: 'flex', flexDirection: ['column', 'row'], marginLeft: 10}}
          >
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

export default ChartjsHorizontalBarChart
