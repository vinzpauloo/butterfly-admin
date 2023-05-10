// ** React Imports
import React from 'react'

// ** MUI Imports
import { useTheme } from '@mui/material/styles'

import DatePickerBarChart from './charts/DatePickerBarChart'

// Vars
const horizontalBarInfo = '#FFB84C'
const purpleColorShade = '#A459D1'

const CommissionDataBarChart = () => {
  const theme = useTheme()
  const borderColor = theme.palette.divider
  const labelColor = theme.palette.text.disabled
  const legendColor = theme.palette.text.secondary

  return (
    <DatePickerBarChart
      labelColor={labelColor}
      info={horizontalBarInfo}
      borderColor={borderColor}
      legendColor={legendColor}
      warning={purpleColorShade}
    />
  )
}

export default CommissionDataBarChart
