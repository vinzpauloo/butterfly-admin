import React, { useEffect, useState } from 'react'

import TabLists from '@/pages/transactions/components/TabLists'
import Container from '@/pages/transactions/components/Container'
import Table from '@/pages/transactions/components/Table'
import Header from '@/pages/transactions/components/Header'

import TabsSampleData from '@/data/TabsSampleData'
import { useRouter } from 'next/router'

function index() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<any>('donations')
  // @ts-ignore
  const { rowData, columnData } = TabsSampleData[activeTab]

  useEffect(() => {
    const path = router.pathname.split('/')
    const pathName = path[path.length - 1] // get the pathname in end of the array
    setActiveTab(pathName)
  }, [])

  return (
    <Container>
      <Header />
      <TabLists activeTab={activeTab} setActiveTab={setActiveTab} />
      <Table rowData={rowData} columnData={columnData} />
    </Container>
  )
}

export default index
