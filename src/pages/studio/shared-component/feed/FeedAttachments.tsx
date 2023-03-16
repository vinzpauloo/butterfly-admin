// ** MUI Imports
import Box from '@mui/material/Box'
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
