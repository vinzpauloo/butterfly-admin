// ** React Imports
import React, { useState } from 'react'

// ** MUI Imports
import { Box, Typography, Button } from '@mui/material'

// ** Custom Components
import Container from '@/pages/components/Container'

// ** Third Party Components
import { useQuery } from '@tanstack/react-query'

// ** API
import FeedsService from '@/services/api/FeedsService'

// ** Types Imports
import { IFeedStory } from '@/context/types'
import { GridSortDirection } from '@mui/x-data-grid'
import TableCCFeedStatus from './views/TableCCFeedStatus'

// ** Custom Hooks
import useDebounce from '@/hooks/useDebounce'
import { useTranslateString } from '@/utils/TranslateString';


const PostStatus = () => {

  // ** States
  const [rowData, setRowData] = React.useState<IFeedStory[]>([])
  const [total, setTotal] = React.useState(0)
  //feed params
  const [paginate, setPaginate] = React.useState<number>(7)
  const [page, setPage] = React.useState<number>(1)
  const [searchText, setSearchText] = React.useState('')
  const debounceSearchText = useDebounce(searchText, 600)
  const [sort, setSort] = React.useState<'desc' | 'asc'>('asc')
  const [specificType, setSpecificType] = React.useState<{} | null>(null)
  const [searchBy, setSearchBy] = React.useState<string>('username') //data columns
  const [sortBy, setSortBy] = React.useState<string>('username') //data columns
  const [postStatus, setPostStatus] = React.useState<'Approved' | 'Pending' | 'Declined'>('Pending') //data columns

  const handleSetSort = (sort: GridSortDirection) => {
    setSort(sort as any)
  }
  const handleSetSortBy = (sortBy: string) => {
    setSortBy(sortBy as any)
  }

  // ** Tanstack and API
  const { getFeedsByCC } = FeedsService()
  const getFeedQuery = useQuery({
    keepPreviousData: false,
    queryKey: ['getFeeds', paginate, page, debounceSearchText, sort, sortBy, specificType, postStatus],
    queryFn: () =>
      getFeedsByCC({
        all: true,
        with: 'user',
        approval: postStatus
      }),
    onSuccess: response => {
      setRowData(response.data)
      setTotal(response.total)
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
          {TranslateString('CC Newsfeed List')}
        </Typography>
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
          <Box sx={{marginBottom:'2rem'}} display={'flex'} alignItems={'center'} justifyContent={'space-between'} gap={3}>

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
        <TableCCFeedStatus
          isLoading={getFeedQuery.isLoading || getFeedQuery.isFetching}
          rowCount={total}
          rows={rowData}
          pageSize={paginate}
          setPageSize={setPaginate}
          searchText={searchText}
          setSearchText={setSearchText}
          handlePageChange={handlePageChange}
          handleSetSort={handleSetSort}
          handleSetSortBy={handleSetSortBy}
          postStatus={postStatus}
        />
      </Container>
    </>
  )
}

PostStatus.acl = {
  action: 'read',
  subject: 'cc-post-status'
}

export default PostStatus
