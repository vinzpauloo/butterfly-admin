// ** React Imports
import { ReactElement } from 'react'

// ** Material UI Imports
import { Box, Card, CardHeader, CardContent, Grid, Typography } from '@mui/material'

// ** Next Imports
import Image from 'next/image'

// ** Custom Components Imports
import { ThemeColor } from 'src/@core/layouts/types'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { useCreatorDashboardContext } from '@/context/CreatorDashboardContext'

// ** TanStack Query
import { useQuery } from '@tanstack/react-query'

// ** Hooks/Services
import { DashboardService } from '@/services/api/DashboardService'
import { useErrorHandling } from '@/hooks/useErrorHandling'

interface DataType {
  stats: string
  title: string
  color: ThemeColor
  icon: ReactElement
  details?: string[]
}

interface SalesDataProps {
  earnedDonations?: string
  topDonators?: { _id: string; username: string }[]
  mostLiked?: { _id: string; title: string }[]
}

const salesData = (props: SalesDataProps): DataType[] => {
  const { earnedDonations, topDonators = [], mostLiked = [] } = props

  return [
    {
      stats: earnedDonations || '0',
      title: 'Earned Donations',
      color: 'info',
      icon: <Image src='/images/icons/content-creators.png' width={30} height={30} alt='Content Creators' />
    },
    {
      stats: earnedDonations || '0',
      title: 'Earned Commissions',
      color: 'warning',
      icon: <Image src='/images/icons/active-users.png' width={30} height={30} alt='Active Users' />
    },
    {
      stats: earnedDonations || '0',
      title: 'Most Favorite Video',
      color: 'warning',
      icon: <Image src='/images/icons/active-users.png' width={30} height={30} alt='Active Users' />
    },
    {
      stats: '',
      title: 'Most Liked Videos',
      color: 'warning',
      icon: <Image src='/images/icons/active-users.png' width={30} height={30} alt='Active Users' />,
      details: mostLiked.map((like, index) => `#${index + 1} ${like.title}`) || 'List is currently empty.'
    },
    {
      stats: '',
      color: 'success',
      title: 'Top Donators',
      icon: <Image src='/images/icons/top-followed.png' width={30} height={30} alt='Top Followed' />,
      details: topDonators.map((donator, index) => `#${index + 1} ${donator.username}`) || 'List is currently empty.'
    }
  ]
}

const RenderStats = () => {
  const { earnedDonations, topDonators, mostLiked } = useCreatorDashboardContext()
  const data = salesData({
    earnedDonations,
    topDonators,
    mostLiked
  })

  return (
    <>
      {data.map((item: DataType, index: number) => (
        <Grid item xs={12} sm={3} key={index}>
          <Box key={index} sx={styles.box}>
            <CustomAvatar
              variant='rounded'
              color={item.color}
              sx={{ ...styles.avatar, '& svg': { fontSize: '1.75rem' } }}
            >
              {item.icon}
            </CustomAvatar>
            {item.details ? (
              <Box sx={styles.details}>
                <Typography variant='caption'>{item.title}</Typography>
                <Typography variant='caption'>{item.stats}</Typography>
                {item.details.map((detail, index) => (
                  <Typography key={index} variant='caption'>
                    {detail}
                  </Typography>
                ))}
              </Box>
            ) : (
              <Box sx={styles.details}>
                <Typography variant='caption'>{item.title}</Typography>
                <Typography variant='h6'>{item.stats}</Typography>
              </Box>
            )}
          </Box>
        </Grid>
      ))}
    </>
  )
}

const InformationCard = () => {
  const { getTopDonators, getTopDownloadedVideos } = DashboardService()
  const { handleError } = useErrorHandling()

  const { setEarnedDonations, setTopDonators, setMostLiked } = useCreatorDashboardContext()

  // Earned Donations
  useQuery({
    queryKey: [`creatorEarnedDonations`],
    queryFn: () =>
      getTopDonators({
        data: {
          sum: 'coin_amount'
        }
      }),
    onSuccess: (data: any) => {
      setEarnedDonations(data)
    },
    onError: (e: any) => {
      handleError(e, `getTopDonators() Earned Donations creator/InformationCard.tsx`)
    }
  })

  //Top Donators
  useQuery({
    queryKey: [`creatorTopDonators`],
    queryFn: () =>
      getTopDonators({
        data: {
          top_donators: 'true',
          paginate: 'false',
          with: 'customers'
        }
      }),
    onSuccess: (data: any) => {
      setTopDonators(
        data?.map((item: any, index: number) => {
          return {
            rank: index + 1,
            username: item?.customers.username
          }
        })
      )
    },
    onError: (e: any) => {
      handleError(e, `getTopDonators() Top Donators creator/InformationCard.tsx`)
    }
  })

  //Most Liked
  useQuery({
    queryKey: [`creatorMostLiked`],
    queryFn: () =>
      getTopDownloadedVideos({
        data: {
          most_liked: 'true',
          paginate: 'false',
          select: 'title',
          limit: '10'
        }
      }),
    onSuccess: (data: any) => {
      setMostLiked(
        data?.map((item: any, index: number) => {
          return {
            rank: index + 1,
            title: item?.title
          }
        })
      )
    },
    onError: (e: any) => {
      handleError(e, `getTopDownloadedVideos() Most Liked creator/InformationCard.tsx`)
    }
  })

  return (
    <Card sx={styles.card}>
      <CardHeader title='Creator Dashboard' titleTypographyProps={{ sx: styles.title }} />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container direction='column' spacing={[5, 20]}>
          <RenderStats />
        </Grid>
      </CardContent>
    </Card>
  )
}

const styles = {
  box: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    mr: 3,
    boxShadow: 3,
    width: 44,
    height: 44
  },
  details: {
    display: 'flex',
    flexDirection: 'column'
  },
  card: {
    width: {
      xs: '100%',
      md: '100%',
      lg: '50%'
    }
  },
  subHead: {
    fontWeight: 600,
    color: 'text.primary'
  },
  title: {
    mb: 2.5,
    lineHeight: '2rem !important',
    letterSpacing: '0.15px !important'
  }
}

export default InformationCard
