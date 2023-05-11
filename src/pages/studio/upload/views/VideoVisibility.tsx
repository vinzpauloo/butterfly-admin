// ** React import
import React from 'react'

import { useRouter } from 'next/router'

// ** MUI Imports
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import { styled } from '@mui/material/styles'
import Radio from '@mui/material/Radio'
import CircularProgress from '@mui/material/CircularProgress'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Layout Imports
import BasicCard from '@/layouts/components/shared-components/Card/BasicCard'

//* Context Import
import { StudioContext, DisplayPage } from '..'

// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Custom Component Imports
import CustomInput from '@/layouts/components/shared-components/Picker/CustomPickerInput'
import ProgressCircularWithLabel from '@/layouts/components/shared-components/ProgressCircular'

// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Types
import { DateType } from '@/types/forms/reactDatepickerTypes'
import { PublishSchedule } from '..'

// ** Services Import
import VideoService from '@/services/api/VideoService'
import { useErrorHandling } from '@/hooks/useErrorHandling'

// ** react-hook-form
import { useFormContext } from 'react-hook-form'

// ** Uploady
import { useUploady, useAbortBatch, UploadyContext, UPLOADER_EVENTS } from '@rpldy/uploady'

// ** Import base link
import { STREAMING_SERVER_URL } from '@/lib/baseUrls'

// Styled components
const HeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  columnGap: '1rem'
}))

const UploadBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  columnGap: '1rem',
  gap: '2rem'
}))

const Img = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block'
}))

const CustomAccordion = styled(Accordion)(({ theme }) => ({
  '&': {
    borderRadius: '3px !important',
    margin: '9px 0 !important'
  },
  '& .MuiAccordionDetails-root': {
    paddingLeft: '3.5rem'
  }
}))

const VideoVisibility = () => {
  // ** Hooks
  const uploady = useUploady()
  const abortBatch = useAbortBatch()

  // ** State
  const [expanded, setExpanded] = React.useState<string | false>('panel1')
  const [date, setDate] = React.useState<DateType>(new Date())
  const [selectedValue, setSelectedValue] = React.useState<string>('publish')
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [workVideo, setWorkVideo] = React.useState<string | null>(null)
  const [trailerFile, setTrailerFile] = React.useState<File[] | null>([])
  const [videoTypeUploaded, setVideoTypeUploaded] = React.useState<'full_video' | 'trial_video'>('full_video')

  // ** SERVICES CALLS
  const { uploadVideoURL } = VideoService()
  const { handleError } = useErrorHandling()

  // ** Context ReactHookForm
  const { getValues, setValue } = useFormContext()

  // ** COMPONENT FUNCTIONS **/

  const handleFormData = (work_id: string, hasTrialCheck: boolean): FormData => {
    // ** Update the table with the work_id -- Refactor this formData values
    console.log('handleFormData getValues', getValues())

    const { title, description, startTime, thumbnailFile } = getValues()

    const formData = new FormData()

    formData.append('work_id', work_id)
    formData.append('title', title)
    formData.append('description', description)
    formData.append('orientation', 'Landscape') // HardCoded
    formData.append('_method', 'put')

    if (thumbnailFile?.length) {
      formData.append('thumbnail', thumbnailFile[0])
    }

    // if we have a trial
    formData.append('has_own_trial', hasTrialCheck ? 'true' : 'false')
    hasTrialCheck && formData.append('startTimeSeconds', startTime )

    if (studioContext?.tags.length) {
      studioContext?.tags.map(tag => formData.append('tags[]', tag))
    }
    if (studioContext?.groupings.length) {
      studioContext?.groupings.map(group => formData.append('groups[]', group))
    }

    return formData
  } // end handleFormData Fxn

  // Context
  const uploadyContext = React.useContext(UploadyContext)

  // Router
  const router = useRouter()

  // ** Use Effects
  React.useEffect(() => {
    console.log('studioContext FINAL', studioContext)
  }, [])

  React.useEffect(() => {
    const eventBatchStart = (batch: any, options: any) => {
      console.log('EVENT BATCH START batch', batch)
      console.log('EVENT BATCH START options', options)
    }

    const eventProgress = (item: any) => {
      //console.log('CALL PROGRESS EVENT', item)
      const { videoType } = getValues()
      console.log('call in event progress', videoType)

      if (videoType == 'full_video') {
        studioContext?.setWorkProgress(item.completed)
      }

      if (videoType == 'trial_video') {
        studioContext?.setTrialProgress(item.completed)
      }
    }

    const eventPreSend = async (items: any, options: any) => {
      console.log('CALL PRESEND', options)

      let hasTrialVideo = false

      const { title, contentCreator } = getValues()

      console.log('EVENTPRESEND VALUES', getValues())

      if (options?.params?.video_type == 'full_video') {
        // use react-hook-form context
        setValue('videoType', 'full_video')

        const passFullVideoData = {
          user_id: contentCreator,
          video_type: 'full_video',
          video_name: title
        }

        try {
          const result = await uploadVideoURL({ formData: passFullVideoData })
          const { uploadUrl, work_id } = result
          console.log('RESULT', result)

          //set a work ID
          studioContext?.setWorkId(work_id)
          setWorkVideo(work_id)
          setValue('work_id', work_id)

          try {
            // update the form
            await updateVideoByWorkId({ formData: handleFormData(work_id, hasTrialVideo) })
          } catch (e: any) {
            handleError(e, `updateVideoByWorkId() VideoVisibility.tsx`)
            console.log(`ERROR updateVideoByWorkId()`, e)
          }

          return uploadUrl
            ? //set the new URL for this upload
              { options: { destination: { url: STREAMING_SERVER_URL + uploadUrl } } }
            : //not valid URL, cancel the upload
              false
        } catch (e: any) {
          handleError(e, `uploadVideoURL() w/o Trial Video VideoVisiblity.tsx`)
          console.log(`ERROR uploadVideoURL()`, e)
        }
      } else if (options?.params?.video_type == 'trial_video') {
        // we have a trial video
        hasTrialVideo = true

        // use react-hook-form context
        setValue('videoType', 'trial_video')

        const { work_id } = getValues()

        const passTrailerVideoData = {
          user_id: contentCreator,
          video_type: 'trial_video',
          video_name: title,
          work_id: work_id
        }

        try {
          const result = await uploadVideoURL({ formData: passTrailerVideoData })
          console.log('result trailer', result)
          const { uploadUrl } = result

          try {
            // update the form
            await updateVideoByWorkId({ formData: handleFormData(work_id as unknown as string, hasTrialVideo) })
          } catch (e: any) {
            handleError(e, `updateVideoByWorkId() w/ Trial Video VideoVisibility.tsx`)
            console.log(`ERROR updateVideoByWorkId()`, e)
          }

          return uploadUrl
            ? //set the new URL for this upload
              { options: { destination: { url: STREAMING_SERVER_URL + uploadUrl } } }
            : //not valid URL, cancel the upload
              false
        } catch (e: any) {
          handleError(e, `uploadVideoURL() w/ Trial Video VideoVisibility.tsx`)
          console.log(`ERROR uploadVideoURL() VideoVisibility.tsx`, e)
        }
      }
    }

    uploadyContext.on(UPLOADER_EVENTS.BATCH_PROGRESS, eventProgress)
    uploadyContext.on(UPLOADER_EVENTS.REQUEST_PRE_SEND, eventPreSend)
    uploadyContext.on(UPLOADER_EVENTS.BATCH_START, eventBatchStart)

    return () => {
      uploadyContext.off(UPLOADER_EVENTS.BATCH_PROGRESS, eventProgress)
      uploadyContext.off(UPLOADER_EVENTS.BATCH_START, eventBatchStart)
    }
  }, [uploadyContext, handleError])

  // ** Query apis
  const { updateVideoByWorkId } = VideoService()

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
    //studioContext?.setDisplayPage(DisplayPage.VideosList)

    let isSchedule = selectedValue == 'publish' ? false : true

    let defaultWorkFormParams = {
      work_id: getValues().work_id, //getting from react-hook-form context provider
      _method: 'put'
    }

    let workFormParams = {}
    if (isSchedule) {
      workFormParams = { ...defaultWorkFormParams, schedule: date?.toLocaleString() }
    } else {
      workFormParams = { ...defaultWorkFormParams, publish: true }
    }
    console.log('workFormParams', workFormParams)
    console.log('router', router)
    setIsLoading(true)
    updateWork(workFormParams).then(data => {
      setIsLoading(false)
      router.push('/studio/video-list')
    })
  }

  const updateWork = (formDataParams: { [key: string]: any }) => {
    let formData = new FormData()
    Object.keys(formDataParams).forEach(key => {
      console.log('key', key)
      console.log('formDataParams[key]', formDataParams[key])
      formData.append(key, formDataParams[key])
    })

    // call api updat
    return updateVideoByWorkId({
      formData: formData
    })
  }

  const dimOnTrue = (flag: boolean) => {
    return {
      opacity: flag ? 0.3 : 1,
      backgroundColor: 'black',
      padding: '.3rem'
    }
  }

  const disableOnTrue = (flag: boolean) => {
    return {
      pointerEvents: flag ? 'none' : 'initial'
    }
  }

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    setSelectedValue(event.target.value)
    setStudioPublishDate(event.target.value as PublishSchedule)
  }
  const setStudioPublishDate = (publish: PublishSchedule) => {
    studioContext?.setPublishDate(publish)
  }

  return (
    <Box
      sx={{
        maxWidth: '800px',
        marginInline: 'auto',
        minWidth: '85%'
      }}
    >
      <DatePickerWrapper>
        <Typography
          variant='h6'
          sx={{
            mb: 7,
            lineHeight: 1,
            fontWeight: 600,
            textTransform: 'uppercase',
            fontSize: ['1rem', '1.5rem !important'],
            textAlign: 'left',
            mt: ['1.5rem', '0']
          }}
          color={theme => theme.customBflyColors.primaryText}
        >
          VIDEO VISIBILITY
        </Typography>
        <BasicCard
          sx={{
            width: '100%',
            paddingTop: '0',
            '& .MuiCardContent-root': {
              paddingTop: '1rem'
            }
          }}
        >
          <Grid container spacing={5}>
            <Grid item xs={12} sm={8}>
              <CustomAccordion expanded>
                <AccordionSummary id='panel-header-1' aria-controls='panel-content-1'>
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
                      <Typography fontWeight={500} color={theme => theme.customBflyColors.primaryText}>
                        Save or Publish
                      </Typography>
                      <Typography fontWeight={500} fontSize={10} color={theme => theme.customBflyColors.primaryText}>
                        Make your video public, private, or for selected followers only
                      </Typography>
                    </Box>
                  </HeaderBox>
                </AccordionSummary>
                <AccordionDetails>
                  <HeaderBox sx={{ ...dimOnTrue(true), ...disableOnTrue(true) }}>
                    <Box>
                      <Icon icon='mdi:circle-outline' />
                    </Box>
                    <Box>
                      <Typography fontWeight={500} fontSize={13} color={theme => theme.customBflyColors.primaryText}>
                        Selected Viewers Only
                      </Typography>
                    </Box>
                  </HeaderBox>

                  <HeaderBox sx={{ ...dimOnTrue(true), ...disableOnTrue(true) }}>
                    <Box>
                      <Icon icon='mdi:circle-outline' />
                    </Box>
                    <Box>
                      <Typography fontWeight={500} fontSize={13} color={theme => theme.customBflyColors.primaryText}>
                        Unlisted
                      </Typography>
                      <Typography fontWeight={500} fontSize={10} color={theme => theme.customBflyColors.primaryText}>
                        Anyone with the video link can watch your video
                      </Typography>
                    </Box>
                  </HeaderBox>

                  <HeaderBox sx={{ marginTop: '.5rem' }}>
                    <Box>
                      <Radio
                        value='publish'
                        onChange={handleRadioChange}
                        name='radio-save'
                        checked={selectedValue === 'publish'}
                        inputProps={{ 'aria-label': 'Public' }}
                      />
                    </Box>
                    <Box>
                      <Typography fontWeight={500} fontSize={13} color={theme => theme.customBflyColors.primaryText}>
                        Public
                      </Typography>
                      <Typography fontWeight={500} fontSize={10} color={theme => theme.customBflyColors.primaryText}>
                        Everyone can watch your video (Can set as PREMIERE)
                      </Typography>
                    </Box>
                  </HeaderBox>
                </AccordionDetails>
              </CustomAccordion>

              <CustomAccordion expanded>
                <AccordionSummary id='panel-header-2' aria-controls='panel-content-2'>
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
                      <Typography fontWeight={500} color={theme => theme.customBflyColors.primaryText}>
                        Schedule Premiere
                      </Typography>
                      <Typography fontWeight={500} fontSize={10} color={theme => theme.customBflyColors.primaryText}>
                        Select date to make your video public
                      </Typography>
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

              <CustomAccordion expanded sx={{ ...dimOnTrue(true), ...disableOnTrue(true) }}>
                <AccordionSummary id='panel-header-3' aria-controls='panel-content-3'>
                  <HeaderBox>
                    <Box>
                      <Icon icon='mdi:circle-outline' />
                    </Box>
                    <Box>
                      <Typography fontWeight={500} color={theme => theme.customBflyColors.primaryTextContrast}>
                        Add Subtitle
                      </Typography>
                      <Typography
                        fontWeight={500}
                        fontSize={10}
                        color={theme => theme.customBflyColors.primaryTextContrast}
                      >
                        Reach a broader audience by adding subtitles on your video
                      </Typography>
                    </Box>
                  </HeaderBox>
                </AccordionSummary>
                <AccordionDetails></AccordionDetails>
              </CustomAccordion>
            </Grid>

            <Grid item xs={12} sm={4}>
              <UploadBox>
                <Box>
                  <Box
                    sx={{
                      borderRadius: '15px',
                      backgroundColor: '#C4C4C4',
                      display: 'flex',
                      padding: '.5rem',
                      gap: '1rem',
                      justifyContent: 'center',
                      textAlign: 'center',
                      minHeight: '150px',
                      alignItems: 'center'
                    }}
                  >
                    <Typography>Work</Typography>
                    <ProgressCircularWithLabel progress={Number(studioContext?.workProgress)} />
                  </Box>
                </Box>

                <Box>
                  <Box
                    sx={{
                      borderRadius: '15px',
                      backgroundColor: '#C4C4C4',
                      display: 'flex',
                      padding: '.5rem',
                      gap: '1rem',
                      justifyContent: 'center',
                      textAlign: 'center',
                      minHeight: '150px',
                      alignItems: 'center'
                    }}
                  >
                    {studioContext?.hasTrial ? (
                      <>
                        <Typography>Trial</Typography>
                        <ProgressCircularWithLabel progress={Number(studioContext?.trialProgress)} />
                      </>
                    ) : (
                      'No Trial Video Uploaded'
                    )}
                  </Box>
                </Box>
              </UploadBox>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '2rem',
                  marginTop: '2rem'
                }}
                className='buttonContainer'
              >
                {isLoading ? (
                  <CircularProgress color='success' />
                ) : (
                  <>
                    <Box>
                      <Button disabled={studioContext?.workProgress != 100 ? true : false} onClick={handleCancelButton}>
                        Back
                      </Button>
                    </Box>

                    <Box>
                      <Button
                        onClick={() => {
                          dummyNavigate()
                        }}
                        sx={{
                          bgcolor: 'primary.main',
                          color: 'common.white'
                        }}
                        color='primary'
                        variant='contained'
                      >
                        Save
                      </Button>
                    </Box>
                  </>
                )}
              </Box>
            </Grid>
          </Grid>
        </BasicCard>
      </DatePickerWrapper>
    </Box>
  )
}

export default VideoVisibility
