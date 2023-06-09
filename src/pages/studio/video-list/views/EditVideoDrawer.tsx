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

// ** Third Party Imports
import { useForm } from 'react-hook-form'
import ReactPlayer from 'react-player'
import toast from 'react-hot-toast'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Import types
import { IVideoRow } from '@/context/types'

// ** Tanstack and APIS
import VideoService from '@/services/api/VideoService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CircularProgress } from '@mui/material'

import { useTranslateString } from '@/utils/TranslateString'

// ** BASE APIS Import
import { STREAMING_SERVER_URL } from '@/lib/baseUrls'

interface StreamType {
  ready_to_stream?: boolean
}

interface RowType {
  trial?: StreamType
}

interface SidebarEditVideoType {
  open: boolean
  toggle: () => void
  row: IVideoRow & RowType
}

interface UserData {
  work_id: string
  title?: string
  description?: string
  thumbnail?: string
  tagTextField: string
  tags: string[]
  groups?: string[]
}

const VideoBox = styled(Box)(({}) => ({
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

const EditVideoDrawer = (props: SidebarEditVideoType) => {
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
    resetField,
    register,
    setValue,
    handleSubmit,
    watch,
    setError,
    formState: { errors }
  } = useForm<UserData>({
    mode: 'onBlur'
  })

  const onSubmit = (data: UserData) => {
    console.log('submitted data', data)
    const { title, description, tags, work_id } = data
    const formData = new FormData()
    formData.append('work_id', work_id)
    formData.append('title', title as string)
    formData.append('description', description as string)
    formData.append('_method', 'put')
    if (tags && tags.length > 0) {
      tags.forEach(tag => {
        formData.append('tags[]', tag.toString())
      })
    }

    mutateEditVideo({ formData: formData })
  }

  const handleClose = () => {
    toggle()
  }

  const handleTagPressEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code == 'Enter') {
      // handle add to Chip
      const tagWord = (e.target as HTMLInputElement).value as string
      const hasDuplicate = watch('tags')?.includes(tagWord)

      if (hasDuplicate || tagWord == '') {
        //handle Errors
        toast.error('The tag you entered already exists')
        setError('tags', { type: 'custom', message: 'Tag cannot empty or duplicate' })
        e.preventDefault()
      } else {
        const insertTagArray = [tagWord]
        const newTagsArray =
          getValues('tags') == undefined ? [...insertTagArray] : [...getValues('tags'), ...insertTagArray]

        //setTags(newTagsArray as [])
        setValue('tags', newTagsArray)

        //reset multiTags
        resetField('tagTextField')
        e.preventDefault()
      }
    }
  }

  const TranslateString = useTranslateString()

  console.log(`TRIAL READY TO STREAM`, row?.trial)

  const handleTagDelete = (tag: string) => {
    const filteredTags = getValues('tags')?.filter(e => e !== tag)
    setValue('tags', filteredTags as [])
  }

  // manually update the default values
  // because useForm caches the defaults on first render
  React.useEffect(() => {
    setValue('work_id', row._id)
    setValue('title', row.title)
    setValue('description', row.description)
    setValue('tags', row.tags)
    setValue('groups', row.groups)
  }, [row])

  if (row == undefined) return <></>

  if (row) {
    return (
      <Drawer
        open={open}
        anchor='right'
        variant='temporary'
        onClose={handleClose}
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
      >
        <Header>
          <Typography variant='h6'>{row.title}</Typography>
          <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
            <Icon icon='mdi:close' fontSize={20} />
          </IconButton>
        </Header>
        <Box>
          {row && row?.trial.ready_to_stream === true ? (
            <VideoBox>
              <ReactPlayer
                className='reactPlayer'
                width='100%'
                height='100%'
                controls={true}
                url={STREAMING_SERVER_URL + row.trial_video_hls}
              />
            </VideoBox>
          ) : (
            <Box
              sx={{
                backgroundColor: '#000',
                height: '225px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5
              }}
            >
              <Typography variant='h6' color='error'>
                Video is still processing...
              </Typography>
              <CircularProgress />
              <Typography variant='h6' color='error'>
                Please wait.
              </Typography>
            </Box>
          )}
        </Box>
        <Box sx={{ p: 5 }}>
          <form onSubmit={event => event.preventDefault()}>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <TextField
                {...register('title')}
                label={TranslateString('Title')}
                placeholder='Title'
                defaultValue={row.title}
                error={Boolean(errors.title)}
              />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 6 }}>
              <TextField
                {...register('description')}
                label={TranslateString('Description')}
                placeholder='Description'
                defaultValue={row.description}
                error={Boolean(errors.description)}
              />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 6 }}>
              {errors.tags && <p style={{ color: 'red' }}>{errors.tags.message}</p>}
              <TextField
                sx={{ mb: 5 }}
                placeholder={TranslateString('Type your tag then press enter')}
                {...register('tagTextField')}
                onKeyDown={e => {
                  handleTagPressEnter(e)
                }}
              />

              <Stack
                sx={{ border: '1px solid rgba(58, 53, 65, 0.22)', padding: '.5rem' }}
                flexWrap='wrap'
                direction='row'
                spacing={1}
                rowGap={2}
              >
                {watch('tags') &&
                  getValues('tags').map(tag => <Chip key={tag} label={tag} onDelete={() => handleTagDelete(tag)} />)}
              </Stack>
            </FormControl>

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
                {isEditLoading ? <CircularProgress size={12} sx={{ mr: 5 }} /> : null} {TranslateString('Submit')}
              </Button>
              <Button
                disabled={isEditLoading ? true : false}
                size='large'
                variant='outlined'
                color='secondary'
                onClick={handleClose}
              >
                {TranslateString('Cancel')}
              </Button>
            </Box>
          </form>
        </Box>
      </Drawer>
    )
  }

  return <></>
}

export default EditVideoDrawer
