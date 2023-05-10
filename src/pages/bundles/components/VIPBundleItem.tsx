// ** React Imports
import React, { useState } from 'react'

// ** MUI Imports
import { Button, CircularProgress, Modal, Stack, Switch } from '@mui/material'
import Typography, { TypographyProps } from '@mui/material/Typography'
import Grid, { GridProps } from '@mui/material/Grid'
import { Icon, IconProps } from '@mui/material'

// ** Project/Other Imports
import VIPBundleModal from './VIPBundleModal'
import IconList from './IconList'

// ** TanStack Imports
import { useMutation, useQueryClient } from '@tanstack/react-query'

// ** Hooks/Services Imports
import BundlesService from '@/services/api/BundlesService'
import { useErrorHandling } from '@/hooks/useErrorHandling'

// ** Utils Imports
import { useTranslateString } from '@/utils/TranslateString'

type Props = {
  site_id: number
  siteName: string
  bundleID: string
  bundleName: string
  bundlePrice: number
  bundleDescription: string
  bundleDuration: number
  isBundleOn: boolean
  bundlePerks: {
    videos: boolean
    photos: boolean
    live_streaming: boolean
    video_call: boolean
    live_chat: boolean
    forever_vip: boolean
    download: boolean
    watch_ticket: boolean
    offline_benefit: boolean
  }
}

const bundleNames = [
  'Video',
  'Photos',
  'Live Stream',
  'Video Call',
  'Live Chat',
  'Forever VIP',
  'Download',
  'Watch Ticket',
  'Offline Benefits'
]

const VIPBundleItem = (props: Props) => {
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)

  const { handleError } = useErrorHandling()

  // Get QueryClient from the context
  const queryClient = useQueryClient()
  const { deleteVIPBundle, editVIPBundle } = BundlesService()

  const { mutate: mutateDeleteVIPBundle, isLoading: deletingLoading } = useMutation(deleteVIPBundle, {
    onSuccess: data => {
      console.log(data)
      queryClient.invalidateQueries({
        queryKey: ['allVIPBundles']
      })
    },
    onError: (e: any) => {
      handleError(e, `deleteVIPBundle() VIPBundleItem`)
    }
  })

  const { mutate: mutateEditVIPBundle, isLoading: editingLoading } = useMutation(editVIPBundle, {
    onSuccess: data => {
      console.log(data)
      queryClient.invalidateQueries({
        queryKey: ['allVIPBundles']
      })
    },
    onError: (e: any) => {
      handleError(e, `editVIPBundle() VIPBundleItem`)
    }
  })

  const confirmDeleteVIPBundle = () => {
    mutateDeleteVIPBundle({
      bundle_id: props.bundleID
    })
  }

  const SwtichOnAndOffVIPBundle = () => {
    mutateEditVIPBundle({
      bundle_id: props.bundleID,
      data: {
        site_id: 0,
        name: props.bundleName,
        price: Number(props.bundlePrice),
        description: props.bundleDescription,
        active: !props.isBundleOn,
        duration_days: props.bundleDuration,
        videos: props.bundlePerks.videos,
        photos: props.bundlePerks.photos,
        live_streaming: props.bundlePerks.live_streaming,
        video_call: props.bundlePerks.video_call,
        live_chat: props.bundlePerks.live_chat,
        forever_vip: props.bundlePerks.forever_vip,
        download: props.bundlePerks.download,
        watch_ticket: props.bundlePerks.watch_ticket,
        offline_benefit: props.bundlePerks.offline_benefit
      }
    })
  }

  const isBeingDeletedOrEdited = deletingLoading || editingLoading
  const loadingStyle = isBeingDeletedOrEdited ? { opacity: 0.5, cursor: 'not-allowed' } : null

  const TranslateString = useTranslateString()

  const featuresList = [
    {
      featureName: 'Video',
      isIncluded: props.bundlePerks.videos
    },
    {
      featureName: 'Photos',
      isIncluded: props.bundlePerks.photos
    },
    {
      featureName: 'Live Stream',
      isIncluded: props.bundlePerks.live_streaming
    },
    {
      featureName: 'Video Call',
      isIncluded: props.bundlePerks.video_call
    },
    {
      featureName: 'Live Chat',
      isIncluded: props.bundlePerks.live_chat
    },
    {
      featureName: 'Forever VIP',
      isIncluded: props.bundlePerks.forever_vip
    },
    {
      featureName: 'Download',
      isIncluded: props.bundlePerks.download
    },
    {
      featureName: 'Watch Ticket',
      isIncluded: props.bundlePerks.watch_ticket
    }
  ]

  return (
    <>
      <Stack gap={2} width={300} sx={loadingStyle} position='relative'>
        {isBeingDeletedOrEdited ? <CircularProgress sx={loaderStyle} /> : null}
        <Stack bgcolor='#D9D9D9' borderRadius={0.5} p={2} width={300}>
          <Stack gap={2}>
            <Typography variant='body1' sx={{ wordBreak: 'break-word' }}>
              {props.site_id}: {props.siteName}
            </Typography>
            <Typography variant='body1' sx={{ wordBreak: 'break-word' }}>
              Duration:&nbsp;
              {props.bundleDuration === 31 && '1 Month'}
              {props.bundleDuration === 92 && '3 Months'}
              {props.bundleDuration === 182 && '6 Months'}
              {props.bundleDuration === 365 && '1 Year'}
            </Typography>
            <Stack gap={2} flexDirection='row' justifyContent='space-between'>
              <Typography
                variant='h6'
                bgcolor='white'
                p={2}
                borderRadius={0.5}
                width='max-content'
                sx={{ wordBreak: 'break-word' }}
              >
                {props.bundleName}
              </Typography>
              <Switch checked={props.isBundleOn} onClick={SwtichOnAndOffVIPBundle} />
            </Stack>
            <Typography
              variant='body1'
              bgcolor='white'
              p={2}
              borderRadius={0.5}
              textAlign='center'
              sx={{ wordBreak: 'break-word' }}
            >
              {props.bundlePrice}
            </Typography>
            <Typography variant='body2' bgcolor='white' p={2} borderRadius={0.5} sx={{ wordBreak: 'break-word' }}>
              {props.bundleDescription}
            </Typography>
          </Stack>
        </Stack>
        <Stack>
          <Stack bgcolor='#D9D9D9' borderRadius={0.5} p={2}>
            <Stack bgcolor='white' borderRadius={0.5} gap={4} p={1}>
              <Typography variant='body1' borderRadius={0.5} textAlign='center' sx={{ wordBreak: 'break-word' }}>
                {props.bundleName}
              </Typography>
              <Grid container gap={2}>
                {featuresList.map((item, index) => (
                  <Grid item key={index} {...gridItemProps}>
                    <Icon component={IconList(index, item.isIncluded)} {...iconItemProps} />
                    <Typography {...typographyItemProps}>{bundleNames.at(index)}</Typography>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Stack>
          <Stack flexDirection='row' gap={4} mt={2}>
            <Button variant='contained' color='warning' fullWidth onClick={() => setOpen(true)}>
              {TranslateString('Edit')}
            </Button>
            <Button variant='contained' color='error' fullWidth onClick={confirmDeleteVIPBundle}>
              {TranslateString('Delete')}
            </Button>
          </Stack>
        </Stack>
      </Stack>
      {/* TO BE GLOBALIZED LATER SO WE DONT NEED TO RENDER THIS HERE */}
      {/* EDITING VIP MODAL */}
      <Modal open={open} onClose={handleClose}>
        <VIPBundleModal
          onClose={handleClose}
          isEditingVIPBundle
          bundleID={props.bundleID}
          bundleName={props.bundleName}
          bundlePrice={props.bundlePrice}
          bundleDescription={props.bundleDescription}
          isBundleOn={props.isBundleOn}
          isVideoIncluded={props.bundlePerks.videos}
          isPhotosIncluded={props.bundlePerks.photos}
          isLiveStreamIncluded={props.bundlePerks.live_streaming}
          isVideoCallIncluded={props.bundlePerks.video_call}
          isLiveChatIncluded={props.bundlePerks.live_chat}
          isVIPIncluded={props.bundlePerks.forever_vip}
          isDownloadIncluded={props.bundlePerks.download}
          isWatchTicketIncluded={props.bundlePerks.watch_ticket}
          isOfflineBenefitsIncluded={props.bundlePerks.offline_benefit}
        />
      </Modal>
    </>
  )
}

export default VIPBundleItem

const gridItemProps: GridProps = {
  item: true,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: 64,
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
const loaderStyle = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  margin: 'auto'
}
