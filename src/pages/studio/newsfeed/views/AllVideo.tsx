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

// ** API
import { useQueryClient, useQuery } from '@tanstack/react-query'
import FeedsService from '@/services/api/FeedsService'

// ** Utils
import formatDate from '@/utils/formatDate'

// ** Types
import { IFeedStory } from '@/context/types'
import { IUser } from '@/context/types'

type Props = {}

const ScrollWrapper = ({ children, hidden }: { children: React.ReactNode; hidden: boolean }) => {
  return <PerfectScrollbar options={{ wheelPropagation: false }}>{children}</PerfectScrollbar>
}

const AllVideo = (props: Props) => {

  // ** Feeds 
  const { getFeeds } = FeedsService()
  const queryClient = useQueryClient()
  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ['getFeeds'],
    queryFn: () => getFeeds({ video_only: true, with: 'user',  })
  })

  if (data) {
    const { data: stories } = data

    return (
      <Box sx={{ display: 'flex' }}>
        <ScrollWrapper hidden={true}>
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
                    {story && story?.videos && (
                      <FeedAttachments>
                        <FeedVideoCard source={story.videos.url} />
                      </FeedAttachments>
                    )}
                  </FeedCard>
                </Grid>
              ))}
          </Grid>
        </ScrollWrapper>
      </Box>
    )
  }

  return <></>
}

export default AllVideo
