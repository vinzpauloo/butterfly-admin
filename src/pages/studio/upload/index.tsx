// ** React Imports
import { useState, ReactNode, MouseEvent } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box, {BoxProps} from '@mui/material/Box'
import MuiCard, { CardProps } from '@mui/material/Card'
import { styled } from '@mui/material/styles'

const bgPath = '/images/studio/uploadBG.jpg'

// ** Layout Imports
import UserLayoutNoPadding from '@/layouts/UserLayoutNoPadding'
import BasicCard from '@/layouts/components/shared-components/Card/BasicCard'
import CustomButton from '@/layouts/components/shared-components/CustomButton/CustomButton'

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

    [theme.breakpoints.up('sm')]: {
        paddingTop: '5rem',
    }
}))

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
    [theme.breakpoints.up('sm')]: { width: '40rem' }
}))

const UploadContent = () => {

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

        <BasicCard>
            <Grid maxWidth={700} container rowGap={5}>
                <Grid xs={12}>
                <Typography color={theme => theme.palette.common.white} variant='subtitle2' 
                    sx={{ 
                        mb: 2,
                        textAlign:'center',
                        fontWeight: 400
                    }}>
                    Please Select content to upload
                </Typography>
                </Grid>
                <Grid xs={12} item>
                    <CustomButton>Upload Video</CustomButton>
                </Grid>
                <Grid xs={12} item>
                    <CustomButton>Upload NEWSFEEDS</CustomButton>
                </Grid>
                <Grid xs={12}>
                    <Typography sx={{fontWeight : 'normal'}} color={ theme => theme.palette.common.white }>
                    Your videos or photos will be private until you publish them.

By submitting your videos to Butterfly Project, you acknowledge that you agree to Butterfly’s Terms of Service and Community Guidelines.
Please be sure not to violate others' copyright or privacy rights. Learn more.
                    </Typography>
                    
                </Grid>
            </Grid>
        </BasicCard>
    </BoxBG>
  )
}

UploadContent.contentHeightFixed = true
UploadContent.getLayout = (page: ReactNode) => <UserLayoutNoPadding contentHeightFixed={UploadContent.contentHeightFixed}>{page}</UserLayoutNoPadding>
export default UploadContent
