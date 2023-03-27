// ** MUI Imports
import { Box } from '@mui/material'

// ** Other Imports
import ToggleButton from '@/pages/user/components/button/ToggleButton'
import EditBtn from '@/pages/user/components/button/EditButton'
import contentCreatorEditModal from '@/pages/user/components/modal/ContentCreatorEditModal'

// ** Utils Imports
import formatDate from '@/utils/formatDate'

// ** TanStack Imports
import { useMutation, useQueryClient } from '@tanstack/react-query'

// ** Hooks
import { useUsersTable } from '@/services/api/useUsersTable'

interface ToggleActionProps {
  value: string
  id: any
}

const ToggleAction = ({ value, id }: ToggleActionProps) => {
  const queryClient = useQueryClient()
  const { updateUser } = useUsersTable()
  const mutation = useMutation(
    async (data: { id: string; data: any }) => {
      const response = await updateUser(data.id, data.data)
      if (response.ok) {
        await response.json()
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['allUsers']) // Updates the DataGrid
      }
    }
  )

  const handleToggle = async (newValue: boolean) => {
    // Determine the new status
    const newStatus = value === 'Applied' || value === 'Approved' ? 'Hold' : 'Approved'

    // Update the status in the backend
    await mutation.mutateAsync({ id, data: { status: newStatus, _method: 'put' } })
  }

  return (
    <ToggleButton checked={value === 'Approved' || value === 'Applied'} onToggle={newValue => handleToggle(newValue)} />
  )
}

const contentCreatorColumns = [
  { field: 'username', headerName: 'User Name', width: 300 },
  { field: 'mobile', headerName: 'Mobile Number', width: 300 },
  { field: 'email', headerName: 'Email', width: 300 },
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
    width: 200,
    renderCell: (params: any) => {
      return (
        <Box>
          <ToggleAction id={params.row.id} value={params.value} />
          <EditBtn modal={contentCreatorEditModal} userId={params.row.id} data={params.row} />
        </Box>
      )
    }
  }
]

export default contentCreatorColumns
