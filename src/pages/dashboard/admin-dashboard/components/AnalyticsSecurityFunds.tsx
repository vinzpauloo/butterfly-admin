// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Custom Components Imports
import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { NewDashboardService } from '@/services/api/NewDashboardService'
import { useState } from 'react'
import { FILE_SERVER_URL } from '@/lib/baseUrls'

const AnalyticsSecurityFunds = () => {
  const router = useRouter()

  const { getDashboardSites } = NewDashboardService()
  const [response, setResponse] = useState<[]>([])

  useQuery({
    queryKey: [`getSecurityFundsRanking`],
    queryFn: () =>
      getDashboardSites({
        params: {
          sort: 'desc',
          sort_by: 'security_funds_balance'
        }
      }),
    onSuccess: (data: any) => {
      setResponse(data?.data)
    }
  })

  return (
    <Card sx={{ height: '440px', overflowY: 'auto' }}>
      <CardHeader
        title='Security Funds'
        titleTypographyProps={{ sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' } }}
        action={
          <Button
            size='small'
            variant='contained'
            sx={{
              backgroundColor: '#FF9C00',
              '&:hover': {
                backgroundColor: '#FF7c02'
              }
            }}
            onClick={() => router.push(`/transactions/security-funds`)}
          >
            View
          </Button>
        }
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(2.25)} !important` }}>
        {response &&
          response.length > 0 &&
          response.map((item: any, index: number) => {
            return (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 8
                }}
              >
                <Avatar
                  variant='rounded'
                  sx={{
                    mr: 3,
                    width: 40,
                    height: 40,
                    backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.04)`
                  }}
                >
                  <img src={FILE_SERVER_URL + item.logo} alt={item.id} height={27} />
                </Avatar>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Box sx={{ mr: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                      {item.name}
                    </Typography>
                    <Typography variant='caption'>{item.fqdn_admin}</Typography>
                  </Box>

                  <Box sx={{ minWidth: 85, display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      variant='body2'
                      sx={{
                        mb: 2,
                        fontWeight: 600,
                        color: item?.security_funds_balance <= 0 ? `error.main` : `success.main`
                      }}
                    >
                      {item?.security_funds_balance
                        ? `¥` + new Intl.NumberFormat('en-US').format(item.security_funds_balance.slice(0, 10))
                        : `¥ 0`}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )
          })}
      </CardContent>
    </Card>
  )
}

export default AnalyticsSecurityFunds
