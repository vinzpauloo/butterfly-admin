// ** React Imports
import { ReactElement } from 'react'

// ** Material UI Imports
import { Box, Card, CardHeader, CardContent, Grid, Typography } from '@mui/material'

// ** Next Imports
import Image from 'next/image'

// ** Custom Components Imports
import { ThemeColor } from 'src/@core/layouts/types'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { useDashboardContext } from '@/context/DashboardContext'

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
  mostActiveContentCreatorCount?: string
  mostActiveUsers?: string
  topFollowedContentCreators?: { name: string }[]
  topDownloadedVideos?: { title: string }[]
  topDonators?: { id: string; username: string }[]
}

const salesData = (props: SalesDataProps): DataType[] => {
  const {
    mostActiveContentCreatorCount,
    mostActiveUsers,
    topFollowedContentCreators = [],
    topDownloadedVideos = [],
    topDonators = []
  } = props

  return [
    {
      stats: mostActiveContentCreatorCount || '0',
      title: 'Content Creators',
      color: 'info',
      icon: <Image src='/images/icons/content-creators.png' width={30} height={30} alt='Content Creators' />
    },
    {
      stats: mostActiveUsers || '0',
      title: 'Most Active Users',
      color: 'warning',
      icon: <Image src='/images/icons/active-users.png' width={30} height={30} alt='Active Users' />
    },
    {
      stats: '',
      color: 'error',
      title: 'Top Downloaded Videos',
      icon: <Image src='/images/icons/top-downloaded-videos.png' width={30} height={30} alt='Top Downloaded' />,
      details: topDownloadedVideos.map((video, index) => `#${index + 1} ${video.title}`) || 'List is currently empty.'
    },
    {
      stats: '',
      color: 'success',
      title: 'Top Followed Content Creators',
      icon: <Image src='/images/icons/top-followed.png' width={30} height={30} alt='Top Followed' />,
      details:
        topFollowedContentCreators.map((creator, index) => `#${index + 1} ${creator.name}`) ||
        'List is currently empty.'
    },
    {
      stats: '',
      color: 'info',
      title: 'Top Donators',
      icon: <Image src='/images/icons/top-shared.png' width={30} height={30} alt='Top Shared' />,
      details: topDonators.map((item, index) => `#${index + 1} ${item.username}`) || 'List is currently empty.'
    }
  ]
}

const RenderStats = () => {
  const {
    mostActiveContentCreatorCount,
    mostActiveUsers,
    topFollowedContentCreators,
    topDownloadedVideos,
    topDonators
  } = useDashboardContext()

  const data = salesData({
    mostActiveContentCreatorCount,
    mostActiveUsers,
    topFollowedContentCreators,
    topDownloadedVideos,
    topDonators
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
  const {
    getMostActiveContentCreatorCount,
    getMostActiveUsers,
    getMostFollowedCreator,
    getTopDownloadedVideos,
    getTopDonators
  } = DashboardService()

  const {
    setMostActiveContentCreatorCount,
    setMostActiveUsers,
    setTopFollowedContentCreators,
    setTopDownloadedVideos,
    setTopDonators
  } = useDashboardContext()

  const { handleError } = useErrorHandling()

  useQuery({
    queryKey: [`mostActiveCreatorCount`],
    queryFn: () =>
      getMostActiveContentCreatorCount({
        data: {
          role: 'CC',
          count: 'true'
        }
      }),
    onSuccess: (data: any) => {
      setMostActiveContentCreatorCount(data)
    },
    onError: (e: any) => {
      handleError(e, `getMostActiveContentCreatorCount() operator/InformationCard.tsx`)
    }
  })

  useQuery({
    queryKey: [`mostActiveUserCount`],
    queryFn: () => getMostActiveUsers(),
    onSuccess: (data: any) => {
      setMostActiveUsers(data)
    },
    onError: (e: any) => {
      handleError(e, `getMostActiveUsers() operator/InformationCard.tsx`)
    }
  })

  useQuery({
    queryKey: [`mostFollowed`],
    queryFn: () =>
      getMostFollowedCreator({
        data: {
          role: 'CC',
          most_followed: 'true'
        }
      }),
    onSuccess: (data: any) => {
      setTopFollowedContentCreators(
        data?.data.map((item: any, index: number) => {
          return {
            rank: index + 1,
            name: item?.username
          }
        })
      )
    },
    onError: (e: any) => {
      handleError(e, `getMostFollowedCreator() operator/InformationCard.tsx`)
    }
  })

  useQuery({
    queryKey: [`topDownloadedVideos`],
    queryFn: () =>
      getTopDownloadedVideos({
        data: {
          most_download: 'true',
          select: 'title',
          sort_by: 'downloads',
          sort: 'asc',
          limit: '10',
          paginate: 'false'
        }
      }),
    onSuccess: (data: any) => {
      setTopDownloadedVideos(
        data?.map((item: any) => {
          return {
            _id: item?._id,
            title: item?.title
          }
        })
      )
    },
    onError: (e: any) => {
      handleError(e, `getTopDownloadedVideos() operator/InformationCard.tsx`)
    }
  })

  useQuery({
    queryKey: [`topDonators`],
    queryFn: () =>
      getTopDonators({
        data: {
          limit: '10',
          paginate: 'false',
          top_donators: 'true',
          with: 'customers'
        }
      }),
    onSuccess: (data: any) => {
      setTopDonators(
        data?.map((item: any) => {
          return {
            username: item?.customers.username
          }
        })
      )
    }
  })

  return (
    <Card sx={styles.card}>
      <CardHeader title='Transactions' titleTypographyProps={{ sx: styles.title }} />
      <CardContent sx={{ pt: theme => `${theme.spacing(3)} !important` }}>
        <Grid container direction='column' spacing={[5, 15]}>
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
