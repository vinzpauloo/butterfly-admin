// ** MUI Imports
import Box, {BoxProps} from '@mui/material/Box'
import { styled } from '@mui/system'

// ** Custom Layout Style Components
const PhotoGridBox = styled(Box)<PhotoGridBoxProps>(({ theme, cols = 3 }) => ({
  display:'grid',
  gridTemplateColumns: `repeat(${cols}, 1fr)`,
  gap:'.5rem',
  '& img': {
    width:'100%',
    height:'147px',
    objectFit: 'cover'
  }
}))

interface PhotoGridBoxProps extends BoxProps {
  cols? : number
}

type PhotoGridProps = {
  children : React.ReactNode,
  cols? :number
}

const PhotoGridCard = ({cols = 3, children} : PhotoGridProps) => {
  return (
    <PhotoGridBox cols={cols}>{children}</PhotoGridBox>
  )
}

export default PhotoGridCard
