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

const FQDN = () => {
  const [APIFQDNS, setAPIFQDNS] = useState<any>([])
  const [streamingFQDNS, setStreamingFQDNS] = useState<any>([])
  const [photosFQDNS, setPhotosFQDNS] = useState<any>([])
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
      setAPIFQDNS(data?.data?.filter((item: any) => item?.type === 'Api'))
      setStreamingFQDNS(data?.data?.filter((item: any) => item?.type === 'Streaming'))
      setPhotosFQDNS(data?.data?.filter((item: any) => item?.type === 'Photo'))
    },
    onError: error => { console.log(error) }
  })
  
  return (
    <PerfectScrollbar>
      <Grid maxWidth='sm' container spacing={6}>
        <PageHeader title={<Typography variant='h5'>FQDN</Typography>} />
        <Grid item xs={12}>
          <Stack gap={20}>
            <LinksContainer data={APIFQDNS} header="API's" isLoading={isLoading} />
            <LinksContainer data={streamingFQDNS} header='STREAMING' isLoading={isLoading} />
            <LinksContainer data={photosFQDNS} header='PHOTOS' isLoading={isLoading} />
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
