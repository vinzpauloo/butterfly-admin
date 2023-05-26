// ** React Imports
import React, { useState } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import { Button, Card, CardContent, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

// ** Third Party Imports
import { useQuery } from '@tanstack/react-query'

// ** Hooks/Services
import { NewDashboardService } from '@/services/api/NewDashboardService'
import { useErrorHandling } from '@/hooks/useErrorHandling'

// ** Lib Imports
import { FILE_SERVER_URL } from '@/lib/baseUrls'

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

interface ResponseProps {
  username: string
  work_shares: string
  photo: string
}

const AnalyticsTrophy = () => {
  const { getDashboardUsers } = NewDashboardService()
  const router = useRouter()
  const { handleError } = useErrorHandling()

  const [response, setResponse] = useState<ResponseProps[]>([])

  useQuery({
    queryKey: [`TopCreatorWorkShare`],
    queryFn: () =>
      getDashboardUsers({
        params: {
          role: `CC`,
          sort: `desc`,
          sort_by: `work_shares`
        }
      }),
    onSuccess: (data: any) => {
      setResponse(data?.data)
    },
    onError: (e: any) => {
      handleError(e, `getTopCreatorWorkShare() admin-dashboard AnalyticsTrophy.tsx`)
    }
  })

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent sx={{ position: 'relative', zIndex: 2 }}>
        <Typography variant='h6' sx={{ fontWeight: 900, color: '#FF9C00' }}>
          {response[0]?.username}
        </Typography>
        <Typography variant='body2' sx={{ letterSpacing: '0.25px', color: '#FFF' }}>
          Top creator of the month
        </Typography>
        <Typography variant='h5' sx={{ my: 4, color: '#FF9C00', fontWeight: 900 }}>
          {response[0]?.work_shares} Shares
        </Typography>
        <Button
          size='small'
          variant='contained'
          sx={{
            backgroundColor: '#FF9C00',
            '&:hover': {
              backgroundColor: '#FF7c02'
            }
          }}
          onClick={() => router.push(`/user/list/Creators`)}
        >
          View Creators
        </Button>
      </CardContent>
      <TrophyImg alt='trophy' src={FILE_SERVER_URL + response[0]?.photo} />
      <Overlay />
    </Card>
  )
}

export default AnalyticsTrophy
