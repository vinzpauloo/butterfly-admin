// ** React Imports
import React from 'react'

// ** Next Imports
import Image from 'next/image'

// ** MUI Imports
import {
  Dialog,
  DialogContent,
  Box,
  TextField,
  Button,
  DialogTitle,
  LinearProgress,
  Select,
  MenuItem,
  Skeleton
} from '@mui/material'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Components
import { useForm, Controller } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDropzone } from 'react-dropzone'

// ** APIs
import FeedsService from '@/services/api/FeedsService'
import { useUsersTable } from '@/services/api/useUsersTable'
import { useQuery } from '@tanstack/react-query'

import { useTranslateString } from '@/utils/TranslateString'

// ** Auth
import { useAuth } from '@/services/useAuth'
import VideoService from '@/services/api/VideoService'

// ** Uploady
import { useUploady, useItemProgressListener, useItemStartListener, useItemFinishListener } from '@rpldy/uploady'
import { asUploadButton } from '@rpldy/upload-button'
import { StudioContextType } from '@/pages/studio/upload'

// ** Base Links
import { STREAMING_SERVER_URL } from '@/lib/baseUrls'

// Reuse
import ProgressCircularWithLabel from '@/layouts/components/shared-components/ProgressCircular'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  context?: StudioContextType | null
}

type Inputs = {
  string_story: string
  tags: string
  'images[]'?: any
  video: any
  user_id?: string
}

//maximum Images that can be uploaded
const limitFiles = 9

// ** Styled components
const CustomSelect = styled(Select)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '5px',
  '& .MuiSelect-select': {}
}))

// ** Custom Upload Button Component
const UploadVideoButton = asUploadButton(
  React.forwardRef((props, ref) => (
    <Box {...props} sx={styles.button}>
      <Image src='/images/icons/upload-video.png' alt='upload video' width={50} height={50} />
      <Button sx={styles.upload}>Upload Video</Button>
    </Box>
  ))
)

const CreateFeedModal: React.FC<ModalProps> = ({ isOpen, onClose, context }) => {
  const auth = useAuth()

  // ** STATES
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [multipleImages, setMultipleImages] = React.useState<File[]>([])
  const [feedVideo, setFeedVideo] = React.useState<File[]>([])
  const [videoUploading, setVideoUploading] = React.useState<boolean>(false)

  // ** Uploady PROGRESS
  const [progress, setProgess] = React.useState<number>(0)

  const progressData = useItemProgressListener()

  if (progressData && progressData.completed > progress) {
    setProgess(() => progressData.completed)
  }

  useItemStartListener(item => {
    setVideoUploading(true)
  })

  useItemFinishListener(item => {
    setProgess(0)
    console.log(`item ${item.id} finished uploading, response was: `, item.uploadResponse, item.uploadStatus)
    reset({
      string_story: '',
      tags: ''
    })
    toast.success('Successfully Upload Newsfeed with Video!', { position: 'top-center' })
    setVideoUploading(false)

    setTimeout(() => {
      setIsLoading(false)
      onClose()
    }, 1500)
  })

  // ** APIs and Tanstacks
  const { getAllDataFromCreator } = useUsersTable()

  const getCCsQuery = useQuery({
    queryKey: ['ccOptions'],
    queryFn: () => getAllDataFromCreator()
  })

  // ** Hooks
  const {
    register,
    getValues,
    setValue,
    reset,
    control,
    formState: { errors }
  } = useForm<Inputs>()

  // ** React-Dropzone Image
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 9,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: (acceptedFiles: File[]) => {
      let imageFiles = acceptedFiles.map((file: File) => Object.assign(file))
      setMultipleImages(acceptedFiles.map((file: File) => Object.assign(file)))
      setValue('images[]', imageFiles)
    },
    onDropRejected: () => {
      toast.error(`You can only upload ${limitFiles} images`, {
        duration: 2000
      })
    }
  })

  // ** React-Dropzone Video

  // ** Use api service
  const { uploadFeed } = FeedsService()
  const { uploadVideoURL } = VideoService()

  const handleCancel = () => {
    onClose()
  }

  const handlePublish = async () => {
    setIsLoading(true)

    let hasUserID = getValues().hasOwnProperty('user_id') // check if Operator selected a userID
    const formData = createFormData(getValues())
    const hasVideoFile = uploady.getInternalFileInput()?.current?.value == '' ? false : true

    if (hasVideoFile) {
      console.log('there is a video')

      let videoName = ''

      // CORRECT THIS TYPESCRIPT NULL
      if (uploady.getInternalFileInput()?.current == null || uploady.getInternalFileInput()?.current == undefined) {
        videoName = ''
      } else {
        // @ts-ignore: Object is possibly 'null'.
        videoName = uploady.getInternalFileInput()?.current?.files[0].name
      }

      const feedHeaderData = {
        ...(hasUserID && { user_id: getValues()?.user_id }),
        video_name: videoName,
        video_type: 'feed_video'
      }
      uploadVideoURL({ formData: feedHeaderData }).then(res => {
        const { uploadUrl } = res
        const { feed_id } = res

        //feedid
        formData.append('feed_id', feed_id)

        // Choose PION upload
        context?.setUploadURL(STREAMING_SERVER_URL + uploadUrl)

        // need to refactor this to wait for both upload to end
        // upload the Feed With Video
        uploadFeed({ formData: formData }).then(data => {
          console.log('data from with video', data)

          uploady.processPending({
            destination: {
              url: STREAMING_SERVER_URL + uploadUrl
            }
          })
        })
      })
    } else {
      // HAS NO VIDEO - continue upload Feed

      uploadFeed({ formData: formData }).then(data => {
        console.log('data', data)
        toast.success('Successfully Upload Newsfeed!', { position: 'top-center' })
        onClose()
        // TURN OF LOADING
        setIsLoading(false)
        reset()
      })
    }
  }

  const createFormData = (newsfeedFormData: { [key: string]: any }) => {
    let formData = new FormData()
    // ** DUMMY VALUES
    formData.append('is_Service', 'true')

    Object.keys(newsfeedFormData).forEach(key => {
      //check if data has photo
      if (key == 'images') {
        newsfeedFormData[key].map((img: any) => {
          formData.append('images[]', img)
        })
      }
      if (key == 'tags') {
        formData.append('tags[]', newsfeedFormData[key])
      } else {
        formData.append(key, newsfeedFormData[key])
      }
    })
    return formData
  }

  const renderFilePreview = (file: any) => {
    if (file.type.startsWith('image')) {
      return <img width={80} height={85} alt={file.name} src={URL.createObjectURL(file as any)} />
    } else {
      return <Icon icon='mdi:file-document-outline' />
    }
  }

  const handleRemoveFile = (file: any) => {
    const uploadedFiles = multipleImages
    const filtered = uploadedFiles.filter((i: any) => i.name !== file.name)
    setMultipleImages([...filtered])
    let currentImages = [...filtered]
    if (!currentImages.length) {
      console.log('no images')
      setValue('images[]', null)
    } else {
      setValue('images[]', [...filtered])
    }
  }

  const handleRemoveAllFiles = () => {
    setMultipleImages([])
  }

  const fileList = multipleImages.map((file: any) => (
    <ListItem key={file.name} sx={{ position: 'relative' }}>
      <Box className='file-details'>
        <div className='file-preview'>{renderFilePreview(file)}</div>
      </Box>
      <IconButton
        onClick={() => handleRemoveFile(file)}
        sx={{ position: 'absolute', top: 0, right: 0, backgroundColor: 'rgba(231, 227, 252, 0.09)' }}
      >
        <Icon icon='mdi:close' fontSize={20} />
      </IconButton>
    </ListItem>
  ))

  const TranslateString = useTranslateString()

  // ** Uploady
  const uploady = useUploady()

  const uploadyStartUpload = () => {
    let pendingFiles = uploady.getInternalFileInput()?.current?.files
    if (!pendingFiles) {
      console.log('NO FILE YET')
      return
    }
    //start upload
    uploady.processPending()
  }

  return (
    <Dialog open={isOpen} fullWidth={true} maxWidth={'sm'}>
      <DialogContent sx={{ ...styles.dialogContent, bgcolor: theme => theme.customBflyColors.primary }}>
        <Box>
          <DialogTitle color={theme => theme.customBflyColors.primaryTextContrast} sx={styles.title}>
            {TranslateString('Upload NewsFeeds')}
          </DialogTitle>
        </Box>

        <>
          {auth?.user?.role != 'CC' && (
            <Box sx={{ ...styles.textContainer, marginBlock: '1rem' }}>
              {getCCsQuery.isLoading && <LinearProgress sx={{ maxWidth: '100px' }} color='success' />}

              {!isLoading && (
                <Controller
                  name='user_id'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <>
                      {getCCsQuery?.isLoading && <LinearProgress sx={{ maxWidth: '100px' }} color='success' />}
                      {getCCsQuery?.data && (
                        <CustomSelect
                          displayEmpty
                          inputProps={{ 'aria-label': 'Without label' }}
                          defaultValue=''
                          id='contentCreator'
                          labelId='cc-select-label'
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          error={Boolean(errors.user_id)}
                        >
                          <MenuItem disabled value=''>
                            Select Content Creator
                          </MenuItem>
                          {getCCsQuery?.data &&
                            getCCsQuery?.data.map((cc: any) => (
                              <MenuItem key={cc.id} value={cc.id}>
                                {cc.username}
                              </MenuItem>
                            ))}
                        </CustomSelect>
                      )}
                    </>
                  )}
                />
              )}
            </Box>
          )}

          {isLoading ? (
            <Box sx={{ gap: '1rem', display: 'flex', flexDirection: 'column' }}>
              <Skeleton
                sx={{ backgroundColor: theme => theme.palette.background.paper }}
                variant='rectangular'
                width='100%'
                height={50}
              />
              <Skeleton
                sx={{ backgroundColor: theme => theme.palette.background.paper }}
                variant='rectangular'
                width='100%'
                height={50}
              />
            </Box>
          ) : (
            <Box sx={styles.textContainer}>
              <TextField
                label={TranslateString('Story')}
                minRows={10}
                multiline={true}
                sx={{
                  ...styles.fullWidth,
                  backgroundColor: theme => theme.palette.background.paper,
                  borderRadius: '8px'
                }}
                {...register('string_story')}
              />
              <TextField
                label={TranslateString('Tags')}
                sx={{
                  ...styles.fullWidth,
                  backgroundColor: theme => theme.palette.background.paper,
                  borderRadius: '8px'
                }}
                {...register('tags')}
              />
            </Box>
          )}

          <Box sx={styles.buttonContainer}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 3 }}>
              {!videoUploading ? (
                <UploadVideoButton />
              ) : (
                <Box sx={{ textAlign: 'center', minWidth: '145px' }}>
                  <ProgressCircularWithLabel progress={progress} />
                </Box>
              )}
            </Box>

            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              <Box sx={styles.button}>
                <Image src='/images/icons/upload-photo.png' alt='upload video' width={50} height={50} />
                <Button disabled={isLoading ? true : false} sx={styles.upload}>
                  {TranslateString('Upload Photo')}
                </Button>
              </Box>
            </div>

            <Box>
              {multipleImages.length ? (
                <>
                  <List sx={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', padding: 0 }}>{fileList}</List>
                  <div className='buttons' style={{ textAlign: 'center' }}>
                    <Button
                      sx={{ marginInline: 'auto' }}
                      color='error'
                      variant='outlined'
                      onClick={handleRemoveAllFiles}
                    >
                      {TranslateString('Remove All')}
                    </Button>
                  </div>
                </>
              ) : null}
            </Box>
          </Box>

          <Box sx={styles.bottomBtnContainer}>
            <Button disabled={isLoading ? true : false} onClick={handleCancel} sx={styles.bottomBtn}>
              {TranslateString('Cancel')}
            </Button>
            <Button
              disabled={isLoading ? true : false}
              onClick={() => {
                handlePublish()
              }}
              sx={styles.bottomBtn}
            >
              {TranslateString('Publish')}
            </Button>
          </Box>
        </>
      </DialogContent>
    </Dialog>
  )
}

const styles = {
  dialogContent: {
    padding: 10
  },
  title: {
    padding: 0,
    margin: 0,
    textTransform: 'uppercase',
    mb: 5,
    textAlign: {
      xs: 'center',
      sm: 'center',
      md: 'left',
      lg: 'left'
    }
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10
  },
  fullWidth: {
    width: '100%'
  },
  buttonContainer: {
    display: 'flex',
    padding: 5,
    gap: 10,
    justifyContent: {
      xs: 'center',
      sm: 'flex-start',
      md: 'flex-start',
      lg: 'flex-start'
    },
    flexDirection: {
      xs: 'column',
      sm: 'row',
      lg: 'row'
    }
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 5
  },
  upload: {
    backgroundColor: '#FFF',
    color: '#000',
    textTransform: 'uppercase',
    borderRadius: '20px',
    fontSize: 11,
    width: 145,
    height: 25
  },
  bottomBtnContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: {
      xs: 3,
      md: 4,
      lg: 15
    },
    mt: 10
  },
  bottomBtn: {
    backgroundColor: '#FFF',
    color: '#000',
    textTransform: 'uppercase',
    borderRadius: '20px',
    fontSize: 11,
    width: 125,
    height: 35
  }
}

export default CreateFeedModal
