// ** React imports
import React from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Switch from '@mui/material/Switch'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Alert from '@mui/material/Alert'
import FormGroup from '@mui/material/FormGroup'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import LinearProgress from '@mui/material/LinearProgress'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

// ** Services Import
import useGroupingService from '@/services/useGroupings'
import { UserTableService } from '@/services/api/UserTableService'
import VideoService from '@/services/api/VideoService'
import { useErrorHandling } from '@/hooks/useErrorHandling'

// ** Layout Imports
import BasicCard from '@/layouts/components/shared-components/Card/BasicCard'
import CustomButton from '@/layouts/components/shared-components/CustomButton/CustomButton'
import AutoCompleteCC from '../components/AutoCompleteCC'

// ** Third Party Components
import toast from 'react-hot-toast'
import { useDropzone } from 'react-dropzone'
import * as yup from 'yup'
import { useForm, Controller, useFormContext } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useQuery } from '@tanstack/react-query'

// ** Uploady
import {
  useUploady,
  useRequestPreSend,
  useBatchAddListener,
  useAbortBatch,
  useBatchStartListener,
  useBatchProgressListener,
  useBatchFinishListener,
  UploadyContext,
  UPLOADER_EVENTS
} from '@rpldy/uploady'
import { asUploadButton } from '@rpldy/upload-button'

// ** Configs
import authConfig from 'src/configs/auth'

//* Context Import
import { StudioContext, DisplayPage } from '..'

// ** 3rd party
import Translations from '@/layouts/components/Translations'
import { useTranslation } from 'react-i18next'

// ** Auth
import { useAuth } from '@/services/useAuth'


// Styled components
const Img = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  maxHeight: '87px',
  objectFit: 'contain'
}))

const CustomTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '4px',
  '& .MuiOutlinedInput-notchedOutline': {
    display: 'none'
  }
}))

const CustomSelect = styled(Select)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '5px',
  '& .MuiSelect-select': {}
}))

const CustomStack = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '5px',
  padding: '1em',
  marginTop: '1rem',
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  gap: '.6rem'
}))

const ThumbnailBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  justifyContent: 'center',
  borderRadius: '5px',
  padding: '0',
  marginBottom: 18,
  marginInline: 'auto',
  height: '100%',
  flexDirection: 'column',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  paddingBlock: '.5rem',
  [theme.breakpoints.down('sm')]: {
    marginInline: 'auto'
  }
}))

// ** Custom Styled Uploady Button
const VideoUploady = asUploadButton((props: any) => {
  return (
    <Button
      {...props}
      sx={{
        bgcolor: 'primary.main',
        color: 'common.white',
        mt: 5,
        maxWidth: ['16rem'],
        marginInline: 'auto',
        display: 'block',
        cursor: 'pointer'
      }}
    >
      Upload Work Video!
    </Button>
  )
})

const VideoUploadyTrial = asUploadButton((props: any) => {
  return (
    <Button
      {...props}
      sx={{
        bgcolor: 'primary.main',
        color: 'common.white',
        mt: 5,
        maxWidth: ['16rem'],
        marginInline: 'auto',
        display: 'block',
        cursor: 'pointer'
      }}
    >
      Upload Trailer Video
    </Button>
  )
})

// ** Props and interfaces
type Props = {}

// ** Constant variables
const IS_SIT = process.env.NEXT_PUBLIC_APP_VARIANT === 'sit'
const baseUrl = IS_SIT ? process.env.NEXT_PUBLIC_API_BASE_URL_SIT : process.env.NEXT_PUBLIC_API_BASE_URL_LOCAL
const UploadURL: string = `${baseUrl}/videos/upload-url`

// ** Yup Schema
const schema = yup.object().shape({
  title: yup.string().required('Title is a required field.'),
  description: yup.string(),
  contentCreator: yup.string()
})
const defaultValues = {
  title: '',
  description: '',
  contentCreator: '',
  startTime: 0,
  multiTags: '',
  availableTo: 'vip',
  coinAmount : ''
}

const UploadVideoStep1 = (props: Props) => {

  // ** Contexts
  const studioContext = React.useContext(StudioContext)
  const uploadyContext = React.useContext(UploadyContext)

  // ** Translations
  const { t } = useTranslation()

  // ** Auth Hook
  const auth = useAuth()

  // ************ Uploady ****************************

  // ** Uploady Hooks
  const uploady = useUploady()
  const abortBatch = useAbortBatch()

  // ** UseEffect
  React.useEffect(() => {
    const eventBatchStart = (batch: any, options: any) => {
      if (options?.params?.video_type == 'full_video') {
        //TODO
      } // end if full video
    }

    uploadyContext.on(UPLOADER_EVENTS.BATCH_START, eventBatchStart)

    return () => {
      uploadyContext.off(UPLOADER_EVENTS.BATCH_START, eventBatchStart)
    }
  }, [uploadyContext])

  // ** Batch Progress
  const batch = useBatchProgressListener(batch => {})
  if (batch && batch.completed > studioContext!.workProgress && batch.completed < 100) {
    console.log(`batch ${batch.id} is ${batch.completed}% done and ${batch.loaded} bytes uploaded`)
  }

  useBatchAddListener((batch, options) => {
    console.log(`LISTENER batch ${batch.id} was just added with ${batch.items.length} items`)
    console.log('Start setProgress', studioContext?.workProgress)
  })

  useBatchFinishListener(batch => {
    console.log(`batch ${batch.id} finished uploading`)
    //close BD
    setOpenBD(false)

    setTimeout(() => {
      console.log('CALL SOME FINISH UPLOAD HANDLER')
    }, 500)
  })

  useBatchAddListener((batch, options) => {

    const { params } = options

    if (params?.video_type == 'full_video') {
      // let's manually check full Video has already been selected because of batch upload issues
      if (!hasFullVideo) {
        setHasFullVideo(batch.id)
      } else {
        // remove this new full video if there is already one
        abortBatch(hasFullVideo)
        setHasFullVideo(batch.id)
      }
    }

    // ** Check trial
    if (params?.video_type == 'trial_video') {
      studioContext?.setHasTrial(true)

      // let's manually check trial has already been selected because of batch upload issues
      if (!hasTrailerVideo) {
        setHasTrailerVideo(batch.id)
      } else {
        // remove this new full video if there is already one
        abortBatch(hasTrailerVideo)
        setHasTrailerVideo(batch.id)
      }
    }
  })

  /* States */
  const [trialUploadSwitch, setTrialUploadSwitch] = React.useState<boolean>(false)
  const [files, setFiles] = React.useState<File[] | null>([])
  const [hasFullVideo, setHasFullVideo] = React.useState<string | null>(null)
  const [hasTrailerVideo, setHasTrailerVideo] = React.useState<string | null>(null)
  const [thumbnailFile, setThumbnailFile] = React.useState<File[]>([])
  const [tags, setTags] = React.useState<string[]>([])
  const [groupings, setGroupings] = React.useState<[]>([])
  const [groupingsOptions, setGroupingsOptions] = React.useState<[{ title: string; _id: string }] | []>([])
  const [ccOptions, setCCOptions] = React.useState<
    | [
        {
          id: number
          role__id: number
          partner_id: number | null
          username: string
          email: string
        }
      ]
    | []
  >([])
  const [openBD, setOpenBD] = React.useState(false)

  const [ availableTo, setAvailableTo ] = React.useState<'vip' | 'coins'>('vip')

  // ** UseForm
  const {
    reset,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  // ** Context ReactHookForm
  const { register, getValues, control, watch, setValue, resetField } = useFormContext()
  console.log('watch', watch())
  // ** react query / api services
  const { getGroupings } = useGroupingService()
  const { updateVideoByWorkId } = VideoService()
  const { getAllDataFromCreator } = UserTableService()

  // ** Error Handling
  const { handleError } = useErrorHandling()

  // load groupings
  const { isLoading: isGrpLoading } = useQuery({
    queryKey: ['groupingsOptions'],
    queryFn: () => {
      return getGroupings({ data: { all: 'true' } })
    },
    onSuccess: (data: any) => {
      setGroupingsOptions(data)
    },
    onError: (e: any) => {
      handleError(e, `getGroupings() UploadVideoStep1.tsx`)
    }
  })

  // load contentCreators
  const { data: CCData, isLoading: isCCLoading } = useQuery({
    queryKey: ['ccOptions'],
    queryFn: () => {
      return getAllDataFromCreator()
    },
    onSuccess: (data: any) => {
      setCCOptions(data)
    },
    onError: (e: any) => {
      handleError(e, `getAllDataFromCreator() UploadVideoStep1.tsx`)
    }
  })

  // ** File Upload Dropzone

  const { getRootProps: thumbnailFileRootProps, getInputProps: thumbnailFileInputProps } = useDropzone({
    multiple: false,
    maxFiles: 1,
    maxSize: 41943040, //40mb
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg']
    },
    onDrop: (acceptedFiles: File[]) => {
      const thumbnailAcceptedFile = acceptedFiles.map((file: File) => Object.assign(file))
      setThumbnailFile(thumbnailAcceptedFile)
      setValue('thumbnailFile', thumbnailAcceptedFile)
    },
    onDropRejected: () => {
      toast.error('File type or size not accepted.', {
        duration: 2000
      })
    }
  })

  // ** Component Functions

  const handleCancelButton = () => {
    //clear values
    reset()

    //go Next page
    studioContext?.setDisplayPage(DisplayPage.MainPage)
  }


  const handleTagPressEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code == 'Enter' || e.code == 'Space' || e.code == 'Tab') {
      // handle add to Chip
      let tagWord = (e.target as HTMLInputElement).value as string
      console.log('@@@@@@@', watch('multiTags'))
      if (tagWord == '') {
        return
      }

      let hasDuplicate = tags?.includes(tagWord)
      if (hasDuplicate) {
        toast.error('The tag you entered already exists')
        return
      }
      let insertTagArray = [tagWord]
      let newTagsArray = [...(tags as []), ...insertTagArray]
      setTags(newTagsArray as [])
      setValue('tags', newTagsArray)

      //reset multiTags
      resetField('multiTags')
    }
  }

  //temporary trailer video function for start time
  const checkStartTimeValidity = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = event.target as HTMLInputElement

    if (Number(target.value) > 10) {
      target.value = '10'
    }
    if (Number(target.value) < 0) {
      target.value = '0'
    }

    setValue('startTime', target.value)
  }

  const handleTaggingsDelete = (tag: string) => {
    let filteredTags = tags?.filter(e => e !== tag)
    setValue('tags', filteredTags)
    setTags(filteredTags as [])
  }
  
  const handleGroupingsChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGroupings((event.target as HTMLInputElement).value as any)
  }

  const handleGroupingsDelete = (group: string) => {
    let filteredGroupings = groupings?.filter(e => e !== group)
    setGroupings(filteredGroupings as [])
  }

  const handleAvailableToOnchange = (e : any) => {
    // reset Coin Value
    e.target.value = 0
    setValue('coinAmount', '')
  }

  const handleStartUpload = () => {
    
    setContextTags()
    setContextGroups()

    // Validations
    if (auth?.user?.role == 'CC') {
    } else {

      if (!watch('contentCreator')) {
        toast.error('Content Creator is required', { position: 'top-center' })
        return
      }

      console.log('Admin is uploading')
    }

    if (watch('title')?.length < 10) {
      toast.error('Title is required and must be a minimum of 10 characters', { position: 'top-center' })
      return
    }

    if (watch('description')?.length < 10) {
      toast.error('Description is required and must be a minimum of 10 characters', { position: 'top-center' })
      return
    }

    if (!watch('thumbnailFile')) {
      toast.error('Please upload a thumbnail', { position: 'top-center' })
      return
    }

    if (!watch('tags') || !watch('tags').length) {
      toast.error('Please enter at least 1 tag', { position: 'top-center' })
      return
    }

    if (!hasFullVideo) {
      toast.error('Please upload a video', { position: 'top-center' })
      return
    }

    if( !watch('availableTo') ) {
      toast.error('Select VIP or Coins', { position: 'top-center' })
      return
    }
    // handle coin amount if coin is selected
    if ( watch() && watch('availableTo') && watch('availableTo') == 'coins' ) {
      const currentCoins = watch('coinAmount')
      if ( currentCoins <= 0 || isNaN(currentCoins) ) {
        toast.error(`Invalid coin amount`, { position: 'top-center' })
        return
      }
    }

    if( trialUploadSwitch == false ) {

       if ( watch('startTime') == '' ) {
        toast.error('Please input a trailer start time', { position: 'top-center' })
        return
       }
      
    } else {
      console.log('has Trial Upload')
    }

    

    //get fields from react hook form
    const { title, contentCreator, description } = getValues()

    // pass fields to Studio Context
    studioContext?.setTitle(title)
    studioContext?.setContentCreator(contentCreator)
    studioContext?.setDescription(description)  

    // START UPLOADING THE VIDEO THEN GO TO NEXT PAGE
    handleUploadyUpload()

    studioContext?.setDisplayPage(DisplayPage.VideoVisibility)
  }

  const handleUploadyUpload = () => {
    uploady.processPending()
  }

  const setContextTags = () => {
    studioContext?.setTags(tags as [])
  }

  const setContextGroups = () => {
    studioContext?.setGroupings(groupings as [])
  }

  const thumbImg = thumbnailFile?.map((file: { name: string; type: string; size: number }) => (
    <img
      width='100%'
      key={file.name}
      alt={file.name}
      className='single-file-image'
      src={URL.createObjectURL(file as any)}
    />
  ))

  return (
    <>
      <BasicCard
        sx={{
          maxWidth: ['100%', '85%'],
          paddingTop: '0',
          '& .MuiCardContent-root': {
            paddingTop: '1rem'
          }
        }}
      >
        <Typography
          sx={{
            mb: ['.8rem']
          }}
          variant='h6'
          color={theme => theme.customBflyColors.primaryTextContrast}
          textTransform='uppercase'
        >
          <Translations text='Video Details' />
        </Typography>

        <Grid container spacing={10}>
          <Grid item sm={8}>
            <form>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <Controller
                    name='contentCreator'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur, name } }) => (
                      <>
                        {isCCLoading && <LinearProgress sx={{ maxWidth: '100px' }} color='success' />}
                        {CCData && (
                          <AutoCompleteCC name={name} control={control} value={value} creatorsData={CCData} onChange={onChange} onBlur={onBlur} />
                        )}
                      </>
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name='title'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CustomTextField
                        fullWidth
                        id='title'
                        value={value || ''}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.title)}
                        placeholder={`${t('Title')}`}
                        type='text'
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Controller
                    name='description'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CustomTextField
                        multiline
                        rows={3}
                        fullWidth
                        placeholder={`${t('Description')}`}
                        type='text'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.title)}
                      />
                    )}
                  />
                </Grid>
                
                <Grid sx={{ display:'flex', gap : [,,'1rem'] }} item xs={12}>

                  <Controller
                    name='availableTo'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <>
                        <CustomSelect
                            displayEmpty
                            name='availableTo'
                            defaultValue='vip'
                            inputProps={{ 'aria-label': 'Without label' }}
                            id='availableTo'
                            labelId='availableTo'
                            value={value || ''}
                            onBlur={onBlur}
                            onChange={ (e) => {
                              onChange(e)
                              handleAvailableToOnchange(e)
                            }}
                            error={Boolean(errors.title)}
                          >
                            <MenuItem disabled value=''>
                              {`${t('VIP or Coins')}`}
                            </MenuItem>
                            <MenuItem value='vip'>
                              VIP
                            </MenuItem>
                            <MenuItem value='coins'>
                              Coins
                            </MenuItem>
                        </CustomSelect>
                      </>
                      )}

                  />
                  
                  {
                    // show input label if coin is selected
                    watch() && watch('availableTo') && watch('availableTo') == 'coins' && 
                    <FormControl>
                      <Controller
                        name='coinAmount'
                        control={control}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <CustomTextField
                            sx={{minWidth : '10rem'}}
                            fullWidth
                            type='number'
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            placeholder='Amount'
                            InputProps={{ inputProps: { min: 0, max: Infinity } }}
                          />
                        )}
                      />
                    </FormControl>
                  }
                  

                </Grid>

                <Grid item xs={12}>
                  <Grid container justifyContent='space-between' spacing={4} sx={{ marginBottom: 5 }}>
                    <Grid justifySelf='flex-end' item xs={12} sm={6}>
                      <div {...thumbnailFileRootProps({ className: 'dropzone' })}>
                        <input {...thumbnailFileInputProps()} />
                        <ThumbnailBox>
                          {thumbnailFile?.length ? thumbImg : <img width='48' src='/images/studio/thumbnail.png' />}

                          <Button size='small' variant='contained'>
                            {thumbnailFile?.length ? <Translations text='Change' /> : <Translations text='Upload' />}
                          </Button>
                        </ThumbnailBox>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography
                        textAlign={['center', 'left']}
                        maxWidth='23ch'
                        color={theme => theme.customBflyColors.primaryTextContrast}
                      >
                        <Translations text='THUMBNAIL' /> <br />
                      </Typography>
                      <Typography
                        textAlign={['center', 'left']}
                        fontSize={['.7rem', 13]}
                        color={theme => theme.customBflyColors.primaryTextContrast}
                      >
                        <Translations text='Select or upload thumbnail that shows what’s in your video. A good thumbnail stands out and draws viewers attention.' />
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container justifyContent='space-between' spacing={4}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <TextField
                          sx={{
                            backgroundColor: theme => theme.palette.background.paper,
                            borderRadius: '4px',
                            '& .MuiOutlinedInput-notchedOutline': {
                              display: 'none'
                            }
                          }}
                          placeholder={`${t('Type your tag then press enter')}`}
                          {...register('multiTags')}
                          onKeyDown={e => {
                            handleTagPressEnter(e)
                          }}
                        />

                        {tags?.length != 0 ? (
                          <CustomStack>
                            {tags &&
                              tags.map(tag => <Chip key={tag} label={tag} onDelete={e => handleTaggingsDelete(tag)} />)}
                          </CustomStack>
                        ) : null}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {isGrpLoading ? (
                        <LinearProgress color='success' />
                      ) : (
                        <FormControl fullWidth>
                          <InputLabel id='multiple-taggings-label'>{`${t('Select Groupings')}`}</InputLabel>
                          <CustomSelect
                            multiple
                            label='Chip'
                            value={groupings}
                            id='multiple-taggings'
                            onChange={(event, val: any) => {
                              handleGroupingsChange(event as any)
                            }}
                            labelId='multiple-taggings-label'
                          >
                            {groupingsOptions.map(tag => (
                              <MenuItem key={tag._id} value={tag.title}>
                                {tag.title}
                              </MenuItem>
                            ))}
                          </CustomSelect>

                          {groupings?.length != 0 ? (
                            <CustomStack>
                              {groupings &&
                                groupings.map(group => (
                                  <Chip key={group} label={group} onDelete={e => handleGroupingsDelete(group)} />
                                ))}
                            </CustomStack>
                          ) : null}
                        </FormControl>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      gap: 5,
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  ></Box>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <Grid pt={['0rem !important', '2.5rem']} item xs={12} sm={4}>
            <Box className='uploadBoxes'>
              <Box className='uploadWorkVidBox'>
                <div>
                  <Box
                    sx={{
                      borderRadius: '15px',
                      backgroundColor: '#C4C4C4',
                      display: 'block',
                      padding: '.5rem',
                      alignItems: 'center'
                    }}
                  >
                    <Box
                      sx={{
                        border: '1px solid #8203BD',
                        borderRadius: '15px',
                        textAlign: ['center', 'center', 'inherit'],
                        padding: '3em'
                      }}
                    >
                      {hasFullVideo ? (
                        <Typography textAlign='center'>Selected 1 file</Typography>
                      ) : (
                        <Img src='/images/studio/butterfly_file_upload.png' />
                      )}
                    </Box>
                  </Box>

                  <VideoUploady
                    clearPendingOnAdd={false}
                    autoUpload={false}
                    id='work'
                    params={{ video_type: 'full_video' }}
                  />

                  {hasFullVideo ? (
                    <Box className='uploadShortVidBox' sx={{ mt: 10 }}>
                      <Card>
                        <CardContent sx={{ paddingBlock: '1rem' }}>
                          <FormGroup sx={{ justifyContent: 'space-between', alignItems: 'center' }} row>
                            <Typography fontSize={12}>Do you want to upload your own trailer video?</Typography>
                            <Switch
                              onClick={() => {
                                setTrialUploadSwitch(!trialUploadSwitch)
                              }}
                              checked={trialUploadSwitch}
                              color='error'
                            />
                          </FormGroup>
                              
                          {!trialUploadSwitch && (
                            <FormGroup sx={{ rowGap: '1rem' }} row>
                              {errors.startTime && errors.startTime.message}
                              <TextField
                                type='number'
                                InputProps={{ inputProps: { min: 0, max: 10 } }}
                                fullWidth
                                id='start'
                                placeholder={`Start time`}
                                {...register('startTime', { 
                                  onChange : event => { checkStartTimeValidity(event) } })}
                              />
                            </FormGroup>
                          )}

                            
                          
                        </CardContent>

                        <CardActions sx={{ display: 'flex', justifyContent: 'center' }} className='card-action-dense'>
                          {trialUploadSwitch && (
                            <VideoUploadyTrial
                              clearPendingOnAdd={false}
                              autoUpload={false}
                              id='trial'
                              params={{ video_type: 'trial_video' }}
                            />
                          )}
                        </CardActions>
                      </Card>
                    </Box>
                  ) : null}
                </div>
              </Box>

            </Box>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '2rem',
                flexDirection: ['column', 'row']
              }}
              className='buttonContainer'
            >
              <Box sx={{ mt: ['1rem', 0] }}>
                <CustomButton onClick={handleCancelButton}>
                  <Translations text='Cancel' />
                </CustomButton>
              </Box>
              <Box>
                {!hasFullVideo ? (
                  <Alert severity='error'>
                    <Translations text='Select a video' />
                  </Alert>
                ) : (
                  <CustomButton
                    onClick={handleStartUpload}
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'common.white'
                    }}
                  >
                    Start Upload
                  </CustomButton>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </BasicCard>
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={openBD} onClick={() => {}}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  )
}

export default UploadVideoStep1
