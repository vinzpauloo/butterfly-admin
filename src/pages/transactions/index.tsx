/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import Container from '@/pages/transactions/components/Container'
import Table from '@/pages/transactions/components/Table'
import { Typography } from '@mui/material'
import { useTranslateString } from '@/utils/TranslateString'

function index({
  title,
  isLoading,
  isFetching,
  rowData,
  columnData,
  rowCount,
  pageSize,
  setPage,
  setPageSize,
  children = null,
}: any) {

  const TranslateString = useTranslateString()

  return (
    <Container>
      <Typography variant='h4' component='h4' mb={5}>{TranslateString('Transactions')} - {TranslateString(`${title}`)}</Typography>
      {children}
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
