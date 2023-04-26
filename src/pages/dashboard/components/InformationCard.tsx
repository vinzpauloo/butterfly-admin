// ** React Imports
import { ReactElement } from 'react'

// ** Material UI Imports
import { Box, Card, CardHeader, CardContent, Grid, Typography } from '@mui/material'

// ** Next Imports
import Image from 'next/image'

// ** Custom Components Imports
import { ThemeColor } from 'src/@core/layouts/types'
import OptionsMenu from '@/@core/components/option-menu'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { useDashboardContext } from '@/context/DashboardContext'

// ** TanStack Query
import { useQuery } from '@tanstack/react-query'

// ** Hooks/Services
import { DashboardService } from '@/services/api/DashboardService'

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
}

const salesData = (props: SalesDataProps): DataType[] => {
  const { mostActiveContentCreatorCount, mostActiveUsers, topFollowedContentCreators = [] } = props

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
      details: ['#1 饥渴的情妇', '#2 继妹在小屋做爱', '#3 户外冒险性', '#4 在公共汽车内口交', '#5 女佣三人行']
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
      title: 'Top Most Shared Videos',
      icon: <Image src='/images/icons/top-shared.png' width={30} height={30} alt='Top Shared' />,
      details: ['#1 睡眠射精', '#2 性感野兽', '#3 性或巧克力', '#4 他妈的在角落里', '#5 狗的风格版本']
    }
  ]
}

const RenderStats = () => {
  const { mostActiveContentCreatorCount, mostActiveUsers, topFollowedContentCreators } = useDashboardContext()
  const data = salesData({ mostActiveContentCreatorCount, mostActiveUsers, topFollowedContentCreators })

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
  const { getMostActiveContentCreatorCount, getMostActiveUsers, getMostFollowedCreator } = DashboardService()
  const { setMostActiveContentCreatorCount, setMostActiveUsers, setTopFollowedContentCreators } = useDashboardContext()

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
    }
  })

  useQuery({
    queryKey: [`mostActiveUserCount`],
    queryFn: () => getMostActiveUsers(),
    onSuccess: (data: any) => {
      setMostActiveUsers(data?.total_active)
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
    }
  })

  return (
    <Card sx={styles.card}>
      <CardHeader
        title='Transactions'
        action={
          <OptionsMenu
            options={['Last 28 Days', 'Last Month', 'Last Year']}
            iconButtonProps={{ size: 'small', sx: { color: 'text.primary' } }}
          />
        }
        // subheader={
        //   <Typography variant='body2'>
        //     <Box component='span' sx={styles.subHead}>
        //       Total 48.5% growth
        //     </Box>{' '}
        //     😎 this month
        //   </Typography>
        // }
        titleTypographyProps={{ sx: styles.title }}
      />
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
