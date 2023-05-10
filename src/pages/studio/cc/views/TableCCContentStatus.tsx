import React, { useEffect, useState, useCallback, ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { DataGrid, GridColumns, GridRenderCellParams, GridSortModel, GridSortDirection } from '@mui/x-data-grid'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Components
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomChip from 'src/@core/components/mui/chip'

// ** Third party
import { Icon } from '@iconify/react'

// ** Utils
import formatDate from '@/utils/formatDate'
import { useTranslateString } from '@/utils/TranslateString'

// ** Base URLS
import { FILE_SERVER_URL } from '@/lib/baseUrls'

// ** Types
import { IVideoRow } from '@/context/types'
import EditContentDrawer from './EditContentDrawer'

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
  Approved: { title: 'Approved', color: 'success' },
  Declined: { title: 'Declined', color: 'error' },
  Pending: { title: 'Pending', color: 'warning' }
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
  handlePageChange: (newPage: number) => void
  handleSetSort: (sort: GridSortDirection) => void
  handleSetSortBy: (sortBy: string) => void
  postStatus: 'Approved' | 'Pending' | 'Declined'
}

const TableCCContentStatus = ({
  rows,
  isLoading,
  rowCount,
  pageSize,
  setPageSize,
  handlePageChange,
  handleSetSort,
  handleSetSortBy,
  postStatus
}: TableProps) => {
  // ** Drawer States
  const [open, setOpen] = React.useState<boolean>(false)

  const [editFeedOpen, setEditFeedOpen] = React.useState<boolean>(false)
  const [editFeedRow, setEditFeedRow] = React.useState<IVideoRow | null>(null)

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

  // Fn renderFeed
  const renderFeedType = (params: string) => {
    return (
      <>
        {params.includes('story') && <img width={20} src={feedsObj['story'].iconPath} />}
        {params.includes('video') && <img width={20} src={feedsObj['video'].iconPath} />}
        {params.includes('image') && <img width={20} src={feedsObj['image'].iconPath} />}
      </>
    )
  }

  const truncate = (str: string) => {
    return str.length > 16 ? str.substring(0, 15) + '...' : str
  }

  const TranslateString = useTranslateString()

  // ** Columns
  const columns = [
    {
      flex: 1,
      minWidth: 70,
      field: 'thumbnail_url',
      headerName: TranslateString('Video Thumbnail'),
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CustomAvatar
                src={FILE_SERVER_URL + params.row.thumbnail_url}
                sx={{ borderRadius: '10px', mr: 3, width: '5.875rem', height: '3rem' }}
              />
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 1,
      minWidth: 90,
      headerName: TranslateString('Content Creator'),
      sortable: false,
      field: 'content_creator',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.username}  
        </Typography>
      )
    },
    {
      flex: 1,
      minWidth: 60,
      field: 'title',
      headerName: TranslateString('Title'),
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.title}
        </Typography>
      )
    },
    {
      flex: 1,
      field: 'tag',
      minWidth: 80,
      headerName: TranslateString('Tags'),
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params?.row?.tags?.join(', ')}
        </Typography>
      )
    },
    {
      flex: 1,
      minWidth: 140,
      field: 'last_update',
      headerName: TranslateString('Last Update'),
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {formatDate(params.row.updated_at)}
        </Typography>
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
      flex: 1,
      minWidth: 70,
      field: 'thumbnail_url',
      headerName: TranslateString('Video Thumbnail'),
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CustomAvatar
                src={FILE_SERVER_URL + params.row.thumbnail_url}
                sx={{ borderRadius: '10px', mr: 3, width: '5.875rem', height: '3rem' }}
              />
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 1,
      minWidth: 90,
      headerName: TranslateString('Content Creator'),
      sortable: false,
      field: 'content_creator',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {/* {params.row.user.username}  */} USERNAME
        </Typography>
      )
    },
    {
      flex: 1,
      minWidth: 60,
      field: 'title',
      headerName: TranslateString('Title'),
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.title}
        </Typography>
      )
    },
    {
      flex: 1,
      field: 'tag',
      minWidth: 80,
      headerName: TranslateString('Tags'),
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params?.row?.tags?.join(', ')}
        </Typography>
      )
    },
    {
      flex: 1,
      minWidth: 140,
      field: 'last_update',
      headerName: TranslateString('Last Update'),
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {formatDate(params.row.updated_at)}
        </Typography>
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
        getRowId={row => row._id}
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
      />
      {editFeedRow && <EditContentDrawer open={editFeedOpen} toggle={toggleEditFeedDrawer} row={editFeedRow} />}
    </>
  )
}

export default TableCCContentStatus
