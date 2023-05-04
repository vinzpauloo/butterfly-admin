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

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// ** Apis
import ContentService from '@/services/api/ContentService'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useTranslateString } from '@/utils/TranslateString';

// ** BASE APIS Import
import { FILE_SERVER_URL } from '@/lib/baseUrls'

// ** renders client column
const renderClient = (params: GridRenderCellParams) => {
  const { row } = params
  const stateNum = Math.floor(Math.random() * 6)
  const states = ['success', 'error', 'warning', 'info', 'primary', 'secondary']
  const color = states[stateNum]

  if (row?.thumbnail_url?.length) {
    return (
      <CustomAvatar
        src={FILE_SERVER_URL + params.row.thumbnail_url}
        sx={{ borderRadius: '10px', mr: 3, width: '5.875rem', height: '3rem' }}
      />
    )
  } else {
    return <></>
  }
}

// ** Types and Interfaces
type StatusTypes = 'Approved' | 'Pending' | 'Declined' 

interface IContentTable {}

interface SnackState extends SnackbarOrigin {
  open: boolean
}

const ContentTable = (props: IContentTable) => {
  // ** States
  const [data, setData] = React.useState([])
  const [rowCount, setRowCount] = React.useState(0)
  const [page, setPage] = React.useState<number>(1)
  const [pageSize, setPageSize] = React.useState(10)
  const [snackState, setSnackState] = React.useState<SnackState>({
    open: false,
    vertical: 'top',
    horizontal: 'right'
  })
  // desctruct the snack state
  const { vertical, horizontal, open } = snackState
  const [approval, setApproval] = React.useState<StatusTypes>('Pending')

  // Access the client
  const queryClient = useQueryClient()

  const { getContents } = ContentService()

  //Queries
  const { isLoading, isRefetching } = useQuery({
    queryKey: ['contents', page, pageSize],
    queryFn: () => getContents({ data: { with: 'user', page: page, paginate: pageSize, approval  } }),
    onSuccess: data => {
      setData(data.data)
      setRowCount(data.total)
      setPage(data.current_page)
      console.log('@@@', data)
    }
  })

  // Mutations
  const mutation = useMutation({
    mutationFn: () => { return new Promise(resolve => {}) },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['contents'] })
    },
  })

  const TranslateString = useTranslateString()

  const columns : GridColDef[] = [
    {
      flex: 0.02,
      minWidth: 70,
      field: 'thumbnail_url',
      headerName: TranslateString("Video Thumbnail"),
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
      flex: 0.02,
      minWidth: 90,
      headerName: TranslateString("Content Creator"),
      sortable: false,
      field: 'content_creator',
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.user.username}
        </Typography>
      )
    },
    {
      flex: 0.03,
      minWidth: 60,
      field: 'title',
      headerName: TranslateString("Title"),
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params.row.title}
        </Typography>
      )
    },
    {
      flex: 0.04,
      field: 'tag',
      minWidth: 80,
      headerName: TranslateString("Tags"),
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {params?.row?.tags?.join(', ')}
        </Typography>
      )
    },
    {
      flex: 0.04,
      minWidth: 140,
      field: 'last_update',
      headerName: TranslateString("Last Update"),
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Typography variant='body2' sx={{ color: 'text.primary' }}>
          {formatDate(params.row.updated_at)}
        </Typography>
      )
    },
    {
      flex: 0.01,
      minWidth: 60,
      field: 'action',
      headerName: TranslateString("Action"),
      sortable: false,
      renderCell: (params: GridRenderCellParams) => <ContentDialog param={params.row} />
    }
  ]

  // const columns: GridColDef[] = [
  //   {
  //     flex: 0.1,
  //     minWidth: 150,
  //     field: 'video_thumbnail',
  //     headerName: TranslateString("Video Thumbnail"),
  //     align: 'center',
  //     headerAlign: 'center',
  //     renderCell: (params: GridRenderCellParams) => {
  //       return <Box sx={{ display: 'flex', alignItems: 'center' }}>{renderClient(params)}</Box>
  //     }
  //   },
  //   {
  //     flex: 0.15,
  //     minWidth: 150,
  //     field: 'full_name',
  //     headerName: TranslateString("Content Creator"),
  //     renderCell: (params: GridRenderCellParams) => {
  //       return (
  //         <Box sx={{ display: 'flex', alignItems: 'center' }}>
  //           <Box sx={{ display: 'flex', flexDirection: 'column' }}>
  //             <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
  //               {params.row.user.username}
  //             </Typography>
  //           </Box>
  //         </Box>
  //       )
  //     }
  //   },
  //   {
  //     flex: 0.1,
  //     minWidth: 120,
  //     headerName: TranslateString("Title"),
  //     field: 'title',
  //     renderCell: (params: GridRenderCellParams) => (
  //       <Typography variant='body2' sx={{ color: 'text.primary' }}>
  //         {params.row.title}
  //       </Typography>
  //     )
  //   },
  //   {
  //     flex: 0.15,
  //     minWidth: 110,
  //     field: 'video_url',
  //     align: 'center',
  //     headerName: TranslateString("Video") + " " + TranslateString("URL"),
  //     renderCell: (params: GridRenderCellParams) => (
  //       <>
  //         <Icon
  //           onClick={handleCopyToClipboard({ vertical: 'top', horizontal: 'right' }, params.row.trial_video_hls)}
  //           icon='mdi:text-box-outline'
  //           fontSize='1.4rem'
  //         />
  //       </>
  //     )
  //   },
  //   {
  //     flex: 0.13,
  //     minWidth: 140,
  //     field: 'tags',
  //     headerName: TranslateString("Tags"),
  //     renderCell: (params: GridRenderCellParams) => (
  //       <Typography variant='body2' sx={{ color: 'text.primary' }}>
  //         {params?.row?.tags?.join(', ')}
  //       </Typography>
  //     )
  //   },
  //   {
  //     flex: 0.1,
  //     minWidth: 140,
  //     field: 'last_update',
  //     headerName: TranslateString("Last Update"),
  //     renderCell: (params: GridRenderCellParams) => (
  //       <Typography variant='body2' sx={{ color: 'text.primary' }}>
  //         {formatDate(params.row.updated_at)}
  //       </Typography>
  //     )
  //   },
  //   {
  //     flex: 0.01,
  //     minWidth: 140,
  //     field: 'status',
  //     headerName: TranslateString("Status"),
  //     align: 'center',
  //     headerAlign: 'center',
  //     renderCell: (params: GridRenderCellParams) => {
  //       return <Typography color={params.row.approval === "Declined" ? "red" : undefined}>{params.row.approval}</Typography>
  //     }
  //   },
  //   {
  //     flex: 0.06,
  //     minWidth: 50,
  //     field: 'actions',
  //     headerName: TranslateString("View"),
  //     align: 'center',
  //     renderCell: (params: GridRenderCellParams) => {
  //       return <ContentDialog param={params.row} />
  //     }
  //   }
  // ]

  const handleCopyToClipboard = (newState: SnackbarOrigin, trialUrl: string) => () => {
    navigator.clipboard.writeText(trialUrl)
    setSnackState({ open: true, ...newState })
  }

  return (
    <>
      <Card>
        <CardHeader sx={{textTransform:"uppercase"}} title={TranslateString("The Studio Page") + " - " + TranslateString("Content Approval")}/>
        <DataGrid
          loading={isLoading || isRefetching}
          getRowId={row => row._id}
          autoHeight
          rows={data}
          columns={columns}
          pageSize={pageSize}
          disableSelectionOnClick
          rowsPerPageOptions={[10, 25, 50]}
          onPageChange={newPage => setPage(newPage + 1)}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          rowCount={rowCount}
          paginationMode='server'
          checkboxSelection={false}
          pagination
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
