// ** MUI Imports
import { Box } from '@mui/material'

import ToggleButton from '@/pages/user/components/button/ToggleButton'
import formatDate from '@/utils/formatDate'
import EditBtn from '@/pages/user/components/button/EditButton'

// ** Hooks
import { useUsersTable } from '@/services/api/useUsersTable'

// ** TanStack Query
import { useMutation, useQueryClient } from '@tanstack/react-query'

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

export const superAgentColumns = [
  { field: 'username', headerName: 'Super Agent', width: 200 },

  // { field: 'SiteName', headerName: 'Site Name', width: 250 },
  { field: 'mobile', headerName: 'Mobile Number', width: 200 },
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

  // { field: 'SecurityFunds', headerName: 'Security Funds', width: 250 },
  {
    field: 'status',
    headerName: 'Action',
    width: 150,
    renderCell: (params: any) => {
      return (
        <Box>
          <ToggleAction id={params.row.id} value={params.value} />
          <EditBtn userId={params.row.id} roleId={params.row.role_id} data={params.row} />
        </Box>
      )
    }
  }
]
