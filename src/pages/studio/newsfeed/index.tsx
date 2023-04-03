// ** React Imporst
import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

// ** Step Components
import AllStory from './views/AllStory'
import AllPhoto from './views/AllPhoto'
import AllVideo from './views/AllVideo'
import VideosWithPhotos from './views/VideosWithPhotos'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** API Imports
import { useQuery, useQueryClient } from '@tanstack/react-query'
import FeedsService from '@/services/api/FeedsService'

// ** Utils
import createSkeleton from '@/utils/createSkeleton'

const steps = [
  {
    title: 'All Story Feeds',
  },
  {
    title: 'All Photo Feeds',
  },
  {
    title: 'All Video Feeds',
  },
  {
    title: 'Videos with Photos',
  },
]

type Props = {}

const NewsFeedList = (props: Props) => {

  // ** States
  const [activeTab, setActiveTab] = React.useState<number>(0)


  // ** QueryAPI
  const { getFeeds } = FeedsService()
  const queryClient = useQueryClient();
  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ['getFeeds'],
    queryFn: () => getFeeds({ story_feeds_only: true, with: 'user' })
  })

  // ** Hooks
  React.useEffect( ()=>{
    console.log('changed tab so I will call refetch from react query')
  },[activeTab])


  const handleInvalidate = () => {
    queryClient.invalidateQueries()
  }

  // TURN THIS TO ENUM SO ITS READABLE
  const getActiveTabContent = (step: number) => {
    switch (step) {
      case 0:
        return <AllStory />
      case 1:
        return <AllPhoto />
      case 2:
        return <AllVideo />
      case 3:
        return <VideosWithPhotos />
      default:
        return null
    }
  }

  
  const renderContent = () => {
    return getActiveTabContent(activeTab)
  }

  return (
    <Box sx={{ marginInline: 'auto', marginTop: '2rem', paddingBottom: '4rem', alignItems: 'center' }}>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', gap: '2rem', marginBottom: '2rem' }}>

        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '2.5rem', marginBottom: '0rem' }}>
          {steps.map((step, index) => {
            return (
              <Button sx={{ paddingBlock: '.5em', textTransform: 'uppercase' }} size='medium' onClick={() => { setActiveTab(index) }} variant={index == activeTab ? 'contained' : 'outlined'}>{step.title}</Button>
            )
          })}
        </Box>
        <Box>
          <TextField
            sx={{
              '& input': {
                padding: '.5em 1em',
              },
              '& fieldset': {
                borderRadius: '0 !important',
                padding: '.5em 1em',
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
            }} />
        </Box>

      </Box>

      <Box sx={{ borderRadius: '5px', maxWidth: '90%', marginInline: 'auto', padding: '1em' }}>
        <Box sx={{ display: 'flex', columnGap: '1rem', marginBottom: '1.5rem' }}>
          {/* <Button onClick={handleInvalidate} variant='contained'>SEARCH BY CONTENT CREATOR</Button>
          <Button variant='contained'>SORT BY DATE</Button> */}
        </Box>
        {
          isLoading && 
          <Box sx={{ display: 'flex' }}>
              <Grid container spacing={10}>
                {createSkeleton(2)}
              </Grid>
          </Box>
          
        }
        {
          data && renderContent()
        }
      </Box>
    </Box>
  )
}

export default NewsFeedList
