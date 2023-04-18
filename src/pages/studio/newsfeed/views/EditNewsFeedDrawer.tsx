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
import { IFeedStory } from '@/context/types'

// ** Tanstack and APIS
import VideoService from '@/services/api/VideoService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CircularProgress } from '@mui/material'

import TranslateString from '@/utils/TranslateString'

interface SidebarEditType {
  open: boolean
  toggle: () => void
  row: IFeedStory
}

interface FormsData {
  work_id: string
  title?: string
  description?: string
  thumbnail?: string
  tagTextField: string
  tags: string[]
  groups?: string[]
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
  } = useForm<FormsData>({
    mode: 'onBlur'
  })

  const onSubmit = (data: FormsData) => {

  }

  const handleClose = () => {
    toggle()
  }

  const handleTagPressEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code == 'Enter') {
      // handle add to Chip
      let tagWord = (e.target as HTMLInputElement).value as string
      let hasDuplicate = watch('tags')?.includes(tagWord)

      if (hasDuplicate || tagWord == '') {
        //handle Errors
        toast.error('The tag you entered already exists')
        setError('tags', { type: 'custom', message: 'Tag cannot empty or duplicate' })
        e.preventDefault()
      } else {
        let insertTagArray = [tagWord]
        let newTagsArray = [...getValues('tags'), ...insertTagArray]
        //setTags(newTagsArray as [])
        setValue('tags', newTagsArray)

        console.log('newtagsarray', getValues('tags'))
        //reset multiTags
        resetField('tagTextField')
        e.preventDefault()
      }
    }
  }

  const handleTagDelete = (tag: string) => {
    let filteredTags = getValues('tags')?.filter(e => e !== tag)
    setValue('tags', filteredTags as [])
  }

  // manually set the default values
  // because useForm caches the defaults on first render
  React.useEffect(() => {

    //setValues


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
          <Typography variant='h6'>{row.string_story}</Typography>
          <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
            <Icon icon='mdi:close' fontSize={20} />
          </IconButton>
        </Header>
        {/* <Box>
          <VideoBox>
            <ReactPlayer className='reactPlayer' width='100%' height='100%' controls={true} url={row.} />
          </VideoBox>
        </Box> */}
        <Box sx={{ p: 5 }}>
          {/* <form onSubmit={event => event.preventDefault()}>
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

              <Stack flexWrap='wrap' direction='row' spacing={1} rowGap={2}>
                {watch('tags') &&
                  getValues('tags').map(tag => <Chip key={tag} label={tag} onDelete={e => handleTagDelete(tag)} />)}
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
          </form> */}
        </Box>
      </Drawer>
    )
  }

  return <></>
}

export default EditNewsFeedDrawer
