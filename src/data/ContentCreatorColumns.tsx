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

export const ContentCreatorColumns = () => {
  const { handleOpenDrawer } = useUserTableStore(state => ({
    handleOpenDrawer: state.handleOpenDrawer
  }))

  return [
    { sortable: false, field: 'username', headerName: 'User Name', width: 200 },
    { sortable: false, field: 'mobile', headerName: 'Mobile Number', width: 200 },
    { sortable: false, field: 'email', headerName: 'Email', width: 255 },
    {
      sortable: false,
      field: 'created_at',
      headerName: 'Date Created',
      width: 285,
      valueFormatter: (params: any) => {
        return formatDate(params?.value)
      }
    },
    {
      sortable: false,
      field: 'updated_at',
      headerName: 'Last Log In',
      width: 285,
      valueFormatter: (params: any) => {
        return formatDate(params?.value)
      }
    },
    {
      sortable: false,
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
