import Container from '@/pages/components/Container'
import React from 'react'
import Header from '../components/customers/Header'
import CustomerTable from '../components/customers/Table'

const Customers = () => {
  return (
    <Container>
      <Header />
      <CustomerTable />
    </Container>
  )
}

export default Customers
