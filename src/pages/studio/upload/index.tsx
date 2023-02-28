// ** React Imports
import { useState, ReactNode, MouseEvent } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import Link from '@mui/material/Link'

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
    [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const UploadContent = () => {

  // ** Hook
  const theme = useTheme()

  // Vars
  const barChartYellow = '#ffcf5c'
  const borderColor = theme.palette.divider
  const labelColor = theme.palette.text.disabled

  return (
    <Box className='content-center' maxWidth={500} sx={{marginInline:'auto'}}>

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
            >
            THE STUDIO PAGE - UPLOAD
        </Typography>

        <Card sx={{ mt:15,zIndex: 1, marginInline:'auto' }}>
            <CardContent>
            <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',flexDirection:'column' }}>

                    <Typography mb={5}>Please select content to upload</Typography>
                    <Grid display='flex' justifyContent='center' alignItems='center' container spacing={3}>
                        <Grid item xs={12} textAlign='center'>
                            <Link href="/studio/upload/newsfeeds">Upload WORKS</Link>
                        </Grid>
                        <Grid item xs={12} textAlign='center'>
                            <Link href="/studio/upload/works">Upload NEWSFEEDS</Link>
                        </Grid>
                    </Grid>
            </Box>
            </CardContent>
          </Card>

            <Box sx={{mt:25, textAlign:'center'}}>
                <Typography variant='body2'>Your videos and photos will be private until you published them.</Typography>
                <Box sx={{mt:10}}>
                    <Typography variant='body2'>By submitting your videos to Butterfly Project, you acknowledge that you agree to Butterfly's 
                        <Link> Terms of Service</Link> and <Link>Community Guidelines.</Link> <br />
                        Please be sure not to violate others' copyright or privacy rights. <Link>Learn more</Link>
                    </Typography>
                </Box>
            </Box>
                

    </Box>
  )
}

export default UploadContent
