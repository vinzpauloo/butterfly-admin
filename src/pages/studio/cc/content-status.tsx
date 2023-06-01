// ** React Imports
import React, { useState } from 'react'

// ** MUI Imports
import { Box, Typography, Button } from '@mui/material'

// ** Custom Components
import Container from '@/pages/components/Container'

// ** Third Party Components
import { useQuery } from '@tanstack/react-query'

// ** API
import ContentService from '@/services/api/ContentService'

// ** Types Imports
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar'
import { GridSortDirection } from '@mui/x-data-grid'
import TableCCContentStatus from './views/TableCCContentStatus'

// ** Custom Hooks
import useDebounce from '@/hooks/useDebounce'
import { useTranslateString } from '@/utils/TranslateString'

// ** Types
type StatusTypes = 'Approved' | 'Pending' | 'Declined'

interface SnackState extends SnackbarOrigin {
  open: boolean
}

const ContentStatus = () => {
  // ** States
  const [data, setData] = React.useState([])
  const [rowCount, setRowCount] = React.useState(0)
  const [total, setTotal] = React.useState(0)
  const [page, setPage] = React.useState<number>(1)
  const [pageSize, setPageSize] = React.useState(10)
  const [postStatus, setPostStatus] = React.useState<'Approved' | 'Pending' | 'Declined'>('Pending') //data columns
  const [snackState, setSnackState] = React.useState<SnackState>({
    open: false,
    vertical: 'top',
    horizontal: 'right'
  })

  const handleSetSort = (sort: GridSortDirection) => {
    //setSort(sort as any)
  }
  const handleSetSortBy = (sortBy: string) => {
    //setSortBy(sortBy as any)
  }

  // ** Tanstack and API
  const { getContents } = ContentService()
  const getContentQuery = useQuery({
    keepPreviousData: false,
    queryKey: ['contents', page, pageSize, postStatus],
    queryFn: () => getContents({ data: { with: 'user', page: page, paginate: pageSize, approval: postStatus } }),
    onSuccess: data => {
      setData(data.data)
      setRowCount(data.total)
      setPage(data.current_page)
      setTotal(data.total)
    }
  })

  const handlePageChange = (newPage: number) => {
    console.log('call handle page', newPage + 1)
    setPage(newPage + 1) // 0 based
  }

  // ** Custom Components Inside
  const Header = ({ searchCreator, setSearchCreator, searchTitle, setSearchTitle, searchTag, setSearchTag }: any) => {
    const handleClear = () => {
      setSearchCreator('')
      setSearchTitle('')
      setSearchTag('')
    }

    const TranslateString = useTranslateString()

    return (
      <Box mb={2}>
        <Typography variant='h4' component='h4' mb={5}>
          {TranslateString('CC Content List')}
        </Typography>
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
          <Box
            sx={{ marginBottom: '2rem' }}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            gap={3}
          >
            <Button size='small' variant='contained' color='warning' onClick={() => setPostStatus('Pending')}>
              {TranslateString('Pending')}
            </Button>

            <Button size='small' variant='contained' color='error' onClick={() => setPostStatus('Declined')}>
              {TranslateString('Declined')}
            </Button>
          </Box>
        </Box>
      </Box>
    )
  }

  return (
    <>
      <Container>
        <Header />
        <TableCCContentStatus
          isLoading={getContentQuery.isLoading || getContentQuery.isFetching}
          rowCount={total}
          rows={data}
          pageSize={pageSize}
          setPageSize={setPageSize}
          handlePageChange={handlePageChange}
          handleSetSort={handleSetSort}
          handleSetSortBy={handleSetSortBy}
          postStatus={postStatus}
        />
      </Container>
    </>
  )
}

ContentStatus.acl = {
  action: 'read',
  subject: 'cc-only-page'
}

export default ContentStatus
