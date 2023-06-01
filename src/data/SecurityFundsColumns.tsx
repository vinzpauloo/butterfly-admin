// ** Utils Imports
import formatDate from '@/utils/formatDate'
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
  Deposited: { title: 'Deposited', color: 'warning' }
}

export const SecurityFundsColumns = () => {
  const columns = [
    { flex: 0.01, minWidth: 100, sortable: false, field: 'site_id', headerName: 'Site ID' },
    {
      flex: 0.02,
      minWidth: 200,
      sortable: false,
      field: 'created_at',
      headerName: 'Date Created',
      valueFormatter: (params: any) => {
        return formatDate(params?.value)
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
      flex: 0.02,
      minWidth: 150,
      sortable: false,
      field: 'amount',
      headerName: 'Amount',
      renderCell: (params: GridRenderCellParams) => (
        <span style={{ color: params.value < 0 ? 'red' : 'green' }}>{params.value}</span>
      )
    },
    {
      flex: 0.02,
      minWidth: 150,
      sortable: false,
      field: 'balance',
      headerName: 'Balance'
    },
    {
      flex: 0.02,
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
