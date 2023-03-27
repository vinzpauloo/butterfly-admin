// ** React Imports
import React, { useState } from 'react'

import Image from 'next/image'

// ** MUI Imports
import {
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    TextField,
    Typography,
    CircularProgress
} from '@mui/material'

// ** Custom Imports
import DatePickerWrapper from '@/@core/styles/libs/react-datepicker'
import DatePicker from 'react-datepicker'
import { DateType } from '@/types/forms/reactDatepickerTypes'
import CustomInput from '@/layouts/components/shared-components/Picker/CustomPickerInput'

// ** Style Imports
import { styles } from '../../styles/adsModalStyles'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    adTitle: string
}

const AdvertisementModal: React.FC<ModalProps> = ({ isOpen, onClose, adTitle }) => {
  const [startDate, setStartDate] = React.useState<DateType>(new Date())
  const [endDate, setEndDate] = React.useState<DateType>(new Date())
  const [selectedFile, setSelectedFile] = useState(null); // object to be send to back-end?
  const [preview, setPreview] = useState("");
  const [UrlLink, setUrlLink] = useState("");

  const [URLInputError, setURLInputError] = useState(false);
  const [ImageInputError, setImageInputError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      previewImage(file);
      setImageInputError(false)
    }
  };

  const previewImage = (file: any) => {
    const reader: any = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
  };

  const validateInput = () => {
    if (selectedFile === null) {
      setImageInputError(true)

      return false
    }

    if (UrlLink === "") {
      setURLInputError(true)

      return false
    }

    return true
  }

  const publishAdvertisement = () => {
    if (validateInput()) {
      // POST DATA TO BACK END
      console.log(startDate)
      console.log(endDate)
      console.log(UrlLink)
      console.log(selectedFile)
    }
  }

  return (
    <DatePickerWrapper>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogContent sx={styles.dialogContent}>
          <DialogTitle sx={styles.title}>Advertisements</DialogTitle>
            {isLoading ? <CircularProgress sx={styles.loaderStyle} color="primary" size={64} /> : null}
            <Box sx={styles.container} style={isLoading? {opacity:0.5, cursor:"not-allowed"} : undefined}>
              <Box sx={styles.left}>
                <Box sx={styles.adsTitle}>
                  <Typography sx={styles.adsText}>{adTitle}</Typography>
                </Box>
                <Box sx={styles.uploadContainer} border='1px solid' borderColor={ImageInputError ? "red" : "black"}>
                  <Box sx={styles.imgWrapper}>
                    <Image 
                      src={preview ? preview : '/images/icons/butterfly-template-icon.png'}
                      width={preview ? 300 : 50}
                      height={preview? 400 : 50}
                      alt='template icon'
                      style={{objectFit:"contain"}}
                    />
                    <Button variant="contained" disabled={isLoading} component="label" sx={styles.uploadBtn}>Select Image<input onChange={handleFileInputChange} type="file" hidden/></Button>
                  </Box>
                </Box>
              </Box>
              <Box sx={styles.right}>
                <Box>
                  <Typography>Duration: Start Date</Typography>
                  <DatePicker
                    selected={startDate}
                    onChange={(date: Date) => setStartDate(date)}
                    placeholderText='Click to select a date'
                    customInput={<CustomInput customWidth='100%' />}
                    minDate={new Date()}
                  />
                </Box>
                <Box>
                  <Typography>Duration: End Date</Typography>
                  <DatePicker
                    selected={endDate}
                    onChange={(date: Date) => setEndDate(date)}
                    placeholderText='Click to select a date'
                    customInput={<CustomInput customWidth='100%' />}
                    minDate={new Date()}
                  />
                </Box>
                <Box>
                  <Typography>URL Link:</Typography>
                <TextField fullWidth error={URLInputError} onChange={(event) => setUrlLink(event.target.value)}/>
                </Box>
                <Box sx={styles.bottomBtnWrapper}>
                  <Button sx={styles.bottomBtns} disabled={isLoading} onClick={onClose}>Cancel</Button>
                  <Button sx={styles.bottomBtns} disabled={isLoading} onClick={publishAdvertisement}>Publish</Button>
                </Box>
              </Box>
            </Box>
        </DialogContent>
      </Dialog>
    </DatePickerWrapper>
  )
}

export default AdvertisementModal