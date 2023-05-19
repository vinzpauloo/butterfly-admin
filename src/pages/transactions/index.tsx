/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import Container from '@/pages/transactions/components/Container'

// import Header from '@/pages/transactions/components/Header'
import Table from '@/pages/transactions/components/Table'
import TabLists from '@/pages/transactions/components/TabLists'
import { Typography } from '@mui/material'
import { useTranslateString } from '@/utils/TranslateString'



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

  const TranslateString = useTranslateString()

  return (
    <Container>
      {/* <Header /> */}
      <Typography variant='h4' component='h4' mb={5}>{TranslateString("Transactions")}</Typography>
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

export default index
