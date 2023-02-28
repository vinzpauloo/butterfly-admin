// ** React Imports
import { useState, ReactNode, MouseEvent } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'

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

        <Card sx={{ zIndex: 1 }}>
            <CardContent sx={{  }}>
            <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                
            </Box>
            </CardContent>
          </Card>
    </Box>
  )
}

export default UploadContent
