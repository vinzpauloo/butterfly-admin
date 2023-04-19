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

// ** Styled PerfectScrollbar component
const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  height: '80vh',
  justifyContent: 'center',
  alignItems: 'flex-start',
  display: 'flex'
})

type FQDNProps = {}

const FQDN = (props: FQDNProps) => {

  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const handleAPISubmit = (data: any) => {
    const { expando: values } = data
    console.log('data submit from outside', values)
    // DO MUTATIONS
    setIsLoading(true)
    setTimeout( () => {
        setIsLoading(false)
    }, 1300)
  }

  return (
    <PerfectScrollbar>
      <Grid maxWidth='sm' container spacing={6}>
        <PageHeader title={<Typography variant='h5'>FQDN</Typography>} />
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: '5rem', flexDirection: 'column' }}>
            <ExpandoForm handleExpandoSubmit={handleAPISubmit} fileType='text' pageHeader="API's" isLoading={isLoading} />
            <ExpandoForm handleExpandoSubmit={handleAPISubmit} fileType='text' pageHeader='STREAMING' isLoading={isLoading} />
            <ExpandoForm handleExpandoSubmit={handleAPISubmit} fileType='text' pageHeader='PHOTOS' isLoading={isLoading} />
          </Box>
        </Grid>
      </Grid>
    </PerfectScrollbar>
  )
}

export default FQDN
