// ** MUI Imports

// ** Project/Other Imports
import CustomChip from 'src/@core/components/mui/chip'
import { ThemeColor } from 'src/@core/layouts/types'

// ** Lib/Utils Imports
import { FILE_SERVER_URL } from '@/lib/baseUrls'
import formatDate from '@/utils/formatDate'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { Typography } from '@mui/material'

interface StatusObj {
  [key: string]: {
    title: string
    color: ThemeColor
  }
}

const statusObj: StatusObj = {
  true: { title: 'YES', color: 'success' },
  false: { title: 'NO', color: 'error' }
}

export const CustomerColumns = () => {
  const columns = [
    {
      flex: 0.01,
      minWidth: 80,
      field: 'photo',
      headerName: `Photo`,
      renderCell: (params: any) => {
        return <img src={FILE_SERVER_URL + params?.value} alt='photo' width={20} height={20} />
      }
    },
    {
      flex: 0.02,
      minWidth: 120,
      field: 'username',
      headerName: `Username`
    },
    {
      flex: 0.01,
      minWidth: 120,
      field: 'alias',
      headerName: `Alias`
    },
    {
      flex: 0.01,
      minWidth: 120,
      field: 'is_Vip',
      headerName: `VIP`,
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
      minWidth: 140,
      field: 'mobile',
      headerName: `Mobile`,
      renderCell: (params: any) => {
        if (params?.row.mobile !== null) {
          return <Typography color='#FF9C00'>{params?.row.mobile}</Typography>
        }

        return <Typography color='error'>Not available</Typography>
      }
    },
    {
      flex: 0.01,
      minWidth: 120,
      field: 'coins',
      headerName: `Coins`,
      renderCell: (params: any) => {
        return <Typography color={params?.value <= 0 ? `error` : `primary`}>{params?.value}</Typography>
      }
    },
    {
      flex: 0.02,
      minWidth: 200,
      field: 'referral_code',
      headerName: 'Referral Code',
      renderCell: (params: any) => {
        if (params?.row.referral_code !== null) {
          return <Typography color='#FF9C00'>{params?.row.referral_code}</Typography>
        }

        return <Typography color='error'>No code</Typography>
      }
    },
    {
      flex: 0.01,
      minWidth: 150,
      field: 'agents',
      headerName: 'Agent',
      renderCell: (params: any) => {
        if (params?.row.agents !== null) {
          return params?.row.agents.id + ' ' + params?.row.agents.username
        }

        return <Typography color='error'>No agent</Typography>
      }
    },
    {
      flex: 0.02,
      minWidth: 200,
      field: 'created_at',
      headerName: 'Date Created',
      valueFormatter: (params: any) => {
        return formatDate(params?.value)
      }
    }
  ]

  return { columns }
}
