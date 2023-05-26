// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports

import AnalyticsTrophy from './components/AnalyticsTrophy'
import AnalyticsTransactionsCard from './components/AnalyticsTransactionsCard'
import VideoContentsBarChart from '../components/operator/VideoContentsBarChart'
import VipAndGuestsData from '../components/operator/VipAndGuestsData'

import 'chart.js/auto'
import AnalyticsSecurityFunds from './components/AnalyticsSecurityFunds'
import AnalyticsTopDonators from './components/AnalyticsTopDonators'
import AnalyticsNewUsers from './components/AnalyticsNewUsers'

const AdminDashboard = () => {
  const theme = useTheme()
  const borderColor = theme.palette.divider
  const labelColor = theme.palette.text.disabled
  const legendColor = theme.palette.text.secondary
  const horizontalBarInfo = '#FFB84C'
  const warningColorShade = '#9747FF'
  const purpleColorShade = '#A459D1'

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <AnalyticsTrophy />
        </Grid>
        <Grid item xs={12} md={8}>
          <AnalyticsTransactionsCard />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <VideoContentsBarChart
            labelColor={labelColor}
            info={horizontalBarInfo}
            borderColor={borderColor}
            legendColor={legendColor}
            warning={warningColorShade}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <AnalyticsSecurityFunds />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <VipAndGuestsData
            labelColor={labelColor}
            info={horizontalBarInfo}
            borderColor={borderColor}
            legendColor={legendColor}
            warning={purpleColorShade}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <AnalyticsNewUsers />
        </Grid>
        <Grid item xs={12} md={8}>
          <AnalyticsTopDonators />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default AdminDashboard
