// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { useTheme } from '@mui/material/styles'
import { styled } from '@mui/system'

// ** Custom Layout Style Components
const LowerBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.customBflyColors.primary,
  padding: '.5em .5em',
}))

type FeedAttachmentsProps = {
    children : React.ReactNode
}
const FeedAttachments = ({children}: FeedAttachmentsProps) => {

  // ** Hook
  const theme = useTheme()

  return (
    <LowerBox>{children}</LowerBox>
  )
}

export default FeedAttachments
