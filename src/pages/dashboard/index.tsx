// ** Material UI Imports
import { Box } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// ** Custom Components Imports
import InformationCard from './components/InformationCard'
import 'chart.js/auto'
import VideoContentsBarChart from '@/pages/dashboard/components/VideoContentsBarChart'
import VipAndGuestsData from '@/pages/dashboard/components/VipAndGuestsData'

// Vars
const horizontalBarInfo = '#FFB84C'
const warningColorShade = '#9747FF'
const purpleColorShade = '#A459D1'

const Dashboard = () => {
  const theme = useTheme()
  const borderColor = theme.palette.divider
  const labelColor = theme.palette.text.disabled
  const legendColor = theme.palette.text.secondary

  return (
    <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], gap: 10 }}>
      <InformationCard />
      <Box sx={{ width: '100%' }}>
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
  )
}

Dashboard.acl = {
  action: 'read',
  subject: 'shared-page'
}

export default Dashboard
