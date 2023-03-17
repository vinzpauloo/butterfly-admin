// ** React Imports
import React from 'react'

// ** MUI Imports
import {
    Dialog,
    DialogContent,
    Box,
    Button,
    Typography,
} from '@mui/material'

// ** Style Imports
import { styles } from '../../styles/editFeedModalStyles'

// ** Other Imports
import FeedCard from '@/pages/studio/shared-component/feed/FeedCard'
import FeedAttachments from '@/pages/studio/shared-component/feed/FeedAttachments'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
}

const EditFeedModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {

    return (
        <Dialog open={isOpen} onClose={onClose} >
            <DialogContent sx={styles.dialogContent}>
                <Box sx={styles.container}>
                    <Box sx={styles.headerFooter}>
                        <Typography sx={styles.key}>Content Creator</Typography>
                        <Typography sx={styles.value}>Shi Kai Ding Bang</Typography>
                    </Box>
                    <Box>
                        <FeedCard>
                            <FeedAttachments>
                                <Typography fontSize={11} color='common.white'>Location : Four Seasons Hotel, Hangzhou Westlake, China</Typography>
                            </FeedAttachments>

                            <FeedAttachments>
                                <Box sx={styles.taggings}>
                                    <Typography fontSize={11} color='common.white'>Taggings : </Typography>
                                    <Typography fontSize={11} color='#00C2FF'>#Tag1 #Tag2</Typography>
                                </Box>
                            </FeedAttachments>
                        </FeedCard>
                    </Box>
                    <Box sx={styles.headerFooter}>
                        <Typography sx={styles.key}>Date Published</Typography>
                        <Typography sx={styles.value}>03/17/2023</Typography>
                    </Box>

                    <Box>
                        <Button sx={styles.backBtn}>Back</Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default EditFeedModal