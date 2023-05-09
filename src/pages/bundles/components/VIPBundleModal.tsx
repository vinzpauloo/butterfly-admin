// ** React Imports
import React, { useState } from 'react'
import toast from 'react-hot-toast'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import { Button, CircularProgress, Icon, IconProps, Menu, MenuItem, Switch, TextField } from '@mui/material'
import Typography, { TypographyProps } from '@mui/material/Typography'
import Stack, { StackProps } from '@mui/material/Stack'
import Grid, { GridProps } from '@mui/material/Grid'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

// ** Project/Other Imports
import IconList from './IconList'

// ** Utils Imports
import { useTranslateString } from '@/utils/TranslateString'

// ** TanStack Imports
import { useMutation, useQueryClient } from '@tanstack/react-query'

// ** Hooks/Services Imports
import BundlesService from '@/services/api/BundlesService'
import { captureError } from '@/services/Sentry'

type Props = {
  isEditingVIPBundle?: boolean
  bundleID?: string
  bundleName?: string
  bundlePrice?: number
  bundleDescription?: string
  isBundleOn?: boolean
  isVideoIncluded?: boolean
  isPhotosIncluded?: boolean
  isLiveStreamIncluded?: boolean
  isVideoCallIncluded?: boolean
  isLiveChatIncluded?: boolean
  isVIPIncluded?: boolean
  isDownloadIncluded?: boolean
  isWatchTicketIncluded?: boolean
  isOfflineBenefitsIncluded?: boolean
  onClose: () => void
  uniqueSites?: any
}

const VIPBundleModal = (props: Props) => {
  const router = useRouter()
  const currentLocation = router.asPath

  const [bundleName, setBundleName] = useState(props.bundleName ?? '')
  const [bundleNameError, setBundleNameError] = useState(false)

  const [bundlePrice, setBundlePrice] = useState(props.bundlePrice ?? '')
  const [bundlePriceError, setBundlePriceError] = useState(false)

  const [bundleDescription, setBundleDescription] = useState(props.bundleDescription ?? '')
  const [bundleDescriptionError, setBundleDescriptionError] = useState(false)

  const [isBundleActive, setIsBundleActive] = useState(props.isBundleOn ?? false)

  const [isVideoIncluded, setIsVideoIsIncluded] = useState(props.isVideoIncluded ?? false)
  const [isPhotosIncluded, setIsPhotosIncluded] = useState(props.isPhotosIncluded ?? false)
  const [isLiveStreamIncluded, setIsLiveStreamIncluded] = useState(props.isLiveStreamIncluded ?? false)
  const [isVideoCallIncluded, setIsVideoCallIncluded] = useState(props.isVideoCallIncluded ?? false)
  const [isLiveChatIncluded, setIsLiveChatIncluded] = useState(props.isLiveChatIncluded ?? false)
  const [isVIPIncluded, setIsVIPIncluded] = useState(props.isVIPIncluded ?? false)
  const [isDownloadIncluded, setIsDownloadIncluded] = useState(props.isDownloadIncluded ?? false)
  const [isWatchTicketIncluded, setIsWatchTicketIncluded] = useState(props.isWatchTicketIncluded ?? false)

  const [featuresSelectionError, setFeaturesSelectionError] = useState(false)
  const [selectedSiteID, setSelectedSiteID] = useState(0)
  const [selectedDurationIndex, setSelectedDurationIndex] = useState(0)

  // SITE ID MENU
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const isMenuOpen = Boolean(anchorEl)
  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)
  const closeMenu = () => setAnchorEl(null)

  // DURATION MENU
  const [durationAnchorEl, setDurationAnchorEl] = React.useState<null | HTMLElement>(null)
  const isDurationMenuOpen = Boolean(durationAnchorEl)
  const openDurationMenu = (event: React.MouseEvent<HTMLButtonElement>) => setDurationAnchorEl(event.currentTarget)
  const closeDurationMenu = () => setDurationAnchorEl(null)

  const featuresList = [
    {
      featureName: 'Video',
      isIncluded: isVideoIncluded,
      setFunction: () => setIsVideoIsIncluded(prev => !prev)
    },
    {
      featureName: 'Photos',
      isIncluded: isPhotosIncluded,
      setFunction: () => setIsPhotosIncluded(prev => !prev)
    },
    {
      featureName: 'Live Stream',
      isIncluded: isLiveStreamIncluded,
      setFunction: () => setIsLiveStreamIncluded(prev => !prev)
    },
    {
      featureName: 'Video Call',
      isIncluded: isVideoCallIncluded,
      setFunction: () => setIsVideoCallIncluded(prev => !prev)
    },
    {
      featureName: 'Live Chat',
      isIncluded: isLiveChatIncluded,
      setFunction: () => setIsLiveChatIncluded(prev => !prev)
    },
    {
      featureName: 'Forever VIP',
      isIncluded: isVIPIncluded,
      setFunction: () => setIsVIPIncluded(prev => !prev)
    },
    {
      featureName: 'Download',
      isIncluded: isDownloadIncluded,
      setFunction: () => setIsDownloadIncluded(prev => !prev)
    },
    {
      featureName: 'Watch Ticket',
      isIncluded: isWatchTicketIncluded,
      setFunction: () => setIsWatchTicketIncluded(prev => !prev)
    }
  ]

  const bundleDurations = [
    { duration: '1 Month', days: 31 },
    { duration: '3 Months', days: 92 },
    { duration: '6 Months', days: 182 },
    { duration: '1 Year', days: 365 }
  ]

  const validateInputs = () => {
    if (bundleName === '') {
      setBundleNameError(true)

      return false
    }
    if (bundlePrice === '') {
      setBundlePriceError(true)

      return false
    }
    if (bundleDescription === '') {
      setBundleDescriptionError(true)

      return false
    }
    if (featuresList.every(item => item.isIncluded === false)) {
      setFeaturesSelectionError(true)

      return false
    }

    return true
  }

  // Get QueryClient from the context
  const queryClient = useQueryClient()
  const { addVIPBundle, editVIPBundle } = BundlesService()

  const {
    mutate: mutateAddNewVIPBundle,
    isLoading: addedLoading,
    isSuccess: addedSuccess
  } = useMutation(addVIPBundle, {
    onSuccess: data => {
      console.log(data)
      queryClient.invalidateQueries({
        queryKey: ['allVIPBundles']
      })
      props.onClose()
    },
    onError: (e: any) => {
      const {
        data: { message, error }
      } = e
      if (error) {
        for (const key in error) {
          error[key].forEach((value: any) => {
            captureError(currentLocation, `${value}, addVIPBundle() VIP Modal`)
            toast.error(`Error ${value}`, {
              duration: 2000
            })
          })
        }
      } else if (message) {
        captureError(currentLocation, `${message}, addVIPBundle() VIP Modal`)
        toast.error(`Error ${message}`, {
          duration: 2000
        })
      }
    }
  })

  const {
    mutate: mutateEditVIPBundle,
    isLoading: editingLoading,
    isSuccess: editingSuccess
  } = useMutation(editVIPBundle, {
    onSuccess: data => {
      console.log(data)
      queryClient.invalidateQueries({
        queryKey: ['allVIPBundles']
      })
      props.onClose()
    },
    onError: (e: any) => {
      const {
        data: { message, error }
      } = e
      if (error) {
        for (const key in error) {
          error[key].forEach((value: any) => {
            captureError(currentLocation, `${value}, editVIPBundle() VIP Modal`)
            toast.error(`Error ${value}`, {
              duration: 2000
            })
          })
        }
      } else if (message) {
        captureError(currentLocation, `${message}, editVIPBundle() VIP Modal`)
        toast.error(`Error ${message}`, {
          duration: 2000
        })
      }
    }
  })

  const confirmEditVIPBundle = () => {
    if (validateInputs()) {
      mutateEditVIPBundle({
        bundle_id: props.bundleID,
        data: {
          site_id: selectedSiteID,
          name: bundleName,
          price: Number(bundlePrice),
          description: bundleDescription,
          duration_days: bundleDurations[selectedDurationIndex].days,
          active: isBundleActive,
          videos: featuresList[0].isIncluded,
          photos: featuresList[1].isIncluded,
          live_streaming: featuresList[2].isIncluded,
          video_call: featuresList[3].isIncluded,
          live_chat: featuresList[4].isIncluded,
          forever_vip: featuresList[5].isIncluded,
          download: featuresList[6].isIncluded,
          watch_ticket: featuresList[7].isIncluded,
          offline_benefit: featuresList[8]?.isIncluded || false
        }
      })
    }
  }

  const addNewVIPBundle = () => {
    if (validateInputs()) {
      mutateAddNewVIPBundle({
        data: {
          site_id: selectedSiteID,
          name: bundleName,
          price: Number(bundlePrice),
          description: bundleDescription,
          duration_days: bundleDurations[selectedDurationIndex].days,
          active: isBundleActive,
          videos: featuresList[0].isIncluded,
          photos: featuresList[1].isIncluded,
          live_streaming: featuresList[2].isIncluded,
          video_call: featuresList[3].isIncluded,
          live_chat: featuresList[4].isIncluded,
          forever_vip: featuresList[5].isIncluded,
          download: featuresList[6].isIncluded,
          watch_ticket: featuresList[7].isIncluded,
          offline_benefit: featuresList[8]?.isIncluded || false
        }
      })
    }
  }

  const isBeingAddedOrEdited = addedLoading || addedSuccess || editingLoading || editingSuccess
  const loadingStyle = isBeingAddedOrEdited ? { opacity: 0.5, cursor: 'not-allowed' } : null

  const TranslateString = useTranslateString()

  return (
    <Stack {...modalContainer}>
      <Typography variant='h5' color='white' textAlign='center' my={2} mb={4}>
        {props.isEditingVIPBundle ? TranslateString('Edit') : TranslateString('Add')} {TranslateString('VIP Bundle')}
      </Typography>
      <Stack flexDirection='column' gap={2} sx={loadingStyle} width={300}>
        {isBeingAddedOrEdited ? <CircularProgress sx={loaderStyle} /> : null}
        {props.isEditingVIPBundle ? (
          <Stack alignItems='flex-start'>
            <Button
              variant='contained'
              color='secondary'
              onClick={openDurationMenu}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Duration: {bundleDurations[selectedDurationIndex].duration}
            </Button>
            <Menu anchorEl={durationAnchorEl} open={isDurationMenuOpen} onClose={closeDurationMenu}>
              {bundleDurations.map((item: any, index: any) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    setSelectedDurationIndex(index)
                    closeDurationMenu()
                  }}
                >
                  {item.duration}
                </MenuItem>
              ))}
            </Menu>
          </Stack>
        ) : (
          <Stack gap={2} alignItems='flex-start'>
            <Button variant='contained' color='primary' onClick={openMenu} endIcon={<KeyboardArrowDownIcon />}>
              Site ID: {selectedSiteID}
            </Button>
            <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={closeMenu}>
              <MenuItem
                onClick={() => {
                  setSelectedSiteID(0)
                  closeMenu()
                }}
              >
                0: Default
              </MenuItem>
              {props.uniqueSites.map((item: any) => (
                <MenuItem
                  key={item?.id}
                  onClick={() => {
                    setSelectedSiteID(item?.id)
                    closeMenu()
                  }}
                >
                  {item?.id}: {item?.name}
                </MenuItem>
              ))}
            </Menu>
            <Button
              variant='contained'
              color='secondary'
              onClick={openDurationMenu}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Duration: {bundleDurations[selectedDurationIndex].duration}
            </Button>
            <Menu anchorEl={durationAnchorEl} open={isDurationMenuOpen} onClose={closeDurationMenu}>
              {bundleDurations.map((item: any, index: any) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    setSelectedDurationIndex(index)
                    closeDurationMenu()
                  }}
                >
                  {item.duration}
                </MenuItem>
              ))}
            </Menu>
          </Stack>
        )}
        <Stack gap={2}>
          <Stack {...cardContainer}>
            <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>
              <TextField
                error={bundleName !== '' ? false : undefined || bundleNameError}
                sx={textFieldStyle}
                value={bundleName}
                onChange={event => setBundleName(event.target.value)}
                label={TranslateString('Bundle Name')}
              />
              <Switch
                checked={isBundleActive}
                onChange={event => {
                  setIsBundleActive(event.target.checked)
                }}
              />
            </Stack>
            <TextField
              type='number'
              error={bundlePrice !== '' ? false : undefined || bundlePriceError}
              sx={textFieldStyle}
              inputProps={{ min: 0 }}
              value={bundlePrice}
              onChange={event => setBundlePrice(event.target.value)}
              label={TranslateString('Bundle Price')}
            />
          </Stack>
          <Stack {...cardContainer}>
            <TextField
              error={bundleDescription !== '' ? false : undefined || bundleDescriptionError}
              sx={textFieldStyle}
              value={bundleDescription}
              onChange={event => setBundleDescription(event.target.value)}
              label={TranslateString('Bundle Description')}
              multiline
              rows={4}
            />
          </Stack>
        </Stack>
        <Stack bgcolor='#D9D9D9' borderRadius={0.5} p={2} width={300} height='max-content'>
          <Stack
            bgcolor='white'
            borderRadius={0.5}
            gap={4}
            p={1}
            sx={featuresSelectionError ? { outline: '1px solid red' } : null}
          >
            <Typography variant='subtitle1' borderRadius={0.5} textAlign='center'>
              {TranslateString('Select')} {TranslateString('Features')}
            </Typography>
            <Grid container gap={2.5}>
              {featuresList.map((item, index) => (
                <Grid style={{ cursor: 'pointer' }} onClick={item.setFunction} item key={index} {...gridItemProps}>
                  <Icon component={IconList(index, item.isIncluded)} {...iconItemProps} />
                  <Typography {...typographyItemProps}>{item.featureName}</Typography>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Stack>
      </Stack>
      <Stack flexDirection='row' gap={2} mt={4}>
        <Button variant='contained' color='error' onClick={props.onClose} fullWidth>
          {TranslateString('Cancel')}
        </Button>
        <Button
          variant='contained'
          color='success'
          onClick={props.isEditingVIPBundle ? confirmEditVIPBundle : addNewVIPBundle}
          fullWidth
        >
          {TranslateString('Save')}
        </Button>
      </Stack>
    </Stack>
  )
}

export default VIPBundleModal

// STYLINGS
const modalContainer: StackProps = {
  sx: {
    backgroundColor: theme => theme.customBflyColors.alwaysPrimary,
    transform: 'translate(-50%, -50%)'
  },
  position: 'absolute',
  top: '50%',
  left: '50%',
  p: 4,
  borderRadius: 1
}

const gridItemProps: GridProps = {
  item: true,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  xs: 3.7
}

const typographyItemProps: TypographyProps = {
  textAlign: 'center',
  variant: 'subtitle1',
  borderRadius: 0.5,
  fontSize: 10
}

const iconItemProps: IconProps = {
  sx: {
    height: 32,
    width: 32
  }
}

const cardContainer: StackProps = {
  bgcolor: '#D9D9D9',
  borderRadius: 0.5,
  p: 2,
  gap: 2
}

const textFieldStyle = {
  backgroundColor: 'white',
  borderRadius: 1,
  '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    margin: 0
  }
}

const loaderStyle = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  margin: 'auto',
  zIndex: 1
}
