// ** React Imports
import React, { Ref, forwardRef, ReactElement } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import CircularProgress from '@mui/material/CircularProgress'

import VideoService from '@/services/api/VideoService'

// ** React Hook Form
import { useForm } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import ThumbnailUploader from './ThumbnailUploader'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

type DialogEditProps = {
  params: {
    _id: string
    tags: string[]
    groups: string[]
    title: string
    description: string
    thumbnail_url: string
    trial_video_hls: string
  }
}

type FormInputs = {
  title: string
  description: string
}

const DialogEdit = ({ params }: DialogEditProps) => {
  // ** States
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isResultOpen, setIsResultOpen] = React.useState<boolean>(false)
  const [resultMessage, setResultMessage] = React.useState<string>('Success')
  const [thumb, setThumb] = React.useState<File[] | null>([])

  const {
    register,
    getValues,
    watch,
    formState: { errors }
  } = useForm<FormInputs>()

  const { updateVideoByWorkId } = VideoService()

  const handleUpdate = () => {
    console.log('UPDATE', params)
    setIsLoading(true)

    callResultNotification()
  }

  const callResultNotification = () => {
    updateVideoByWorkId({ formData: getFormData() })
        .then( data => {
            console.log('data',data)
            setIsLoading(false)
            setIsDialogOpen(false)
        })
  }

  const getFormData = () => {
    let fd = new FormData()

    const { title, description } = getValues()

    fd.append('work_id', params._id)
    fd.append('title', title)
    fd.append('description', description)
    fd.append('_method', 'put')

    console.log('getValues', getValues())

    return fd
  }

  return (
    <>
      <Icon onClick={() => setIsDialogOpen(!isDialogOpen)} icon='mdi:eye-outline' fontSize={20} cursor='pointer' />
      <Dialog
        fullWidth
        open={isDialogOpen}
        maxWidth='md'
        scroll='body'
        onClose={() => {}}
        TransitionComponent={Transition}
      >
        <DialogContent sx={{ pb: 8, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton
            size='small'
            onClick={() => setIsDialogOpen(false)}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3 }}>
              Edit Video Information - {params.title}
            </Typography>
          </Box>

          <Grid container spacing={6}>
            <Grid item sm={8} xs={12}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <TextField defaultValue={params.title} fullWidth label='Title' {...register('title')} />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    defaultValue={params.description}
                    multiline
                    rows={2}
                    fullWidth
                    label='Description'
                    {...register('description')}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item sm={4} xs={12}>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <ThumbnailUploader thumb={params.thumbnail_url} />
                </Grid>

                <Grid item xs={12}>
                  <Box>
                    <a style={{ textDecoration: 'none' }} target='_blank' href={params.trial_video_hls}>
                      Video Link
                    </a>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}>
          <Button variant='outlined' color='secondary' onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          {isLoading ? (
            <CircularProgress sx={{ ml: 5, textAlign: 'center' }} color='secondary' />
          ) : (
            <Button variant='contained' sx={{ mr: 1 }} onClick={() => handleUpdate()}>
              Update
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Snackbar open={isResultOpen} onClose={() => setIsResultOpen(false)} autoHideDuration={3000}>
        <Alert variant='filled' elevation={100} onClose={() => setIsResultOpen(false)} severity='success'>
          {resultMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

export default DialogEdit
