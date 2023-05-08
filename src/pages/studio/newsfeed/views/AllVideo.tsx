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

// ** Utils
import formatDate from '@/utils/formatDate'

// ** Types
import { IFeedStory } from '@/context/types'

// ** Base URLS
import { STREAMING_SERVER_URL } from '@/lib/baseUrls'

type AllVideoProps = {
  data?: any
  handleFeedParams?: any
}

const AllVideo = ({ data }: AllVideoProps) => {

  if (data) {
    return (
      <Box sx={{ display: 'flex' }}>
          <Grid container spacing={10}>
            {data &&
              data?.map((story: IFeedStory) => (
                <Grid key={story._id} item sm={6}>
                  <FeedCard
                    datePublished={formatDate(story.created_at)}
                    string_story={story.string_story}
                    {...(story.user && { user: story.user })}
                  >
                    {story && story?.tags && (
                      <FeedAttachments>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: '.5rem' }}>
                          <Typography fontSize={11} color='common.white'>
                            Taggings :
                          </Typography>
                          <Typography fontSize={11} color='#00C2FF'>
                            {story.tags.join(', ')}
                          </Typography>
                        </Box>
                      </FeedAttachments>
                    )}
                    {story && story?.videos && (
                      <FeedAttachments>
                        <FeedVideoCard source={ STREAMING_SERVER_URL + story.videos.url} />
                      </FeedAttachments>
                    )}
                  </FeedCard>

                </Grid>
              ))}
          </Grid>
      </Box>
    )
  }

  return <>Loading</>
}

export default React.memo(AllVideo)
