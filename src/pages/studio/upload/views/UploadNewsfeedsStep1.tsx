// ** React Imports
import React,{ ReactNode } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Layout Imports
import BasicCard from '@/layouts/components/shared-components/Card/BasicCard'

//* Context Import
import { StudioContext } from '..'
import { DisplayPage } from '..'



// ** Types & Interfaces
type Props = {}

const UploadNewsfeedsStep1 = (props: Props) => {
  
  const studioContext = React.useContext(StudioContext)
  
  const handleCancelButtonClick = () => {
    studioContext?.setDisplayPage(DisplayPage.UploadVideoStep1)
  }

  const handleNewsfeedsButtonClick = () => {
    studioContext?.setDisplayPage(DisplayPage.UploadNewsfeedsStep1)
  }

  return (
    <>
        <Typography
            variant='h6'
            sx={{
                marginInline:'auto',
                mb:7,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important',
                textAlign:'left'
            }}
            color={ theme => theme.customBflyColors.primaryText }
            >
            UPLOAD NEWSFEEDS
        </Typography>

        <BasicCard 
            sx={{
                paddingInline:[null,null,null,'3rem'],
                paddingTop:[null,null,null,'2rem'],
                maxWidth:800
                }}>
            <Grid maxWidth={700} container rowGap={5}>
                <Grid xs={12} item>
                  
                </Grid>
            </Grid>
        </BasicCard>
    </>
  )
}


export default UploadNewsfeedsStep1