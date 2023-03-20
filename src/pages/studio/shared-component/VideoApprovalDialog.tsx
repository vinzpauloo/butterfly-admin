// ** React Imports
import React,{ Ref, useState, forwardRef, ReactElement } from 'react'

// ** MUI Imports

import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

// ** Custom Component
import FeedVideoCard from './feed/FeedVideoCard'

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

const ThumbnailBox =  styled(Box)(({ theme }) => ({
   display:'grid',
   gridTemplateColumns : 'repeat(3, 1fr)',
   gap:'1rem',
   '& img' : {
    width:'100%',
    height:'130px',
    objectFit: 'cover'
   }
}))

const ImgUpload =  styled('img')(({ theme }) => ({
  width:'50px',
  marginInline:'auto'
}))


const UploadBox =  styled(Box)(({ theme }) => ({
  display:'flex',
  justifyContent:'space-evenly',
  width: '100%',
  maxWidth:'145px',
  paddingInline:'1em',
}))

const VideoApprovalDialog = ({param} : FeedDialogType) => {
  // ** States
  const [show, setShow] = useState<boolean>(false)
  
  const [ showNotes, setShowNotes ] = useState<boolean>(false)

  return (
    <>
      <Icon onClick={() => setShow(true)} icon='mdi:eye-outline' fontSize={20} cursor='pointer' />
      <Dialog
        maxWidth='md'
        fullWidth
        open={show}
        scroll='body'
        onClose={() => setShow(false)}
        TransitionComponent={Transition}
        onBackdropClick={() => setShow(false)}
      >
        <DialogContent sx={{ pb: 8, px: { xs: 8, sm: 5 }, pt: { xs: 8, sm: 5 }, position: 'relative' }}>
          <IconButton
            size='small'
            onClick={() => setShow(false)}
            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
          >
            <Icon icon='mdi:close' />
          </IconButton>

          <form onSubmit={e => e.preventDefault()}>
            <Grid container spacing={3}>
              <Grid item sm={12} xs={12}>
                <Box
                  sx={{
                    px: 4,
                    borderRadius: 1,
                    cursor: 'pointer',
                  }}
                >
                  <Box>
                    <Typography component='div' textAlign='left' variant='body2'>Video Details</Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12}>

                  <Grid container spacing={5}>

                    <Grid item sm={8}>

                      <Box display='flex' flexDirection='column' sx={{gap:'1rem'}}>

                        <TextField fullWidth placeholder='Title' />

                        <TextField multiline rows={2} fullWidth placeholder='Description' />

                      </Box>

                      <Box>
                        <Typography fontSize={13}>THUMBNAIL (Optional)</Typography>
                        <Typography fontSize={11}>Select or upload thumbnail that shows what’s in your video. A good thumbnail stands out and draws viewers attention.</Typography>
                        <Box sx={{display:'flex',flexDirection:'row', justifyContent:'space-between',marginBlock:'1rem'}}>

                          <UploadBox sx={{display:'flex',flexDirection:'column'}}>
                            <ImgUpload src='/images/studio/thumbnail.png' />
                            <Button variant='contained' size='small'>Upload</Button>
                          </UploadBox>
                          <ThumbnailBox>
                            { ['/images/misc/profilePhoto.jpg', 
                                '/images/misc/profilePhoto1.jpg',
                                '/images/misc/profilePhoto2.jpg'].map( item => (
                                  <img key={item} src={item} />
                              ))
                            }
                            
                          </ThumbnailBox>
                        </Box>
                      </Box>

                      <Box display='flex' sx={{ flexDirection:'column', gap:'1rem', marginBlock:'1rem'}}>
                        <TextField fullWidth placeholder='Tagging' />
                        <TextField multiline rows={2} fullWidth placeholder='Grouping' />
                      </Box>
                      

                    </Grid>

                    <Grid item sm={4}>

                      <Box>
                        
                        <Box>
                          
                          <FeedVideoCard source='https://www.youtube.com/watch?v=JttqrqOfnC4'  />

                        </Box>

                        <Box>

                            <Box>
                              Link
                            </Box>

                            <Box>
                              Uploaded by
                            </Box>

                        </Box>

                      </Box>

                    </Grid>

                  </Grid>

              </Grid>


            
            </Grid>
          </form>

        </DialogContent>
        <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'space-around' }}>
          <Button variant='contained' color='warning' sx={{ mr: 1 }} onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant='contained' color='primary' onClick={() => setShow(false)}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default VideoApprovalDialog
