// ** React Imports
import React, { Ref, useState, forwardRef, ReactElement } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { styled } from '@mui/material/styles'
import InputAdornment from '@mui/material/InputAdornment'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Utils
import formatDate from '@/utils/formatDate'

// ** Third Party Components
import ReactPlayer from 'react-player'
import { useForm, Controller } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import ContentService from '../../../services/api/ContentService'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

type ContentDialogType = {
  param: {
    _id: string
    avatar: string
    title: string
    description: string
    email: string
    tags: string[]
    trial_video_hls: string
    updated_at: string
    user: {
      username: string
    }
    last_update: string
    status: number
  }
}

// ** Styled Components
const PlayButtonImg = styled('img')(({ theme }) => ({
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  width: '70px',
  cursor: 'pointer'
}))

const VideoBG = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '240px',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  maxWidth: '540px',
  backgroundColor: '#333',
  backgroundPosition: 'center',
  marginTop: '1rem',
  borderRadius: '5px',
  border: '5px solid gray'
}))

// ** Custom Layout Style Components
const VideoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  gap: '.5rem',
  position: 'relative',
  paddingTop: '56.25%' /* Player ratio: 100 / (1280 / 720) */,

  '& .reactPlayer': {
    position: 'absolute',
    top: 0,
    left: 0
  }
}))

const ContentDialog = ({ param }: ContentDialogType) => {
  // ** States
  const [show, setShow] = useState<boolean>(false)
  const [showNotes, setShowNotes] = useState<boolean>(false)
  const [noteValue, setNoteValue] = useState<string>('')

  // Get QueryClient from the context
  const queryClient = useQueryClient()
  const { approveContent } = ContentService()

  const { mutate, isLoading } = useMutation(approveContent, {
    onSuccess: data => {
      console.log(data)
      queryClient.invalidateQueries({
        queryKey: ['contents']
      })
      setShowNotes(false)
      setShow(false)
      setNoteValue('')
      resetField('notes')
    },
    onError: error => {
      alert(error)
    }
  })

  const handleApproveContent = () => {
    mutate({
      data: {
        foreign_id: param._id,
        action: 'Approved',
        _method: 'put'
      }
    })
  }

  const handleNoteOnChange = (value: string) => {
    if (value.length <= 0) {
      setError('notes', { type: 'custom' })
    } else {
      clearErrors()
    }
    setNoteValue(value)
  }

  const setNoteError = () => {
    setError('notes', { type: 'custom' })
  }

  const handleNoteDialogClose = () => {
    resetField('notes')
    setShowNotes(false)
  }

  // ** React hook form
  const {
    resetField,
    setError,
    watch,
    register,
    handleSubmit,
    clearErrors,
    formState: { errors }
  } = useForm()

  const mainContentForm = useForm({
    mode: 'onBlur'
  })

  const onSubmitNote = () => {
    // TO CONFIRM DECLINE OF WORK
    let note = watch('notes')
    if (note.length == 0) {
      setNoteError()
      return
    } else {
      mutate({
        data: {
          foreign_id: param._id,
          action: 'Declined',
          note: noteValue,
          _method: 'put'
        }
      })
    }
  }

  return (
    <>
      <Icon onClick={() => setShow(true)} icon='mdi:eye-outline' fontSize={20} cursor='pointer' />
      <Dialog
        fullWidth
        open={show}
        maxWidth='md'
        scroll='body'
        onClose={() => setShow(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShow(false)}
      >
        <DialogContent sx={{ pb: 8, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton
            size='small'
            onClick={() => setShow(false)}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>

          <Grid container spacing={3}>
            <Grid item sm={12} xs={12}>
              <Box
                sx={{
                  py: 3,
                  px: 4,
                  borderRadius: 1,
                  cursor: 'pointer',
                  backgroundColor: 'action.hover'
                }}
              >
                <Box
                  sx={{
                    mb: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                    '& svg': { mr: 2 }
                  }}
                >
                  <Typography variant='body1'>Content Creator : {param.user.username}</Typography>
                  <Typography variant='body2'>Date Uploaded: {formatDate(param.updated_at)}</Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ mb: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <VideoBox>
                  <ReactPlayer
                    className='reactPlayer'
                    width='100%'
                    height='100%'
                    controls={true}
                    url={param.trial_video_hls}
                  />
                </VideoBox>
              </Box>
            </Grid>
            <Grid item sm={6} xs={12}>
              <FormControl fullWidth sx={{ display: 'flex', gap: '2rem' }}>
                <TextField
                  disabled
                  label='Video Title'
                  fullWidth
                  placeholder='Title'
                  defaultValue={param.title}
                  {...mainContentForm.register('videoTitle')}
                />
                <TextField
                  disabled
                  label='Description'
                  multiline
                  rows={3}
                  fullWidth
                  placeholder='Description or Caption'
                  defaultValue={param.description}
                  {...mainContentForm.register('videoDescription')}
                />
              </FormControl>
            </Grid>

            <Grid item sm={6} xs={12}>
              <FormControl fullWidth sx={{ display: 'flex', gap: '.5rem' }}>
                <TextField disabled multiline rows={2} fullWidth defaultValue={param.tags.join(', ')} />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}>
          <Button variant='contained' color='error' sx={{ mr: 1 }} onClick={() => setShowNotes(true)}>
            Decline
          </Button>
          <Button
            disabled={isLoading ? true : false}
            variant='contained'
            color='primary'
            onClick={() => handleApproveContent()}
          >
            {isLoading ? <CircularProgress sx={{ mr: 3 }} size={13} color='secondary' /> : null} Approve
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        maxWidth='sm'
        scroll='body'
        onClose={() => handleNoteDialogClose() }
        TransitionComponent={Transition}
        onBackdropClick={() => setShowNotes(false)}
        open={showNotes}
      >
        <DialogContent sx={{ pb: 8, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <form onSubmit={handleSubmit(onSubmitNote)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                {errors.notes && (
                  <Alert sx={{ mb: 5 }} severity='error'>
                    Cannot leave an empty note
                  </Alert>
                )}
                <TextField
                  {...register('notes')}
                  value={noteValue} //should be a state
                  onChange={event => handleNoteOnChange(event.target.value)}
                  fullWidth
                  multiline
                  minRows={3}
                  label='Note'
                  placeholder="Dont't leave the note blank..."
                  sx={{ '& .MuiOutlinedInput-root': { alignItems: 'baseline' } }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Icon icon='mdi:message-outline' />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>

              <Grid display='flex' justifyContent='center' alignItems='center' item xs={12}>
                <Button
                  disabled={errors.notes || isLoading ? true : false}
                  sx={{ marginInline: 'auto' }}
                  type='submit'
                  variant='contained'
                  size='large'
                >
                  {isLoading ? <CircularProgress sx={{ mr: 3 }} size={13} color='secondary' /> : null} Submit Note
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ContentDialog
