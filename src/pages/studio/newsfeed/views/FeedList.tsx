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

// ** Utils
import formatDate from '@/utils/formatDate'

// ** Types
import { IFeedStory } from '@/context/types'

// ** Views
import NoPostsFound from './NoPostsFound'

// ** Base Links
import { STREAMING_SERVER_URL, FILE_SERVER_URL } from '@/lib/baseUrls'

type StoryProps = {
  data?: any
  handleFeedItemClick?: (story: IFeedStory) => void
  editable? : boolean
  handleCardClick? : (story: IFeedStory) => void
}

const FeedList = ({ data, handleFeedItemClick, editable=false, handleCardClick }: StoryProps) => {
  if (data?.length == 0) {
    return <NoPostsFound />
  }

  if (data) {
    const stories = data

    return (
      <Box sx={{ display: 'flex' }}>
        <Grid container spacing={10}>
          {stories &&
            stories?.map((story: IFeedStory) => (
              <Grid key={story._id} item sm={6} onClick={ handleCardClick ? () => handleCardClick(story) : ()=>{} }>
                <FeedCard
                  _id={story._id}
                  datePublished={formatDate(story.created_at)}
                  string_story={story.string_story}
                  {...(story.user && { user: story.user })}
                  editable={editable}
                  handleEditButtonClick={ handleFeedItemClick ? () => handleFeedItemClick(story) : () => {} }
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
                      <FeedVideoCard source={STREAMING_SERVER_URL + story.videos.url} />
                    </FeedAttachments>
                  )}
                  
                  <FeedAttachments>
                    {story.images && (
                      <PhotoGridCard cols={story!.images!.length > 3 ? 3 : story?.images?.length}>
                        {story &&
                          story?.images &&
                          story?.images.map(image => {
                            return <img key={image._id} src={FILE_SERVER_URL + image.url} alt='photo' />
                          })}
                      </PhotoGridCard>
                    )}
                  </FeedAttachments>

                </FeedCard>
              </Grid>
            ))}
        </Grid>
      </Box>
    )
  }

  return <></>
}

export default FeedList
