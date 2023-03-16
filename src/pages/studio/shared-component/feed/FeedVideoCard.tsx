// ** MUI Imports
import Box from '@mui/material/Box'
import { styled } from '@mui/system'

// ** Third Party Components
import ReactPlayer from 'react-player'

// ** Custom Layout Style Components
const VideoBox = styled(Box)(({ theme }) => ({
  display:'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap:'.5rem',
  position: 'relative',
  paddingTop: '56.25%', /* Player ratio: 100 / (1280 / 720) */

  '& .reactPlayer': {
    position: 'absolute',
    top: 0,
    left: 0,
  }
}))

type FeedVideoCardProps = {
  source : string
}

const FeedVideoCard = ({source} : FeedVideoCardProps) => {
  return (
    <VideoBox>
        <ReactPlayer 
            className='reactPlayer'
            width='100%'
            height='100%' 
            controls={true}
            url={source} />
    </VideoBox>
  )
}

export default FeedVideoCard
