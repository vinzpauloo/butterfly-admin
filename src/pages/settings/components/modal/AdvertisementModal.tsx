// ** React Imports
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'

// ** Next Imports
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
  Checkbox,
  Stack,
  FormControlLabel,
  styled
} from '@mui/material'

// ** Third Party Imports
import format from 'date-fns/format'

// ** Project/Other Imports
import CustomInput from '@/layouts/components/shared-components/Picker/CustomPickerInput'
import { useTranslateString } from '@/utils/TranslateString'
import DatePickerWrapper from '@/@core/styles/libs/react-datepicker'
import { FILE_SERVER_URL } from '@/lib/baseUrls'

// ** Zustand Store Imports
import { adsGlobalStore } from '../../../../zustand/adsGlobalStore'

// ** TanStack Imports
import { useMutation, useQueryClient } from '@tanstack/react-query'

// ** Hooks/Services Imports
import AdvertisementService from '@/services/api/AdvertisementService'
import { useErrorHandling } from '@/hooks/useErrorHandling'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

const AdvertisementModal: React.FC<ModalProps> = (props: ModalProps) => {
  const TranslateString = useTranslateString()

  // subscribe to ads global store
  const [
    adsCategory,
    adsWidth,
    adsHeight,
    adsPhotoURL,
    adsLink,
    adsStartDate,
    adsEndDate,
    containerID,
    adsID,
    isCreatingNewAds,
    setAdsPhotoURL
  ] = adsGlobalStore(state => [
    state.adsCategory,
    state.adsWidth,
    state.adsHeight,
    state.adsPhotoURL,
    state.adsLink,
    state.adsStartDate,
    state.adsEndDate,
    state.containerID,
    state.adsID,
    state.isCreatingNewAds,
    state.setAdsPhotoURL
  ])

  const { handleError, getErrorResponse } = useErrorHandling()

  // if creating new ads used this value, if editing use global store
  const [newAdsStartDate, setNewAdsStartDate] = useState<Date>(new Date())
  const [newAdsEndDate, setNewAdsEndDate] = useState<Date>(new Date())
  const [newURLLink, setnewURLLink] = useState('')

  const [selectedFile, setSelectedFile] = useState('')
  const [preview, setPreview] = useState('')

  // input errors for validation
  const [URLInputError, setURLInputError] = useState(false)
  const [ImageInputError, setImageInputError] = useState(false)

  const [isDurationForever, setIsDurationForever] = useState(false)

  useEffect(() => {
    if (isCreatingNewAds) {
      setSelectedFile('')
      setPreview('')
      setAdsPhotoURL('')
      setnewURLLink('')
      setNewAdsStartDate(new Date())
      setNewAdsEndDate(new Date())
      setIsDurationForever(false)
      setURLInputError(false)
      setImageInputError(false)
    }

    // if editing existing ads
    if (!isCreatingNewAds) {
      setSelectedFile('')
      setPreview('')
      setIsDurationForever(false)
      setURLInputError(false)
      setImageInputError(false)
      setNewAdsStartDate(adsStartDate)
      setNewAdsEndDate(Number(adsEndDate) === 0 ? new Date() : adsEndDate)
      setnewURLLink(adsLink)
    }

    if (Number(adsEndDate) === 0) setIsDurationForever(true)
  }, [isCreatingNewAds, setAdsPhotoURL, adsEndDate, adsStartDate, adsLink])

  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      previewImage(file)
      setImageInputError(false)
    }
  }

  const previewImage = (file: any) => {
    const reader: any = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreview(reader.result)
    }
  }

  const validateInput = () => {
    if (selectedFile === '') {
      setImageInputError(true)

      return false
    }

    const isValidUrl = (string: string) => {
      try {
        new URL(string)

        return true
      } catch (err) {
        return false
      }
    }

    if (!isValidUrl(newURLLink)) {
      setURLInputError(true)

      return false
    }

    return true
  }

  // Get QueryClient from the context
  const queryClient = useQueryClient()
  const { createNewAds, updateAds, deleteAds } = AdvertisementService()

  const { mutate: mutateCreateNewBannerAds, isLoading: addedLoading } = useMutation(createNewAds, {
    onSuccess: data => {
      console.log(data)
      queryClient.invalidateQueries({
        queryKey: ['allAdvertisement']
      })
      props.onClose()
      setSelectedFile('')
      setPreview('')
      setAdsPhotoURL('')
    },
    onError: (e: any) => {
      handleError(e, `createNewAds() AdvertisementModal`)
    }
  })

  const { mutate: mutateUpdateBannerAds, isLoading: updateLoading } = useMutation(updateAds, {
    onSuccess: data => {
      console.log(data)
      queryClient.invalidateQueries({
        queryKey: ['allAdvertisement']
      })
      props.onClose()
      setSelectedFile('')
      setPreview('')
      setAdsPhotoURL('')
    },
    onError: (e: any) => {
      handleError(e, `updateAds() AdvertisementModal`)
    }
  })

  const { mutate: mutateDeleteBannerAds, isLoading: deleteLoading } = useMutation(deleteAds, {
    onSuccess: data => {
      console.log(data)
      queryClient.invalidateQueries({
        queryKey: ['allAdvertisement']
      })
      props.onClose()
      setSelectedFile('')
      setPreview('')
      setAdsPhotoURL('')
    },
    onError: (e: any) => {
      handleError(e, `deleteAds() AdvertisementModal`)
    }
  })

  const publishAdvertisement = () => {
    if (validateInput()) {
      // POST data to back-end
      mutateCreateNewBannerAds({
        id: containerID,
        relation: adsCategory === 'Video-Grid' ? 'gif' : 'banner',
        data: {
          photo: selectedFile,
          url: newURLLink,
          start_date: format(newAdsStartDate, 'yyyy-MM-dd'),
          end_date: isDurationForever ? '' : format(newAdsEndDate, 'yyyy-MM-dd'),
          active: 1
        }
      })
    }
  }

  const editAdvertisement = () => {
    // PUT data to back-end
    mutateUpdateBannerAds({
      id: containerID,
      banner_id: adsID,
      relation: adsCategory === 'Video-Grid' ? 'gif' : 'banner',
      data: {
        // if something is selected, if none selected dont send
        photo: selectedFile === '' ? null : selectedFile,
        url: newURLLink,
        start_date: format(newAdsStartDate, 'yyyy-MM-dd'),
        end_date: isDurationForever ? '' : format(newAdsEndDate, 'yyyy-MM-dd'),
        active: 1,
        _method: 'put'
      }
    })
  }

  const deleteAdvertisement = () => {
    // DELETE data in back-end
    mutateDeleteBannerAds({
      id: containerID,
      banner_id: adsID,
      relation: adsCategory === 'Video-Grid' ? 'gif' : 'banner'
    })
  }

  const Img = styled('img')({
    height: adsHeight,
    width: adsWidth,
    objectFit: 'cover'
  })

  const isBeingAddedUpdatedDelete = addedLoading || updateLoading || deleteLoading
 
  return (
    <DatePickerWrapper>
      <Dialog open={props.isOpen} onClose={props.onClose}>
        <DialogContent sx={styles.dialogContent}>
          <DialogTitle sx={styles.title}>
            {TranslateString(adsCategory)} {TranslateString('Advertisement')}
          </DialogTitle>
          {isBeingAddedUpdatedDelete ? <CircularProgress sx={styles.loaderStyle} color='primary' size={64} /> : null}
          <Box
            sx={styles.container}
            style={isBeingAddedUpdatedDelete ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}
          >
            <Box sx={styles.left}>
              <Box
                sx={styles.uploadContainer}
                width={{ sm: '100%', md: adsWidth }}
                height={adsHeight}
                border={ImageInputError ? '1px solid red' : undefined}
              >
                <Box sx={styles.imgWrapper}>
                  {adsPhotoURL && !preview ? (
                    <Img src={FILE_SERVER_URL + adsPhotoURL} alt='template icon' />
                  ) : (
                    <Image
                      src={preview ? preview : '/images/icons/butterfly-template-icon.png'}
                      width={preview ? adsWidth : 50}
                      height={preview ? adsHeight : 50}
                      alt='template icon'
                      style={{ objectFit: 'fill' }}
                    />
                  )}
                </Box>
              </Box>
              <Stack>
                <Typography textAlign='center'>
                  {' '}
                  {TranslateString('Recommended Size')}: {adsWidth * 1.25}x{adsHeight * 1.25}
                </Typography>
                <Stack flexDirection='row' justifyContent='center' gap={{ xs: 4, md: 12 }} mt={4}>
                  {!isCreatingNewAds ? (
                    <Button
                      variant='contained'
                      color='error'
                      disabled={isBeingAddedUpdatedDelete}
                      sx={{ width: 150, textTransform: 'uppercase' }}
                      onClick={deleteAdvertisement}
                    >
                      {TranslateString('Delete')}
                    </Button>
                  ) : null}
                  <Button
                    variant='contained'
                    disabled={isBeingAddedUpdatedDelete}
                    component='label'
                    sx={styles.uploadBtn}
                  >
                    {TranslateString(preview || adsPhotoURL ? 'Change' : 'Select')} {TranslateString('Image')}
                    <input onChange={handleFileInputChange} type='file' hidden />
                  </Button>
                </Stack>
              </Stack>
            </Box>
            <Box sx={styles.right}>
              <Box>
                <Typography>
                  {TranslateString('Start Date')}
                </Typography>
                <DatePicker
                  dateFormat='dd/MM/yyyy'
                  disabled={isBeingAddedUpdatedDelete}
                  selected={newAdsStartDate}
                  onChange={(date: Date) => setNewAdsStartDate(date)}
                  placeholderText='Click to select a date'
                  customInput={<CustomInput customwidth='100%' />}
                  minDate={new Date()}
                />
              </Box>
              <Box>
                <Typography sx={isDurationForever ? { color: '#999' } : null}>
                  {' '}
                  {TranslateString('End Date')}
                </Typography>
                <DatePicker
                  dateFormat='dd/MM/yyyy'
                  disabled={isBeingAddedUpdatedDelete || isDurationForever}
                  selected={newAdsEndDate}
                  onChange={(date: Date) => setNewAdsEndDate(date)}
                  placeholderText='Click to select a date'
                  customInput={<CustomInput customwidth='100%' />}
                  minDate={new Date()}
                />
                <Stack>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isDurationForever}
                        onChange={event => setIsDurationForever(event.target.checked)}
                      />
                    }
                    label={TranslateString('Duration: Forever')}
                  />
                </Stack>
              </Box>
              <Box>
                <Typography>
                  {TranslateString('URL Link')}
                </Typography>
                <TextField
                  fullWidth
                  error={URLInputError}
                  disabled={isBeingAddedUpdatedDelete}
                  value={newURLLink}
                  onChange={event => {
                    setnewURLLink(event.target.value)
                    setURLInputError(false)
                  }}
                />
              </Box>
              {getErrorResponse(12)}
              <Box sx={styles.bottomBtnWrapper}>
                <Button sx={styles.bottomBtns} disabled={isBeingAddedUpdatedDelete} onClick={props.onClose}>
                  {TranslateString('Cancel')}
                </Button>
                <Button
                  sx={styles.bottomBtns}
                  disabled={isBeingAddedUpdatedDelete}
                  onClick={isCreatingNewAds ? publishAdvertisement : editAdvertisement}
                >
                  {TranslateString('Publish')}
                </Button>
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
  uploadContainer: {
    backgroundColor: '#D9D9D9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  uploadBtn: {
    backgroundColor: '#9747FF',
    width: 150,
    color: '#FFF',
    textTransform: 'uppercase',
    fontSize: 12,
    '&:hover': {
      backgroundColor: '#7B0BB0'
    }
  },
  dialogContent: {
    padding: 10
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
    }
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
    alignItems: 'center'
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
  loaderStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    zIndex: 1
  }
}
