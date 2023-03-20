// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

// ** Third Party Components

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import SearchToolbar from '@/pages/studio/shared-component/SearchToolbar'
import FeedDialog from '@/pages/studio/shared-component/FeedDialog'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'
import { DataGridRowType } from '../../types/types'

// ** Data Import
import { rows } from '@/data/dummyNewsFeedData'

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

const renderFeedType = (params: GridRenderCellParams) => {
  const { row } = params

  if (row.feedTypes.length) {

    return (
      <Box sx={{ display: 'flex', gap: '.5rem' }}>
        {
          row.feedTypes.map((feed: number, index: number) => (
            <img key={index} alt={`${feedsObj[feed].title}`} width={20} src={`${feedsObj[feed].iconPath}`} />
          ))
        }
      </Box>
    )

  } else {
    return <></>
  }

}

const statusObj: StatusObj = {
  1: { title: 'pending', color: 'warning' },
  2: { title: 'declined', color: 'error' },
}

const feedsObj: FeedsObj = {
  1: { title: 'Story', iconPath: '/images/feeds/storyIcon.png' },
  2: { title: 'Videos', iconPath: '/images/feeds/videoIcon.png' },
  3: { title: 'Photos', iconPath: '/images/feeds/photoIcon.png' },
}

const escapeRegExp = (value: string) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

const NewsFeedApproval = () => {
  // ** States
  const [pageSize, setPageSize] = useState<number>(7)
  const [hideNameColumn, setHideNameColumn] = useState(false)
  const [data] = useState<DataGridRowType[]>(rows)
  const [searchText, setSearchText] = useState<string>('')
  const [filteredData, setFilteredData] = useState<DataGridRowType[]>([])

  const handleSearch = (searchValue: string) => {
    setSearchText(searchValue)
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i')
    const filteredRows = data.filter(row => {
      return Object.keys(row).some(field => {
        // @ts-ignore
        return searchRegex.test(row[field].toString())
      })
    })
    if (searchValue.length) {
      setFilteredData(filteredRows)
    } else {
      setFilteredData([])
    }
  }

  const columns: GridColDef[] = [
    {
      flex: 0.1,
      minWidth: 150,
      field: 'feed_type',
      headerName: 'Feed Type',
      align: 'center',
      headerAlign: 'center',
      hide: hideNameColumn,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderFeedType(params)}
          </Box>
        )
      }
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'full_name',
      headerName: 'Content Creator',
      hide: hideNameColumn,
      renderCell: (params: GridRenderCellParams) => {
        const { row } = params

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                {row.full_name}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 120,
      headerName: 'Title',
      field: 'title',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.title}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 110,
      field: 'video_url',
      headerName: 'Video URL',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.email}
        </Typography>
      )
    },
    {
      flex: 0.13,
      minWidth: 140,
      field: 'category',
      headerName: 'Category',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          Multiple Categories
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 140,
      field: 'post_update',
      headerName: 'Post Update',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.post_update}
        </Typography>
      )
    },
    {
      flex: 0.01,
      minWidth: 140,
      field: 'status',
      headerName: 'Status',
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams) => {
        const status = statusObj[params.row.status]

        return (
          <CustomChip
            size='small'
            skin='light'
            color={status.color}
            label={status.title}
            sx={{ '&': { padding: '1em 1em', borderRadius: '3px !important' }, '& .MuiChip-label': { textTransform: 'capitalize' } }}
          />
        )
      }
    },
    {
      flex: 0.06,
      minWidth: 50,
      field: 'actions',
      headerName: '',
      align: 'center',
      renderCell: (params: GridRenderCellParams) => {
        return (
          <FeedDialog param={params.row} />
        )
      }
    }
  ]

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
              <Button size='small' variant='contained' onClick={() => setHideNameColumn(!hideNameColumn)}>
                All Feeds
              </Button>

              <Button size='small' variant='outlined' onClick={() => setHideNameColumn(!hideNameColumn)}>
                All Photo Feeds
              </Button>

              <Button size='small' variant='outlined' onClick={() => setHideNameColumn(!hideNameColumn)}>
                All Video Feeds
              </Button>

              <Button size='small' variant='outlined' onClick={() => setHideNameColumn(!hideNameColumn)}>
                Videos With Photos
              </Button>
            </Box>

          }
        />
        <DataGrid
          disableSelectionOnClick
          autoHeight
          rows={filteredData.length ? filteredData : data}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[7, 10, 25, 50]}
          components={{ Toolbar: SearchToolbar }}
          componentsProps={{
            baseButton: {
              variant: 'outlined'
            },
            toolbar: {
              value: searchText,
              clearSearch: () => handleSearch(''),
              onChange: (event: React.ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)
            }
          }}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        />
      </Card>
    </>
  )
}

export default NewsFeedApproval
