/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import Container from '@/pages/transactions/components/Container'
import Header from '@/pages/transactions/components/Header'
import Table from '@/pages/transactions/components/Table'
import TabLists from '@/pages/transactions/components/TabLists'

import { useAuth } from '@/services/useAuth'

function index({
  isLoading,
  isFetching,
  rowData,
  columnData,
  rowCount,
  pageSize,
  setPage,
  setPageSize,
  children = null,
  setOpen = null
}: any) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<any>('donations')

  useEffect(() => {
    const path = router.pathname.split('/')
    const pathName = path[path.length - 1] // get the pathname in end of the array
    setActiveTab(pathName)
  }, [router.pathname])

  const auth = useAuth()

  return (
    auth?.user?.role === "AGENT" ?
      <>AGENT TRANSACTIONS</>
    :
    <Container>
      <Header />
      {children}
      <TabLists activeTab={activeTab} setActiveTab={setActiveTab} setOpen={setOpen} />
      <Table
        isLoading={isLoading}
        isFetching={isFetching}
        rowData={rowData}
        columnData={columnData}
        rowCount={rowCount}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
      />
    </Container>
  )
}

index.acl = {
  action: 'read',
  subject: 'shared-page'
}

export default index
