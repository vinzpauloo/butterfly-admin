// ** React Imports
import React from 'react'

// ** Next Imports
import Image from 'next/image'

// ** MUI Imports
import { Dialog, DialogContent, Box, TextField, Button, DialogTitle } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

// ** Third Party Components
import { useForm, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'

// ** Style Imports

import FeedsService from '@/services/api/FeedsService'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

type Inputs = {
  title: string
  string_story: string
  tags: string
  location: string
}

const CreateFeedModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors }
  } = useForm<Inputs>()

  //use api service
  const { uploadFeed } = FeedsService()

  const handleCancel = () => {
    onClose()
  }

  const handlePublish = () => {
    console.log(getValues())

    const fd = createFormData(getValues())
    setIsLoading(true)
    uploadFeed({ formData: fd }).then(data => {
      console.log('data', data)
      toast.success('Successfully Upload Newsfeed!', {position : 'top-center'})
      onClose()
      setIsLoading(false)
    })
  }

  const createFormData = (newsfeedFormData: { [key: string]: any }) => {
    let formData = new FormData()

    //content creator ID DUMMY FOR TESTING
    formData.append('user_id', '25')

    Object.keys(newsfeedFormData).forEach(key => {
      if (key == 'tags') {
        formData.append('tags[]', newsfeedFormData[key])
      } else {
        formData.append(key, newsfeedFormData[key])
      }
    })
    return formData
  }

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth={true} maxWidth={'lg'}>
      <DialogContent sx={{ ...styles.dialogContent, bgcolor: theme => theme.customBflyColors.primary }}>
        <Box>
          <DialogTitle color={theme => theme.customBflyColors.primaryTextContrast} sx={styles.title}>
            Upload NewsFeeds
          </DialogTitle>
        </Box>
        {isLoading ? (
            <Box sx={{textAlign:'center'}}>
                <CircularProgress color='success' />
            </Box>
          
        ) : (
          <>
            <Box sx={styles.textContainer}>
              <TextField label='Title' sx={styles.fullWidth} {...register('title')} />
              <TextField
                label='Description'
                minRows={10}
                multiline={true}
                sx={styles.fullWidth}
                {...register('string_story')}
              />
              <TextField label='Location' sx={styles.fullWidth} {...register('location')} />
              <TextField label='Tagging' sx={styles.fullWidth} {...register('tags')} />
            </Box>

            <Box sx={styles.buttonContainer}>
              <Box sx={styles.button}>
                <Image src='/images/icons/upload-video.png' alt='upload video' width={100} height={100} />
                <Button sx={styles.upload}>Upload Video</Button>
              </Box>

              <Box sx={styles.button}>
                <Image src='/images/icons/upload-photo.png' alt='upload video' width={100} height={100} />
                <Button sx={styles.upload}>Upload Photo</Button>
              </Box>
            </Box>

            <Box sx={styles.bottomBtnContainer}>
              <Button onClick={handleCancel} sx={styles.bottomBtn}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  handlePublish()
                }}
                sx={styles.bottomBtn}
              >
                Publish
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
    gap: 2
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
    gap: 5,
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
