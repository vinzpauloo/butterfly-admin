// ** React Imports
import React from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

// ** Third Party Imports

// ** Hooks/Services

// ** Lib Imports
import { FILE_SERVER_URL } from '@/lib/baseUrls'
import { useAuth } from '@/services/useAuth'
import { useQuery } from '@tanstack/react-query'
import { DashboardService } from '@/services/api/DashboardService'
import { useErrorHandling } from '@/hooks/useErrorHandling'

// ** Styles Components
const TrophyImg = styled('img')({
  width: '100%',
  height: '100%',
  position: 'absolute',
  objectFit: 'cover',
  objectPosition: 'right',
  zIndex: 1,
  top: 0
})

const Overlay = styled('div')({
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  position: 'absolute',
  background: `linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(255, 255, 255, 0))`,
  zIndex: 1
})
const CardStatsTopDonators = () => {
  const router = useRouter()
  const auth = useAuth()

  const { getTopDonators } = DashboardService()
  const { handleError } = useErrorHandling()
  const [topDonators, setTopDonators] = React.useState<[]>([])

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
      console.log(data)
      setTopDonators(
        data?.map((item: any, index: number) => {
          return {
            rank: index + 1,
            username: item?.customers.username,
            photo: item?.customers.photo
          }
        })
      )
    },
    onError: (e: any) => {
      handleError(e, `getTopDonators() Top Donators CardStatsTopDonators.tsx`)
    }
  })

  console.log(topDonators)

  const response = topDonators.slice(0, 5)

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent sx={{ position: 'relative', zIndex: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography sx={{ fontWeight: 600 }}>Your Top Donators</Typography>
          <Button
            size='small'
            variant='contained'
            sx={{
              backgroundColor: '#FF9C00',
              '&:hover': {
                backgroundColor: '#FF7c02'
              }
            }}
            onClick={() => router.push(`/studio/upload`)}
          >
            View
          </Button>
        </Box>
        {response &&
          response.length > 0 &&
          response.map((item: { username: string; rank: number; photo: string }, index) => (
            <Box key={index}>
              <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                <Box component='img' src={FILE_SERVER_URL + item?.photo} width={20} height={20} />
                {item?.rank}.{item?.username}
              </Typography>
            </Box>
          ))}
      </CardContent>
    </Card>
  )
}

export default CardStatsTopDonators
