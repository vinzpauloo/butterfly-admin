// ** React Imports
import React from 'react'

// ** Project/Component Imports
import Container from '@/pages/components/Container'
import Header from './components/Header'
import SecurityFundsTable from './table/SecurityFundsTable'

const SecurityFundsReport = () => {
  return (
    <Container>
      <Header />
      <SecurityFundsTable />
    </Container>
  )
}

export default SecurityFundsReport
