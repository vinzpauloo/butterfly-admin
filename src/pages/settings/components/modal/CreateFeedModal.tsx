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
import { styles } from '../../styles/createFeedStyles'

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

export default CreateFeedModal
