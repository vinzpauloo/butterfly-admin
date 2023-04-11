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

// ** Services Import
import useGroupingService from '@/services/useGroupings'
import { useUsersTable } from '@/services/api/useUsersTable'
import VideoService from '@/services/api/VideoService'

// ** Layout Imports
import BasicCard from '@/layouts/components/shared-components/Card/BasicCard'
import CustomButton from '@/layouts/components/shared-components/CustomButton/CustomButton'

// ** Third Party Components
import toast from 'react-hot-toast'
import { useDropzone } from 'react-dropzone'
import * as tus from 'tus-js-client'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useQuery } from '@tanstack/react-query'

// ** Configs
import authConfig from 'src/configs/auth'

//* Context Import
import { StudioContext, DisplayPage } from '..'

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
  '& .MuiSelect-select': {
  }
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
  maxWidth: '180px',
  marginInline: 'auto',
  height: '100%',
  flexDirection: 'column',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  paddingBlock: '.5rem',
  [theme.breakpoints.down('sm')]: {
    marginInline : 'auto'
  },
}))


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
  contentCreator: yup.string().required('Content creator is required')
})
const defaultValues = {
  title: '',
  description: '',
  contentCreator: '',
  startTime: '',
  multiTags: ''
}

const UploadVideoStep1 = (props: Props) => {
  /* States */
  const [trialUploadSwitch, setTrialUploadSwitch] = React.useState<boolean>(false)
  const [files, setFiles] = React.useState<File[] | null>([])
  const [trailerFile, setTrailerFile] = React.useState<File[] | null>([])
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

  const studioContext = React.useContext(StudioContext)

  const accessToken = window.localStorage.getItem(authConfig.storageTokenKeyName)

  // ** UseForm
  const {
    reset,
    resetField,
    control,
    watch,
    getValues,
    setValue,
    register,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  // ** react query / api services
  const { getGroupings } = useGroupingService()
  const { updateVideoByWorkId } = VideoService()
  const { getAllDataFromCreator } = useUsersTable()

  // load groupings
  const { isLoading: isGrpLoading } = useQuery({
    queryKey: ['groupingsOptions'],
    queryFn: () => {
      return getGroupings({ data: { all: 'true' } })
    },
    onSuccess: (data: any) => {
      setGroupingsOptions(data)
    }
  })

  // load contentCreators
  const { isLoading: isCCLoading } = useQuery({
    queryKey: ['ccOptions'],
    queryFn: () => {
      return getAllDataFromCreator()
    },
    onSuccess: (data: any) => {
      setCCOptions(data.data)
    }
  })

  // ** File Upload Dropzone
  const { getRootProps: mainFileRootProps, getInputProps: mainFileInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      'video/*': ['.mp4', '.avi']
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))

      if (!getValues().title) {
        studioContext?.setTitle(acceptedFiles[0].name)
        setValue('title', acceptedFiles[0].name)
      }
    },
    onDropRejected: () => {
      toast.error('You can only upload video files.', {
        duration: 2000
      })
    }
  })

  const { getRootProps: trailerFileRootProps, getInputProps: trailerFileInputProps } = useDropzone({
    maxFiles: 1,
    maxSize: 41943040, //40mb
    accept: {
      'video/*': ['.mp4', '.avi']
    },
    onDrop: (acceptedFiles: File[]) => {
      setTrailerFile(acceptedFiles.map((file: File) => Object.assign(file)))
      studioContext?.setHasTrial(true)
    },
    onDropRejected: () => {
      toast.error('File size is too large.', {
        duration: 2000
      })
    }
  })

  const { getRootProps: thumbnailFileRootProps, getInputProps: thumbnailFileInputProps } = useDropzone({
    multiple: false,
    maxFiles: 1,
    maxSize: 41943040, //40mb
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg']
    },
    onDrop: (acceptedFiles: File[]) => {
      setThumbnailFile(acceptedFiles.map((file: File) => Object.assign(file)))
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
    if (e.code == 'Enter') {
      // handle add to Chip
      let tagWord = (e.target as HTMLInputElement).value as string

      if ( tagWord == '' ) {
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

      //reset multiTags
      resetField('multiTags')
    }
  }

  const askToResumeUpload = (previousUploads: tus.PreviousUpload[]) => {
    if (previousUploads.length === 0) return null

    var text = 'You tried to upload this file previously at these times:\n\n'
    previousUploads.forEach((previousUpload, index) => {
      text += '[' + index + '] ' + previousUpload.creationTime + '\n'
    })
    text += '\nResume to continue upload or press Cancel to start a new upload'

    var isConfirmed: boolean = confirm(text)

    if (isConfirmed) {
      return previousUploads[0]
    }
  }
  const handleUpload = () => {
    // call videos api
    if (!files) {
      return
    }

    var file = files[0]

    //get fields from react hook form
    const { title, contentCreator } = getValues()
    console.log('groupings', groupings)

    const upload = new tus.Upload(file, {
      endpoint: `${UploadURL}`,
      chunkSize: 5 * 1024 * 1024,
      retryDelays: [0, 1000, 3000, 5000],
      metadata: {
        filename: file.name,
        filetype: file.type,
        user_id: contentCreator,
        file_name: title,
        video_type: 'full_video',
        authorization: `${accessToken}`
      },
      removeFingerprintOnSuccess: true, // fingerprint in the URL storage will be removed
      onError: error => {
        console.error('Failed because:', error)
      },
      onProgress: (bytesUploaded, bytesTotal) => {
        const progress = Math.round((bytesUploaded / bytesTotal) * 100)
        //console.log('progress', progress)
        studioContext?.setWorkProgress(progress)
      },
      onSuccess: () => {
        console.log('Full Video Upload finished:', upload.url)
      },
      onAfterResponse: (req, res) => {
        let xmlhttpreq = req.getUnderlyingObject()

        if (xmlhttpreq.getAllResponseHeaders().indexOf('work_id') != -1) {
          studioContext?.setDisplayPage(DisplayPage.VideoVisibility)

          let hasTrialCheck = false
          let data = JSON.parse(res.getHeader('works'))
          console.log('data from trial video header', data)
          const { work_id } = data.data
          studioContext?.setWorkId(work_id)

          if (studioContext?.hasTrial) {
            //start upload another TUS trial video
            console.log('hasTrial')
            hasTrialCheck = true

            // call trial videos api
            if (!trailerFile) {
              console.log('trailerFile', trailerFile)
              return
            }

            var tFile = trailerFile[0]

            const uploadTrial = new tus.Upload(file, {
              endpoint: `${UploadURL}`,
              chunkSize: 5 * 1024 * 1024,
              retryDelays: [0, 1000, 3000, 5000],

              metadata: {
                filename: tFile.name,
                filetype: tFile.type,
                user_id: contentCreator,
                file_name: title,
                video_type: 'trial_video',
                work_id: work_id,
                authorization: `${accessToken}`
              },
              removeFingerprintOnSuccess: true, // fingerprint in the URL storage will be removed
              onError: error => {
                console.error('Trial Failed because:', error)
              },
              onProgress: (bytesUploaded, bytesTotal) => {
                const progress = Math.round((bytesUploaded / bytesTotal) * 100)
                //console.log('Trial progress', progress)
                studioContext?.setTrialProgress(progress)
              },
              onSuccess: () => {
                console.log('Trial Upload finished:', uploadTrial.url)
              },
              onAfterResponse: (req, res) => {
                console.log('response in TRIAL', res)
              }
            })

            // Start the trial upload
            uploadTrial.start()
          } else {
            console.log('no trial')
            hasTrialCheck = false
          }

          //form update
          updateVideoByWorkId({ formData: handleFormData(res, hasTrialCheck) })
        } // End if check workID has been returned after uploading work video
      }
    })

    //handle form Update data
    const handleFormData = (res: tus.HttpResponse, hasTrialCheck: boolean): FormData => {
      let trial_upload_url = ''
      if (res.getHeader('location')) {
        trial_upload_url = res.getHeader('location')
      }

      let data = JSON.parse(res.getHeader('works'))
      console.log('data', data)
      const { work_id } = data.data

      // ** Update the table with the work_id -- Refactor this formData values
      console.log('getValues', getValues())

      const { title, description, startTime } = getValues()

      const formData = new FormData()

      formData.append('work_id', work_id)
      formData.append('title', title)
      formData.append('description', description)
      formData.append('orientation', 'landscape') // HardCoded
      formData.append('startTimeSeconds', startTime)
      formData.append('_method', 'put')

      if (thumbnailFile?.length) {
        formData.append('thumbnail', thumbnailFile[0])
      }
      formData.append('has_own_trial', hasTrialCheck ? 'true' : 'false')

      if (tags.length) {
        tags.map(tag => formData.append('tags[]', tag))
      }
      if (groupings.length) {
        groupings.map(group => formData.append('groups[]', group))
      }

      return formData
    }

    // Check if there are any previous uploads to continue.
    upload.findPreviousUploads().then(function (previousUploads) {
      // Found previous uploads so we select the first one.
      var chosenUpload = askToResumeUpload(previousUploads)

      // If an upload has been chosen to be resumed, instruct the upload object to do so.
      if (chosenUpload) {
        upload.resumeFromPreviousUpload(chosenUpload)
      }

      // Start the upload
      studioContext?.setDisplayPage(DisplayPage.LoadingScreen)
      upload.start()
    })
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
    setTags(filteredTags as [])
  }
  const handleGroupingsChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGroupings((event.target as HTMLInputElement).value as any)
  }
  const handleGroupingsDelete = (group: string) => {
    let filteredGroupings = groupings?.filter(e => e !== group)
    setGroupings(filteredGroupings as [])
  }
  const dummyNavigate = () => {
    setContextTags()
    setContextGroups()

    // Validations
    if (!watch('contentCreator')) {
      toast.error('Content Creator is required', { position: 'top-center' })
      return
    }
    if (!watch('title')) {
      toast.error('Title is required', { position: 'top-center' })
      return
    }
    if (!files?.length) {
      toast.error('Please upload a video', { position: 'top-center' })
      return
    }

    //get fields from react hook form
    const { title, contentCreator, description } = getValues()

    // pass fields to Studio Context
    studioContext?.setTitle(title)
    studioContext?.setContentCreator(contentCreator)
    studioContext?.setDescription(description)

    //TUS Upload
    handleUpload()
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
          maxWidth: ['100%','85%'],
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
          Video Details
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
                    render={({ field: { value, onChange, onBlur } }) => (
                      <>
                        {isCCLoading ? (
                          <LinearProgress sx={{ maxWidth: '100px' }} color='success' />
                        ) : (
                          <CustomSelect
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            label='Select Content Creator'
                            defaultValue=''
                            id='contentCreator'
                            labelId='cc-select-label'
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            error={Boolean(errors.title)}
                          >
                            <MenuItem disabled value=''>
                              Select Content Creator
                            </MenuItem>
                            {ccOptions.map(cc => (
                              <MenuItem key={cc.id} value={cc.id}>
                                {cc.username}
                              </MenuItem>
                            ))}
                          </CustomSelect>
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
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.title)}
                        placeholder='Title'
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
                        placeholder='Description'
                        type='text'
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.title)}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid container justifyContent='space-between' spacing={4} sx={{ marginBottom: 5 }}>
                    <Grid justifySelf='flex-end' item xs={12} sm={6}>
                      <div {...thumbnailFileRootProps({ className: 'dropzone' })}>
                        <input {...thumbnailFileInputProps()} />
                        <ThumbnailBox>
                          {thumbnailFile?.length ? thumbImg : <img width='48' src='/images/studio/thumbnail.png' />}

                          <Button size='small' variant='contained'>
                            {thumbnailFile?.length ? 'Change' : 'Upload'}
                          </Button>
                        </ThumbnailBox>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography textAlign={['center','left']} maxWidth='23ch' color={theme => theme.customBflyColors.primaryTextContrast}>
                        THUMBNAIL <br />
                      </Typography>
                      <Typography textAlign={['center','left']} fontSize={['.7rem',13]} color={ theme => theme.customBflyColors.primaryTextContrast }>
                        Select or upload thumbnail that shows what’s in your video. A good thumbnail stands out and
                        draws viewers attention.
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
                              display: 'none',
                            }
                          }}
                          placeholder='Type your tag then press enter'
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
                          <InputLabel id='multiple-taggings-label'>Select Groupings</InputLabel>
                          <CustomSelect
                            multiple
                            label='Chip'
                            value={groupings}
                            id='multiple-taggings'
                            onChange={(event, val : any) => {
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
          <Grid pt={['0rem !important','2.5rem']} item xs={12} sm={4}>
            <Box className='uploadBoxes'>
              <Box className='uploadWorkVidBox'>
                <div {...mainFileRootProps({ className: 'dropzone' })}>
                  <input {...mainFileInputProps()} />
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
                      {files?.length ? (
                        <Typography textAlign='center'>Selected 1 file</Typography>
                      ) : (
                        <Img src='/images/studio/butterfly_file_upload.png' />
                      )}
                    </Box>
                  </Box>
                  <CustomButton
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'common.white',
                      mt: 5,
                      maxWidth: ['16rem'],
                      marginInline: 'auto',
                      display: 'block'
                    }}
                  >
                    Upload Work Video
                  </CustomButton>
                </div>
              </Box>

              {files?.length ? (
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
                          <TextField
                            onChange={event => {
                              checkStartTimeValidity(event)
                            }}
                            type='number'
                            InputProps={{ inputProps: { min: 0, max: 10 } }}
                            fullWidth
                            id='start'
                            placeholder='Start time'
                          />
                        </FormGroup>
                      )}
                    </CardContent>
                    <CardActions sx={{ display: 'flex', justifyContent: 'center' }} className='card-action-dense'>
                      {trialUploadSwitch && (
                        <div {...trailerFileRootProps({ className: 'dropzone' })}>
                          <input {...trailerFileInputProps()} />
                          <Button variant='contained'>
                            {trailerFile?.length ? 'Selected 1 file' : 'Upload Trailer Video'}
                          </Button>
                        </div>
                      )}
                    </CardActions>
                  </Card>
                </Box>
              ) : null}
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
                flexDirection : ['column','row']
              }}
              className='buttonContainer'
            >
              <Box sx={{ mt : ['1rem',0] }}>
                <CustomButton onClick={handleCancelButton}>Cancel</CustomButton>
              </Box>
              <Box>
                {!files?.length ? (
                  <Alert severity='error'>Select a video</Alert>
                ) : (
                  <CustomButton
                    onClick={dummyNavigate}
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
    </>
  )
}

export default UploadVideoStep1
