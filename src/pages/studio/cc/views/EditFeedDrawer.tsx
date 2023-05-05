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
import FeedsService from '@/services/api/FeedsService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CircularProgress } from '@mui/material'

import { useTranslateString } from '@/utils/TranslateString'

// ** BASE APIS Import
import { STREAMING_SERVER_URL, FILE_SERVER_URL } from '@/lib/baseUrls'

interface SidebarEditVideoType {
  open: boolean
  toggle: () => void
  row: IFeedStory
}

interface FormFields extends IFeedStory {
  tagTextField: string
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

const EditFeedDialog = (props: SidebarEditVideoType) => {
  // ** Props
  const { open, toggle, row } = props

  // tanstack
  const queryClient = useQueryClient()
  const { updateFeedViaID } = FeedsService()

  const { mutate: mutateEditFeed, isLoading: isEditLoading } = useMutation(updateFeedViaID, {
    onSuccess: data => {
      console.log('success', data)
      queryClient.invalidateQueries({ queryKey: ['getFeeds'] })
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
  } = useForm<FormFields>({
    mode: 'onBlur'
  })

  const onSubmit = (data: IFeedStory) => {

    const formData = new FormData()

    const { _id, string_story, tags } = data

    mutateEditFeed({
      id: _id,
      data: {
        string_story,
        resubmit: 'true',
        _method: 'put',
        tags: tags
      }
    })
  }

  const handleClose = () => {
    reset()
    toggle()
  }

  const handleTagPressEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code != 'Enter') return
    
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

  const TranslateString = useTranslateString()

  const handleTagDelete = (tag: string) => {
    let filteredTags = getValues('tags')?.filter(e => e !== tag)
    setValue('tags', filteredTags as [])
  }

  // manually update the default values
  // because useForm caches the defaults on first render
  React.useEffect(() => {
    console.log('therowwww', row)
    setValue('_id', row._id)
    setValue('string_story', row.string_story)
    setValue('tags', row.tags)

    console.log('the get Value', getValues())
  }, [row])

  if (row == undefined) return <></>

  if (row) {
    console.log(getValues())

    return (
      <Drawer
        open={open}
        anchor='right'
        variant='temporary'
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
      >
        <Header>
          <Typography textTransform='uppercase' variant='h6'>
            Feed Type : {row.type ? row.type : 'Story'}
          </Typography>
          <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
            <Icon icon='mdi:close' fontSize={20} />
          </IconButton>
        </Header>
        {row.videos && (
          <Box>
            <VideoBox>
              <ReactPlayer
                className='reactPlayer'
                width='100%'
                height='100%'
                controls={true}
                url={row.videos?.url ? STREAMING_SERVER_URL + row.videos.url : ''}
              />
            </VideoBox>
          </Box>
        )}
        <Box sx={{ p: 5 }}>
          <form onSubmit={event => event.preventDefault()}>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <TextField
                {...register('string_story')}
                label={TranslateString('string_story')}
                placeholder='Story'
                defaultValue={row.string_story}
                error={Boolean(errors.string_story)}
                multiline
                rows={3}
              />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 6 }}>
              {errors.tags && <p style={{ color: 'red' }}>{errors.tags.message}</p>}
              <TextField
                sx={{ mb: 5 }}
                {...register('tagTextField')}
                placeholder={TranslateString('Type your tag then press enter')}
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
                  watch('tags').map(tag => <Chip key={tag} label={tag} onDelete={e => handleTagDelete(tag)} />)}
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
                {isEditLoading ? <CircularProgress size={12} sx={{ mr: 5 }} /> : null} {TranslateString('Resubmit')}
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

export default EditFeedDialog
