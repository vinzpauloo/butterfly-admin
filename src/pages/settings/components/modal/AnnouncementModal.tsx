// ** React Imports
import React, { useState } from 'react'

// ** MUI Imports
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@mui/material'

// ** Custom Imports
import DatePickerWrapper from '@/@core/styles/libs/react-datepicker'
import DatePicker from 'react-datepicker'
import { DateType } from '@/types/forms/reactDatepickerTypes'
import CustomInput from '@/layouts/components/shared-components/Picker/CustomPickerInput'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  isEditing?: boolean
}

const AnnouncementModal: React.FC<ModalProps> = ({ isOpen, onClose, isEditing }) => {
  const [date, setDate] = React.useState<DateType>(new Date())
  const [isDurationForever, setIsDurationForever] = useState(false);

  const publishNewAnnouncement = () => {
    alert("PUBLISH NEW ANNOUNCEMENT WIP")
  }

  return (
    <DatePickerWrapper>
      <Dialog open={isOpen} onClose={onClose} fullWidth={true} maxWidth={'lg'}>
        <DialogContent sx={{ backgroundColor: '#FFF', padding: 10 }}>
          <DialogTitle sx={styles.dialogTitle}> {isEditing? "Edit" : "New" } Announcement </DialogTitle>
          <Box sx={styles.mainContent}>
            <Box sx={styles.textfieldContainer}>
              <TextField label='Title:' />
              <TextField label='Description' multiline={true} minRows={20} />
            </Box>
            <Box sx={styles.datePickerContainer}>
              <Box>
                <Typography>Duration: Start Date</Typography>
                <DatePicker
                  selected={date}
                  onChange={(date: Date) => setDate(date)}
                  placeholderText='Click to select a date'
                  customInput={<CustomInput customWidth='100%' />}
                />
              </Box>
              <Box>
                <Typography sx={isDurationForever ? { color: "#999" } : null}>Duration: End Date</Typography>
                <DatePicker
                  disabled={isDurationForever}
                  selected={date}
                  onChange={(date: Date) => setDate(date)}
                  placeholderText='Click to select a date'
                  customInput={<CustomInput customWidth='100%' />}
                />
                <FormControlLabel sx={{mt:2}} control={<Checkbox checked={isDurationForever} onChange={(event) => setIsDurationForever(event.target.checked)} />} label="Duration: Forever" />
              </Box>
              <Box sx={{ display: 'flex', gap: 6, justifyContent:"center"}}>
                <Button sx={styles.buttons} onClick={onClose}>Cancel</Button>
                <Button sx={styles.buttons} onClick={publishNewAnnouncement}>Publish</Button>
              </Box>
              <Box sx={styles.disclaimer}>
                <Typography sx={{ textAlign: 'center' }}>
                  Disclaimer on this part
                  <br /> Warning Message for selecting announcement
                </Typography>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </DatePickerWrapper>
  )
}

export default AnnouncementModal

const styles = {
  buttons: {
    backgroundColor: '#FFF',
    border: '1px solid black',
    textTransform: 'uppercase',
    color: '#000',
    width: 120,
    '&:hover': {
      backgroundColor: '#9747FF',
      color: '#FFF'
    }
  },
  dialogTitle: {
    padding: 0,
    mb: 6,
    textAlign: { xs: 'center', sm: 'left'},
    textTransform: 'uppercase',
  },
  datePickerContainer: {
    width: { xs: '100%', sm: '40%' },
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    justifyContent: 'center',
  },
  mainContent: {
    display: 'flex',
    gap: 10,
    flexDirection: { xs: 'column', sm: 'row' },
  },
  textfieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: { xs: '100%', lg: '60%' },
    gap: { xs: 4, sm: 6 },
  },
  disclaimer: {
    display: 'flex',
    justifyContent: 'center',
    mt: 5,
    border: '1px solid black',
    padding: 3 
  }
}