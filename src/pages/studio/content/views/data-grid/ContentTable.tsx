// ** React Imports
import React, { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid'

// ** Custom Components
import CustomAvatar from 'src/@core/components/mui/avatar'
import ContentDialog from '@/pages/studio/shared-component/ContentDialog'

// ** Utils
import formatDate from '@/utils/formatDate'

import { useQuery } from '@tanstack/react-query'

// ** Apis
import ContentService from '@/services/api/ContentService'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** renders client column
const renderClient = (params: GridRenderCellParams) => {
  const { row } = params
  const stateNum = Math.floor(Math.random() * 6)
  const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
  const color = states[stateNum]

  if (row.thumbnail_url.length) {
    return (
      <CustomAvatar
        src={`${row.thumbnail_url.replace('http://localhost/', 'http://192.168.50.9/')}`}
        sx={{ borderRadius: '10px', mr: 3, width: '5.875rem', height: '3rem' }}
      />
    )
  } else {
    return <></>
  }
}

interface IContentTable {}

interface SnackState extends SnackbarOrigin {
  open: boolean
}

const ContentTable = (props: IContentTable) => {
  // ** States
  const [data, setData] = React.useState([])
  const [rowCount, setRowCount] = React.useState([])
  const [page, setPage] = React.useState<number>(1)
  const [pageSize, setPageSize] = React.useState(10)
  const [snackState, setSnackState] = React.useState<SnackState>({
    open: false,
    vertical: 'top',
    horizontal: 'right'
  })
  // desctruct the snack state
  const { vertical, horizontal, open } = snackState

  const { getContents } = ContentService()

  const { isLoading, isRefetching } = useQuery({
    queryKey: ['contents'],
    queryFn: () => getContents({ with: 'user' }),
    onSuccess: data => {
      console.log('data isss', data)
      setData(data.data)
      setRowCount(data.total)
      setPageSize(data.per_page)
      setPage(data.current_page)
      console.log('@@@', data)
    }
  })

  const columns: GridColDef[] = [
    {
      flex: 0.1,
      minWidth: 150,
      field: 'video_thumbnail',
      headerName: 'Video Thumbnail',
      align: 'center',
      headerAlign: 'center',
      renderCell: (params: GridRenderCellParams) => {
        return <Box sx={{ display: 'flex', alignItems: 'center' }}>{renderClient(params)}</Box>
      }
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'full_name',
      headerName: 'Content Creator',
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                {params.row.user.username}
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
      align: 'center',
      headerName: 'Video URL',
      renderCell: (params: GridRenderCellParams) => (
        <>
          <Icon
            onClick={handleCopyToClipboard({ vertical: 'top', horizontal: 'right' }, params.row.trial_video_hls )}
            icon='mdi:text-box-outline'
            fontSize='1.4rem'
          />
        </>
      )
    },
    {
      flex: 0.13,
      minWidth: 140,
      field: 'tags',
      headerName: 'Tags',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.tags.join(', ')}
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
          {formatDate(params.row.updated_at)}
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
        return <Typography>{params.row.approval}</Typography>
      }
    },
    {
      flex: 0.06,
      minWidth: 50,
      field: 'actions',
      headerName: '',
      align: 'center',
      renderCell: (params: GridRenderCellParams) => {
        return <ContentDialog param={params.row} />
      }
    }
  ]

  const handleCopyToClipboard = (newState: SnackbarOrigin, trialUrl : string) => () => {
    navigator.clipboard.writeText(trialUrl)
    setSnackState({ open: true, ...newState })
  }

  return (
    <>
      <Card>
        <CardHeader title='THE STUDIO PAGE - CONTENT APPROVAL' />
        <DataGrid
          loading={isLoading || isRefetching}
          getRowId={row => row._id}
          autoHeight
          rows={data}
          columns={columns}
          pageSize={pageSize}
          disableSelectionOnClick
          rowsPerPageOptions={[7, 10, 25, 50]}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        />
      </Card>

      <Snackbar
        color='black'
        open={open}
        onClose={() => {
          setSnackState({ ...snackState, open: false })
        }}
        message='Copied to clipboard'
        autoHideDuration={1500}
        key={vertical + horizontal}
        anchorOrigin={{ vertical, horizontal }}
      />
    </>
  )
}

export default ContentTable
