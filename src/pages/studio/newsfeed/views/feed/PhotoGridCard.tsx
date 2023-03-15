// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

const PhotoGridCard = () => {
  return (
    <Card 
        variant='elevation' 
        sx={{ 
            position: 'relative',
            padding: '1.5rem 1rem',
            backgroundColor : theme => theme.customBflyColors.primary
        }}>

      <CardContent sx={{padding:'1.5em 0em'}}>
        <Box sx={{ gap: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontSize:'11px', color: 'common.white' }}>
          首先，如果你想勾引一个性感的朋友或一个新情人，或者想通过短信开始第一次说脏话，你需要阅读我们下面提到的这两个功能。他们将指导您的每一步，
          从您需要发送的第一个微妙的文本到您想要与之开始性感文本对话的文本，到打开它们后需要发送的文本
          <br /><br />
          Photo Grid
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default PhotoGridCard
