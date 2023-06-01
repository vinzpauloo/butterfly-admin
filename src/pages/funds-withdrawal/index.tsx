import React from 'react'

import Header from './components/Header'
import Container from '../components/Container'
import SecurityAndWithdrawals from './views/SecurityAndWithdrawals'

// ** Tanstack APIS
import { SettingsService } from '@/services/api/SettingsService'
import { useQuery, useQueryClient } from '@tanstack/react-query'

type Props = {}

function FundsWithdrawal({}: Props) {

  // ** APIS
  const { getGlobalSettings } = SettingsService()   

  const {data:settingsData} = useQuery({
    queryFn : getGlobalSettings,
    queryKey : ['withdrawals'],
    onSuccess : ( data ) => { console.log('Settings Data',data) }
  })

  return (
    <>

      <Container>
        {
          settingsData && 
          <SecurityAndWithdrawals data={settingsData} />

        }
      </Container>
    </>
    

    
  )
}

FundsWithdrawal.acl = {
  action: 'read'
}

export default FundsWithdrawal