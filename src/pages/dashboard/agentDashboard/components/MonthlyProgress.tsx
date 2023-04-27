// ** React Imports
import React from 'react'

// ** MUI Imports
import { useTheme } from '@mui/material/styles'

// ** Project/Other Imports
import BarChart from './charts/BarChart'

// Vars
const horizontalBarInfo = '#FFB84C'
const warningColorShade = '#9747FF'

const MonthlyProgressBarChart = () => {
  const theme = useTheme()
  const borderColor = theme.palette.divider
  const labelColor = theme.palette.text.disabled
  const legendColor = theme.palette.text.secondary

  return (
    <BarChart
      labelColor={labelColor}
      info={horizontalBarInfo}
      borderColor={borderColor}
      legendColor={legendColor}
      warning={warningColorShade}
    />
  )
}

export default MonthlyProgressBarChart
