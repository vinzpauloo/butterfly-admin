// ** React Imports
import React from 'react'

// ** Other Imports
import Container from './components/Container'
import Header from './components/Header'
import VersionsTable from './table/VersionsTable'
import { SiteProvider } from './context/SiteContext'

const Versions = () => {
  return (
    <SiteProvider>
      <Container>
        <Header />
        <VersionsTable />
      </Container>
    </SiteProvider>
  )
}

export default Versions
