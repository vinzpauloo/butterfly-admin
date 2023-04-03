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

type Props = {}



const ScrollWrapper = ({ children, hidden }: { children: React.ReactNode; hidden: boolean }) => {
  return <PerfectScrollbar options={{ wheelPropagation: false }}>{children}</PerfectScrollbar>
}
const AllStory = (props: Props) => {
  // const { isLoading, data } = useQuery({queryKey: ['getFeeds']})
  const queryClient = useQueryClient()
  const data : any = queryClient.getQueryData(['getFeeds'])

  if (data) {
    const { data : stories } = data

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

export default AllStory
