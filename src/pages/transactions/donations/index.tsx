import React, { useState } from 'react'

import TabLists from '@/pages/transactions/components/TabLists'
import Container from '@/pages/transactions/components/Container'
import Table from '@/pages/transactions/components/Table'
import Header from '@/pages/transactions/components/Header'

import TabsSampleData from '../data/TabsSampleData'

function index() {
  const [activeTab, setActiveTab] = useState<any>('DONATIONS')

  const { rowData, columnData } = TabsSampleData[activeTab]

  return (
    <Container>
      <Header />
      <TabLists activeTab={activeTab} setActiveTab={setActiveTab} />
      <Table rowData={rowData} columnData={columnData} />
    </Container>
  )
}

export default index
