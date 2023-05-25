// ** MUI Imports
import { Box } from '@mui/material'

// Project/Other Imports
import EditBtn from '@/pages/user/components/button/EditButton'

// ** Hooks
import { ToggleAction } from '@/hooks/useToggleAction'

// ** Zustand Store
import { useUserTableStore } from '@/zustand/userTableStore'

// ** Utils Imports
import formatDate from '@/utils/formatDate'
import { FILE_SERVER_URL } from '@/lib/baseUrls'

export const SuperAgentColumns = () => {
  const { handleOpenDrawer } = useUserTableStore(state => ({
    handleOpenDrawer: state.handleOpenDrawer
  }))

  return [
    {
      flex: 0.01,
      minWidth: 80,
      field: 'photo',
      headerName: `Photo`,
      renderCell: (params: any) => {
        return (
          <img
            src={FILE_SERVER_URL + params?.value}
            alt='photo'
            width={50}
            height={50}
            style={{ borderRadius: '12px' }}
          />
        )
      }
    },
    { flex: 0.02, minWidth: 120, field: 'username', headerName: 'Username' },
    { flex: 0.02, minWidth: 120, field: 'mobile', headerName: 'Mobile Number' },
    { flex: 0.02, minWidth: 120, field: 'email', headerName: 'Email' },
    {
      flex: 0.02,
      minWidth: 120,
      field: 'created_at',
      headerName: 'Date Created',

      valueFormatter: (params: any) => {
        return formatDate(params?.value)
      }
    },
    {
      flex: 0.02,
      minWidth: 120,
      field: 'updated_at',
      headerName: 'Last Updated',

      valueFormatter: (params: any) => {
        return formatDate(params?.value)
      }
    },

    // { field: 'SecurityFunds', headerName: 'Security Funds', width: 250 },
    {
      flex: 0.02,
      minWidth: 120,
      field: 'status',
      headerName: 'Action',

      renderCell: (params: any) => {
        return (
          <Box>
            <ToggleAction id={params.row.id} value={params.value} />
            <EditBtn
              userId={params.row.id}
              roleId={params.row.role_id}
              data={params.row}
              handleOpenDrawer={handleOpenDrawer}
            />
          </Box>
        )
      }
    }
  ]
}
