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
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert'
import FormGroup from '@mui/material/FormGroup'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

// ** Icon Imports

import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'

// ** Layout Imports
import BasicCard from '@/layouts/components/shared-components/Card/BasicCard'
import CustomButton from '@/layouts/components/shared-components/CustomButton/CustomButton'

// ** Third Party Components
import toast from 'react-hot-toast'
import { useDropzone } from 'react-dropzone'
import * as tus from "tus-js-client";
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

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
  backgroundColor : theme.palette.background.paper,
  borderRadius: '4px',
  '& .MuiOutlinedInput-notchedOutline' : {
    display: 'none'
  }
}))

const CustomSelect = styled(Select)(({ theme }) => ({
  backgroundColor : theme.palette.background.paper,
  borderRadius:'5px',
  '& .MuiSelect-select': {
    paddingBlock:'.5em'
  }
}))

const CustomStack = styled(Stack)(({ theme }) => ({
  backgroundColor : theme.palette.common.white,
  borderRadius:'5px',
  padding:'1em',
  marginTop: '1rem',
  display:'flex',
  flexWrap:'wrap',
  flexDirection:'row',
  justifyContent: 'flex-start',
  gap:'.6rem'

}))

const ThumbnailBox = styled(Box)(({ theme }) => ({
  backgroundColor : theme.palette.common.white,
  justifyContent:'center',
  borderRadius:'5px',
  padding:'0',
  marginBottom: 18,
  maxWidth: '180px',
  marginLeft:'auto',
  height: '100%',
  flexDirection: 'column',
  display:'flex',
  alignItems:'center',
  gap:'1rem'
}))

// ** Data
import { ContentCreatorsDummy, TaggingsDummy, GroupingsDummy } from '@/data/uploadVideoData'

// ** Props and interfaces 
type Props = {}

// ** Constant variables
const URL : string = `${process.env.NEXT_PUBLIC_BASE_URL}/videos/upload-url`

// ** Yup Schema
const schema = yup.object().shape({
  title: yup.string().required('Title is a required field.'),
  description: yup.string(),
  contentCreator : yup.string().required('Content creator is required')
  
})
const defaultValues = {
  title: '',
  description : '',
  contentCreator: '',
}

const UploadVideoStep1 = (props: Props) => {
  
  const studioContext = React.useContext(StudioContext)

  // ** UseForm
  const {
    control,
    watch,
    getValues,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  // ** State
  const [files, setFiles] = React.useState<File[] | null>([])
  const [tags, setTags] =  React.useState<[] | null>([])
  const [groupings, setGroupings] =  React.useState<[] | null>([])

  // ** Fields States
  const [ title, setTitle ] = React.useState<string>('')
  
  // ** Hooks
  React.useEffect(() => {

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
      setValue('title', acceptedFiles[0].name)
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
  const handleTaggingsChange = (event : React.ChangeEvent, child : { props : { children : string, value : number } }) => { 
    setTags( (event.target as HTMLInputElement).value as any )
  }
  const handleTaggingsDelete = (tag : string) => {
    let filteredTags = tags?.filter(e => e !== tag)
    setTags(filteredTags as [])
  }
  const handleGroupingsChange = (event: React.ChangeEvent<{ value: unknown }>) => { 
    setGroupings( (event.target as HTMLInputElement).value as any )
  }
  const handleGroupingsDelete = (group : string) => {
    let filteredGroupings = groupings?.filter(e => e !== group)
    setGroupings(filteredGroupings as [])
  }
  const dummyNavigate = () => {
    
    setContextTags()
    setContextGroups()

    if( !watch('contentCreator') ) {
      toast.error("Content Creator is required", {position: 'top-center'})
      return
    }
    if( !watch('title') ) {
      toast.error("Title is required", {position: 'top-center'})
      return
    }
    if(!files?.length) {
      toast.error("Please upload a video", {position: 'top-center'})
      return
    }

    //get fields from react hook form
    const { title, contentCreator, description} = getValues()

    // pass fields to Studio Context
    studioContext?.setTitle(title)
    studioContext?.setContentCreator(Number(contentCreator))
    studioContext?.setDescription(description)
    
    studioContext?.setDisplayPage(DisplayPage.VideoVisibility)
  }
  const setContextTags = () => {
    studioContext?.setTags( tags as [] )
  }
  const setContextGroups = () => {
    studioContext?.setGroupings( groupings as [] )
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
          color={theme => theme.customBflyColors.primaryTextContrast}
          textTransform='uppercase'>Video Details</Typography>

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
                          <MenuItem value={1}>Content Creator 1</MenuItem>
                          <MenuItem value={2}>Content Creator 2</MenuItem>
                        </CustomSelect>
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

                  <Grid container justifyContent="space-between" spacing={4} sx={{marginBottom:5}}>
                    <Grid justifySelf='flex-end' item xs={6}>
                         <ThumbnailBox>
                            <img width='48' src="/images/studio/thumbnail.png" />
                            <Button size='small' variant='contained'>Upload</Button>
                         </ThumbnailBox>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography maxWidth='23ch' color={theme => theme.palette.common.white}>
                        THUMBNAIL <br /></Typography>
                        <Typography fontSize={13} color={theme => theme.palette.common.white}>Select or upload thumbnail that shows what’s in your video. A good thumbnail stands out and draws viewers attention.</Typography>  
                    </Grid>
                  </Grid>
                        
                  <Grid container justifyContent="space-between" spacing={4}>
                    <Grid item xs={6}>

                    <FormControl fullWidth>
                      <InputLabel id='multiple-taggings-label'>Select Taggings</InputLabel>
                      <CustomSelect
                        multiple
                        label='Chip'
                        value={tags}
                        id='multiple-taggings'
                        onChange={(event, child) => { handleTaggingsChange(event as React.ChangeEvent, child as any) }}
                        labelId='multiple-taggings-label'
                      >
                        {TaggingsDummy.map(tag => (
                          <MenuItem key={tag.id} value={tag.name}>
                            {tag.name}
                          </MenuItem>
                        ))}
                      </CustomSelect>
                      
                      {
                        (tags?.length != 0) ? 
                        <CustomStack>
                          {
                            tags && tags.map( tag => <Chip key={tag} label={tag} onDelete={ (e) => handleTaggingsDelete(tag)  } /> )
                          }
                        </CustomStack>
                        : null
                      }
                      
                    </FormControl>

                    </Grid>
                    <Grid item xs={6}>
                      
                      <FormControl fullWidth>
                        <InputLabel id='multiple-taggings-label'>Select Groupings</InputLabel>
                        <CustomSelect
                          multiple
                          label='Chip'
                          value={groupings}
                          id='multiple-taggings'
                          onChange={(event) => { handleGroupingsChange(event as any) }}
                          labelId='multiple-taggings-label'
                        >
                          {GroupingsDummy.map(tag => (
                            <MenuItem key={tag.id} value={tag.name}>
                              {tag.name}
                            </MenuItem>
                          ))}
                        </CustomSelect>

                        {
                        (groupings?.length != 0) ? 
                        <CustomStack>
                          {
                            groupings && groupings.map( group => <Chip key={group} label={group} onDelete={ (e) => handleGroupingsDelete(group)  } /> )
                          }
                        </CustomStack>
                        : null
                      }
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
                            <Typography textAlign='center'>{ files[0].name } file uploaded</Typography>
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
                
                {files?.length ? (
                <Box className='uploadShortVidBox' sx={{mt:10}}>
                  <Card>
                    <CardContent>
                      <FormGroup sx={{ justifyContent:'space-between', alignItems:'center'}} row>
                        <Typography fontSize={12}>Upload trial video is optional</Typography>
                        <Switch color='error' defaultChecked />
                      </FormGroup>
                      <FormGroup sx={{rowGap:'1rem'}} row>
                        <TextField fullWidth id='start' placeholder='Start' />
                        
                        <FormControl>
                          <OutlinedInput
                            placeholder='End'
                            value={''}
                            type='text'
                            endAdornment={
                              <InputAdornment position='end'>
                                <Switch 
                                  defaultChecked
                                  onClick={() => {}}
                                  color='primary'  />
                              </InputAdornment>
                            }
                          />
                        </FormControl>

                      </FormGroup>
                    </CardContent>
                    <CardActions sx={{display:'flex', justifyContent:'center'}} className='card-action-dense'>
                      
                      <Button variant='contained'>Upload Trial Video</Button>
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
                  display:'flex',
                  justifyContent:'center',
                  gap:'2rem'
                }}
                className='buttonContainer'>
                  <Box>
                    <CustomButton onClick={handleCancelButton}>Cancel</CustomButton>
                  </Box>
                  <Box>
                    {
                      !files?.length 
                        ? 
                          <Alert severity='error'>Select a video</Alert>
                        : 
                          <CustomButton
                          onClick={dummyNavigate}
                          sx={{ 
                            bgcolor : 'primary.main',
                            color : 'common.white'
                          }}>
                            Start Upload
                          </CustomButton>
                    }
                    
                  </Box>                 
              </Box>
            </Grid>
          </Grid>
      </BasicCard>
    </>
  )
}

export default UploadVideoStep1