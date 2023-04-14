import React, { useEffect, useState } from 'react'
import { Box, Dialog, DialogTitle, DialogContent, Button, TextField, Typography, FormControlLabel, Checkbox, CircularProgress, } from '@mui/material'
import DatePickerWrapper from '@/@core/styles/libs/react-datepicker'
import DatePicker from 'react-datepicker'
import format from 'date-fns/format'
import CustomInput from '@/layouts/components/shared-components/Picker/CustomPickerInput'
import Translations from '../../../../layouts/components/Translations'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import AnnoucementsService from '@/services/api/AnnoucementsService'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  isEditing?: boolean
  modalInfo: {
    parentID: string,
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

  // Get QueryClient from the context
  const queryClient = useQueryClient();
  const { createAnnouncement, updateAnnouncement } = AnnoucementsService();
  
  const { mutate: mutateCreateNewAnnouncement, isLoading: addedLoading } = useMutation(createAnnouncement, {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["allAnnouncement"],
      });
      onClose()
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: mutateUpdateAnnouncement, isLoading: updateLoading } = useMutation(updateAnnouncement, {
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["allAnnouncement"],
      });
      onClose()
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const publishNewAnnouncement = () => {
    if (validateInput()) {
      // POST data to back-end
      mutateCreateNewAnnouncement({
        data: {
          type: "introduction",
          style: "text",
          title: title,
          description: description,
          start_date: format(startDate, 'yyyy-MM-dd'),
          end_date: isDurationForever ? "" : format(endDate, 'yyyy-MM-dd')
        },
      })
    }
  }

  const editAnnouncement = () => {
    if (validateInput()) {
      // PUT data to back-end
      mutateUpdateAnnouncement({
        parentID: modalInfo.parentID,
        announcementID: modalInfo.id,
        data: {
          style: "text",
          title: title,
          description: description,
          start_date: format(startDate, 'yyyy-MM-dd'),
          end_date: isDurationForever ? "" : format(endDate, 'yyyy-MM-dd'),
          _method: "put"
        },
      })
    }
  }

  const isBeingAddedUpdated = addedLoading || updateLoading
  
  return (
    <DatePickerWrapper>
      <Dialog open={isOpen} onClose={onClose} fullWidth={true} maxWidth={'lg'}>
        <DialogContent sx={{ padding: 10 }}>
          <DialogTitle sx={styles.dialogTitle}>
            {isEditing ? <Translations text="Edit Announcement" /> : <Translations text="New Announcement" />}
          </DialogTitle>
          {isBeingAddedUpdated ? <CircularProgress sx={styles.loaderStyle} color="primary" size={64} /> : null}
          <Box sx={styles.mainContent} style={isBeingAddedUpdated ? { opacity: 0.5, cursor: "not-allowed" } : undefined}>
            <Box sx={styles.textfieldContainer}>
              <TextField disabled={isBeingAddedUpdated} label={<Translations text="Title" />} value={title} onChange={(e) => {setTitle(e.target.value);  setTitleInputError(false)}} error={titleInputError} />
              <TextField disabled={isBeingAddedUpdated} label={<Translations text="Description" />} value={description} onChange={(e) => {setDescription(e.target.value); setDescriptionInputError(false)}} multiline={true} minRows={20} error={descriptionInputError} />
            </Box>
            <Box sx={styles.datePickerContainer}>
              <Box>
                <Typography><Translations text="Start Date"/></Typography>
                <DatePicker
                  disabled={isBeingAddedUpdated}
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
                  disabled={isDurationForever || isBeingAddedUpdated}
                  selected={endDate}
                  onChange={(date: Date) => setEndDate(date)}
                  placeholderText='Click to select a date'
                  customInput={<CustomInput customWidth='100%' />}
                  minDate={new Date()}
                />
                <FormControlLabel sx={{ mt: 2 }} control={<Checkbox disabled={isBeingAddedUpdated} checked={isDurationForever} onChange={(event) => setIsDurationForever(event.target.checked)} />} label={<Translations text="Duration: Forever" />} />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: { xs: "column", md: "row"}, gap: 6, justifyContent:"center", alignItems:"center"}}>
                <Button disabled={isBeingAddedUpdated} sx={styles.buttons} onClick={onClose}><Translations text="Cancel" /></Button>
                <Button disabled={isBeingAddedUpdated} sx={styles.buttons} onClick={isEditing ? editAnnouncement : publishNewAnnouncement}><Translations text="Publish" /></Button>
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
  },
  loaderStyle: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    zIndex: 1
  }
}