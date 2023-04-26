// ** Material UI Imports
import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// ** Custom Components Imports
import 'chart.js/auto'
import InformationCard from './InformationCard'
import VideoContentsBarChart from './VideoContentsBarChart'
import VipAndGuestsData from './VipAndGuestsData'
import { DashboardProvider } from '@/context/DashboardContext'

// Vars
const horizontalBarInfo = '#FFB84C'
const warningColorShade = '#9747FF'
const purpleColorShade = '#A459D1'

const OperatorDashboard = () => {
  const theme = useTheme()
  const borderColor = theme.palette.divider
  const labelColor = theme.palette.text.disabled
  const legendColor = theme.palette.text.secondary

  return (
    <DashboardProvider>
      <Box sx={styles.container}>
        <InformationCard />
        <Box width='100%'>
          <VideoContentsBarChart
            labelColor={labelColor}
            info={horizontalBarInfo}
            borderColor={borderColor}
            legendColor={legendColor}
            warning={warningColorShade}
          />
          <VipAndGuestsData
            labelColor={labelColor}
            info={horizontalBarInfo}
            borderColor={borderColor}
            legendColor={legendColor}
            warning={purpleColorShade}
          />
        </Box>
      </Box>
    </DashboardProvider>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'column',
      md: 'column',
      lg: 'row'
    },
    gap: 10
  }
}

export default OperatorDashboard
