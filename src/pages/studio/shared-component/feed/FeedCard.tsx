// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'
import { styled } from '@mui/system'

// ** Import Custom Components
import FeedAttachments from './FeedAttachments'

// ** Custom Layout Style Components

// ** Styled Components
const FeedTextContent = styled(Typography)(({ theme }) => ({
  fontSize: '13px',
  color: theme.palette.common.white
}))

type User = {
  id: number
  photo: string
  username: string
}
interface FeedCardProps {
  user?: User
  string_story?: string
  datePublished?: string
  children?:
    | (React.ReactNode & React.ReactElement<typeof FeedAttachments>)
    | (React.ReactNode & React.ReactElement<typeof FeedAttachments>[])
}

// TBR
let baseURL = 'http://192.168.50.9/'

const FeedCard = ({ string_story, user, children, datePublished }: FeedCardProps) => {
  // ** Hook
  const theme = useTheme()

  return (
    <Box>
      <Card
        variant='elevation'
        sx={{
          position: 'relative',
          padding: '1.5rem 1rem',
          backgroundColor: theme => theme.customBflyColors.primary
        }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
            <Avatar
              src={user && user?.photo?.replace('http://localhost/', `${baseURL}`)} // TBR
              sx={{
                width: 55,
                height: 55,
                border: theme => `0.25rem solid ${theme.palette.common.white}`
              }}
            />
            <Box sx={{ marginLeft: '1rem' }}>
              <Typography variant='body1' sx={{ color: 'common.white' }}>
                {user && user?.username}
              </Typography>
              <Typography variant='body2' sx={{ color: 'common.white' }}>
                {datePublished}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 3.5, '& svg': { mr: 1.25 } }}>
              <img src='/images/icons/chat.png' />
            </Box>
          </Box>
        </Box>

        <CardContent sx={{ padding: '1.5em 0em' }}>
          <Box
            sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <FeedTextContent>{string_story}</FeedTextContent>
          </Box>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '.3rem', marginTop: '.3rem' }}>{children}</Box>
    </Box>
  )
}

export default FeedCard
