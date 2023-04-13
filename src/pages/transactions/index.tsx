/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'

import Container from '@/pages/transactions/components/Container'
import Header from '@/pages/transactions/components/Header'
import Table from '@/pages/transactions/components/Table'
import TabLists from '@/pages/transactions/components/TabLists'

import { useRouter } from 'next/router'

function index({ rowData, columnData }: any) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<any>('donations')

  // @ts-ignore
  // const { rowData, columnData } = TabsSampleData[activeTab]

  useEffect(() => {
    const path = router.pathname.split('/')
    const pathName = path[path.length - 1] // get the pathname in end of the array
    setActiveTab(pathName)
  }, [router.pathname])

  return (
    <Container>
      <Header />
      <TabLists activeTab={activeTab} setActiveTab={setActiveTab} />
      <Table rowData={rowData} columnData={columnData} />
    </Container>
  )
}

export default index
