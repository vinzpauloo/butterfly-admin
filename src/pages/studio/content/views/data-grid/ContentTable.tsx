// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import ContentDialog from '@/pages/studio/shared-component/ContentDialog'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Data Import
import { rows } from '@/data/dummyNewsFeedData'

interface StatusObj {
  [key: number]: {
    title: string
    color: ThemeColor
  }
}

// ** renders client column
const renderClient = (params: GridRenderCellParams) => {
  const { row } = params
  const stateNum = Math.floor(Math.random() * 6)
  const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
  const color = states[stateNum]

  if (row.avatar.length) {
    return (
      <CustomAvatar
        src={`/images/avatars/cc/${row.avatar}`}
        sx={{ borderRadius: '10px', mr: 3, width: '5.875rem', height: '3rem' }}
      />
    )
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={color as ThemeColor}
        sx={{ borderRadius: '10px', mr: 3, fontSize: '.8rem', width: '5.875rem', height: '3rem' }}
      >
        {getInitials(row.full_name ? row.full_name : 'John Doe')}
      </CustomAvatar>
    )
  }
}

const statusObj: StatusObj = {
  1: { title: 'pending', color: 'warning' },
  2: { title: 'declined', color: 'error' }
}

interface IContentTable {
  isLoading?: boolean
  data?: any
}

const ContentTable = ({ isLoading, data }: IContentTable) => {
  // ** States
  const [pageSize, setPageSize] = useState<number>(7)
  const [hideNameColumn, setHideNameColumn] = useState(false)

  const columns: GridColDef[] = [
    {
      flex: 0.1,
      minWidth: 150,
      field: 'video_thumbnail',
      headerName: 'Video Thumbnail',
      align: 'center',
      headerAlign: 'center',
      hide: hideNameColumn,
      renderCell: (params: GridRenderCellParams) => {
        return <Box sx={{ display: 'flex', alignItems: 'center' }}>img</Box>
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
                full name
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
          title
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
          url
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
          category
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 140,
      field: 'last_update',
      headerName: 'Last Update',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          last update
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

        return <Typography>Status</Typography>
      }
    },
    {
      flex: 0.06,
      minWidth: 50,
      field: 'actions',
      headerName: '',
      align: 'center',
      renderCell: (params: GridRenderCellParams) => {
        // return <ContentDialog param={params.row} />
        return 'icon'
      }
    }
  ]

  if (isLoading) {
    return (
      <Card>
        <CardHeader title='THE STUDIO PAGE - CONTENT APPROVAL' />
        <DataGrid
          loading={isLoading}
          autoHeight
          rows={{}}
          columns={columns}
          pageSize={pageSize}
          disableSelectionOnClick
          rowsPerPageOptions={[7, 10, 25, 50]}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        />
      </Card>
    )
  }

  if (data) {
    return (
      <Card>
        <CardHeader title='THE STUDIO PAGE - CONTENT APPROVAL' />
        {/* <DataGrid
          getRowId={row => row._id}
          autoHeight
          rows={data.data}
          columns={columns}
          pageSize={pageSize}
          disableSelectionOnClick
          rowsPerPageOptions={[7, 10, 25, 50]}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        /> */}
      </Card>
    )
  }

  return (<></>)

}

export default ContentTable
