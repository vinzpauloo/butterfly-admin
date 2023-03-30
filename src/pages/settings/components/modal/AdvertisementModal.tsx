// ** React Imports
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Box, Dialog, DialogTitle, DialogContent, Button, TextField, Typography, CircularProgress, Switch } from '@mui/material'
import DatePickerWrapper from '@/@core/styles/libs/react-datepicker'
import DatePicker from 'react-datepicker'
import { DateType } from '@/types/forms/reactDatepickerTypes'
import CustomInput from '@/layouts/components/shared-components/Picker/CustomPickerInput'
import { adsGlobalStore } from "../../../../zustand/adsGlobalStore";

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

const AdvertisementModal: React.FC<ModalProps> = (props:ModalProps) => {
  const [startDate, setStartDate] = React.useState<DateType>(new Date())
  const [endDate, setEndDate] = React.useState<DateType>(new Date())
  const [selectedFile, setSelectedFile] = useState(null); // object to be send to back-end?
  const [preview, setPreview] = useState("");
  const [newURLLink, setnewURLLink] = useState("");

  const [URLInputError, setURLInputError] = useState(false);
  const [ImageInputError, setImageInputError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // WIP - REMOVE THE PREVIEW FILE AND OTHER STUFF TO WHEN POSTING TO BACK END
  useEffect(() => {
    return () => {
      setSelectedFile(null)
      setPreview("")
    }
  },[])

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
    if (adsPhotoURL === undefined || selectedFile === null) {
      setImageInputError(true)

      return false
    }

    if (newURLLink === "") {
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
      console.log(newURLLink)
      console.log(selectedFile)
    }
  }

  // subscribe to ads global store
  const [
    adsCategory,
    adsWidth,
    adsHeight,
    adsPhotoURL,
    adsLink,
    adsStartDate,
    adsEndDate,
  ] = adsGlobalStore((state) => [
    state.adsCategory,
    state.adsWidth,
    state.adsHeight,
    state.adsPhotoURL,
    state.adsLink,
    state.adsStartDate,
    state.adsEndDate,
  ]);

  return (
    <DatePickerWrapper>
      <Dialog open={props.isOpen} onClose={props.onClose}>
        <DialogContent sx={styles.dialogContent}>
          <DialogTitle sx={styles.title}>{adsCategory} Advertisement</DialogTitle>
            {isLoading ? <CircularProgress sx={styles.loaderStyle} color="primary" size={64} /> : null}
            <Box sx={styles.container} style={isLoading? {opacity:0.5, cursor:"not-allowed"} : undefined}>
              <Box sx={styles.left}>
                {/* {adsCategory === "Carousel" || adsCategory === "Video-Grid" ? <Switch disabled={isLoading} /> : null} */}
                <Box
                  sx={uploadContainer}
                  width={{ sm: "100%", md: adsWidth }}
                  height={adsHeight}
                  borderColor={ImageInputError ? "red" : "black"}
                >
                  <Box sx={styles.imgWrapper}>                      
                    {adsPhotoURL && !preview ?
                      <img src={adsPhotoURL} alt='template icon' style={{ objectFit: "cover", width: adsWidth, height: adsHeight }} /> :
                      <Image
                        src={preview ? preview : '/images/icons/butterfly-template-icon.png'}
                        width={preview ? adsWidth : 50}
                        height={preview ? adsHeight : 50}
                        alt='template icon'
                        style={{ objectFit: "fill" }}
                      />
                    }
                  </Box>
                </Box>
                <Button variant="contained" disabled={isLoading} component="label" sx={uploadBtn}>{preview || adsPhotoURL? "Change" : "Select" } Image<input onChange={handleFileInputChange} type="file" hidden/></Button>
              </Box>
              <Box sx={styles.right}>
                <Box>
                  <Typography>Duration: Start Date</Typography>
                  <DatePicker
                    disabled={isLoading}
                    selected={adsStartDate}
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
                    selected={adsEndDate}
                    onChange={(date: Date) => setEndDate(date)}
                    placeholderText='Click to select a date'
                    customInput={<CustomInput customWidth='100%' />}
                    minDate={new Date()}
                  />
                </Box>
                <Box>
                  <Typography>URL Link:</Typography>
                  <TextField fullWidth error={URLInputError} disabled={isLoading} value={adsLink} onChange={(event) => setnewURLLink(event.target.value)}/>
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
    mb: 6
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
    gap: 4
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
