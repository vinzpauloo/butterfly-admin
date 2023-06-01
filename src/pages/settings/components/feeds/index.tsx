// ** React Imporst
import React from 'react'
import toast from 'react-hot-toast'

// ** MUI Imports
import { Box, Button, CircularProgress, Grid, InputAdornment, TextField, Typography } from '@mui/material'

// ** Step Components
import FeedList from '@/pages/studio/newsfeed/views/FeedList'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Project/Other Imports
import Translations from '@/layouts/components/Translations'
import EditNewsFeedDrawer from '@/pages/studio/newsfeed/views/EditNewsFeedDrawer'

// ** TanStack Imports
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// ** Hooks/Services Imports
import FeedsService from '@/services/api/FeedsService'
import { useErrorHandling } from '@/hooks/useErrorHandling'

// ** Utils
import createSkeleton from '@/utils/createSkeleton'
import { useTranslateString } from '@/utils/TranslateString'

// ** Types
import { IFeedStory } from '@/context/types'

// ** global featured feed store
import { useFeaturedFeedStore } from '@/zustand/featuredFeedGlobalStore'

interface IFeedButton {
  title: string
  param: {
    [key: string]: boolean
  }
}

const feedButtons: IFeedButton[] = [
  {
    title: 'All Story Feeds',
    param: { story_feeds_only: true }
  },
  {
    title: 'All Photo Feeds',
    param: { images_only: true }
  },
  {
    title: 'All Video Feeds',
    param: { video_only: true }
  },
  {
    title: 'Videos With Photos',
    param: { video_images: true }
  }
]

type Props = {
  onClose: () => void
}

// ** Feeds Params
const defaultParams = { with: 'user', page: 1, sort: 'desc', sort_by: 'updated_at' }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SelectFeaturedFeeds = (props: Props) => {
  const { handleError } = useErrorHandling()

  // ** States
  const [activeTab, setActiveTab] = React.useState<number>(0)
  const [feedParams, setFeedParams] = React.useState<{}>({ ...defaultParams, story_feeds_only: true })

  // ** Drawer states
  const [open, setOpen] = React.useState<boolean>(false)
  const [feedRow, setFeedRow] = React.useState<IFeedStory | null>(null)

  const toggleEditDrawer = () => {
    setOpen(!open)
  }

  // ** Featured Feed Store
  const { setFeed, toggleFeedModal } = useFeaturedFeedStore()

  // ** QueryAPI
  const { getFeeds } = FeedsService()
  const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['getFeeds', feedParams],
    getNextPageParam: (prevData: any) => {
      // TBR any
      const nextData = prevData.next_page_url
      if (nextData == undefined) {
        return undefined
      }

      // extracts the query string and creates a URLSearchParams object
      const searchParams = new URLSearchParams(nextData.split('?')[1])

      const page = searchParams.get('page') // retrieves the value of the 'page' parameter
      const myObj = feedParams
      const nextParams = { ...myObj, page: page }

      return nextParams
    },
    queryFn: ({ pageParam = { ...feedParams } }) => {
      return getFeeds(pageParam)
    },
    onError: (e: any) => {
      handleError(e, `getFeeds() SelectFeaturedFeeds`)
    }
  })

  // ** Hooks
  React.useEffect(() => {
    console.log('changed tab so I will call refetch from react query')
  }, [activeTab])

  const handleFeedParams = (index: number) => {
    const feedParams = { ...feedButtons[index].param, ...defaultParams }
    setFeedParams(feedParams)
    setActiveTab(index)
  }

  const handleFeedItemClick = (feed: IFeedStory) => {
    console.log('@@@@@@@@@ THE FEED ID FROM SETTINGS', feed)
    setFeedRow(feed)
    setOpen(true)
  }

  const handleCardClick = (feed: IFeedStory) => {
    console.log('STORE THE CLICKED FEED IN THE FEED GLOBAL STORE', feed)
    setFeed(feed)
  }

  const { postFeaturedFeeds } = FeedsService()
  const { mutate: mutatePostFeaturedFeeds } = useMutation(postFeaturedFeeds, {
    onSuccess: data => {
      console.log(`SUCCESS POST FEATURED FEDS`, data)
    },
    onError: (e: any) => {
      handleError(e, `postFeaturedFeeds() settings/components/feeds/index.tsx`)
    }
  })

  const { selectedFeed, selectedSite, description, title, setTitle } = useFeaturedFeedStore()
  const handleTitleChange = useFeaturedFeedStore(state => state.handleTitleChange)
  const queryClient = useQueryClient()

  // POST METHOD TO ADD FEED
  const handleSelectFeed = () => {
    if (title !== '') {
      mutatePostFeaturedFeeds({
        data: {
          title: title as string,
          description: description as string,
          feed_id: selectedFeed as string,
          active: 'true'
        },
        params: {
          site_id: selectedSite
        }
      })

      setTimeout(() => {
        setTitle('')
        toggleFeedModal()

        queryClient.invalidateQueries({ queryKey: ['featuredFeeds'] })
      }, 1500)
    } else {
      toast.error(`Please input a title.`, {
        duration: 3000
      })
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getActiveTabContent = (step: number) => {
    if (data) {
      const flatMapDataArray = data.pages.flatMap(data => [data.data])
      const flatMap = flatMapDataArray.flatMap(data => [...data])

      return (
        <FeedList
          data={flatMap}
          handleFeedItemClick={handleFeedItemClick}
          editable={false}
          handleCardClick={handleCardClick}
        />
      )
    }
  }

  const renderContent = () => {
    return getActiveTabContent(activeTab)
  }

  const TranslateString = useTranslateString()

  return (
    <Box sx={{ marginInline: 'auto', marginTop: '2rem', paddingBottom: '4rem', alignItems: 'center' }}>
      <Box sx={{ mb: 10 }}>
        <form>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Box>
              <TextField required label='Featured Feed Title' value={title} onChange={handleTitleChange} />
              {title === '' && <Typography color='error'>***Title is required</Typography>}
            </Box>
            <Button
              sx={{ minWidth: 140, height: 50 }}
              color='success'
              size='small'
              variant='contained'
              onClick={handleSelectFeed}
            >
              Save
            </Button>
          </Box>
        </form>
      </Box>

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
                  {isFetchingNextPage ? (
                    <CircularProgress size={15} color='secondary' />
                  ) : (
                    <Translations text='Load More Stories' />
                  )}
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>

      {feedRow && <EditNewsFeedDrawer open={open} row={feedRow as IFeedStory} toggle={() => toggleEditDrawer()} />}
    </Box>
  )
}

export default SelectFeaturedFeeds
