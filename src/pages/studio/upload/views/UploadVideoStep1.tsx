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


interface FileProp {
  name: string
  type: string
  size: number
}
interface State {
  password: string
  showPassword: boolean
}


const UploadVideoStep1 = (props: Props) => {

  const studioContext = React.useContext(StudioContext)

  // ** State
  const [files, setFiles] = React.useState<File[]>([])

  // ** Hooks
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      'video/*': ['.mp4']
    },
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
    },
    onDropRejected: () => {
      toast.error('You can only upload 1 file.', {
        duration: 2000
      })
    }
  })

  const renderFilePreview = (file: FileProp) => {
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file as any)} />
    } else {
      console.log('file',file)
      return 'file preview'
    }
  }

  const handleRemoveFile = (file: FileProp) => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter((i: FileProp) => i.name !== file.name)
    setFiles([...filtered])
  }

  const handleCancelButton = () => {
    studioContext?.setDisplayPage(DisplayPage.MainPage)
  }

  const handleUploadContinue = () => {
    //check required fields

    // call videos api


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
                          <CustomButton 
                            sx={{ 
                              bgcolor : 'primary.main',
                              color : 'common.white'
                              }}>Upload Work Video</CustomButton>
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