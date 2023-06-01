// ** Utils Imports
import formatDate from '@/utils/formatDate'
import { Typography } from '@mui/material'
import { GridRenderCellParams } from '@mui/x-data-grid'
import CustomChip from 'src/@core/components/mui/chip'
import { ThemeColor } from 'src/@core/layouts/types'

interface StatusObj {
  [key: string]: {
    title: string
    color: ThemeColor
  }
}

const statusObj: StatusObj = {
  Withdrawed: { title: 'Withdrawed', color: 'success' },
  Deposited: { title: 'Pending', color: 'warning' }
}

export const CommissionsColumns = () => {
  const columns = [
    {
      flex: 0.02,
      minWidth: 200,
      sortable: false,
      field: 'balance',
      headerName: 'Commission',
      renderCell: (params: GridRenderCellParams) => {
        const balance = Number(params.value) / 100 - 50

        return <Typography>¥{balance}</Typography>
      }
    },
    {
      flex: 0.02,
      minWidth: 200,
      sortable: false,
      field: 'updated_at',
      headerName: 'Last Updated',
      valueFormatter: (params: any) => {
        return formatDate(params?.value)
      }
    },
    {
      flex: 0.01,
      minWidth: 120,
      sortable: false,
      field: 'type',
      headerName: 'Type',
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
