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

type videoPhotosProps = {
  data?: any
  handleFeedParams?: any
}

// ** Types
import { IFeedStory } from '@/context/types'

const videoWithPhotos = { video_images: true, with: 'user', page : 1, status : 'Approved' }

const VideosWithPhotos = ({ data, handleFeedParams }: videoPhotosProps) => {
  React.useEffect(() => {
    if (data) {
      handleFeedParams(videoWithPhotos)
    }
  }, [data])

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
                        <FeedVideoCard source={story.videos.url} />
                      </FeedAttachments>
                    )}
                    <FeedAttachments>
                      <PhotoGridCard>
                        {story &&
                          story?.images &&
                          story?.images.map(image => {
                            return (
                              <img
                                key={image._id}
                                src={image.url.replace('http://localhost/', 'http://192.168.50.9/')}
                              />
                            )
                          })}
                      </PhotoGridCard>
                    </FeedAttachments>
                  </FeedCard>
                </Grid>
              ))}
          </Grid>
      </Box>
    )
  }

  return <>Loading</>
}

export default VideosWithPhotos
