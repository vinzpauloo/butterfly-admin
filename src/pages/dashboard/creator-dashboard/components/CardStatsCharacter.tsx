// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

// ** Types Imports
import { CardStatsCharacterProps } from 'src/@core/components/card-statistics/types'
import { useAuth } from '@/services/useAuth'
import { FILE_SERVER_URL } from '@/lib/baseUrls'

// ** Styled component for the image
const Img = styled('img')({
  right: 7,
  bottom: 0,
  height: 177,
  position: 'absolute'
})

const CardStatsCharacter = () => {
  const auth = useAuth()

  const data: CardStatsCharacterProps[] = [
    {
      stats: '13.7k',
      title: 'Ratings',
      trendNumber: '+38%',
      chipColor: 'primary',
      chipText: 'Year of 2022',
      src: '/images/cards/pose_f9.png'
    }
  ]

  return (
    <Card sx={{ overflow: 'visible', position: 'relative' }}>
      <CardContent>
        <Typography sx={{ mb: 6.5, fontWeight: 600 }}>{data[0].title}</Typography>
        <Box sx={{ mb: 1.5, rowGap: 1, width: '55%', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <Typography variant='h5' sx={{ mr: 1.5 }}>
            {data[0].stats}
          </Typography>
          <Typography
            component='sup'
            variant='caption'
            sx={{ color: data[0].trend === 'negative' ? 'error.main' : 'success.main' }}
          >
            {data[0].trendNumber}
          </Typography>
        </Box>
        <CustomChip
          size='small'
          skin='light'
          label={data[0].chipText}
          color={data[0].chipColor}
          sx={{ height: 20, fontWeight: 500, fontSize: '0.75rem', '& .MuiChip-label': { lineHeight: '1.25rem' } }}
        />
        <Img src={auth?.user?.photo ? FILE_SERVER_URL + auth.user.photo : `/images/logo.png`} alt='creator_img' />
      </CardContent>
    </Card>
  )
}

export default CardStatsCharacter
