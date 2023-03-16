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
import PhotoGridCard from '../../shared-component/feed/PhotoGridCard'

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar'


type Props = {}

const ScrollWrapper = ({ children, hidden }: { children: React.ReactNode; hidden: boolean }) => {
  return <PerfectScrollbar options={{ wheelPropagation: false }}>{children}</PerfectScrollbar>
}

const VideosWithPhotos = (props: Props) => {
  return (
    <Box sx={{ display:'flex' }}>
      <ScrollWrapper hidden={true}>
        <Grid container spacing={10}>

            <Grid item sm={6}>

              <FeedCard>

                <FeedAttachments>
                  <Typography fontSize={11} color='common.white'>Location : Four Seasons Hotel, Hangzhou Westlake, China</Typography>
                </FeedAttachments>

                <FeedAttachments>
                  <Box sx={{display:'flex', justifyContent:'flex-start', gap: '.5rem'}}>
                    <Typography fontSize={11} color='common.white'>Taggings : </Typography>
                    <Typography fontSize={11} color='#00C2FF'>#Tag1 #Tag2</Typography>
                  </Box>
                </FeedAttachments>

                <FeedAttachments>
                  <FeedVideoCard source='https://vimeo.com/209175147'></FeedVideoCard>
                </FeedAttachments>

                <FeedAttachments>
                  <PhotoGridCard cols={2}>
                    <img src='/images/misc/grid/3.jpg' />
                    <img src='/images/misc/grid/1.jpg' />
                    <img src='/images/misc/grid/2.jpg' />
                    <img src='/images/misc/grid/3.jpg' />
                    <img src='/images/misc/grid/1.jpg' />
                    <img src='/images/misc/grid/2.jpg' />
                  </PhotoGridCard>
                </FeedAttachments>

              </FeedCard>


            </Grid>

            <Grid item sm={6}>
              
              <FeedCard>

                <FeedAttachments>
                  <Typography fontSize={11} color='common.white'>Location : Four Seasons Hotel, Hangzhou Westlake, China</Typography>
                </FeedAttachments>

                <FeedAttachments>
                  <Box sx={{display:'flex', justifyContent:'flex-start', gap: '.5rem'}}>
                    <Typography fontSize={11} color='common.white'>Taggings : </Typography>
                    <Typography fontSize={11} color='#00C2FF'>#Tag1 #Tag2</Typography>
                  </Box>
                </FeedAttachments>

                <FeedAttachments>
                  <FeedVideoCard source='https://www.youtube.com/watch?v=Ct6BUPvE2sM'></FeedVideoCard>
                </FeedAttachments>

                <FeedAttachments>
                  <PhotoGridCard cols={2}>
                    <img src='/images/misc/grid/2.jpg' />
                    <img src='/images/misc/grid/3.jpg' />
                    <img src='/images/misc/grid/3.jpg' />
                    <img src='/images/misc/grid/1.jpg' />
                    <img src='/images/misc/grid/1.jpg' />
                    <img src='/images/misc/grid/2.jpg' />
                  </PhotoGridCard>
                </FeedAttachments>

              </FeedCard>

            </Grid>

            <Grid item sm={6}>
              
              <FeedCard>

                <FeedAttachments>
                  <Typography fontSize={11} color='common.white'>Location : Four Seasons Hotel, Hangzhou Westlake, China</Typography>
                </FeedAttachments>

                <FeedAttachments>
                  <Box sx={{display:'flex', justifyContent:'flex-start', gap: '.5rem'}}>
                    <Typography fontSize={11} color='common.white'>Taggings : </Typography>
                    <Typography fontSize={11} color='#00C2FF'>#Tag1 #Tag2</Typography>
                  </Box>
                </FeedAttachments>

                <FeedAttachments>
                  <FeedVideoCard source='https://www.twitch.tv/tarik'></FeedVideoCard>
                </FeedAttachments>

                <FeedAttachments>
                  <PhotoGridCard cols={2}>
                    <img src='/images/misc/grid/2.jpg' />
                    <img src='/images/misc/grid/3.jpg' />
                    <img src='/images/misc/grid/3.jpg' />
                    <img src='/images/misc/grid/1.jpg' />
                    <img src='/images/misc/grid/1.jpg' />
                    <img src='/images/misc/grid/2.jpg' />
                  </PhotoGridCard>
                </FeedAttachments>

              </FeedCard>

            </Grid>

            <Grid item sm={6}>
              
              <FeedCard>

                <FeedAttachments>
                  <Typography fontSize={11} color='common.white'>Location : Four Seasons Hotel, Hangzhou Westlake, China</Typography>
                </FeedAttachments>

                <FeedAttachments>
                  <Box sx={{display:'flex', justifyContent:'flex-start', gap: '.5rem'}}>
                    <Typography fontSize={11} color='common.white'>Taggings : </Typography>
                    <Typography fontSize={11} color='#00C2FF'>#Tag1 #Tag2</Typography>
                  </Box>
                </FeedAttachments>

                <FeedAttachments>
                  <FeedVideoCard source='https://www.youtube.com/watch?v=2860XzQ9c28'></FeedVideoCard>
                </FeedAttachments>

                <FeedAttachments>
                  <PhotoGridCard cols={2}>
                    <img src='/images/misc/grid/1.jpg' />
                    <img src='/images/misc/grid/2.jpg' />
                    <img src='/images/misc/grid/3.jpg' />
                    <img src='/images/misc/grid/2.jpg' />
                    <img src='/images/misc/grid/3.jpg' />
                    <img src='/images/misc/grid/1.jpg' />
                  </PhotoGridCard>
                </FeedAttachments>
              </FeedCard>

            </Grid>

        </Grid>
      </ScrollWrapper>
    </Box>
  )
}

export default VideosWithPhotos