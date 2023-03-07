// ** React Imports
import React,{ ReactNode } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box, {BoxProps} from '@mui/material/Box'
import { styled } from '@mui/material/styles'

const bgPath = '/images/studio/uploadBG.jpg'

// ** Layout Imports
import BasicCard from '@/layouts/components/shared-components/Card/BasicCard'
import CustomButton from '@/layouts/components/shared-components/CustomButton/CustomButton'
import Link from 'next/link'

//* Context Import
import { StudioContext } from '..'
import { DisplayPage } from '..'

// ** Styled Components
const BoxBG = styled(Box)<BoxProps>(({ theme }) => ({
    backgroundImage: `url("${bgPath}")`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '100% 75%',
    backgroundColor: '#d3d6df',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',

    [theme.breakpoints.down('sm')]: {
        padding:'1em 1em',
    },
    

    [theme.breakpoints.up('sm')]: {
        paddingTop: '5rem',
    }
}))

const UploadBoxContainer = styled(Box)<BoxProps>(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
        maxWidth:'416px',
        marginInline: 'auto'
    }
}))

const TOSLink = styled(Link)(({ theme }) => ({
    color : theme.palette.common.white
}))



type Props = {}

const UploadMenu = (props: Props) => {
  
  const studioContext = React.useContext(StudioContext)
  
  const handleUploadButtonClick = () => {
    studioContext?.setDisplayPage(DisplayPage.UploadVideoStep1)
  }

  const handleNewsfeedsButtonClick = () => {
    studioContext?.setDisplayPage(DisplayPage.UploadNewsfeedsStep1)
  }

  return (
    <BoxBG>
        <Typography
            variant='h6'
            sx={{
                marginInline:'auto',
                mb:7,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important',
                textAlign:'center'
            }}
            color={ theme => theme.customBflyColors.primary }
            >
            THE STUDIO PAGE - UPLOAD
        </Typography>

        <BasicCard 
            sx={{
                paddingInline:[null,null,null,'3rem'],
                paddingTop:[null,null,null,'2rem'],
                maxWidth:800
                }}>
            <Grid maxWidth={700} container rowGap={5}>
                <Grid xs={12} item>
                <Typography color={theme => theme.palette.common.white} variant='body1' 
                    sx={{ 
                        mb: 2,
                        textAlign:'center',
                        fontWeight: 400
                    }}>
                    Please Select content to upload
                </Typography>
                </Grid>
                <Grid xs={12} item>
                    <UploadBoxContainer>
                        <CustomButton onClick={handleUploadButtonClick}>Upload Video</CustomButton>
                    </UploadBoxContainer>
                </Grid>
                <Grid xs={12} item>
                    <UploadBoxContainer sx={{mt: '.5rem'}}>
                        <CustomButton onClick={handleNewsfeedsButtonClick}>Upload NEWSFEEDS</CustomButton>
                    </UploadBoxContainer>
                </Grid>
                <Grid xs={12} item>
                    <Typography fontSize='0.8125rem' textAlign='center' sx={{fontWeight : 'normal'}} color={ theme => theme.palette.common.white }>
                        <br />
                    Your videos or photos will be private until you publish them.
                    <br /><br />
                    By submitting your videos to <strong>Butterfly Project</strong>, you acknowledge that you agree to Butterfly’s <TOSLink href=''>Terms of Service and Community Guidelines.</TOSLink>
                    <br />
                    Please be sure not to violate others' copyright or privacy rights. Learn more.
                    </Typography>
                    
                </Grid>
            </Grid>
        </BasicCard>
    </BoxBG>
  )
}


export default UploadMenu