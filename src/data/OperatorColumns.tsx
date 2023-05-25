// ** MUI Imports
import { Box } from '@mui/material'

// ** Project Imports
import EditBtn from '@/pages/user/components/button/EditButton'

// ** Hooks
import { ToggleAction } from '@/hooks/useToggleAction'

// ** Zustand Store
import { useUserTableStore } from '@/zustand/userTableStore'

// ** Utils Imports
import formatDate from '@/utils/formatDate'

export const OperatorColumns = () => {
  const { handleOpenDrawer } = useUserTableStore(state => ({
    handleOpenDrawer: state.handleOpenDrawer
  }))

  return [
    {
      flex: 0.02,
      minWidth: 120,
      field: 'role',
      headerName: 'Role',
      valueGetter: (params: any) => {
        return params?.row.role ? params?.row.role.name : ''
      }
    },
    {
      flex: 0.01,
      minWidth: 120,
      field: 'username',
      headerName: 'User Profile'
    },
    {
      flex: 0.02,
      minWidth: 150,
      field: 'mobile',
      headerName: 'Mobile Number'
    },
    {
      flex: 0.03,
      minWidth: 150,
      field: 'email',
      headerName: 'Email'
    },
    {
      flex: 0.03,
      minWidth: 150,
      field: 'created_at',
      headerName: 'Date Created',

      valueFormatter: (params: any) => {
        return formatDate(params?.value)
      }
    },
    {
      flex: 0.03,
      minWidth: 150,
      field: 'updated_at',
      headerName: 'Last Log In',

      valueFormatter: (params: any) => {
        return formatDate(params?.value)
      }
    },
    {
      flex: 0.01,
      minWidth: 90,
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
