// ** React Imports
import { Ref, useState, forwardRef, ReactElement, ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControlLabel from '@mui/material/FormControlLabel'


// ** Util Import
import formatDate from '@/utils/formatDate'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'

// ** Types
import { IFeedStory } from '@/context/types'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Other Imports
import FeedCard from '@/pages/studio/shared-component/feed/FeedCard'
import FeedAttachments from '@/pages/studio/shared-component/feed/FeedAttachments'
import FeedVideoCard from '@/pages/studio/shared-component/feed/FeedVideoCard'
import PhotoGridCard from '@/pages/studio/shared-component/feed/PhotoGridCard'
import DialogNotes from '@/shared-components/DialogNotes'

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

interface INewsFeedDialogProps {
    toggle : () => void
    row : IFeedStory
    open : boolean
}

const EditNewsFeedDialog = (props : INewsFeedDialogProps) => {
  
  const { toggle, row, open } = props

  // ** States
  const [openNote, setOpenNote] = useState<boolean>(false)
  const [ noteLoader, setNoteLoader ] = useState<boolean>(false)

  const toggleNote = () => {
    setOpenNote(!openNote)
  }

  const handleDecline = () => {
    setOpenNote(true)
  }

  const handleNoteSubmit = (data : { notes : string }) => {
    setNoteLoader(true)
    setTimeout( () => {
        setNoteLoader(false)
        setOpenNote(false)
        toggle()
    }, 2000 )
    console.log('call handleNoteSubmit Outside', data)
  }

  const handleApproveFeed = () => {
    setTimeout( () => {
        toggle()
    }, 2000 )
  }


  return (
    <Card>

      <DialogNotes 
        states={{ 
            open : openNote,
            toggle : toggleNote,
            isLoading : noteLoader,
            outterHandleSubmit : handleNoteSubmit
        }}
      />

      <Dialog
        fullWidth
        open={open}
        maxWidth='sm'
        scroll='body'
        onClose={toggle}
        TransitionComponent={Transition}
      >
        <DialogContent sx={{ pb: 8, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton size='small' onClick={toggle} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant='h6' sx={{ mb: 3 }}>
              {row.user?.username}
            </Typography>
            <Typography variant='body2'>Content Creator</Typography>
          </Box>
          <Grid container spacing={6}>
            <Grid item xs={12}>
                    
                    <FeedCard
                        datePublished={formatDate(row.created_at)}
                        string_story={row.string_story}
                        {...(row.user && { user: row.user })}
                    >   
                        {row && row?.tags && (
                            <FeedAttachments>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: '.5rem' }}>
                                <Typography fontSize={11} color='common.white'>
                                    Taggings :
                                </Typography>
                                <Typography fontSize={11} color='#00C2FF'>
                                    {row.tags.join(', ')}
                                </Typography>
                                </Box>
                            </FeedAttachments>
                        )}

                        {row && row?.videos && (
                            <FeedAttachments>
                                <FeedVideoCard source={row.videos.url} />
                            </FeedAttachments>
                        )}
                            <FeedAttachments>
                                <PhotoGridCard>
                                    {row &&
                                    row?.images &&
                                    row?.images.map(image => {
                                        return (
                                        <img
                                            key={image._id}
                                            src={image.url.replace('http://localhost/', 'http://192.168.50.9/')} //TBR
                                        />
                                        )
                                    })}
                                </PhotoGridCard>
                            </FeedAttachments>
                        
                  </FeedCard>

            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}>
          <Button variant='contained' color='error' sx={{ mr: 1 }} onClick={ () => handleDecline() }>
            Decline
          </Button>
          <Button 
            
            variant='contained' color='primary' onClick={ () => handleApproveFeed()}>
            Approve
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}

export default EditNewsFeedDialog
