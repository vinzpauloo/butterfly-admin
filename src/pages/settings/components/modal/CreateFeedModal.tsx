// ** React Imports
import React from 'react'

// ** Next Imports
import Image from 'next/image'

// ** MUI Imports
import {
    Dialog,
    DialogContent,
    Box,
    TextField,
    Button,
    DialogTitle
} from '@mui/material'


// ** Style Imports

interface ModalProps {
    isOpen: boolean
    onClose: () => void
}

const CreateFeedModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {

    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth={true} maxWidth={'lg'}>
            <DialogContent sx={styles.dialogContent}>
                <Box>
                    <DialogTitle sx={styles.title}>Upload NewsFeeds</DialogTitle>
                </Box>

                <Box sx={styles.textContainer}>
                    <TextField label='Title' sx={styles.fullWidth} />
                    <TextField label='Description' minRows={10} multiline={true} sx={styles.fullWidth} />
                    <TextField label='Location' sx={styles.fullWidth} />
                    <TextField label='Tagging' sx={styles.fullWidth} />
                </Box>

                <Box sx={styles.buttonContainer}>
                    <Box sx={styles.button}>
                        <Image src="/images/icons/upload-video.png" alt="upload video" width={100} height={100} />
                        <Button sx={styles.upload}>Upload Video</Button>
                    </Box>

                    <Box sx={styles.button}>
                        <Image src="/images/icons/upload-photo.png" alt="upload video" width={100} height={100} />
                        <Button sx={styles.upload}>Upload Photo</Button>
                    </Box>
                </Box>

                <Box sx={styles.bottomBtnContainer}>
                    <Button sx={styles.bottomBtn}>Cancel</Button>
                    <Button sx={styles.bottomBtn}>Publish</Button>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

const styles = {
  dialogContent: {
    padding: 10
  },
  title: {
    padding: 0,
    margin: 0,
    textTransform: 'uppercase',
    mb: 5,
    textAlign: {
      xs: 'center',
      sm: 'center',
      md: 'left',
      lg: 'left'
    }
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2
  },
  fullWidth: {
    width: '100%'
  },
  buttonContainer: {
    display: 'flex',
    padding: 5,
    gap: 10,
    justifyContent: {
      xs: 'center',
      sm: 'flex-start',
      md: 'flex-start',
      lg: 'flex-start'
    },
    flexDirection: {
      xs: 'column',
      sm: 'row',
      lg: 'row'
    }
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 5,
  },
  upload: {
    backgroundColor: '#FFF',
    color: '#000',
    textTransform: 'uppercase',
    borderRadius: '20px',
    fontSize: 11,
    width: 145,
    height: 25
  },
  bottomBtnContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: {
      xs: 3,
      md: 4,
      lg: 15
    },
    mt: 10
  },
  bottomBtn: {
    backgroundColor: '#FFF',
    color: '#000',
    textTransform: 'uppercase',
    borderRadius: '20px',
    fontSize: 11,
    width: 125,
    height: 35
  }
}

export default CreateFeedModal
