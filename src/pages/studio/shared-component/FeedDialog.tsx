// ** React Imports
import React,{ Ref, useState, forwardRef, ReactElement } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { styled } from '@mui/material/styles'

// ** Custom Components
import FeedCard from '@/pages/studio/shared-component/feed/FeedCard'
import FeedAttachments from '@/pages/studio/shared-component/feed/FeedAttachments'
import FeedVideoCard from '@/pages/studio/shared-component/feed/FeedVideoCard'
import PhotoGridCard from '@/pages/studio/shared-component/feed/PhotoGridCard'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

type FeedDialogType = {
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


const FeedDialog = ({param} : FeedDialogType) => {
  // ** States
  const [show, setShow] = useState<boolean>(false)
  
  const [ showNotes, setShowNotes ] = useState<boolean>(false)

  return (
    <>
      <Icon onClick={() => setShow(true)} icon='mdi:eye-outline' fontSize={20} cursor='pointer' />
      <Dialog
        maxWidth='sm'
        fullWidth
        open={show}
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
                <Box sx={{ mb: 1, display: 'flex', justifyContent:'center', flexDirection:'column', alignItems: 'center', '& svg': { mr: 2 } }}>
                  <Typography variant='body2'>Content Creator</Typography>
                  <Typography variant='body1'>{param.full_name}</Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12}>

                <FeedCard>
                  
                    <FeedAttachments>
                    <Box sx={{display:'flex', justifyContent:'flex-start', gap: '.5rem'}}>
                        <Typography fontSize={11} color='common.white'>Taggings : </Typography>
                        <Typography fontSize={11} color='#00C2FF'>#Tag1 #Tag2</Typography>
                    </Box>
                    </FeedAttachments>

                    <FeedAttachments>
                    <FeedVideoCard source='https://vimeo.com/209175147'></FeedVideoCard>
                    </FeedAttachments>

                    <FeedAttachments>
                        <PhotoGridCard cols={2}>
                            <img src='/images/misc/grid/3.jpg' />
                            <img src='/images/misc/grid/1.jpg' />
                            <img src='/images/misc/grid/2.jpg' />
                            <img src='/images/misc/grid/3.jpg' />
                            <img src='/images/misc/grid/1.jpg' />
                            <img src='/images/misc/grid/2.jpg' />
                        </PhotoGridCard>
                    </FeedAttachments>

                </FeedCard>

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

export default FeedDialog
