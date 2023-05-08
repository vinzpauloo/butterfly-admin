// ** React imports
import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'


// ** Custom Components
import FeedCard from '../../shared-component/feed/FeedCard'
import FeedAttachments from '../../shared-component/feed/FeedAttachments'

// ** Utils
import formatDate from '@/utils/formatDate'

// ** Types
import { IFeedStory } from '@/context/types'

// ** Views
import NoPostsFound from './NoPostsFound'

type StoryProps = {
  data? : any,
}

const AllStory = ({data}: StoryProps) => {

  if ( data?.length == 0 ) {
    return <NoPostsFound />
  }
  
  if (data) {

    const stories = data

    return (
      <Box sx={{ display: 'flex' }}>

          <Grid container spacing={10}>
            {stories &&
              stories?.map((story: IFeedStory) => (
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
                  </FeedCard>
                </Grid>
              ))}
          </Grid>

      </Box>
    )
  }

  return <></>
}

export default AllStory
