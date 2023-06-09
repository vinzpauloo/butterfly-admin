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
  padding: '.5em .5em'
}))


const StoryCard = () => {

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
        }}>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
            <Avatar
              src=''
              sx={{
                width: 55,
                height: 55,
                border: theme => `0.25rem solid ${theme.palette.common.white}`
              }}
            />
            <Box sx={{ marginLeft: '1rem' }}>
              <Typography variant='body1' sx={{ color: 'common.white' }}>阿库姆</Typography>
              <Typography variant='body2' sx={{ color: 'common.white' }}>02-02-2023</Typography>
            </Box>

          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 3.5, '& svg': { mr: 1.25 } }}>
              <img src='/images/icons/chat.png' />
            </Box>
          </Box>
        </Box>

        <CardContent sx={{ padding: '1.5em 0em' }}>
          <Box sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography sx={{ fontSize: '11px', color: 'common.white' }}>
              首先，如果你想勾引一个性感的朋友或一个新情人，或者想通过短信开始第一次说脏话，你需要阅读我们下面提到的这两个功能。他们将指导您的每一步，
              从您需要发送的第一个微妙的文本到您想要与之开始性感文本对话的文本，到打开它们后需要发送的文本
              <br /><br />
              Shǒuxiān, rúguǒ nǐ xiǎng gōuyǐn yīgè xìnggǎn de péngyǒu huò yīgè xīn qíngrén, huòzhě xiǎng tōngguò duǎnxìn kāishǐ dì yī cì shuō zānghuà
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '.5rem', marginTop: '.5rem' }}>

        <LowerBox>
          <Typography fontSize={11} color='common.white'>Location: Four Seasons Hotel, Hangzhou Westlake, China</Typography>
        </LowerBox>

        <LowerBox>
          <Typography fontSize={11} color='common.white'>Tagging:</Typography>
          <Typography>#Active</Typography>
        </LowerBox>

      </Box>

    </Box>
  )
}

export default StoryCard
