// ** React Imports
import React from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import Alert from '@mui/material/Alert'
import Chip from '@mui/material/Chip'
import Autocomplete from '@mui/material/Autocomplete'

// ** Third Party Imports
import { useForm, useWatch  } from 'react-hook-form'
import ReactPlayer from 'react-player'
import toast from 'react-hot-toast'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Import types
import { IFeedStory } from '@/context/types'

// ** Tanstack and APIS
import VideoService from '@/services/api/VideoService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CircularProgress } from '@mui/material'

import { useTranslateString } from '@/utils/TranslateString';

// ** Base Links
import { STREAMING_SERVER_URL, FILE_SERVER_URL } from '@/lib/baseUrls'
import { setTag } from '@sentry/nextjs'

interface SidebarEditType {
  open: boolean
  toggle: () => void
  row: IFeedStory
}

const VideoBox = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '.5rem',
  position: 'relative',
  paddingTop: '56.25%' /* Player ratio: 100 / (1280 / 720) */,

  '& .reactPlayer': {
    position: 'absolute',
    top: 0,
    left: 0
  }
}))

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const EditNewsFeedDrawer = (props: SidebarEditType) => {
  // ** Props
  const { open, toggle, row } = props

  // States
  const [ tagArrayState, setTagArrayState ] = React.useState<string[]>([])
  const [ disableButton, setDisableButton ] = React.useState<boolean>(true)

  // tanstack
  const queryClient = useQueryClient()
  const { updateVideoByWorkId } = VideoService()
  const { mutate: mutateEditVideo, isLoading: isEditLoading } = useMutation(updateVideoByWorkId, {
    onSuccess: data => {
      console.log('success', data)
      queryClient.invalidateQueries({ queryKey: ['videosList'] })
    },
    onMutate: () => {
      console.log('start mutate')
    },
    onError: error => {
      toast.error(`Error ${error}`)
    },
    onSettled: () => {
      toggle()
    }
  })

  // ** React Hook Form
  const {
    getValues,
    reset,
    resetField,
    register,
    control,
    setValue,
    handleSubmit,
    watch,
    clearErrors,
    setError,
    formState: { errors, isValid, isSubmitted }
  } = useForm<IFeedStory>({
    defaultValues : {
      tags : row.tags
    },
    criteriaMode : 'all'
  })


  const onSubmit = (data: IFeedStory) => {
    console.log('call submit')


  }
console.log('@@@@@',isValid)
  const handleValidations = (name : string) => {

    switch (name) {
      case 'tags' : 
            setError('tags', { type : 'custom', message : 'Tag is required.' });
            break;
      case 'string_story' : 
            setError('string_story', { type : 'custom', message : 'Minimum of 5 characters' });
            break; 
      
      default : break;
    }


  }

  const handleClose = () => {
    toggle()
  }

  React.useEffect(() => {

    //setValues
    setValue('tags', row?.tags)
    setValue('string_story', row?.string_story)

    //set state
    setTagArrayState(row?.tags)

  }, [row])

  const TranslateString = useTranslateString()

  if (row == undefined) return <></>

  if (row) {

    return (
      <Drawer
        open={open}
        anchor='right'
        variant='temporary'
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
      >
        <Header>
          <Typography variant='h6'>Edit Feed</Typography>
          <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
            <Icon icon='mdi:close' fontSize={20} />
          </IconButton>
        </Header>
        {
          row?.type?.includes('video') &&
          <Box>
            <VideoBox>
              <ReactPlayer className='reactPlayer' width='100%' height='100%' controls={true} url={ STREAMING_SERVER_URL + row.videos.url} />
            </VideoBox>
          </Box>
        }
        
        <Box sx={{ p: 5 }}>
          <form onSubmit={event => event.preventDefault()}>

          { errors.string_story && <Alert sx={{mb:5}} variant='outlined' severity='error'>{ errors.string_story.message }</Alert> }

              <TextField
                sx={{mb:5}}
                {...register('string_story')}
                label={TranslateString('Story')}
                placeholder='Story'
                fullWidth
                multiline={true}
                rows={5}
                onChange={ (e) => { 
                  const text = e.target.value
                  setValue('string_story', text)
                  getValues('string_story').length < 5 ? handleValidations('string_story') : clearErrors('string_story')
                } }
              />


            { errors.tags && <Alert sx={{mb:5}} variant='outlined' severity='error'>{ errors.tags.message }</Alert> }
            <Autocomplete
                multiple
                options={[]}
                freeSolo
                value={tagArrayState}
                sx={{ mb:10 }}
                onChange={( event, value )=>{ 
                  setValue('tags', value as string[]) 
                  // store the array of tags in the state
                  setTagArrayState( getValues('tags') )
                  console.log('asdasdasdas', getValues('tags').length)
                  // validate
                  getValues('tags').length ? clearErrors('tags') : handleValidations('tags')

                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => 
                  <Chip variant='outlined' label={option} {...getTagProps({ index })} />)
                }
                renderInput={params => (
                  <TextField
                    sx={{
                      backgroundColor: theme => theme.palette.background.paper,
                      borderRadius: '8px'
                    }}
                    {...params}
                  />
                )}
              />


            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                onClick={() => {
                  handleSubmit(onSubmit)()
                }}
                size='large'
                type='submit'
                variant='contained'
                sx={{ mr: 3 }}
                disabled={ !isSubmitted || isValid || isEditLoading ? true : false }
              >
                {isEditLoading ? <CircularProgress size={12} sx={{ mr: 5 }} /> : null} {TranslateString("Submit")}
              </Button>
              <Button
                size='large'
                variant='outlined'
                color='secondary'
                onClick={handleClose}
              >
                {TranslateString("Cancel")}
              </Button>
            </Box>
          </form>
        </Box>
      </Drawer>
    )
  }

  return <></>
}

export default EditNewsFeedDrawer
