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
  MenuItem
} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
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
import Dropzone from 'dropzone'

// ** APIs
import FeedsService from '@/services/api/FeedsService'
import TUSService from '@/services/api/TusService'
import { useUsersTable } from '@/services/api/useUsersTable'
import { useQuery } from '@tanstack/react-query'

import { useTranslateString } from '@/utils/TranslateString'

// ** Auth
import { useAuth } from '@/services/useAuth'
import VideoService from '@/services/api/VideoService'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
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

const CreateFeedModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const auth = useAuth()

  // useEffect(() => {
  //   if (dropzoneRef.current) {
  //     Dropzone.autoDiscover = false

  //     const myDropzone = new Dropzone(dropzoneRef.current, {
  //       url: 'http://192.168.50.9:8000/api/videos/upload?reference_media_id=9905dccc-c56a-462b-b4f4-2a7100f36b30',
  //       chunking: true,
  //       forceChunking: true,
  //       parallelChunkUploads: true,
  //       chunkSize: 5 * 1024 * 1024, // 5MB
  //       retryChunks: true,
  //       retryChunksLimit: 3,
  //       maxFilesize: 500000000, // 500MB
  //       timeout: 180000, // 3 minutes
  //       init: function () {
  //         this.on('totaluploadprogress', function (progress) {
  //           const progressBar = document.querySelector('#progress-bar .progress') as HTMLElement
  //           if (progressBar) {
  //             progressBar.style.width = progress + '%'
  //           }
  //         })

  //         this.on('sending', function (file: CustomDropzoneFile, xhr) {
  //           xhr.ontimeout = () => {
  //             let retries = file.retries || 0
  //             if (retries < 3) {
  //               setTimeout(() => {
  //                 this.processFile(file)
  //               }, 5000)
  //               retries += 1
  //               file.retries = retries
  //             } else {
  //               this._errorProcessing([file], 'Upload timeout.')
  //             }
  //           }
  //         })

  //         this.on('complete', function (file: any) {
  //           if (file.xhr.status === 200) {
  //             alert('Upload successful!')
  //           } else {
  //             alert('Upload failed!')
  //           }
  //         })
  //       }
  //     })

  //     return () => {
  //       myDropzone.destroy()
  //     }
  //   }
  // }, [])

  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [multipleImages, setMultipleImages] = React.useState<File[]>([])
  const [feedVideo, setFeedVideo] = React.useState<File[]>([])

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

  // ** References
  const videoRef = React.useRef()

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

  //upload video
  const { getRootProps: getVidRootProps, getInputProps: getVidInputProps } = useDropzone({
    multiple: false,
    accept: {
      'video/*': ['.mp4', '.avi']
    },
    onDrop: (acceptedFiles: File[]) => {
      let videoFile = acceptedFiles.map((file: File) => Object.assign(file))
      setFeedVideo(videoFile)
      setValue('video', videoFile[0])
    },
    onDropRejected: () => {
      toast.error(`You can only upload ${limitFiles} images`, {
        duration: 2000
      })
    }
  })

  //use api service
  const { uploadFeed } = FeedsService()
  const { uploadVideoURL } = VideoService()

  const handleCancel = () => {
    onClose()
  }

  const handlePublish = () => {
    let hasUserID = getValues().hasOwnProperty('user_id') // check if Operator selected a userID
    const formData = createFormData(getValues())
    const { video } = getValues()

    if (video != undefined) {
      console.log('there is a video')

      const feedHeaderData = {
        ...(hasUserID && { user_id: getValues()?.user_id }),
        video_name: video.name,
        video_type: 'feed_video'
      }

      uploadVideoURL({ formData: feedHeaderData }).then(res => {
        console.log('res', res)
        const { uploadUrl } = res

        console.log('videoRef', videoRef)

        const myDropzone = new Dropzone(videoRef.current, {
          url: uploadUrl,
          chunking: true,
          forceChunking: true,
          parallelChunkUploads: true,
          chunkSize: 5 * 1024 * 1024, // 5MB
          retryChunks: true,
          retryChunksLimit: 3,
          retryChunksInterval: 5000,
          maxFilesize: 500000000, // 500MB
          timeout: 180000, // 3 minutes
          init: function () {
            this.on('totaluploadprogress', function (progress) {
              console.log(progress + '%')
            })
            this.on('complete', function (file) {
              if (file.xhr.status === 200) {
                alert('Upload successful!')
              } else {
                alert('Upload failed!')
              }
            })
          }
        })
      }) // end uploadURL
    } else {
      // HAS NO VIDEO - continue upload Feed

      uploadFeed({ formData: formData }).then(data => {
        console.log('data', data)
        toast.success('Successfully Upload Newsfeed!', { position: 'top-center' })
        onClose()
        setIsLoading(false)
        reset()
      })
    }

    setIsLoading(true)
  }

  const createFormData = (newsfeedFormData: { [key: string]: any }) => {
    let formData = new FormData()
    // ** DUMMY VALUES
    formData.append('user_id', '25') // should be content creator ID
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

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth={true} maxWidth={'sm'}>
      <DialogContent sx={{ ...styles.dialogContent, bgcolor: theme => theme.customBflyColors.primary }}>
        <Box>
          <DialogTitle color={theme => theme.customBflyColors.primaryTextContrast} sx={styles.title}>
            {TranslateString('Upload NewsFeeds')}
          </DialogTitle>
        </Box>
        {isLoading ? (
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress color='success' />
          </Box>
        ) : (
          <>
            {auth?.user?.role != 'CC' && (
              <Box sx={{ ...styles.textContainer, marginBlock: '1rem' }}>
                {getCCsQuery.isLoading && <LinearProgress sx={{ maxWidth: '100px' }} color='success' />}
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
              </Box>
            )}

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

            <Box sx={styles.buttonContainer}>
              <div ref={videoRef} id='videodz' {...getVidRootProps({ className: 'dropzone' })}>
                <input {...getVidInputProps()} />
                <Box sx={styles.button}>
                  <Image src='/images/icons/upload-video.png' alt='upload video' width={50} height={50} />
                  <Button sx={styles.upload}>{TranslateString('Upload Video')}</Button>
                  {feedVideo.length != 0 ? <p>Selected 1 video</p> : null}
                </Box>
              </div>

              <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <Box sx={styles.button}>
                  <Image src='/images/icons/upload-photo.png' alt='upload video' width={50} height={50} />
                  <Button sx={styles.upload}>{TranslateString('Upload Photo')}</Button>
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
              <Button onClick={handleCancel} sx={styles.bottomBtn}>
                {TranslateString('Cancel')}
              </Button>
              <Button
                onClick={() => {
                  handlePublish()
                }}
                sx={styles.bottomBtn}
              >
                {TranslateString('Publish')}
              </Button>
            </Box>
          </>
        )}
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
