
// ** React import
import React from 'react'

// ** MUI Imports
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import { styled } from '@mui/material/styles'
import Radio from '@mui/material/Radio'

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
import ProgressCircularWithLabel from '@/layouts/components/shared-components/ProgressCircular'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Types
import { DateType } from '@/types/forms/reactDatepickerTypes'
import { PublishSchedule } from '..'

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

const CustomAccordion = styled(Accordion)(({ theme }) => ({
    '&': {
        borderRadius: '3px !important',
        margin: '9px 0 !important'
    },
    '& .MuiAccordionDetails-root' : {
        paddingLeft: '3.5rem'
    }
}))



const VideoVisibility = () => {

  React.useEffect(()=>{
    console.log('studioContext',studioContext)
  },[])

  // ** State
  const [expanded, setExpanded] = React.useState<string | false>('panel1')

  const [date, setDate] = React.useState<DateType>(new Date())

  const [selectedValue, setSelectedValue] = React.useState<string>('publish')
  
  //** Popper 
  const popperPlacement = 'bottom-end'

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }
  
  const studioContext = React.useContext(StudioContext)

  const handleCancelButton = () => {
    //navigate back
    studioContext?.setDisplayPage(DisplayPage.UploadVideoStep1)
  }
  const dummyNavigate = () => {
    studioContext?.setDisplayPage(DisplayPage.UploadVideoPublish)
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

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value)
    setStudioPublishDate(event.target.value as PublishSchedule)
  }
  const setStudioPublishDate = (publish : PublishSchedule) => {
    studioContext?.setPublishDate(publish)
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
                color={ theme => theme.customBflyColors.primaryText }
                >
                VIDEO VISIBILITY
            </Typography>
            <BasicCard sx={{
                width:'100%',
                paddingTop: '0',
                '& .MuiCardContent-root' : {
                paddingTop: '1rem'
                },
            }}>
                
                <Grid container spacing={5}>
                    <Grid item sm={8}>

                    <CustomAccordion expanded>
                        <AccordionSummary
                            id='panel-header-1'
                            aria-controls='panel-content-1'
                            >
                            <HeaderBox>
                                <Box>
                                    <Radio
                                        value='publish'
                                        onChange={handleRadioChange}
                                        name='radio-save'
                                        checked={selectedValue === 'publish'}
                                        inputProps={{ 'aria-label': 'Publish' }}
                                    />
                                </Box>
                                <Box>
                                    <Typography fontWeight={500} color={ theme => theme.customBflyColors.primaryText }>Save or Publish</Typography>
                                    <Typography fontWeight={500} fontSize={10} color={ theme => theme.customBflyColors.primaryText }>Make your video public, private, or for selected followers only</Typography>
                                </Box>
                            </HeaderBox>
                        </AccordionSummary>
                        <AccordionDetails>

                            <HeaderBox sx={ { ...dimOnTrue(true), ... disableOnTrue(true) }}>
                                <Box>
                                    <Icon icon='mdi:circle-outline' />
                                </Box>
                                <Box>
                                    <Typography fontWeight={500} fontSize={13} color={ theme => theme.customBflyColors.primaryText }>Selected Viewers Only</Typography>
                                </Box>
                            </HeaderBox>

                            <HeaderBox sx={ { ...dimOnTrue(true), ... disableOnTrue(true) }}>
                                <Box>
                                    <Icon icon='mdi:circle-outline' />
                                </Box>
                                <Box>
                                    <Typography fontWeight={500} fontSize={13} color={ theme => theme.customBflyColors.primaryText }>Unlisted</Typography>
                                    <Typography fontWeight={500} fontSize={10} color={ theme => theme.customBflyColors.primaryText }>Anyone with the video link can watch your video</Typography>
                                </Box>
                            </HeaderBox>

                            <HeaderBox sx={{marginTop:'.5rem'}}>
                                <Box>
                                    <Radio
                                        value='publish'
                                        onChange={handleRadioChange}
                                        name='radio-save'
                                        checked={ selectedValue === 'publish' }
                                        inputProps={{ 'aria-label': 'Public' }}
                                    />
                                </Box>
                                <Box>
                                    <Typography fontWeight={500} fontSize={13} color={ theme => theme.customBflyColors.primaryText }>Public</Typography>
                                    <Typography fontWeight={500} fontSize={10} color={ theme => theme.customBflyColors.primaryText }>Everyone can watch your video (Can set as PREMIERE)</Typography>
                                </Box>
                            </HeaderBox>

                        </AccordionDetails>
                    </CustomAccordion>

                    <CustomAccordion expanded>
                        <AccordionSummary
                            id='panel-header-2'
                            aria-controls='panel-content-2'
                            >
                            <HeaderBox>
                                <Box>
                                    <Radio
                                        value='schedule'
                                        onChange={handleRadioChange}
                                        name='radio-schedule'
                                        checked={selectedValue === 'schedule'}
                                        inputProps={{ 'aria-label': 'B' }}
                                    />
                                </Box>
                                <Box>
                                    <Typography fontWeight={500} color={ theme => theme.customBflyColors.primaryText }>Schedule Premiere</Typography>
                                    <Typography fontWeight={500} fontSize={10} color={ theme => theme.customBflyColors.primaryText }>Select date to make your video public</Typography>
                                </Box>
                            </HeaderBox>
                            
                        </AccordionSummary>
                        <AccordionDetails>
                            <div>
                            <DatePicker
                                selected={date}
                                id='basic-input'
                                popperPlacement={popperPlacement}
                                onChange={(date: Date) => setDate(date)}
                                placeholderText='Click to select a date'
                                customInput={<CustomInput label='Basic' />}
                                />
                            </div>
                        </AccordionDetails>
                    </CustomAccordion>

                    <CustomAccordion expanded sx={ { ...dimOnTrue(true), ... disableOnTrue(true) }}>
                        <AccordionSummary
                            id='panel-header-3'
                            aria-controls='panel-content-3'
                            >
                            <HeaderBox>
                                <Box>
                                    <Icon icon='mdi:circle-outline' />
                                </Box>
                                <Box>
                                    <Typography fontWeight={500} color={ theme => theme.customBflyColors.primaryTextContrast }>Add Subtitle</Typography>
                                    <Typography fontWeight={500} fontSize={10} color={ theme => theme.customBflyColors.primaryTextContrast }>Reach a broader audience by adding subtitles on your video</Typography>
                                </Box>
                            </HeaderBox>
                            
                        </AccordionSummary>
                        <AccordionDetails>

                        </AccordionDetails>
                    </CustomAccordion>

                    </Grid>

                    <Grid item sm={4}>

                            <UploadBox>

                                <Box>
                                    <Box 
                                        sx={{ 
                                            borderRadius: '15px',
                                            backgroundColor: '#C4C4C4',
                                            display: 'flex', 
                                            padding:'.5rem',
                                            gap:'1rem',
                                            justifyContent:'center',
                                            textAlign:'center',
                                            minHeight:'150px',
                                            alignItems: 'center' }}>
                                            <Typography>Work</Typography>
                                            <ProgressCircularWithLabel dummyInterval={1500} />
                                    </Box>

                                </Box>

                                <Box>
                                    <Box 
                                        sx={{ 
                                            borderRadius: '15px',
                                            backgroundColor: '#C4C4C4',
                                            display: 'flex', 
                                            padding:'.5rem',
                                            gap:'1rem',
                                            justifyContent:'center',
                                            textAlign:'center',
                                            minHeight:'150px',
                                            alignItems: 'center' }}>
                                            <Typography>Trial</Typography>
                                            <ProgressCircularWithLabel dummyInterval={100} />
                                    </Box>


                                </Box>

                            </UploadBox>


                    </Grid>
                </Grid>
                
                <Grid container>
                    <Grid item xs={12}>
                    <Box 
                        sx={{
                        display:'flex',
                        justifyContent:'center',
                        gap:'2rem',
                        marginTop:'2rem'
                        }}
                        className='buttonContainer'>
                        <Box>
                            <CustomButton onClick={handleCancelButton}>Back</CustomButton>
                        </Box>
                        <Box>
                            <CustomButton
                                onClick={dummyNavigate}
                                sx={{ 
                                    bgcolor : 'primary.main',
                                    color : 'common.white'
                                }}>
                                Save
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

export default VideoVisibility