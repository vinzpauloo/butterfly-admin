import React,{ useEffect, useState, useCallback, ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColumns, GridRenderCellParams, GridSortModel, GridSortDirection } from '@mui/x-data-grid'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import ServerSideToolbar from 'src/views/table/data-grid/ServerSideToolbar'

interface StatusObj {
  [key: string]: {
    title: string
    color: ThemeColor
  }
}
interface FeedsObj {
  [key: string]: {
    title: string
    iconPath: string
  }
}
const statusObj: StatusObj = {
  'Approved': { title: 'Approved', color: 'success' },
  'Declined': { title: 'Declined', color: 'error' }
}

const feedsObj: FeedsObj = {
  story: { title: 'Story', iconPath: '/images/feeds/storyIcon.png' },
  video: { title: 'Videos', iconPath: '/images/feeds/videoIcon.png' },
  image: { title: 'Photos', iconPath: '/images/feeds/photoIcon.png' }
}

type TableProps = {
  rows: any
  isLoading: boolean
  rowCount: number
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  searchText : string
  setSearchText: React.Dispatch<React.SetStateAction<string>>
  handlePageChange: (newPage: number) => void
  handleSetSort: (sort: GridSortDirection) => void
  handleSetSortBy: (sortBy: string) => void
}

const TableNewsFeedApproval = ({rows, isLoading, rowCount, pageSize, setPageSize, searchText, setSearchText, handlePageChange, handleSetSort, handleSetSortBy}: TableProps) => {
    
    // Fn Sorting
    const handleSortModel = (newModel: GridSortModel) => {
        if (newModel.length) {
            handleSetSort(newModel[0].sort)
            handleSetSortBy(newModel[0].field)
        } else {
            handleSetSort('asc')
            handleSetSortBy('username')
        }
    }

    // Fn Search
    const handleSearch = (value: string) => {
        setSearchText(value)
    }

    // Fn renderFeed
    const renderFeedType = (params: string) => {
       
       return (
                <>
                    {params.includes ('story') && <img width={20} src={feedsObj['story'].iconPath } />}
                    {params.includes ('video') && <img width={20} src={feedsObj['video'].iconPath } />}
                    {params.includes ('image') && <img width={20} src={feedsObj['image'].iconPath } />}
                </>
       )
    }

    // ** Columns
    const columns: GridColumns = [
        {
          flex: 1,
          minWidth: 100,
          maxWidth: 100,
          field: 'type',
          headerName: 'Feed Type',
          renderCell: (params: GridRenderCellParams) => {
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        { params.row.type ? renderFeedType(params.row.type) : renderFeedType('story')  }
                    </Box>
                )
          }
        },
        {  
          flex: 1,
          minWidth: 150,
          maxWidth:150,
          headerName: 'Username',
          field: 'username',
          renderCell: (params: GridRenderCellParams) => (
            <Typography variant='body2' sx={{ color: 'text.primary' }}>
              {params.row.user.username}
            </Typography>
          )
        },
        {
          flex: 1,
          width: 200,
          field: 'string_story',
          headerName: 'Story',
          renderCell: (params: GridRenderCellParams) => (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                { params.row.string_story  }
            </Box>
          )
        },
        {
          flex: 1,
          field: 'video_url',
          headerName: 'Video URL',
          renderCell: (params: GridRenderCellParams) => (
            <Typography variant='body2' sx={{ color: 'text.primary' }}>
              .
            </Typography>
          )
        },
        {
          flex: 1,
          field: 'status',
          headerName: 'Status',
          renderCell: (params: GridRenderCellParams) => {
            const status = statusObj[params.row.approval]

            return (
              <CustomChip
                size='small'
                skin='light'
                color={status.color}
                label={status.title}
                sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
              />
            )
          }
        }
      ]


   return (
    <DataGrid
      loading={isLoading}
      getRowId={ row => row._id }
      autoHeight
      pagination
      rows={rows}
      rowCount={rowCount}
      columns={columns}
      pageSize={pageSize}
      sortingMode='server'
      paginationMode='server'
      onSortModelChange={handleSortModel}
      rowsPerPageOptions={[7, 10, 25, 50]}
      onPageChange={newPage => handlePageChange(newPage)}
      components={{ Toolbar: ServerSideToolbar }}
      onPageSizeChange={newPageSize => setPageSize(newPageSize)}
      componentsProps={{
        baseButton: {
          variant: 'outlined'
        },
        toolbar: {
          value: searchText,
          clearSearch: () => handleSearch(''),
          onChange: (event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)
        }
      }}
    />
  )
}

export default TableNewsFeedApproval
