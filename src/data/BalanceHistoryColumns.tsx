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

export const BalanceHistoryColumns = () => {
  const columns = [
    {
      flex: 0.01,
      minWidth: 120,
      sortable: false,
      field: 'id',
      headerName: 'User ID'
    },
    {
      flex: 0.02,
      minWidth: 200,
      sortable: false,
      field: 'balance',
      headerName: 'Balance',
      renderCell: (params: GridRenderCellParams) => {
        const balance = Math.abs(Number(params.value) - 50)
        const adjust = String(balance)

        console.log(params?.row)

        return <Typography>¥{adjust.slice(0, 3)}</Typography>
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
    },
    {
      flex: 0.02,
      minWidth: 200,
      sortable: false,
      field: 'amount',
      headerName: 'Amount',
      renderCell: (params: GridRenderCellParams) => {
        const balance = Math.abs(Number(params.value) * 50 - 50)

        const adjust = String(balance)

        console.log(params?.row)

        return <Typography>¥{adjust.slice(0, 2)}</Typography>
      }
    },
    {
      flex: 0.02,
      minWidth: 220,
      sortable: false,
      field: 'updated_at',
      headerName: 'Last Updated',
      valueFormatter: (params: any) => {
        return formatDate(params?.value)
      }
    }
  ]

  return { columns }
}
