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
import { styles } from '../../styles/createFeedStyles'

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

export default CreateFeedModal