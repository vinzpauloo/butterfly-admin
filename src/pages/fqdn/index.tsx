import React, { useRef, useState } from 'react'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import PerfectScrollbarComponent from 'react-perfect-scrollbar'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import FQDNService from '@/services/api/FQDNService'
import { useAuth } from '@/services/useAuth'
import { Button, CircularProgress, Stack } from '@mui/material'
import ExpandoForm from './views/ExpandoForm'

const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  height: '80vh',
  justifyContent: 'center',
  alignItems: 'flex-start',
  display: 'flex'
})

const FQDN = () => {
  const [APIFQDNS, setAPIFQDNS] = useState<string[]>([])
  const [photoFQDNS, setPhotoFQDNS] = useState<string[]>([])
  const [streamingFQDNS, setStreamingFQDNS] = useState<string[]>([])
  const [hasGetDone, setHasGetDone] = useState<boolean>(false)
  const [FQDNAdminLink, setFQDNAdminLink] = useState<string>('')
  const formAPIRef = useRef<any>()
  const formPhotosRef = useRef<any>()
  const formStreamRef = useRef<any>()
  const auth = useAuth()

  const { getSuperAgentFQDNList, addFQDN } = FQDNService()
  const { isLoading } = useQuery({
    queryKey: ['fqdns'],
    queryFn: () =>
      getSuperAgentFQDNList({
        site: auth?.user?.site
      }),
    onSuccess: data => {
      console.log(data?.data)
      setAPIFQDNS(data?.api || data?.Api)
      setPhotoFQDNS(data?.photo || data?.Photo)
      setStreamingFQDNS(data?.streaming || data?.Streaming)
      setHasGetDone(true)
      setFQDNAdminLink(data?.fqdn_admin)
    },
    onError: error => {
      console.log(error)
    }
  })

  const queryClient = useQueryClient()
  const { mutate, isLoading: updateLoading } = useMutation(addFQDN, {
    onSuccess: data => {
      console.log(data)
      queryClient.invalidateQueries({ queryKey: ['fqdns'] })
    },
    onError: error => {
      console.log(error)
    }
  })

  const saveChanges = () => {
    setHasGetDone(false)
    const apiArray = formAPIRef.current.getFormData().map((name: any) => ({ name: name.value, type: 'api' }))
    const photoArray = formPhotosRef.current.getFormData().map((name: any) => ({ name: name.value, type: 'photo' }))
    const streamingArray = formStreamRef.current
      .getFormData()
      .map((name: any) => ({ name: name.value, type: 'streaming' }))

    mutate({
      siteId: auth?.user?.site,
      data: {
        site: auth?.user?.site,
        fqdns: apiArray.concat(photoArray).concat(streamingArray),
        fqdn_admin: FQDNAdminLink
      }
    })
  }

  return (
    <PerfectScrollbar>
      <Grid maxWidth='sm' container spacing={6}>
        {isLoading || updateLoading ? (
          <Grid item xs={12} my={24} display='flex' alignItems='center' justifyContent='center'>
            <CircularProgress />
          </Grid>
        ) : null}
        {hasGetDone && (
          <Grid item xs={12}>
            <Stack direction='row' alignItems='center' justifyContent='space-between' py={4}>
              <Typography variant='h5'>FQDN</Typography>
              <Button variant='outlined' onClick={saveChanges}>
                Save Changes
              </Button>
            </Stack>
            <Stack gap={20}>
              <ExpandoForm
                multipleInputs={true}
                ref={formAPIRef}
                fileType='text'
                pageHeader="API's"
                isLoading={isLoading}
                disableSaveButton={true}
                defaultValues={{ expando: APIFQDNS.map((value: string) => ({ value })) }}
              />
              <ExpandoForm
                multipleInputs={true}
                ref={formPhotosRef}
                fileType='text'
                pageHeader='PHOTOS'
                isLoading={isLoading}
                disableSaveButton={true}
                defaultValues={{ expando: photoFQDNS.map((value: string) => ({ value })) }}
              />
              <ExpandoForm
                multipleInputs={true}
                ref={formStreamRef}
                fileType='text'
                pageHeader='STREAMING'
                isLoading={isLoading}
                disableSaveButton={true}
                defaultValues={{ expando: streamingFQDNS.map((value: string) => ({ value })) }}
              />
            </Stack>
          </Grid>
        )}
      </Grid>
    </PerfectScrollbar>
  )
}

FQDN.acl = {
  action: 'read',
  subject: 'sa-page'
}

export default FQDN
