// ** Material UI Imports
import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// ** Custom Components Imports
import 'chart.js/auto'
import InformationCard from './InformationCard'
import VideoContentsBarChart from './VideoContentsBarChart'
import DownloadsAndWatchedChart from './DownloadsAndWatchedChart'
import { CreatorDashboardProvider } from '@/context/CreatorDashboardContext'

// Vars
const horizontalBarInfo = '#FFB84C'
const warningColorShade = '#9747FF'
const purpleColorShade = '#A459D1'

const CreatorDashboard = () => {
  const theme = useTheme()
  const borderColor = theme.palette.divider
  const labelColor = theme.palette.text.disabled
  const legendColor = theme.palette.text.secondary

  return (
    <CreatorDashboardProvider>
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
          <DownloadsAndWatchedChart
            labelColor={labelColor}
            info={horizontalBarInfo}
            borderColor={borderColor}
            legendColor={legendColor}
            warning={purpleColorShade}
          />
        </Box>
      </Box>
    </CreatorDashboardProvider>
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

export default CreatorDashboard
