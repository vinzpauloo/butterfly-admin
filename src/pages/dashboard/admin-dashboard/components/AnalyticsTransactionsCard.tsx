// ** React Imports
import React, { useState, ReactElement } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import { Box, Button, Card, CardHeader, CardContent, Grid, Typography } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import { useQuery } from '@tanstack/react-query'
import { NewDashboardService } from '@/services/api/NewDashboardService'

interface DataType {
  stats: string
  title: string
  color: ThemeColor
  icon: ReactElement
}

interface ResponseProps {
  money_amount?: string
}

const Data = () => {
  const router = useRouter()
  const { getDashboardDonations, getDashboardSecurityFunds, getDashboardWorkPurchases } = NewDashboardService()

  const [topDonation, setTopDonation] = useState<ResponseProps[]>([])
  const [totalSecurityFunds, setTotalSecurityFunds] = useState<any>()
  const [totalWorkPurchases, setTotalWorkPurchases] = useState<any>()

  useQuery({
    queryKey: [`getTopDonation`],
    queryFn: () =>
      getDashboardDonations({
        params: {
          max: `coin_amount`
        }
      }),
    onSuccess: (data: any) => {
      setTopDonation(data?.data)
    }
  })

  useQuery({
    queryKey: [`getTotalSecurityFunds`],
    queryFn: () =>
      getDashboardSecurityFunds({
        params: {
          sum: `balance`
        }
      }),
    onSuccess: (data: any) => {
      setTotalSecurityFunds(data)
    }
  })

  useQuery({
    queryKey: [`getTotalWorkPurchases`],
    queryFn: () =>
      getDashboardWorkPurchases({
        params: {
          sum: `coin_amount`
        }
      }),
    onSuccess: (data: any) => {
      setTotalWorkPurchases(data)
    }
  })

  const salesData: DataType[] = [
    {
      stats: topDonation[0]?.money_amount === undefined ? `Loading...` : `¥` + topDonation[0]?.money_amount,
      title: 'Top Donation',
      color: 'primary',
      icon: <Icon icon='mdi:trending-up' color='#FFF' onClick={() => router.push(`/transactions/donations`)} />
    },
    {
      stats:
        totalSecurityFunds === undefined
          ? `Loading...`
          : `¥` + new Intl.NumberFormat('en-US').format(totalSecurityFunds.slice(0, 10)),
      title: 'Total Security Funds',
      color: 'success',
      icon: <Icon icon='mdi:account-outline' onClick={() => router.push(`/transactions/security-funds`)} />
    },
    {
      stats:
        totalWorkPurchases === undefined
          ? `Loading...`
          : `¥` + new Intl.NumberFormat('en-US').format(totalWorkPurchases.slice(0, 10)),
      color: 'warning',
      title: 'Withdrawals',
      icon: <Icon icon='mdi:cellphone-link' onClick={() => router.push(`/transactions/withdrawal`)} />
    },
    {
      stats:
        totalSecurityFunds === undefined
          ? `Loading...`
          : `¥` + new Intl.NumberFormat('en-US').format(totalSecurityFunds.slice(0, 10)),
      color: 'info',
      title: 'Work Purchases',
      icon: <Icon icon='mdi:currency-usd' onClick={() => router.push(`/transactions/work-purchases`)} />
    }
  ]

  return salesData
}

const renderStats = () => {
  const salesData = Data()

  return salesData.map((item: DataType, index: number) => (
    <Grid item xs={12} sm={3} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <CustomAvatar
          variant='rounded'
          color={item.color}
          sx={{
            mr: 2,
            boxShadow: 3,
            width: 44,
            height: 44,
            '& svg': { fontSize: '1.75rem' },
            '&:hover': {
              backgroundColor: '#FF7c02',
              transform: `scale(1.5)`,
              transition: 'all 0.3s ease-in-out'
            },
            cursor: 'pointer'
          }}
        >
          {item.icon}
        </CustomAvatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='caption'>{item.title}</Typography>
          <Typography variant='h6'>{item.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const AnalyticsTransactionsCard = () => {
  const router = useRouter()

  return (
    <Card>
      <CardHeader
        title='Transactions'
        action={
          <Button
            size='medium'
            variant='contained'
            sx={{
              backgroundColor: '#FF9C00',
              '&:hover': {
                backgroundColor: '#FF7c02'
              }
            }}
            onClick={() => router.push(`/transactions/commissions`)}
          >
            View Earnings
          </Button>
        }
        titleTypographyProps={{
          sx: {
            mb: 10.5,
            lineHeight: '2rem !important',
            letterSpacing: '0.15px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AnalyticsTransactionsCard
