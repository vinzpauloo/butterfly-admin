// ** React imports
import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Custom Components
import FeedCard from '../../shared-component/feed/FeedCard'
import FeedAttachments from '../../shared-component/feed/FeedAttachments'
import PhotoGridCard from '../../shared-component/feed/PhotoGridCard'

// ** Utils
import formatDate from '@/utils/formatDate'

// ** Types
import { IFeedStory } from '@/context/types'

import { FILE_SERVER_URL } from '@/lib/baseUrls'

type Props = {
  data?: any
  handleFeedParams?: any
}

const AllPhoto = ({ data }: Props) => {

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

                    <FeedAttachments>
                      <PhotoGridCard cols={ ( story!.images!.length > 3) ? 3 : story?.images?.length  }>
                        {
                          story && story?.images && story?.images.map( image =>  {
                            return <img key={image._id} src={FILE_SERVER_URL + image.url} alt='photo' />// TBR
                          })
                        }
                      </PhotoGridCard>
                    </FeedAttachments>
                  </FeedCard>
                </Grid>
              ))}
          </Grid>
      </Box>
    )
  }

  return (<></>)

}

export default AllPhoto
