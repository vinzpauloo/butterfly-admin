// ** React imports
import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** API
import { useQueryClient } from '@tanstack/react-query'

// ** Custom Components
import FeedCard from '../../shared-component/feed/FeedCard'
import FeedAttachments from '../../shared-component/feed/FeedAttachments'

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar'

// ** Utils
import formatDate from '@/utils/formatDate'

// ** Types
import { IFeedStory } from '@/context/types'
import { IUser } from '@/context/types'

type StoryProps = {
  data? : any,
  handleFeedParams? : any
}

const StoryOnlyParams = { story_feeds_only: true, with: 'user', page : 1 }

const AllStory = ({data, handleFeedParams}: StoryProps) => {
  React.useEffect(() => {
    if (data) {
      handleFeedParams(StoryOnlyParams)
    }
  }, [data])
  
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
