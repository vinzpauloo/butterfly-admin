// ** React Imports
import React, { useState } from 'react'

// ** MUI Imports
import { Box, Typography, Button, Card, CardHeader } from '@mui/material'

// ** Custom Components
import Container from '@/pages/components/Container'

// ** Third Party Components
import { useQuery } from '@tanstack/react-query'

// ** API
import FeedsService from '@/services/api/FeedsService'

// ** Types Imports
import { IFeedStory } from '@/context/types'
import { GridSortDirection } from '@mui/x-data-grid'
import TableNewsFeedApproval from '../views/TableNewsFeedApproval'

// ** Custom Hooks
import useDebounce from '@/hooks/useDebounce'
import { useTranslateString } from '@/utils/TranslateString'

// ** Struct
const ButtonFilters = [
  {
    id: 1,
    title: 'All Feeds',
    filter: 'all'
  },
  {
    id: 2,
    title: 'All Photo Feeds',
    filter: 'photos'
  },
  {
    id: 3,
    title: 'All Video Feeds',
    filter: 'videos'
  },
  {
    id: 4,
    title: 'Videos and Photos',
    filter: 'photos_videos'
  }
]

// ** Custom Components Inside
const Header = ({ handleFilterFeedTypeClick, buttonSelectedId, searchCreator, setSearchCreator, searchTitle, setSearchTitle, searchTag, setSearchTag }: any) => {
  
  const handleClear = () => {
    setSearchCreator('')
    setSearchTitle('')
    setSearchTag('')
  }

  const TranslateString = useTranslateString()

  return (
    <Box mb={2}>
      <Typography variant='h4' component='h4' mb={5}>
        {TranslateString('Newsfeed List')}
      </Typography>
      <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
        <Box
          sx={{ marginBottom: '2rem' }}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}
          gap={3}
        >
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            {ButtonFilters.map(button => (
              <Button
                key={button.id}
                size='small'
                variant={buttonSelectedId == button.id ? 'contained' : 'outlined'}
                onClick={() => handleFilterFeedTypeClick(`${button.filter}`, Number(`${button.id}`))}
              >
                {button.title}
              </Button>
            ))}
          </Box>

        </Box>
      </Box>
    </Box>
  )
}

const NewsFeedApproval = () => {
  // ** States
  const [rowData, setRowData] = React.useState<IFeedStory[]>([])
  const [total, setTotal] = React.useState(0)
  const [buttonSelectedId, setButtonSelectedId] = React.useState<number>(1)
  //feed params
  const [paginate, setPaginate] = React.useState<number>(7)
  const [page, setPage] = React.useState<number>(1)
  const [searchText, setSearchText] = React.useState('')
  const debounceSearchText = useDebounce(searchText, 600)
  const [sort, setSort] = React.useState<'desc' | 'asc'>('asc')
  const [specificType, setSpecificType] = React.useState<{} | null>(null)
  const [searchBy, setSearchBy] = React.useState<string>('username') //data columns
  const [sortBy, setSortBy] = React.useState<string>('username') //data columns

  const handleSetSort = (sort: GridSortDirection) => {
    setSort(sort as any)
  }
  const handleSetSortBy = (sortBy: string) => {
    setSortBy(sortBy as any)
  }

  // ** Tanstack and API
  const { getFeeds } = FeedsService()
  const getFeedQuery = useQuery({
    keepPreviousData: false,
    queryKey: ['getFeeds', paginate, page, debounceSearchText, sort, sortBy, specificType],
    queryFn: () =>
      getFeeds({
        paginate: paginate,
        page: page,
        sort: sort,
        sortBy: sortBy,
        ...(searchText !== '' && { search_value: searchText }),
        ...(specificType !== null && { ...specificType }), // video_only, images_only, video_images
        with: 'user',
        search_all: true,
        all: true,
        approval: 'Pending'
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

  const handleFilterFeedTypeClick = (
    filter: 'all' | 'photos' | 'videos' | 'photos_videos' | string,
    buttonId: number
  ) => {
    switch (filter) {
      case 'all':
        setSpecificType({})
        break
      case 'photos':
        setSpecificType({ images_only: true })
        break
      case 'videos':
        setSpecificType({ video_only: true })
        break
      case 'photos_videos':
        setSpecificType({ video_images: true })
        break
      default:
        setSpecificType({})
    }
    setButtonSelectedId(buttonId)
    console.log('filter', filter)
  }

  return (
    <>
      <Container>
        <Header handleFilterFeedTypeClick={handleFilterFeedTypeClick} buttonSelectedId={buttonSelectedId} />
        <TableNewsFeedApproval
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
        />
      </Container>
    </>
  )
}

export default NewsFeedApproval
