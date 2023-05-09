// ** React Imports
import React, { useState } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import { Box, Button, CircularProgress, Menu, MenuItem, Switch, TextField, Typography } from '@mui/material'
import Stack, { StackProps } from '@mui/material/Stack'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

// ** Utils Imports
import { useTranslateString } from '@/utils/TranslateString'

// ** TanStack Imports
import { useMutation, useQueryClient } from '@tanstack/react-query'

// ** Hooks/Services Imports
import BundlesService from '@/services/api/BundlesService'
import { captureError } from '@/services/Sentry'

// optional props to be passed if editing a bundle instead
type Props = {
  isEditingGoldCoinBundle?: boolean
  bundleID?: string
  site_id?: number
  uniqueSites?: any
  bundleName?: string
  bundlePrice?: string
  bundleDescription?: string
  isBundleOn?: boolean
  onClose: () => void
}

const GoldCoinBundleModal = (props: Props) => {
  const router = useRouter()
  const currentLocation = router.asPath

  const [bundleName, setBundleName] = useState(props.bundleName ?? '')
  const [bundlePrice, setBundlePrice] = useState<any>(props.bundlePrice ?? '')
  const [bundleDescription, setBundleDescription] = useState(props.bundleDescription ?? '')
  const [isBundleActive, setIsBundleActive] = useState(props.isBundleOn ?? false)
  const [selectedSiteID, setSelectedSiteID] = useState(0)

  // MENU
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const isMenuOpen = Boolean(anchorEl)
  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)
  const closeMenu = () => setAnchorEl(null)

  const validateInputs = () => {
    if (bundleName === '') return false
    if (bundlePrice === '' || bundlePrice < 200) return false
    if (bundleDescription === '') return false

    return true
  }

  // Get QueryClient from the context
  const queryClient = useQueryClient()
  const { addCoinsBundle, editCoinsBundle } = BundlesService()

  const {
    mutate: mutateAddNewCoinBundle,
    isLoading: addedLoading,
    isSuccess: addedSuccess
  } = useMutation(addCoinsBundle, {
    onSuccess: data => {
      console.log(data)
      queryClient.invalidateQueries({
        queryKey: ['allCoinsBundle']
      })
      props.onClose()
    },
    onError: (e: any) => {
      const {
        data: { error }
      } = e
      for (const key in error) {
        error[key].forEach((value: any) => {
          captureError(currentLocation, `${value}, addCoinsBundle() GoldCoinBundleModal`)
        })
      }
    }
  })

  const {
    mutate: mutateEditCoinBundle,
    isLoading: editingLoading,
    isSuccess: editingSuccess
  } = useMutation(editCoinsBundle, {
    onSuccess: data => {
      console.log(data)
      queryClient.invalidateQueries({
        queryKey: ['allCoinsBundle']
      })
      props.onClose()
    },
    onError: (e: any) => {
      const {
        data: { error }
      } = e
      for (const key in error) {
        error[key].forEach((value: any) => {
          captureError(currentLocation, `${value}, editCoinsBundle() GoldCoinBundleModal`)
        })
      }
    }
  })

  const editGoldCoinBundle = () => {
    if (validateInputs()) {
      mutateEditCoinBundle({
        bundle_id: props.bundleID,
        data: {
          site_id: selectedSiteID,
          name: bundleName,
          price: Number(bundlePrice),
          amount: Number(bundlePrice),
          description: bundleDescription,
          active: isBundleActive
        }
      })
    }
  }

  const addGoldCoinBundle = () => {
    if (validateInputs()) {
      mutateAddNewCoinBundle({
        data: {
          site_id: selectedSiteID,
          name: bundleName,
          price: Number(bundlePrice),
          amount: Number(bundlePrice),
          description: bundleDescription,
          active: isBundleActive
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
        {props.isEditingGoldCoinBundle ? TranslateString('Edit') : TranslateString('Add')}{' '}
        {TranslateString('Gold Coin Bundle')}
      </Typography>
      <Stack gap={2} width={300} sx={loadingStyle}>
        {props.isEditingGoldCoinBundle ? null : (
          <Box>
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
          </Box>
        )}
        {isBeingAddedOrEdited ? <CircularProgress sx={loaderStyle} /> : null}
        <Stack {...cardContainer}>
          <Stack flexDirection='row' alignItems='center' justifyContent='space-between'>
            <TextField
              error={props.isEditingGoldCoinBundle ? bundleName === '' : false}
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
            error={props.isEditingGoldCoinBundle ? bundlePrice < 200 || bundlePrice === '' : false}
            sx={textFieldStyle}
            inputProps={{ min: 0 }}
            value={bundlePrice}
            onChange={event => setBundlePrice(event.target.value)}
            label={TranslateString('Gold Coin')}
          />
          {props.isEditingGoldCoinBundle && bundlePrice < 200 ? (
            <Typography variant='caption' color='error'>
              must be atleast 200
            </Typography>
          ) : undefined}
        </Stack>
        <Stack {...cardContainer}>
          <TextField
            error={props.isEditingGoldCoinBundle ? bundleDescription === '' : false}
            sx={textFieldStyle}
            value={bundleDescription}
            onChange={event => setBundleDescription(event.target.value)}
            label={TranslateString('Description')}
            multiline
            rows={4}
          />
        </Stack>
        <Stack flexDirection='row' gap={2} mt={4}>
          <Button variant='contained' color='error' onClick={props.onClose} fullWidth>
            {TranslateString('Cancel')}
          </Button>
          <Button
            variant='contained'
            color='success'
            onClick={props.isEditingGoldCoinBundle ? editGoldCoinBundle : addGoldCoinBundle}
            fullWidth
          >
            {TranslateString('Save')}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default GoldCoinBundleModal

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
