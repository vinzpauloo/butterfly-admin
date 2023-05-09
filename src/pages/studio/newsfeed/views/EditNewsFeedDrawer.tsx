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
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'
import Autocomplete from '@mui/material/Autocomplete'

// ** Third Party Imports
import { useForm } from 'react-hook-form'
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

  // ** State ---

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
    setError,
    formState: { errors }
  } = useForm<IFeedStory>({
    mode: 'onBlur',
    defaultValues : {
      tags : row.tags
    }
  })

  const onSubmit = (data: IFeedStory) => {

  }

  const handleClose = () => {
    reset()
    toggle()
  }



  // manually set the default values
  // because useForm caches the defaults on first render
  React.useEffect(() => {

    //setValues
    console.log('CALL THIS tags',row.tags)

    setValue('tags', row?.tags)
    setValue('string_story', row?.string_story)

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
            <FormControl fullWidth sx={{ mb: 6 }}>
              <TextField
                {...register('string_story')}
                label={TranslateString('Title')}
                placeholder='Story'
                defaultValue={row.string_story}
                error={Boolean(errors.string_story)}
                multiline={true}
                rows={5}
              />
            </FormControl>


            <Autocomplete
                multiple
                options={[]}
                freeSolo
                defaultValue={row?.tags || null}
                sx={{ mb:10 }}
                onChange={( event, value )=>{ setValue('tags', value as string[]) }}
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
                    {...register('tags')}
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
                disabled={isEditLoading ? true : false}
              >
                {isEditLoading ? <CircularProgress size={12} sx={{ mr: 5 }} /> : null} {TranslateString("Submit")}
              </Button>
              <Button
                disabled={isEditLoading ? true : false}
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
