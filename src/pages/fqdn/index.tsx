import React from 'react'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Third Party Components
import PerfectScrollbarComponent from 'react-perfect-scrollbar'

// ** Views
import ExpandoForm from './views/ExpandoForm'

// ** API queries
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import FQDNService from '@/services/api/FQDNService'
import SitesService from '@/services/api/SitesService'

// ** Styled PerfectScrollbar component
const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  height: '80vh',
  justifyContent: 'center',
  alignItems: 'flex-start',
  display: 'flex'
})

type FQDNProps = {}

const FQDN = (props: FQDNProps) => {

  // ** states
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [site, setSite] = React.useState<number>(2)
  const [sort, setSort] = React.useState<'desc' | 'asc'>('desc')
  const [sortBy, setSortBy] = React.useState('fqdn')
  const [paginate, setPaginate] = React.useState<number>(20)

  // ** apis
  const { getFQDNList, getSuperAgentFQDNList, addFQDN } = FQDNService()
  const { getSitesList } = SitesService()


  const myQ = useQuery({
    queryKey : ['fqdn',site,sort,sortBy,paginate],
    queryFn : () => getSuperAgentFQDNList({ 
      site : site,
      sort : sort,
      sort_by : sortBy,
      paginate : paginate
     }),
    onSuccess : (res) => { console.log('res',res) }
  })
  
  const queryClient = useQueryClient()
  const fqdnMutate = useMutation({
    mutationFn : addFQDN,
    onSuccess : (response) => { console.log('response from addFQDN', response) },
    onMutate : () => {},
    onSettled : () => {
        queryClient.invalidateQueries(['fqdns']) 
    }
  }) 

  const handleAPISubmit = async (data: any) => {
    const { expando: values } = data
    console.log('data submit from outside', values)
    // DO MUTATIONS
    setIsLoading(true)

    const promises = values.map( (value : { value : string }) => fqdnMutate.mutateAsync({ data : {
      site : 2,
      name : value.value,
      type : 'API'
    } }) )

    await Promise.all(promises)
    setIsLoading(false)

  }

  console.log('myQ', myQ)
  
  return (
    <PerfectScrollbar>
      <Grid maxWidth='sm' container spacing={6}>
        <PageHeader title={<Typography variant='h5'>FQDN</Typography>} />
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: '5rem', flexDirection: 'column' }}>
            <ExpandoForm handleExpandoSubmit={handleAPISubmit} fileType='text' pageHeader="API's" isLoading={isLoading} />
            <ExpandoForm fileType='text' pageHeader='STREAMING' isLoading={isLoading} />
            <ExpandoForm fileType='text' pageHeader='PHOTOS' isLoading={isLoading} />
          </Box>
        </Grid>
      </Grid>
    </PerfectScrollbar>
  )
}

FQDN.acl = {
  action: 'read',
  subject: 'sa-page'
}

export default FQDN
