// ** React imports 
import React from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

// ** Third Party Components
import PerfectScrollbar from 'react-perfect-scrollbar'

// ** Demo content
import StoryCard from './feed/StoryCard'

type Props = {}

const ScrollWrapper = ({ children, hidden }: { children: React.ReactNode; hidden: boolean }) => {
  return <PerfectScrollbar options={{ wheelPropagation: false }}>{children}</PerfectScrollbar>
}

const AllStory = (props: Props) => {
  return (

    <Box sx={{ padding:'1.5em',backgroundColor:'#ededed', borderRadius:'5px', display:'flex', height: '120vh' }}>
      <ScrollWrapper hidden={true}>
        <Grid container spacing={10}>

            <Grid item sm={6}>
              <StoryCard />
            </Grid>

            <Grid item sm={6}>
              <StoryCard />
            </Grid>

            <Grid item sm={6}>
              <StoryCard />
            </Grid>

            <Grid item sm={6}>
              <StoryCard />
            </Grid>

            <Grid item sm={6}>
              <StoryCard />
            </Grid>

            <Grid item sm={6}>
              <StoryCard />
            </Grid>

            <Grid item sm={6}>
              <StoryCard />
            </Grid>

            <Grid item sm={6}>
              <StoryCard />
            </Grid> 

        </Grid>
      </ScrollWrapper>
    </Box>  
    
  )
}

export default AllStory