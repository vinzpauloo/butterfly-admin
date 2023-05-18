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
      field: 'role',
      headerName: 'Role',
      width: 150,
      valueGetter: (params: any) => {
        return params?.row.role ? params?.row.role.name : ''
      }
    },
    { field: 'username', headerName: 'User Profile', width: 180 },
    { field: 'mobile', headerName: 'Mobile Number', width: 150 },
    { field: 'email', headerName: 'Email', width: 250 },
    {
      field: 'created_at',
      headerName: 'Date Created',
      width: 250,
      valueFormatter: (params: any) => {
        return formatDate(params?.value)
      }
    },
    {
      field: 'updated_at',
      headerName: 'Last Log In',
      width: 250,
      valueFormatter: (params: any) => {
        return formatDate(params?.value)
      }
    },
    {
      field: 'status',
      headerName: 'Action',
      width: 135,
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
