import React,{ useEffect, useState, useCallback, ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColumns, GridRenderCellParams, GridSortModel, GridSortDirection } from '@mui/x-data-grid'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import ServerSideToolbar from 'src/views/table/data-grid/ServerSideToolbar'

// ** Third party
import { Icon } from '@iconify/react'

// ** Utils
import formatDate from '@/utils/formatDate'
import { useTranslateString } from '@/utils/TranslateString';

// ** Types
import { IFeedStory } from '@/context/types'
import EditFeedDrawer from './EditFeedDrawer'

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
  'Declined': { title: 'Declined', color: 'error' },
  'Pending': { title: 'Pending', color: 'warning' }
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
  handleSetSortBy: (sortBy: string) => void,
  postStatus : 'Approved' | 'Pending' | 'Declined'
}

const TableCCFeedStatus = ({rows, isLoading, rowCount, pageSize, setPageSize, searchText, setSearchText, handlePageChange, handleSetSort, handleSetSortBy, postStatus}: TableProps) => {
    
    // ** Drawer States
    const [ open, setOpen ] = React.useState<boolean>(false)

    const [editFeedOpen, setEditFeedOpen] = React.useState<boolean>(false)
    const [ editFeedRow, setEditFeedRow ] = React.useState<IFeedStory | null>(null)

    const toggleEditFeedDrawer = () => setEditFeedOpen(!editFeedOpen)

    const toggle = () => {
      setOpen(!open)
    }

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

  const truncate = (str : string) => {
    return str.length > 16 ? str.substring(0, 15) + "..." : str;
  }
  
  const TranslateString = useTranslateString()

    // ** Columns
    const columns: GridColumns = [
        {
          flex: 1,
          minWidth: 150,
          maxWidth: 150,
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
          width: 200,
          field: 'string_story',
          headerName: 'Story',
          renderCell: (params: GridRenderCellParams) => (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1,whiteSpace:'wrap', overflow:'hidden', textOverflow:'ellipsis', width:160 }}>
                { truncate(params.row.string_story)  }
            </Box>
          )
        },
        {
          flex: 1,
          width: 200,
          field: 'tags',
          headerName: 'Tags',
          renderCell: (params: GridRenderCellParams) => (
            <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '10px' }}>
                { (typeof params.row.tags != 'string') ?  params.row.tags && params.row.tags.join(', ') : null  }
            </Box>
          )
        },
        {
          flex: 1,
          width: 200,
          field: 'created_at',
          headerName: 'Created At',
          renderCell: (params: GridRenderCellParams) => (
            <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '10px' }}>
                { formatDate(params.row.updated_at)  }
            </Box>
          )
        },
        {
          flex: 1,
          minWidth: 170,
          maxWidth: 170,
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

      const declinedColumns: GridColumns = [
        {
          flex : 1,
          minWidth: 150,
          maxWidth: 150,
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
          flex : 1,
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
          flex : 1,
          width: 100,
          field: 'tags',
          headerName: 'Tags',
          renderCell: (params: GridRenderCellParams) => (
            <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '10px' }}>
                { params.row.tags && params.row.tags.join(', ')  }
            </Box>
          )
        },
        {
          flex : 1,
          width: 200,
          field: 'created_at',
          headerName: 'Created At',
          renderCell: (params: GridRenderCellParams) => (
            <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '10px' }}>
                { formatDate(params.row.updated_at)  }
            </Box>
          )
        },
        {
            flex : 1,
            width: 200,
            field: 'note',
            headerName: 'Note',
            renderCell: (params: GridRenderCellParams) => (
              <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '10px', padding:'3em' }}>
                  { params.row?.note && params.row?.note }
              </Box>
            )
          },
        {
          flex : 1,
          minWidth: 170,
          maxWidth: 170,
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
        },
        {
          flex : 1,
          minWidth: 60,
          field: 'action',
          headerName: TranslateString("Edit"),
          sortable: false,
          renderCell: (params: GridRenderCellParams) => <Icon onClick={() => {
            setEditFeedRow({...params.row})
            toggleEditFeedDrawer()
          } } icon='mdi:eye-outline' fontSize={20} cursor='pointer' />
        }
      ]


   return (
    <>
      <DataGrid
        loading={isLoading}
        getRowId={ row => row._id }
        autoHeight
        pagination
        rows={rows}
        rowCount={rowCount}
        columns={ (postStatus == 'Declined') ? declinedColumns :columns}
        pageSize={pageSize}
        sortingMode='server'
        paginationMode='server'
        onSortModelChange={handleSortModel}
        rowsPerPageOptions={[7, 10, 25, 50]}
        onPageChange={newPage => handlePageChange(newPage)}
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
      {
        editFeedRow && 
        <EditFeedDrawer open={editFeedOpen} toggle={toggleEditFeedDrawer} row={editFeedRow} />
      }

    </>
  )
}

export default TableCCFeedStatus
