
// ** React import
import React from 'react'

// ** MUI Imports
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Layout Imports
import BasicCard from '@/layouts/components/shared-components/Card/BasicCard'
import CustomButton from '@/layouts/components/shared-components/CustomButton/CustomButton'

//* Context Import
import { StudioContext, DisplayPage, StudioContextType, GenericDataType } from '..'

// ** Third Party Imports
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'

// ** Custom Component Imports
import CustomInput from '@/layouts/components/shared-components/Picker/CustomPickerInput'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Types
import { DateType } from '@/types/forms/reactDatepickerTypes'

// Styled components
const HeaderBox = styled(Box)(({ theme }) => ({
    display:'flex',
    flexDirection:'row',
    columnGap : '1rem',
}))

const UploadBox = styled(Box)(({ theme }) => ({
    display:'flex',
    flexDirection:'column',
    columnGap : '1rem',
    gap: '2rem'
}))

const Img = styled('img')(({ theme }) => ({
    width: '100%',
    height:'100%',
    objectFit: 'cover',
    display: 'block'
  }))

const CustomTextField = styled(TextField)(({ theme }) => ({
    backgroundColor : theme.palette.common.white,
    borderRadius: '4px',
    '& .MuiOutlinedInput-notchedOutline' : {
      display: 'none'
    }
  }))
  


interface PickerProps {
    label?: string
  }
type Props = {}

const UploadVideoPublish = () => {

  // ** State
  const [expanded, setExpanded] = React.useState<string | false>('panel1')
  // ** Date States
  const [date, setDate] = React.useState<DateType>(new Date())

  const popperPlacement = 'bottom-end'


  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }
  
  const studioContext = React.useContext(StudioContext)

  const handleCancelButton = () => {
    //navigate back
    studioContext?.setDisplayPage(DisplayPage.MainPage)
  }
  const dummyNavigate = () => {
    studioContext?.setDisplayPage(DisplayPage.VideosList)
  }

  const dimOnTrue = (flag : boolean) => {
    return {
        opacity: flag ? 0.3 : 1,
        backgroundColor : 'black'
    }
  }

  const disableOnTrue = (flag : boolean) => {
    return {
        pointerEvents: flag ? 'none' : 'initial'
    }
  }

  return (
    <Box sx={{
        maxWidth:'800px',
        marginInline:'auto',
        minWidth:'85%'
    }}>
        <DatePickerWrapper>
            <Typography
                variant='h6'
                sx={{
                    mb:7,
                    lineHeight: 1,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    fontSize: '1.5rem !important',
                    textAlign:'left'
                }}
                color={ theme => theme.customBflyColors.primary }
                >
                VIDEO PUBLISH
            </Typography>
            <BasicCard sx={{
                width:'100%',
                paddingTop: '0',
                '& .MuiCardContent-root' : {
                paddingTop: '1rem'
                },
            }}>
                
                <Grid container spacing={2}>
                    <Grid item sm={12}>

                        <CustomTextField sx={{marginBlock: '.5rem'}} variant='filled' fullWidth placeholder='Title' />
                        <CustomTextField rows={3} multiline variant='filled' fullWidth placeholder='Description or Caption' />

                    </Grid>

                    <Grid item sm={12}>

                        <Grid container spacing={2}>

                            <Grid item sm={6}>
                                <CustomTextField variant='filled' fullWidth placeholder='#TAGS' />
                            </Grid>
                            <Grid item sm={6}>
                                <CustomTextField variant='filled' fullWidth placeholder='GROUPING TEMPLATE' />
                            </Grid>

                        </Grid>

                    </Grid>
                </Grid>
                
                <Grid container>
                    <Grid item xs={12}>
                    <Box 
                        sx={{
                        display:'flex',
                        justifyContent:'center',
                        gap:'2rem',
                        marginTop: '2rem'
                        }}
                        className='buttonContainer'>
                        <Box>
                            <CustomButton onClick={handleCancelButton}>Cancel</CustomButton>
                        </Box>
                        <Box>
                            <CustomButton
                            onClick={dummyNavigate}
                            sx={{ 
                                bgcolor : 'primary.main',
                                color : 'common.white'
                            }}>
                                Publish
                            </CustomButton>
                        </Box>                 
                    </Box>
                    </Grid>
                </Grid>
            </BasicCard>
        </DatePickerWrapper>
    </Box>
        
  )
}

export default UploadVideoPublish