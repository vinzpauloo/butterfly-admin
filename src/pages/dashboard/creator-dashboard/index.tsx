// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'
import CardStatsCharacter from './components/CardStatsCharacter'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import CrmTotalSales from 'src/views/dashboards/crm/CrmTotalSales'
import CrmWeeklySales from 'src/views/dashboards/crm/CrmWeeklySales'
import CrmTotalGrowth from 'src/views/dashboards/crm/CrmTotalGrowth'
import CrmTransactions from 'src/views/dashboards/crm/CrmTransactions'
import CrmRevenueReport from 'src/views/dashboards/crm/CrmRevenueReport'
import CrmSalesOverview from 'src/views/dashboards/crm/CrmSalesOverview'
import CrmActivityTimeline from 'src/views/dashboards/crm/CrmActivityTimeline'

import 'chart.js/auto'
import CardStatsTopDonators from './components/CardStatsTopDonators'

const NewCreatorDashboard = () => {
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6} md={3} sx={{ pt: theme => `${theme.spacing(12.25)} !important` }}>
          <CardStatsCharacter />
        </Grid>
        <Grid item xs={12} sm={6} md={3} sx={{ pt: theme => `${theme.spacing(12.25)} !important` }}>
          <CardStatsTopDonators />
        </Grid>
        <Grid item xs={12} md={6}>
          <CrmTransactions />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CrmTotalSales />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CrmRevenueReport />
        </Grid>
        <Grid item xs={12} md={6}>
          <CrmSalesOverview />
        </Grid>
        <Grid item xs={12} md={6}>
          <CrmActivityTimeline />
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={8}>
              <CrmWeeklySales />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Grid container spacing={6}>
                <Grid item xs={6} sm={12}>
                  <CrmTotalGrowth />
                </Grid>
                <Grid item xs={6} sm={12}>
                  <CardStatisticsVerticalComponent
                    stats='862'
                    trend='negative'
                    trendNumber='-18%'
                    title='New Project'
                    subtitle='Yearly Project'
                    icon={<Icon icon='mdi:briefcase-variant-outline' />}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default NewCreatorDashboard
