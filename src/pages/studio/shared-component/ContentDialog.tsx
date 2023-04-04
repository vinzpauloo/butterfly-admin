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

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Utils
import formatDate from '@/utils/formatDate'

// ** Third Party Components
import ReactPlayer from 'react-player'
import { useForm, Controller } from 'react-hook-form'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

type ContentDialogType = {
  param: {
    id: number
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
  const [localLoading , setLocalLoading] = React.useState<boolean>(false)
  const [showNotes, setShowNotes] = useState<boolean>(false)


  const handleApproveContent = () => {
    setLocalLoading(true)

    setTimeout( ()=>{ setLocalLoading(false) }, 2000 )

  }

  const handleDecline = () => {
    setShowNotes(true)
  }

  // ** React hook form
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
  })

  const onSubmitNote = (data : any) => {
    setLocalLoading(true)
    setTimeout( ()=>{ 
      setLocalLoading(false) 
      setShowNotes(false)
      reset()
    }, 2000 )
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
                  <Typography variant='body2'>Content Creator : {param.user.username}</Typography>
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
                <TextField label='Video Title' fullWidth placeholder='Title' value={param.title} />
                <TextField
                  label='Description'
                  multiline
                  rows={3}
                  fullWidth
                  placeholder='Description or Caption'
                  value={param.description}
                />
              </FormControl>
            </Grid>

            <Grid item sm={6} xs={12}>
              <FormControl fullWidth sx={{ display: 'flex', gap: '.5rem' }}>
                <TextField multiline rows={2} fullWidth value={param.tags.join(', ')} />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}>
          <Button variant='contained' color='error' sx={{ mr: 1 }} onClick={() => handleDecline()}>
            Decline
          </Button>
          <Button disabled={ localLoading ? true : false } variant='contained' color='primary' onClick={() => handleApproveContent()} >
            { localLoading ? <CircularProgress sx={{mr: 3}} size={13} color='secondary' />  : null } Approve
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        maxWidth='sm'
        scroll='body'
        onClose={() => setShowNotes(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShowNotes(false)}
        open={showNotes}
      >
        <DialogContent sx={{ pb: 8, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <form onSubmit={handleSubmit(onSubmitNote)}>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                { errors.notes && <span>Empty note</span>}
                <TextField
                  {...register('notes', { required: true})}
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
                <Button disabled={ (errors.notes || localLoading ) ? true : false } sx={{marginInline:'auto'}} type='submit' variant='contained' size='large'>
                  { localLoading ? <CircularProgress sx={{mr: 3}} size={13} color='secondary' />  : null } Submit Note
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
