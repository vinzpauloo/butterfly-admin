import React from 'react'

import Header from './components/Header'
import Container from '../components/Container'
import SecurityFunds from './views/SecurityFunds'
import Withdrawals from './views/Withdrawals'

type Props = {}

function FundsWithdrawal({}: Props) {
  return (
    <>
      <Container>
        <Header title='Security Funds' />
        <SecurityFunds />
      </Container>

      <Container>
        <Header title='Withdrawals' />
        <Withdrawals />
      </Container>
    </>
    

    
  )
}

FundsWithdrawal.acl = {
  action: 'read'
}

export default FundsWithdrawal