import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import PageHeader from 'src/@core/components/page-header'
import PerfectScrollbarComponent from 'react-perfect-scrollbar'
import { useQuery } from '@tanstack/react-query'
import FQDNService from '@/services/api/FQDNService'
import { useAuth } from '@/services/useAuth'
import { Stack } from '@mui/material'
import LinksContainer from './components/LinksContainer'

const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  height: '80vh',
  justifyContent: 'center',
  alignItems: 'flex-start',
  display: 'flex'
})

type response = {
  id: number
  site_id: number
  name: string
  type: 'Api' | 'Streaming' | 'Photo'  
}

const FQDN = () => {
  const [APIFQDNS, setAPIFQDNS] = useState<response[]>([])
  const [streamingFQDNS, setStreamingFQDNS] = useState<response[]>([])
  const [photosFQDNS, setPhotosFQDNS] = useState<response[]>([])
  const auth = useAuth()

  const { getFQDNList } = FQDNService()
  const { isLoading } = useQuery({
    queryKey : ['fqdns'],
    queryFn: () => getFQDNList({
      site: auth?.user?.site,
      paginate : 1000
     }),
    onSuccess: data => {
      console.log(data?.data)
      setAPIFQDNS(data?.data?.filter((item: response) => item?.type === 'Api'))
      setStreamingFQDNS(data?.data?.filter((item: response) => item?.type === 'Streaming'))
      setPhotosFQDNS(data?.data?.filter((item: response) => item?.type === 'Photo'))
    },
    onError: error => { console.log(error) }
  })
  
  return (
    <PerfectScrollbar>
      <Grid maxWidth='sm' container spacing={6}>
        <PageHeader title={<Typography variant='h5'>FQDN</Typography>} />
        <Grid item xs={12}>
          <Stack gap={20}>
            <LinksContainer data={APIFQDNS} type='Api' isLoading={isLoading} />
            <LinksContainer data={streamingFQDNS} type='Streaming' isLoading={isLoading} />
            <LinksContainer data={photosFQDNS} type='Photo' isLoading={isLoading} />
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
