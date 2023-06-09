// ** MUI Imports
import { Avatar, Box, Card, CardContent, IconButton, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { styled } from '@mui/system'

// ** Project/Other Imports
import FeedAttachments from './FeedAttachments'
import Icon from 'src/@core/components/icon'

// ** Lib Imports
import { FILE_SERVER_URL } from '@/lib/baseUrls'

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
  _id?: string
  user?: User
  editable?: boolean
  string_story?: string
  datePublished?: string
  children?:
    | (React.ReactNode & React.ReactElement<typeof FeedAttachments>)
    | (React.ReactNode & React.ReactElement<typeof FeedAttachments>[])
  handleEditButtonClick?: () => void
  selected?: boolean
}

const FeedCard = ({
  string_story,
  user,
  children,
  datePublished,
  editable,
  handleEditButtonClick,
  selected
}: FeedCardProps) => {
  // ** Hook
  const theme = useTheme()

  return (
    <Box
      sx={{
        border: selected ? `7px solid #56ca00` : ``,
        borderRadius: selected ? `14px` : ``
      }}
    >
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
              src={FILE_SERVER_URL + user && FILE_SERVER_URL + user?.photo} // TBR
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
              <img src='/images/icons/chat.png' alt='chat icon' />
            </Box>
            {editable && handleEditButtonClick && (
              <Box>
                <IconButton onClick={handleEditButtonClick}>
                  <Icon icon='mdi:pencil' fontSize={20} color={theme.palette.common.white} />
                </IconButton>
              </Box>
            )}
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
