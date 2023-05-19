import React from 'react'
import Container from '@/pages/components/Container'
import Header from './components/Header'
import BalanceHistoryTable from './table/BalanceHistoryTable'

const BalanceHistoryReport = () => {
  return (
    <Container>
      <Header />
      <BalanceHistoryTable />
    </Container>
  )
}

export default BalanceHistoryReport
