// ** React imports 
import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Custom Components
import FeedCard from '../../shared-component/feed/FeedCard'
import FeedAttachments from '../../shared-component/feed/FeedAttachments'
import FeedVideoCard from '../../shared-component/feed/FeedVideoCard'

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar'


type Props = {}

const ScrollWrapper = ({ children, hidden }: { children: React.ReactNode; hidden: boolean }) => {
  return <PerfectScrollbar options={{ wheelPropagation: false }}>{children}</PerfectScrollbar>
}

const AllVideo = (props: Props) => {
  return (
    <Box sx={{ display: 'flex', }}>
      <ScrollWrapper hidden={true}>
        <Grid container spacing={10}>

          <Grid item sm={6}>

            <FeedCard>

              <FeedAttachments>
                <Typography fontSize={11} color='common.white'>Location : Four Seasons Hotel, Hangzhou Westlake, China</Typography>
              </FeedAttachments>

              <FeedAttachments>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: '.5rem' }}>
                  <Typography fontSize={11} color='common.white'>Taggings : </Typography>
                  <Typography fontSize={11} color='#00C2FF'>#Tag1 #Tag2</Typography>
                </Box>
              </FeedAttachments>

              <FeedAttachments>
                <FeedVideoCard source='https://www.youtube.com/watch?v=2860XzQ9c28'></FeedVideoCard>
              </FeedAttachments>

            </FeedCard>


          </Grid>

          <Grid item sm={6}>

            <FeedCard>

              <FeedAttachments>
                <Typography fontSize={11} color='common.white'>Location : Four Seasons Hotel, Hangzhou Westlake, China</Typography>
              </FeedAttachments>

              <FeedAttachments>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: '.5rem' }}>
                  <Typography fontSize={11} color='common.white'>Taggings : </Typography>
                  <Typography fontSize={11} color='#00C2FF'>#Tag1 #Tag2</Typography>
                </Box>
              </FeedAttachments>

              <FeedAttachments>
                <FeedVideoCard source='https://www.youtube.com/watch?v=DxmdySilOAI&t=1s'></FeedVideoCard>
              </FeedAttachments>

            </FeedCard>

          </Grid>

          <Grid item sm={6}>

            <FeedCard>

              <FeedAttachments>
                <Typography fontSize={11} color='common.white'>Location : Four Seasons Hotel, Hangzhou Westlake, China</Typography>
              </FeedAttachments>

              <FeedAttachments>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: '.5rem' }}>
                  <Typography fontSize={11} color='common.white'>Taggings : </Typography>
                  <Typography fontSize={11} color='#00C2FF'>#Tag1 #Tag2</Typography>
                </Box>
              </FeedAttachments>

              <FeedAttachments>
                <FeedVideoCard source='https://www.twitch.tv/esl_csgo'></FeedVideoCard>
              </FeedAttachments>

            </FeedCard>

          </Grid>

          <Grid item sm={6}>

            <FeedCard>

              <FeedAttachments>
                <Typography fontSize={11} color='common.white'>Location : Four Seasons Hotel, Hangzhou Westlake, China</Typography>
              </FeedAttachments>

              <FeedAttachments>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: '.5rem' }}>
                  <Typography fontSize={11} color='common.white'>Taggings : </Typography>
                  <Typography fontSize={11} color='#00C2FF'>#Tag1 #Tag2</Typography>
                </Box>
              </FeedAttachments>

              <FeedAttachments>
                <FeedVideoCard source='https://www.youtube.com/watch?v=2860XzQ9c28'></FeedVideoCard>
              </FeedAttachments>

            </FeedCard>

          </Grid>

        </Grid>
      </ScrollWrapper>
    </Box>
  )
}

export default AllVideo