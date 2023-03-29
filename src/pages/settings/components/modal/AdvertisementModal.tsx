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
  CircularProgress,
  Switch
} from '@mui/material'

// ** Custom Imports
import DatePickerWrapper from '@/@core/styles/libs/react-datepicker'
import DatePicker from 'react-datepicker'
import { DateType } from '@/types/forms/reactDatepickerTypes'
import CustomInput from '@/layouts/components/shared-components/Picker/CustomPickerInput'

// ** Style Imports

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  adTitle: string
  width: number
  height: number
  url?: string
}

const AdvertisementModal: React.FC<ModalProps> = (props:ModalProps) => {
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
      <Dialog open={props.isOpen} onClose={props.onClose}>
        <DialogContent sx={styles.dialogContent}>
          <DialogTitle sx={styles.title}>{props.adTitle} Advertisement</DialogTitle>
            {isLoading ? <CircularProgress sx={styles.loaderStyle} color="primary" size={64} /> : null}
            <Box sx={styles.container} style={isLoading? {opacity:0.5, cursor:"not-allowed"} : undefined}>
              <Box sx={styles.left}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography sx={[styles.adsText, styles.adsTitle]}>{props.adTitle}</Typography>
                  {props.adTitle === "Carousel" ? <Switch disabled={isLoading} /> : null}
                </Box>
                <Box sx={uploadContainer} width={{sm:"100%", md: props.width }} height={props.height} border='1px solid' borderColor={ImageInputError ? "red" : "black"}>
                    <Box sx={styles.imgWrapper}>
                      {props.url && !preview ? <img src={props.url} alt='template icon' style={{ objectFit: "fill" }} /> :
                        <Image
                          src={preview ? preview : '/images/icons/butterfly-template-icon.png'}
                          width={preview ? props.width : 50}
                          height={preview ? props.height : 50}
                          alt='template icon'
                          style={{ objectFit: "fill" }}
                        />
                      }
                    </Box>
                </Box>
                <Button variant="contained" disabled={isLoading} component="label" sx={uploadBtn}>{preview || props.url? "Change" : "Select" } Image<input onChange={handleFileInputChange} type="file" hidden/></Button>
              </Box>
              <Box sx={styles.right}>
                <Box>
                  <Typography>Duration: Start Date</Typography>
                  <DatePicker
                    disabled={isLoading}
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
                    disabled={isLoading}
                    selected={endDate}
                    onChange={(date: Date) => setEndDate(date)}
                    placeholderText='Click to select a date'
                    customInput={<CustomInput customWidth='100%' />}
                    minDate={new Date()}
                  />
                </Box>
                <Box>
                  <Typography>URL Link:</Typography>
                  <TextField fullWidth error={URLInputError} disabled={isLoading} onChange={(event) => setUrlLink(event.target.value)}/>
                </Box>
                <Box sx={styles.bottomBtnWrapper}>
                  <Button sx={styles.bottomBtns} disabled={isLoading} onClick={props.onClose}>Cancel</Button>
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

const styles = {
  dialogContent: {
    padding: 10,
  },
  title: {
    padding: 0,
    margin: 0,
    textAlign: 'center',
    textTransform: 'uppercase',
    mb: 5
  },
  container: {
    display: 'flex',
    gap: 10,
    flexDirection: {
      xs: 'column',
      sm: 'column',
      md: 'row',
      lg: 'row'
    },
  },
  left: {
    display: 'flex',
    flexDirection: ' column',
    width: { xs: '100%', lg: '50%' },
    gap: 3
  },
  adsTitle: {
    border: '1px solid #000',
    borderRadius: '5px',
    width: {
      xs: '100%',
      sm: '100%',
      md: 180,
      lg: 180
    },
    height: '3dvh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adsText: {
    fontSize: 11,
    textTransform: 'uppercase',
    p: 1
  },
  imgWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  uploadBtn: {
    backgroundColor: '#9747FF',
    width: 150,
    color: '#FFF',
    textTransform: 'uppercase',
    fontSize: 12,
    '&:hover': {
      backgroundColor: '#7B0BB0'
    },
    position: 'absolute',
    bottom: 12
  },
  right: {
    width: {
      xs: '100%',
      sm: '100%',
      md: '50%',
      lg: '50%'
    },
    display: 'flex',
    flexDirection: 'column',
    mt: {
      xs: 0,
      lg: 10
    },
    gap: 4
  },
  fullWidth: {
    width: '100%'
  },
  bottomBtnWrapper: {
    display: 'flex',
    justifyContent: 'center',
    mt: 5,
    gap: 4
  },
  bottomBtns: {
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
  loaderStyle:
    {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: "auto",
      zIndex: 1
    }
}

const uploadContainer = {
  backgroundColor: '#D9D9D9',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative'
}

const uploadBtn = {
  backgroundColor: '#9747FF',
  width: 150,
  color: '#FFF',
  textTransform: 'uppercase',
  fontSize: 12,
  '&:hover': {
    backgroundColor: '#7B0BB0'
  },
  marginLeft:"auto",
  marginRight:"auto"
}
