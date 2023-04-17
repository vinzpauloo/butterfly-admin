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
import { ThemeColor } from 'src/@core/layouts/types'
import { IFeedStory } from '@/context/types'
import { GridSortDirection } from '@mui/x-data-grid'
import TableNewsFeedApproval from '../views/TableNewsFeedApproval'

// ** Custom Hooks
import useDebounce from '@/hooks/useDebounce'


interface StatusObj {
  [key: number]: {
    title: string
    color: ThemeColor
  }
}
interface FeedsObj {
  [key: number]: {
    title: string
    iconPath: string
  }
}



const statusObj: StatusObj = {
  1: { title: 'pending', color: 'warning' },
  2: { title: 'declined', color: 'error' }
}

const feedsObj: FeedsObj = {
  1: { title: 'Story', iconPath: '/images/feeds/storyIcon.png' },
  2: { title: 'Videos', iconPath: '/images/feeds/videoIcon.png' },
  3: { title: 'Photos', iconPath: '/images/feeds/photoIcon.png' }
}


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
    queryKey: ['getFeeds', paginate, page, debounceSearchText, sort, searchBy, sortBy, specificType],
    queryFn: () => getFeeds({
      paginate : paginate,
      page : page,
      sort : sort,
      sortBy : sortBy,
      ...(searchText !== "" && { search_by : searchBy }),
      ...(searchText !== "" && { search_value: searchText }),
      ...(specificType !== null && {specificType : specificType}),
      with : 'user',
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

  const handleFilterButtonClick = (filter : 'all' | 'photos' | 'videos' | 'photos_videos') => {

    console.log('filter',filter)
    setSpecificType({
      video : true
    })

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
              <Button size='small' variant='contained' onClick={() => handleFilterButtonClick('all')}>
                All Feeds
              </Button>

              <Button size='small' variant='outlined' onClick={() => handleFilterButtonClick('photos')}>
                All Photo Feeds
              </Button>

              <Button size='small' variant='outlined' onClick={() => handleFilterButtonClick('videos')}>
                All Video Feeds
              </Button>

              <Button size='small' variant='outlined' onClick={() => handleFilterButtonClick('photos_videos')}>
                Videos With handleFilterButtonClick
              </Button>
            </Box>
          }
        />
        <TableNewsFeedApproval 
          isLoading={getFeedQuery.isLoading} 
          rowCount={total}
          rows={rowData} 
          pageSize={pageSize}
          setPageSize={setPageSize}
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
