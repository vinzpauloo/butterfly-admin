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

const styles = {
  dialogContent: {
    padding: {
      xs: 5,
      lg: 10
    }
  },
  container: {
    margin: {
      xs: '0 0px 0 0px',
      lg: '0 50px 0 50px'
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5
  },
  headerFooter: {
    borderRadius: '10px',
    border: '1px solid black',
    width: {
      xs: 200,
      lg: 400
    },
    textAlign: 'center'
  },
  key: {
    fontSize: 12
  },
  value: {
    fontSize: 18,
    fontWeight: '600'
  },
  taggings: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '.5rem'
  },
  backBtn: {
    border: '1px solid #000',
    width: 100,
    height: 30,
    backgroundColor: '#9747FF',
    color: '#FFF',
    textTransform: 'uppercase',
    fontSize: 12,
    '&:hover': {
      backgroundColor: '#7B0BB0'
    }
  }
}

export default EditFeedModal
