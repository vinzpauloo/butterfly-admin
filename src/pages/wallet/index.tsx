// ** React Imports
import React from 'react'

// ** Other Imports
import Container from './components/Container'
import Header from './components/Header'
import PaymentsTable from './table/PaymentsTable'

const Wallet = () => {
  return (
    <Container>
      <Header />
      <PaymentsTable />
    </Container>
  )
}

Wallet.acl = {
  action: 'read'
}

export default Wallet
