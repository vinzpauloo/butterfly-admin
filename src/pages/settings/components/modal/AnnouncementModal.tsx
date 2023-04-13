import React, { useEffect, useState } from 'react'
import { Box, Dialog, DialogTitle, DialogContent, Button, TextField, Typography, FormControlLabel, Checkbox, } from '@mui/material'
import DatePickerWrapper from '@/@core/styles/libs/react-datepicker'
import DatePicker from 'react-datepicker'
import format from 'date-fns/format'
import CustomInput from '@/layouts/components/shared-components/Picker/CustomPickerInput'
import Translations from '../../../../layouts/components/Translations'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  isEditing?: boolean
  modalInfo: {
    id: string,
    title: string,
    description: string,
    start_date: any,
    end_date: any,
    active: boolean,
  }
}

const AnnouncementModal: React.FC<ModalProps> = ({ isOpen, onClose, isEditing, modalInfo }) => {
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [isDurationForever, setIsDurationForever] = useState<boolean>(false);

  // input errors for validation
  const [titleInputError, setTitleInputError] = useState<boolean>(false);
  const [descriptionInputError, setDescriptionInputError] = useState<boolean>(false);

  const convertStringDateToDateObject = (dateString: any) => {
    const year = dateString.substring(0, 4);
    const month = dateString.substring(5, 7);
    const day = dateString.substring(8, 10);
    const date = new Date(year, month - 1, day);

    return date;
  }

  useEffect(() => {
    if (isEditing) {
      setTitle(modalInfo.title)
      setDescription(modalInfo.description)
      setStartDate(convertStringDateToDateObject(modalInfo.start_date))
      if (modalInfo.end_date === null) {
        setIsDurationForever(true)
        setEndDate(new Date())
      }
      else {
        // if there is a valid end date and its duration is not forever
        setIsDurationForever(false)
        setEndDate(convertStringDateToDateObject(modalInfo.end_date))
      }
    }
    else {
      //if we are adding new announcement instead of editing
      setTitle("")
      setDescription("")
      setStartDate(new Date())
      setEndDate(new Date())
      setIsDurationForever(false)
    }
  }, [isEditing, modalInfo])

  const validateInput = () => {
    if (title === "") {
      setTitleInputError(true)

      return false
    }

    if (description === "") {
      setDescriptionInputError(true)

      return false
    }

    return true
  }

  const publishNewAnnouncement = () => {
    if (validateInput()) {
      console.log("PUBLISH NEW ANNOUNCEMENT WIP")
      console.log(title)
      console.log(description)
      console.log(format(startDate, 'yyyy-MM-dd'))
      console.log(isDurationForever ? null : format(endDate, 'yyyy-MM-dd'))
    }
  }

  const editAnnouncement = () => {
    if (validateInput()) {
      console.log("EDIT ANNOUNCEMENT WIP")
      console.log(title)
      console.log(description)
      console.log(format(startDate, 'yyyy-MM-dd'))
      console.log(isDurationForever ? null : format(endDate, 'yyyy-MM-dd'))
    }
  }
  
  return (
    <DatePickerWrapper>
      <Dialog open={isOpen} onClose={onClose} fullWidth={true} maxWidth={'lg'}>
        <DialogContent sx={{ padding: 10 }}>
          <DialogTitle sx={styles.dialogTitle}>
            {isEditing ? <Translations text="Edit Announcement" /> : <Translations text="New Announcement" />}
          </DialogTitle>
          <Box sx={styles.mainContent}>
            <Box sx={styles.textfieldContainer}>
              <TextField label={<Translations text="Title" />} value={title} onChange={(e) => {setTitle(e.target.value);  setTitleInputError(false)}} error={titleInputError} />
              <TextField label={<Translations text="Description" />} value={description} onChange={(e) => {setDescription(e.target.value); setDescriptionInputError(false)}} multiline={true} minRows={20} error={descriptionInputError} />
            </Box>
            <Box sx={styles.datePickerContainer}>
              <Box>
                <Typography><Translations text="Start Date"/></Typography>
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  selected={startDate}
                  onChange={(date: Date) => setStartDate(date)}
                  placeholderText='Click to select a date'
                  customInput={<CustomInput customWidth='100%' />}
                  minDate={new Date()}
                />
              </Box>
              <Box>
                <Typography sx={isDurationForever ? { color: "#999" } : null}><Translations text="End Date" /></Typography>
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  disabled={isDurationForever}
                  selected={endDate}
                  onChange={(date: Date) => setEndDate(date)}
                  placeholderText='Click to select a date'
                  customInput={<CustomInput customWidth='100%' />}
                  minDate={new Date()}
                />
                <FormControlLabel sx={{ mt: 2 }} control={<Checkbox checked={isDurationForever} onChange={(event) => setIsDurationForever(event.target.checked)} />} label={<Translations text="Duration: Forever" />} />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: { xs: "column", md: "row"}, gap: 6, justifyContent:"center", alignItems:"center"}}>
                <Button sx={styles.buttons} onClick={onClose}><Translations text="Cancel" /></Button>
                <Button sx={styles.buttons} onClick={isEditing ? editAnnouncement : publishNewAnnouncement}><Translations text="Publish" /></Button>
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