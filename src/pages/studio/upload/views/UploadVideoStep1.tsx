// ** React imports
import React from 'react'

// ** MUI Imports 
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'

// ** Layout Imports
import BasicCard from '@/layouts/components/shared-components/Card/BasicCard'
import CustomButton from '@/layouts/components/shared-components/CustomButton/CustomButton'

// ** Third Party Components
import toast from 'react-hot-toast'
import { useDropzone } from 'react-dropzone'
import * as tus from "tus-js-client";

//* Context Import
import { StudioContext, DisplayPage, StudioContextType, GenericDataType } from '..'

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

const CustomSelect = styled(Select)(({ theme }) => ({
  backgroundColor : theme.palette.common.white,
  borderRadius:'5px',
  '& .MuiSelect-select': {
    paddingBlock:'.5em'
  }
}))

// ** Data
export const ContentCreatorsDummy = [
  {id : 1, name : 'Ola Hansen'},
  {id : 2, name : 'Van Aja'},
  {id : 3, name : 'April Tucker'}
]

export const TaggingsDummy = [
  {id : 1, name : '#Tagging 1'},
  {id : 2, name : '#Taggings 2'},
  {id : 3, name : '#Taggings 3'},
  {id : 4, name : '#Tagging 4'},
  {id : 5, name : '#Taggings 5'},
  {id : 6, name : '#Taggings 6'},
  {id : 7, name : '#Tagging 7'},
  {id : 8, name : '#Taggings 8'},
  {id : 9, name : '#Taggings 9'}
]

export const GroupingsDummy = [
  {id : 1, name : 'Groupings 1'},
  {id : 2, name : 'Groupings 2'},
  {id : 3, name : 'Groupings 3'},
  {id : 4, name : 'Groupings 4'},
  {id : 5, name : 'Groupings 5'},
  {id : 6, name : 'Groupings 6'},
]

// ** Props and interfaces 
type Props = {}

// ** Constant variables
const URL : string = 'https://db6e-122-55-235-37.jp.ngrok.io/api/videos'

const UploadVideoStep1 = (props: Props) => {

  const studioContext = React.useContext(StudioContext)

  // ** State
  const [files, setFiles] = React.useState<File[] | null>([])
  
  // ** Hooks
  React.useEffect(() => {
    console.log('studioContext', studioContext)

    //load content creator from API
    
    //load taggings

    //load groupings

  }, [])


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
  
  // ** Functions

  const handleCancelButton = () => {
    //navigate back
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

    const headerData = JSON.stringify({
      "username": 'superbawangers',
      "title": "Testing only sample title 50 try",
      "video_type" : "full",
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

  const handleTaggingsChange = (event : React.ChangeEvent) => { 
    studioContext?.setTags(event.target.value as GenericDataType[])
  }

  const handleGroupingsChange = (event: React.ChangeEvent<{ value: unknown }>) => { 
    studioContext?.setGroupings( (event.target as HTMLInputElement).value as number )
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
                    <FormControl 
                      fullWidth>
                      <CustomSelect
                        displayEmpty 
                        inputProps={{ 'aria-label': 'Without label' }}
                        label='Select Content Creator'
                        defaultValue='' 
                        id='cc-select'
                        labelId='cc-select-label'
                        renderValue={ selected => {
                          console.log('selected', selected)
                          if ((selected as unknown as string[]).length === 0) {
                            return 'Select Content Creator'
                          }
                          return 
                        }}
                      >
                        <MenuItem disabled value=''>
                          Select Content Creator
                        </MenuItem>
                        <MenuItem value={1}>Content Creator 1</MenuItem>
                        <MenuItem value={2}>Content Creator 2</MenuItem>
                      </CustomSelect>
                  </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextField
                      fullWidth
                      placeholder='Title'
                      type='text'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextField
                        multiline 
                        rows={3}
                        fullWidth
                        placeholder='Description'
                        type='text'
                      />
                  </Grid>
                  <Grid item xs={12}>
                        
                  <Grid container justifyContent="space-between" spacing={2}>
                    <Grid item xs={6}>

                    <FormControl fullWidth>
                      <InputLabel id='multiple-taggings-label'>Select Taggings</InputLabel>
                      <CustomSelect
                        multiple
                        label='Chip'
                        value={studioContext?.tags}
                        id='multiple-taggings'
                        onChange={(event) => { handleTaggingsChange(event as React.ChangeEvent) }}
                        labelId='multiple-taggings-label'
                        renderValue={selected => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            {(selected as unknown as string[]).map(value => (
                              <Chip onDelete={()=>{console.log('delete')}} key={value} label={value} sx={{ m: 0.75 }} />
                            ))}
                          </Box>
                        )}
                      >
                        {TaggingsDummy.map(tag => (
                          <MenuItem key={tag.id} value={tag.name}>
                            {tag.name}
                          </MenuItem>
                        ))}
                      </CustomSelect>
                    </FormControl>

                    </Grid>
                    <Grid item xs={6}>
                      
                      <FormControl fullWidth>
                        <InputLabel id='multiple-taggings-label'>Select Groupings</InputLabel>
                        <CustomSelect
                          multiple
                          label='Chip'
                          value={studioContext?.groupings}
                          id='multiple-taggings'
                          onChange={(event) => { handleGroupingsChange(event as React.ChangeEvent) }}
                          labelId='multiple-taggings-label'
                          renderValue={selected => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                              {(selected as unknown as string[]).map(value => (
                                <Chip key={value} label={value} sx={{ m: 0.75 }} />
                              ))}
                            </Box>
                          )}
                        >
                          {GroupingsDummy.map(tag => (
                            <MenuItem key={tag.id} value={tag.name}>
                              {tag.name}
                            </MenuItem>
                          ))}
                        </CustomSelect>
                      </FormControl>

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