// ** MUI Imports
import { GridRenderCellParams } from '@mui/x-data-grid'

// ** Project/Other Imports
import CustomChip from 'src/@core/components/mui/chip'
import { ThemeColor } from 'src/@core/layouts/types'

// ** Utils Imports
import formatDate from '@/utils/formatDate'

interface StatusObj {
  [key: string]: {
    title: string
    color: ThemeColor
  }
}

const statusObj: StatusObj = {
  GET: { title: 'GET', color: 'success' },
  POST: { title: 'POST', color: 'warning' },
  PUT: { title: 'PUT', color: 'info' },
  DELETE: { title: 'DELETE', color: 'error' }
}

export const ActivityLogsColumns = () => {
  const columns = [
    {
      flex: 0.02,
      minWidth: 150,
      field: 'user',
      headerName: 'Username',
      valueGetter: (params: any) => {
        return params?.row.user.username
      }
    },
    {
      flex: 0.02,
      minWidth: 150,
      field: 'mobile',
      headerName: 'Mobile Number',
      valueGetter: (params: any) => {
        return params?.row.user.mobile
      }
    },
    {
      flex: 0.02,
      minWidth: 150,
      field: 'email',
      headerName: 'Email Address',
      valueGetter: (params: any) => {
        return params?.row.user.email
      }
    },
    {
      flex: 0.02,
      minWidth: 150,
      field: 'description',
      headerName: `Description`
    },
    {
      flex: 0.03,
      minWidth: 200,
      field: 'created_at',
      headerName: `Date Created`,
      valueFormatter: (params: any) => {
        return formatDate(params?.value)
      }
    },
    {
      flex: 0.03,
      minWidth: 200,
      field: 'updated_at',
      headerName: `Last Updated`,
      valueFormatter: (params: any) => {
        return formatDate(params?.value)
      }
    },
    {
      flex: 0.01,
      minWidth: 95,
      field: 'action',
      headerName: 'Action',
      renderCell: (params: GridRenderCellParams) => {
        const status = statusObj[params?.value]

        return (
          <CustomChip
            size='small'
            skin='light'
            color={status?.color}
            label={status?.title}
            sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
          />
        )
      }
    }
  ]

  return { columns }
}
