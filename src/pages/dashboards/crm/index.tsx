// ** MUI Imports
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { useTheme } from '@mui/material/styles'


// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Demo Components Imports
import AnalyticsBFlyCC from 'src/views/dashboards/analytics/AnalyticsBFlyCC'
import AnalyticsBFlyActiveUsers from 'src/views/dashboards/analytics/AnalyticsBFlyActiveUsers'
import AnalyticsBFlyTopDownloadedVideos from 'src/views/dashboards/analytics/AnalyticsBFlyTopDownloadedVideos'
import AnalyticsBFlyTopMostFollowed from 'src/views/dashboards/analytics/AnalyticsBFlyTopMostFollowed'
import AnalyticsBFlyTopShared from 'src/views/dashboards/analytics/AnalyticsBFlyTopShared'
import AnalyticsBFlyTotalViewedContents from 'src/views/dashboards/analytics/AnalyticsBFlyTotalViewedContents'

// ** Demo Charts Imports
import ChartjsBarChart from 'src/views/charts/chartjs/ChartjsBarChart'

// ** Third Party Styles Import
import 'chart.js/auto'


const CRMDashboard = () => {

  // ** Hook
  const theme = useTheme()

  // Vars
  const barChartYellow = '#ffcf5c'
  const borderColor = theme.palette.divider
  const labelColor = theme.palette.text.disabled


  return (
    <DatePickerWrapper>
      <ApexChartWrapper>

        <Grid container spacing={6}>

          <Grid item xs={12} md={4}>

            <Box display='grid' gridTemplateColumns="repeat(1, 1fr)" gap={6}> 

            <AnalyticsBFlyCC />

            <AnalyticsBFlyActiveUsers />

            <AnalyticsBFlyTopDownloadedVideos />

            <AnalyticsBFlyTopMostFollowed />

            <AnalyticsBFlyTopShared />

            </Box>

          </Grid>

          <Grid item xs={12} md={8} spacing={6}>

            <Box display='grid' gridTemplateColumns="repeat(1, 1fr)" gap={6}> 
              <AnalyticsBFlyTotalViewedContents />

              <ChartjsBarChart yellow={barChartYellow} labelColor={labelColor} borderColor={borderColor} />
            </Box>

          </Grid>

        </Grid>

      </ApexChartWrapper>
    </DatePickerWrapper>
  )
}

export default CRMDashboard
