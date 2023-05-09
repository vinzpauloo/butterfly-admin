// ** React Imporst
import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'

// ** Step Components
import FeedList from './views/FeedList'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useQuery, useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import FeedsService from '@/services/api/FeedsService'

// ** Utils
import createSkeleton from '@/utils/createSkeleton'
import { useTranslateString } from '@/utils/TranslateString';
import Translations from '@/layouts/components/Translations'
import EditNewsFeedDrawer from './views/EditNewsFeedDrawer'

// ** Types
import { IFeedStory } from '@/context/types'
interface IFeedButton {
  title : string
  param : {
    [key : string] : boolean
  }
}

const feedButtons : IFeedButton[] = [
  {
    title: 'All Story Feeds',
    param : { story_feeds_only: true }
  },
  {
    title: 'All Photo Feeds',
    param : { images_only: true }
  },
  {
    title: 'All Video Feeds',
    param : { video_only: true }
  },
  {
    title: 'Videos With Photos',
    param : { video_images: true }
  }
]


type Props = {}

// ** Feeds Params
const defaultParams = { with: 'user', page: 1, approval : 'Approved' }

const NewsFeedList = (props: Props) => {
  // ** States
  const [activeTab, setActiveTab] = React.useState<number>(0)
  const [feedParams, setFeedParams] = React.useState<{}>({ ...defaultParams, story_feeds_only : true })

  // ** Drawer states
  const [ open, setOpen ] = React.useState<boolean>(false)
  const [feedRow, setFeedRow] = React.useState<IFeedStory | null>(null)

  const toggleEditDrawer = () => {
    setOpen(!open)
  }

  // ** QueryAPI
  const { getFeeds } = FeedsService()
  const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage, isRefetching } = useInfiniteQuery({
    queryKey: ['getFeeds', feedParams],
    getNextPageParam: (prevData: any) => {
      // TBR any
      let nextData = prevData.next_page_url
      if (nextData == undefined) {
        return undefined
      }
      let searchParams = new URLSearchParams(nextData.split('?')[1]) // extracts the query string and creates a URLSearchParams object
      let page = searchParams.get('page') // retrieves the value of the 'page' parameter
      let myObj = feedParams
      let nextParams = { ...myObj, page: page }
      return nextParams
    },
    queryFn: ({ pageParam = { ...feedParams } }) => {
      return getFeeds(pageParam)
    }
  })

  // ** Hooks
  React.useEffect(() => {
    console.log('changed tab so I will call refetch from react query')
  }, [activeTab])

  const handleFeedParams = (index: number) => {

    const feedParams = { ...feedButtons[index].param, ...defaultParams }
    setFeedParams( feedParams )
    setActiveTab(index)
  }

  const handleFeedItemClick = (feed : IFeedStory) => {
    console.log('@@@@@@@@@ THE FEED ID', feed)
    setFeedRow(feed)
    setOpen(true)
  }

  const getActiveTabContent = (step: number) => {
    if (data) {
      let flatMapDataArray = data.pages.flatMap(data => [data.data])
      let flatMap = flatMapDataArray.flatMap(data => [...data])
      return <FeedList data={flatMap} handleFeedItemClick={handleFeedItemClick} />
    }
  }

  const renderContent = () => {
    return getActiveTabContent(activeTab)
  }

  const TranslateString = useTranslateString()

  return (
    <Box sx={{ marginInline: 'auto', marginTop: '2rem', paddingBottom: '4rem', alignItems: 'center' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: ['center', 'space-between'],
          flexDirection: ['row'],
          alignItems: ['center', 'initial'],
          gap: ['0rem', '2rem'],
          marginBottom: '2rem'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: ['column', 'row'],
            gap: ['1rem', '2.5rem'],
            marginBottom: '0rem'
          }}
        >
          {feedButtons.map((button, index) => {
            return (
              <Button
                key={index}
                sx={{ paddingBlock: '.5em', textTransform: 'uppercase' }}
                size='medium'
                onClick={() => {
                  handleFeedParams(index)
                }}
                variant={index == activeTab ? 'contained' : 'outlined'}
              >
                {TranslateString(button.title)}
              </Button>
            )
          })}
        </Box>
        <Box>
          <TextField
            sx={{
              display: 'none', //search box
              '& input': {
                padding: '.5em 1em'
              },
              '& fieldset': {
                borderRadius: '0 !important',
                padding: '.5em 1em'
              }
            }}
            variant='outlined'
            placeholder='Search'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Icon icon='mdi:microphone' />
                </InputAdornment>
              )
            }}
          />
        </Box>
      </Box>

      <Box sx={{ borderRadius: '5px', maxWidth: '90%', marginInline: 'auto', padding: '1em' }}>
        <Box sx={{ display: 'flex', columnGap: '1rem', marginBottom: '1.5rem' }}>
          {/* <Button onClick={handleInvalidate} variant='contained'>SEARCH BY CONTENT CREATOR</Button>
          <Button variant='contained'>SORT BY DATE</Button> */}
        </Box>
        {isLoading && (
          <Box sx={{ display: 'flex' }}>
            <Grid container spacing={10}>
              {createSkeleton(2)}
            </Grid>
          </Box>
        )}
        {data && renderContent()}

        {hasNextPage && (
          <Box>
            <Grid container spacing={10}>
              <Grid mt={15} display='flex' justifyContent='center' alignItems='center' textAlign='center' item xs={12}>
                <Button
                  disabled={isFetchingNextPage ? true : false}
                  variant='contained'
                  onClick={() => {
                    fetchNextPage()
                  }}
                >
                  {isFetchingNextPage ? <CircularProgress size={15} color='secondary' /> : <Translations text="Load More Stories"/>}
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
      
      {
        feedRow && 
        <EditNewsFeedDrawer open={open} row={feedRow as IFeedStory} toggle={ () => toggleEditDrawer() } />
      }
      
    </Box>
  )
}

NewsFeedList.acl = {
  action: 'read',
  subject: 'cc-page'
}

export default NewsFeedList
