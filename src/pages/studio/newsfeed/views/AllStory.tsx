// ** React imports
import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'


// ** Custom Components
import FeedCard from '../../shared-component/feed/FeedCard'
import FeedAttachments from '../../shared-component/feed/FeedAttachments'

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useQuery } from '@tanstack/react-query'

// ** API Import
import FeedsService from '@/services/api/FeedsService'

// ** Utils
import formatDate from '@/utils/formatDate'
import createSkeleton from '@/utils/createSkeleton'

type Props = {}

interface IFeedStory {
  created_at: string
  is_Service: boolean
  location: string
  site_id: number
  string_story: string
  tags: string[]
  updated_at: string
  user?: IUser
  user_id: number
  _id: string
}
interface IUser {
  id: number
  photo: string
  username: string
}
const ScrollWrapper = ({ children, hidden }: { children: React.ReactNode; hidden: boolean }) => {
  return <PerfectScrollbar options={{ wheelPropagation: false }}>{children}</PerfectScrollbar>
}
const AllStory = (props: Props) => {
  const { getFeeds } = FeedsService()

  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ['getFeeds'],
    queryFn: () => getFeeds({ story_feeds_only: true, with: 'user' })
  })

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex' }}>
          <Grid container spacing={10}>
            {createSkeleton(2)}
          </Grid>
      </Box>
    )
  }

  if (isError) {
    return <h5>Error</h5>
  }

  if (data) {
    const { data: stories } = data

    return (
      <Box sx={{ display: 'flex' }}>
        <ScrollWrapper hidden={true}>
          <Grid container spacing={10}>
            {stories.map((story: IFeedStory) => (
              <Grid key={story._id} item sm={6}>
                <FeedCard
                  datePublished={formatDate(story.created_at)}
                  string_story={story.string_story}
                  {...(story.user && { user: story.user })}
                >
                  {story.tags && (
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

  return (<></>)

}

export default AllStory
