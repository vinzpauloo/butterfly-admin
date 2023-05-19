import React from 'react'
import Header from './components/Header'
import Container from '@/pages/components/Container'
import CommissionsTable from './table/CommissionsTable'

const CommissionsReport = () => {
  return (
    <Container>
      <Header />
      <CommissionsTable />
    </Container>
  )
}

export default CommissionsReport
