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
import { IVideoRow } from '@/context/types'

// ** Tanstack and APIS
import VideoService from '@/services/api/VideoService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CircularProgress } from '@mui/material'

import { useTranslateString } from '@/utils/TranslateString'

// ** BASE APIS Import
import { STREAMING_SERVER_URL, FILE_SERVER_URL } from '@/lib/baseUrls'

interface SidebarEditVideoType {
  open: boolean
  toggle: () => void
  row: IVideoRow
}

interface FormFields extends IVideoRow {
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

const EditContentDrawer = (props: SidebarEditVideoType) => {
  // ** Props
  const { open, toggle, row } = props

  // tanstack
  const queryClient = useQueryClient()
  const { updateVideoByWorkId } = VideoService()

  const { mutate: mutateEditContent, isLoading: isEditLoading } = useMutation(updateVideoByWorkId, {
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

  const onSubmit = (data: IVideoRow) => {

    const formData = new FormData()
    console.log('dataaaa submitted', data)

    console.log('watch', getValues())

    const { title, groups, tags, description } = getValues()

    const fd = new FormData()

    fd.append('title', title )
    if ( tags.length > 0  ){
      tags.map( tag => fd.append('tags[0]',tag) )
    }
    if ( groups.length > 0  ){
      groups.map( tag => fd.append('groups[0]',tag) )
    }

    fd.append('description', description)

    mutateEditContent({formData : fd })
  }

  const handleClose = () => {
    reset()
    toggle()
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

    console.log('the get Value', getValues())

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
        ModalProps={{ keepMounted: true }}
        sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
      >
        <Header>
          <Typography textTransform='uppercase' variant='h6'>
            {row.username}
          </Typography>
          <IconButton size='small' onClick={handleClose} sx={{ color: 'text.primary' }}>
            <Icon icon='mdi:close' fontSize={20} />
          </IconButton>
        </Header>
        {row.full_video_hls && (
          <Box>
            <VideoBox>
              <ReactPlayer
                className='reactPlayer'
                width='100%'
                height='100%'
                controls={true}
                url={row.full_video_hls ? STREAMING_SERVER_URL + row.full_video_hls : ''}
              />
            </VideoBox>
          </Box>
        )}
        <Box sx={{ p: 5 }}>
          <form onSubmit={event => event.preventDefault()}>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <TextField
                {...register('title')}
                label={TranslateString('Title')}
                placeholder='Story'
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

            <Autocomplete
              sx={{mb : '1.5rem'}}
              multiple
              options={[]}
              freeSolo
              onChange={(event, value) => {
                setValue('tags', value as string[])
              }}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => <Chip variant='outlined' label={option} {...getTagProps({ index })} />)
              }
              defaultValue={row.tags}
              renderInput={params => (
                <TextField
                  sx={{
                    backgroundColor: theme => theme.palette.background.paper,
                    borderRadius: '8px'
                  }}
                  {...params}
                  variant='filled'
                  label='Tags'
                  placeholder='Tags'
                />
              )}
            />

          <Autocomplete
              sx={{mb : '1.5rem'}}
              multiple
              options={[]}
              freeSolo
              onChange={(event, value) => {
                setValue('groups', value as string[])
              }}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => <Chip variant='outlined' label={option} {...getTagProps({ index })} />)
              }
              defaultValue={row.groups}
              renderInput={params => (
                <TextField
                  sx={{
                    backgroundColor: theme => theme.palette.background.paper,
                    borderRadius: '8px'
                  }}
                  {...params}
                  variant='filled'
                  label='Groups'
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

export default EditContentDrawer
