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
import TableNewsFeedApproval from '../views/TableNewsFeedApproval'

// ** Custom Hooks
import useDebounce from '@/hooks/useDebounce'

// ** Struct
const ButtonFilters = [
  {
    id : 1,
    title : 'All Feeds',
    filter : 'all'
  },
  {
    id : 2,
    title : 'All Photo Feeds',
    filter : 'photos'
  },
  {
    id : 3,
    title : 'All Video Feeds',
    filter : 'videos'
  },
  {
    id : 4,
    title : 'Videos and Photos',
    filter : 'photos_videos'
  },
]


const NewsFeedApproval = () => {
  // ** States
  const [hideNameColumn, setHideNameColumn] = React.useState(false)
  const [rowData, setRowData] = React.useState<IFeedStory[]>([])
  const [pageSize, setPageSize] = React.useState(7)
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
    console.log('new SORTING BY IS', sortBy)
    setSortBy(sortBy as any)
  }


  // ** Tanstack and API
  const { getFeeds } = FeedsService()
  const getFeedQuery = useQuery({
    keepPreviousData: false,
    queryKey: ['getFeeds', paginate, page, debounceSearchText, sort, sortBy, specificType],
    queryFn: () => getFeeds({
      paginate : paginate,
      page : page,
      sort : sort,
      sortBy : sortBy,
      ...(searchText !== "" && { search_value: searchText }),
      ...(specificType !== null && {...specificType}), // video_only, images_only, video_images
      with : 'user',
      search_all : true,
      all : true
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

  const handleFilterFeedTypeClick = (filter : 'all' | 'photos' | 'videos' | 'photos_videos' | string) => {

    switch( filter ) {
      case 'all' : setSpecificType({})
      break;
      case 'photos' : setSpecificType({images_only : true})
      break;
      case 'videos' : setSpecificType({video_only : true})
      break;
      case 'photos_videos' : setSpecificType({video_images : true})
      break;
      default : setSpecificType({})
    }
    console.log('filter',filter)
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
          action={
            <Box sx={{ display: 'flex', gap: '1rem' }}>
              {
                ButtonFilters.map( button => (
                  <Button key={button.id} size='small' variant='contained' onClick={() => handleFilterFeedTypeClick(`${button.filter}`) }>
                    {button.title}
                  </Button>
                ))
              }
            </Box>
          }
        />
        <TableNewsFeedApproval 
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



export default NewsFeedApproval
