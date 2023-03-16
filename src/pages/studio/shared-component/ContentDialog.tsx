// ** React Imports
import React,{ Ref, useState, forwardRef, ReactElement } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Switch from '@mui/material/Switch'
import Select from '@mui/material/Select'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'
import { styled } from '@mui/material/styles'

// ** Icon Imports
import Icon from 'src/@core/components/icon'



const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

type ContentDialogType = {
    param : {
        id: number,
        avatar: string,
        title : string,
        email : string,
        full_name : string,
        last_update : string,
        status: number
    }
}

// ** Styled Components
const PlayButtonImg = styled('img')(({ theme }) => ({
    position: 'absolute',
    top: '40%',
    left:'50%',
    transform: 'translate(-50%,-50%)',
    width:'70px',
    cursor:'pointer'
}))

const VideoBG =  styled(Box)(({ theme }) => ({
    width:'100%',
    height:'240px', 
    backgroundRepeat:'no-repeat',
    backgroundSize: 'contain',
    maxWidth: '540px',
    backgroundColor: '#333',
    backgroundPosition: 'center',
    marginTop: '1rem',
    borderRadius:'5px',
    border:'5px solid gray'
}))


const ContentDialog = ({param} : ContentDialogType) => {
  // ** States
  const [show, setShow] = useState<boolean>(false)
  
  const [ showNotes, setShowNotes ] = useState<boolean>(false)

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
                  backgroundColor: 'action.hover',
                }}
              >
                <Box sx={{ mb: 1, display: 'flex', justifyContent:'space-between', flexDirection:'row', alignItems: 'center', '& svg': { mr: 2 } }}>
                  <Typography variant='body2'>
                    Content Creator : {param.full_name}
                  </Typography>
                  <Typography variant='body2'>
                    Date Uploaded: {param.last_update}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12}>
                <Box sx={{ display:'flex', justifyContent:'center', alignItems:'center' }}>
                    <VideoBG />
                    <PlayButtonImg src='/images/icons/playButton.png' />
                </Box>
            </Grid>
            <Grid item sm={6} xs={12}>
                <FormControl fullWidth sx={{display:'flex', gap:'.5rem'}}>
                    <TextField label="Video Title" fullWidth placeholder='Title' value={param.title} />
                    <TextField label="Description" multiline rows={3} fullWidth placeholder='Description or Caption' />
                </FormControl>
            </Grid>

            <Grid item sm={6} xs={12}>
                <FormControl fullWidth sx={{display:'flex', gap:'.5rem'}}>
                    <TextField multiline rows={2} fullWidth placeholder='#tags1 #tags2' />
                    <TextField multiline rows={2} fullWidth placeholder='Groupings1 Groupings2' />
                </FormControl>
              
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}>
          <Button variant='contained' color='error' sx={{ mr: 1 }} onClick={() => setShow(false)}>
            Decline
          </Button>
          <Button variant='contained' color='primary' onClick={() => setShow(false)}>
            Approve
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ContentDialog
