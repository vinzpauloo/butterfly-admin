// ** React imports
import React,{ ChangeEvent, MouseEvent, useState, SyntheticEvent } from 'react'

// ** MUI Imports 
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box, {BoxProps} from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'

// ** Layout Imports
import BasicCard from '@/layouts/components/shared-components/Card/BasicCard'
import CustomButton from '@/layouts/components/shared-components/CustomButton/CustomButton'

// ** Third Party Components
import toast from 'react-hot-toast'
import { useDropzone } from 'react-dropzone'
import * as tus from "tus-js-client";

//* Context Import
import { StudioContext } from '..'
import { DisplayPage } from '..'


// Styled components
const Img = styled('img')(({ theme }) => ({
  width: '100%',
  height:'auto',
  maxHeight: '87px',
  objectFit: 'contain'
}))

const CustomTextField = styled(TextField)(({ theme }) => ({
  backgroundColor : theme.palette.common.white,
  borderRadius: '4px',
  '& .MuiOutlinedInput-notchedOutline' : {
    display: 'none'
  }
}))

// ** Props and interfaces 
type Props = {}

// ** Constant variables
const URL : string = 'https://9e5d-122-55-235-37.jp.ngrok.io/api/videos'

const UploadVideoStep1 = (props: Props) => {

  const studioContext = React.useContext(StudioContext)

  // ** State
  const [files, setFiles] = React.useState<File[] | null>([])
  
  // ** Hooks
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      'video/*': ['.mp4','.avi']
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
    },
    onDropRejected: () => {
      toast.error('You can only upload video files.', {
        duration: 2000
      })
    }
  })

  const handleCancelButton = () => {
    studioContext?.setDisplayPage(DisplayPage.MainPage)
  }

  const askToResumeUpload = (previousUploads : tus.PreviousUpload[]) => {
    if (previousUploads.length === 0) return null;
  
    var text = "You tried to upload this file previously at these times:\n\n";
    previousUploads.forEach((previousUpload, index) => {
      text += "[" + index + "] " + previousUpload.creationTime + "\n";
    });
    text += "\nResume to continue upload or press Cancel to start a new upload";
  
    var isConfirmed : boolean  = confirm(text);

    if (isConfirmed){
      return previousUploads[0];
    } 
  }

  const handleUploadContinue = () => {
    //check required fields

    // call videos api
    if (!files) {
      return;
    }
    
    //mock data

    var file = files[0]

    console.log('file', file)

    const headerData = JSON.stringify({
      "user_id": 2,
      "title": "Testing only sample title 50 try",
      "description": "sample description 65 try",
      "orientation": "landscape",
      "video_type" : "full",
      "tags": [
        "tag1",
        "tag1"
      ],
      "has_own_trial": false,
      "full_size_bytes": 2392580019,
    })

    const upload = new tus.Upload(file, {
      endpoint: `${URL}`,
      chunkSize: 5 * 1024 * 1024,
      retryDelays: [0, 1000, 3000, 5000],
      headers : {
        data : headerData
      },
      metadata: {
        filename: file.name,
        filetype: file.type,
      },
      onError: (error) => {
        console.error('Failed because:', error);
      },
      onProgress: (bytesUploaded, bytesTotal) => {
        const progress = Math.round((bytesUploaded / bytesTotal) * 100);
        console.log('progress', progress)
      },
      onSuccess: () => {
        console.log('Upload finished:', upload.url);
      },
    });

     // Check if there are any previous uploads to continue.
     upload.findPreviousUploads().then(function (previousUploads) {

      // Found previous uploads so we select the first one. 
      var chosenUpload = askToResumeUpload(previousUploads);

      // If an upload has been chosen to be resumed, instruct the upload object to do so.
      if(chosenUpload) {
            upload.resumeFromPreviousUpload(chosenUpload);
      }

      // Start the upload
      upload.start()
    })

    //set page
    studioContext?.setDisplayPage(DisplayPage.LoadingScreen)
  }

  return (
    <>
      <BasicCard
        sx={{
          maxWidth:'85%',
          paddingTop: '0',
          '& .MuiCardContent-root' : {
            paddingTop: '1rem'
          },
        }}
      >
        <Typography 
          sx={{
            mb: ['.8rem']
          }}
          variant='h6'
          color={theme => theme.palette.common.white}
          textTransform='uppercase'>Video Details</Typography>

          <Grid container spacing={10}>
            <Grid item sm={8}>
              <form onSubmit={e => e.preventDefault()}>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <CustomTextField 
                      fullWidth 
                      placeholder='Content Creator POC' />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextField
                      fullWidth
                      placeholder='Title POC'
                      type='text'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextField
                        fullWidth
                        placeholder='Description POC'
                        type='text'
                        sx={{paddingBlock:'2em'}}
                      />
                  </Grid>
                  <Grid item xs={12}>
                    
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
                    >
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </Grid>
            <Grid item sm={4}>
            
              <Box className='uploadBoxes'>

                <Box className='uploadWorkVidBox'>

                  <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <Box 
                      sx={{ 
                        borderRadius: '15px',
                        backgroundColor: '#C4C4C4',
                        display: 'block', 
                        padding:'.5rem',
                        alignItems: 'center' }}
                        >
                      <Box 
                        sx={{ 
                          border: '1px solid #8203BD',
                          borderRadius: '15px',
                          textAlign: ['center', 'center', 'inherit'],
                          padding:'3em'
                          }}>
                          <Img src='/images/studio/butterfly_file_upload.png'  />
                          {files?.length ? (
                            <Typography textAlign='center'>1 file uploaded</Typography>
                          ) : 
                          (
                            <CustomButton 
                              sx={{ 
                              bgcolor : 'primary.main',
                              color : 'common.white'
                              }}>Upload Work Video</CustomButton>
                          )
                            
                          }
                          
                      </Box>
                    </Box>
                  </div>
    
                </Box>  

                <Box className='uploadShortVidBox'>
                  
                </Box>

              </Box>

            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12}>
              <Box 
                sx={{
                  display:'flex',
                  justifyContent:'center',
                  gap:'2rem'
                }}
                className='buttonContainer'>
                  <Box>
                    <CustomButton onClick={handleCancelButton}>Cancel</CustomButton>
                  </Box>
                  <Box>
                    <CustomButton
                      onClick={handleUploadContinue}
                      sx={{ 
                        bgcolor : 'primary.main',
                        color : 'common.white'
                      }}>
                        Continue
                      </CustomButton>
                  </Box>                 
              </Box>
            </Grid>
          </Grid>
      </BasicCard>
    </>
  )
}

export default UploadVideoStep1