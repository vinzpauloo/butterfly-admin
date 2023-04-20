// ** React Imports
import React, { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

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


const PostStatus = () => {
  // ** States
  const [rowData, setRowData] = React.useState<IFeedStory[]>([])
  const [total, setTotal] = React.useState(0)
  //feed params
  const [ paginate, setPaginate ] = React.useState<number>(7)
  const [ page, setPage ] = React.useState<number>(1)
  const [searchText, setSearchText] = React.useState('')
  const debounceSearchText = useDebounce(searchText, 600)
  const [ sort, setSort ] = React.useState<'desc' | 'asc'>('asc')
  const [specificType, setSpecificType] = React.useState<{} | null>(null)
  const [ searchBy, setSearchBy ] = React.useState<string>('username') //data columns
  const [ sortBy, setSortBy ] = React.useState<string>('username') //data columns


  const handleSetSort = (sort : GridSortDirection) => {
    setSort(sort as any)
  }
  const handleSetSortBy = (sortBy : string) => {
    setSortBy(sortBy as any)
  }


  // ** Tanstack and API
  const { getFeedsByCC } = FeedsService()
  const getFeedQuery = useQuery({
    keepPreviousData: false,
    queryKey: ['getFeeds', paginate, page, debounceSearchText, sort, sortBy, specificType],
    queryFn: () => getFeedsByCC({
      all : true,
      with : 'user'
    }),
    onSuccess: response => {
      setRowData(response.data)
      setTotal(response.total)
    }
  })

  const handlePageChange = (newPage : number) => {
    console.log('call handle page', newPage + 1)
    setPage(newPage + 1) // 0 based
  }

  return (
    <>
      <Typography
        variant='h6'
        sx={{
          marginInline: 'auto',
          mb: 7,
          mt: 7,
          lineHeight: 1,
          fontWeight: 600,
          textTransform: 'uppercase',
          fontSize: '1.3rem !important',
          textAlign: 'center'
        }}
        color={theme => theme.customBflyColors.primaryText}
      >
        NEWSFEED LIST
      </Typography>
      <Card>
        <CardHeader
          sx={{
            '& .MuiCardHeader-content': {
              display: 'none'
            }
          }}
        />
        <TableCCFeedStatus 
          isLoading={getFeedQuery.isLoading || getFeedQuery.isFetching} 
          rowCount={total}
          rows={rowData} 
          pageSize={paginate}
          setPageSize={setPaginate}
          searchText={searchText}
          setSearchText={setSearchText}
          handlePageChange={ handlePageChange }
          handleSetSort={handleSetSort}
          handleSetSortBy={handleSetSortBy}
          />
      </Card>
    </>
  )
}

PostStatus.acl = {
  action: 'read',
  subject: 'cc-post-status'
}

export default PostStatus
