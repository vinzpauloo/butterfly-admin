// ** React Imports
import React from 'react'

// ** Other Imports
import Container from './components/Container'
import Header from './components/Header'
import VersionsTable from './table/VersionsTable'
import { SiteProvider } from '../../context/SiteContext'

const Wallet = () => {
  return (
    <SiteProvider>
      <Container>
        <Header />
        <VersionsTable />
      </Container>
    </SiteProvider>
  )
}

Wallet.acl = {
  action: 'read'
}

export default Wallet
