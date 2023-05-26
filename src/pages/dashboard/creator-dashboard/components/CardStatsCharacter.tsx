// ** React Imports
import React from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import { Button, Card, CardContent, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

// ** Third Party Imports

// ** Hooks/Services

// ** Lib Imports
import { FILE_SERVER_URL } from '@/lib/baseUrls'
import { useAuth } from '@/services/useAuth'

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
const CardStatsCharacter = () => {
  const router = useRouter()
  const auth = useAuth()

  const [formatDate, setFormatDate] = React.useState('')

  const updateDate = () => {
    const date = new Date()
    const time = date.toLocaleTimeString()
    const formattedDate = date.toISOString().slice(0, 10) + ' ' + time

    setFormatDate(formattedDate)
  }

  // Run once on initial render
  React.useEffect(() => {
    updateDate()

    // Update every second (1000 milliseconds)
    const interval = setInterval(updateDate, 1000)

    // Cleanup function to clear the interval
    return () => clearInterval(interval)
  }, [])

  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent sx={{ position: 'relative', zIndex: 2 }}>
        <Typography variant='h6' sx={{ fontWeight: 900, color: '#FF9C00' }}>
          {auth?.user?.username}
        </Typography>
        <Typography variant='body2' sx={{ letterSpacing: '0.25px', color: '#FFF' }}>
          Welcome back
        </Typography>
        <Typography variant='h6' sx={{ my: 4, color: '#FF9C00', fontWeight: 900 }}>
          {formatDate}
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
          onClick={() => router.push(`/studio/upload`)}
        >
          Upload Content
        </Button>
      </CardContent>
      <TrophyImg alt='trophy' src={FILE_SERVER_URL + auth?.user?.photo} />
      <Overlay />
    </Card>
  )
}

export default CardStatsCharacter
