import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import PageHeader from 'src/@core/components/page-header'
import PerfectScrollbarComponent from 'react-perfect-scrollbar'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import FQDNService from '@/services/api/FQDNService'
import { useAuth } from '@/services/useAuth'
import { Button, Stack } from '@mui/material'
import LinksContainer from './components/LinksContainer'

const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  height: '80vh',
  justifyContent: 'center',
  alignItems: 'flex-start',
  display: 'flex'
})

type postObject = {
  name: string
  type: 'api' | 'photo' | 'streaming'
}

const FQDN = () => {
  const [APIFQDNS, setAPIFQDNS] = useState<string[]>([])
  const [newAPIFQDNS, setNewAPIFQDNS] = useState<string[]>([])

  const [photoFQDNS, setPhotoFQDNS] = useState<string[]>([])
  const [newPhotoFQDNS, setNewPhotoFQDNS] = useState<string[]>([])

  const [streamingFQDNS, setStreamingFQDNS] = useState<string[]>([])
  const [newStreamingFQDNS, setNewStreamingFQDNS] = useState<string[]>([])

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
      setAPIFQDNS(data?.Api)
      setStreamingFQDNS(data?.Streaming)
      setPhotoFQDNS(data?.Photo)
    },
    onError: error => {
      console.log(error)
    }
  })

  const queryClient = useQueryClient()
  const { mutate, isLoading: updateLoading } = useMutation(addFQDN, {
    onSuccess: data => {
      console.log(data)
      setNewAPIFQDNS([])
      setNewPhotoFQDNS([])
      setNewStreamingFQDNS([])
      queryClient.invalidateQueries({ queryKey: ['fqdns'] })
    },
    onError: error => {
      console.log(error)
    }
  })

  const saveChanges = () => {
    const AllAPIFQDNS: postObject[] = APIFQDNS.concat(newAPIFQDNS).map(item => {
      return { name: item, type: 'api' }
    })

    const AllphotoFQDNS: postObject[] = photoFQDNS.concat(newPhotoFQDNS).map(item => {
      return { name: item, type: 'photo' }
    })

    const AllstreamingFQDNS: postObject[] = streamingFQDNS.concat(newStreamingFQDNS).map(item => {
      return { name: item, type: 'streaming' }
    })

    mutate({
      siteId: auth?.user?.site,
      data: {
        site: auth?.user?.site,
        fqdns: AllAPIFQDNS.concat(AllphotoFQDNS).concat(AllstreamingFQDNS)
      }
    })
  }

  return (
    <PerfectScrollbar>
      <Grid maxWidth='sm' container spacing={6}>
        <PageHeader title={<Typography variant='h5'>FQDN</Typography>} />
        <Grid item xs={12}>
          <Button variant='outlined' onClick={saveChanges}>
            Save Changes
          </Button>
          <Stack gap={20}>
            <LinksContainer
              type='Api'
              isLoading={isLoading || updateLoading}
              data={APIFQDNS}
              dataSetter={setAPIFQDNS}
              newData={newAPIFQDNS}
              newDataSetter={setNewAPIFQDNS}
            />
            <LinksContainer
              type='Photo'
              isLoading={isLoading || updateLoading}
              data={photoFQDNS}
              dataSetter={setPhotoFQDNS}
              newData={newPhotoFQDNS}
              newDataSetter={setNewPhotoFQDNS}
            />
            <LinksContainer
              type='Streaming'
              isLoading={isLoading || updateLoading}
              data={streamingFQDNS}
              dataSetter={setStreamingFQDNS}
              newData={newStreamingFQDNS}
              newDataSetter={setNewStreamingFQDNS}
            />
          </Stack>
        </Grid>
      </Grid>
    </PerfectScrollbar>
  )
}

FQDN.acl = {
  action: 'read',
  subject: 'fqdn-page'
}

export default FQDN
