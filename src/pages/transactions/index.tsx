/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'

import Container from '@/pages/transactions/components/Container'
import Header from '@/pages/transactions/components/Header'
import Table from '@/pages/transactions/components/Table'
import TabLists from '@/pages/transactions/components/TabLists'

import { useRouter } from 'next/router'

function index({ isLoading, isFetching, rowData, columnData, rowCount, pageSize, setPage, setOpen = null }: any) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<any>('donations')

  useEffect(() => {
    const path = router.pathname.split('/')
    const pathName = path[path.length - 1] // get the pathname in end of the array
    setActiveTab(pathName)
  }, [router.pathname])

  return (
    <Container>
      <Header />
      <TabLists activeTab={activeTab} setActiveTab={setActiveTab} setOpen={setOpen} />
      <Table
        isLoading={isLoading}
        isFetching={isFetching}
        rowData={rowData}
        columnData={columnData}
        rowCount={rowCount}
        pageSize={pageSize}
        setPage={setPage}
      />
    </Container>
  )
}

export default index
