// ** MUI Imports
import { Box } from '@mui/material'

// ** Other Imports
import ToggleButton from '@/pages/user/components/button/ToggleButton'
import EditBtn from '@/pages/user/components/button/EditButton'
import OperatorEditModal from '@/pages/user/components/modal/OperatorEditModal'

// ** Utils Imports
import formatDate from '@/utils/formatDate'

// ** TanStack Imports
import { useMutation } from '@tanstack/react-query'

// ** Hooks
import { useUsersTable } from '@/services/api/useUsersTable'

interface ToggleActionProps {
  value: string
  id: any
}

const ToggleAction = ({ value, id }: ToggleActionProps) => {
  const { updateUser } = useUsersTable()
  const mutation = useMutation(async (data: { id: string; status: string }) => {
    console.log(`TEST@@@###`, data.status)
    const response = await updateUser(data.id, data.status)
    if (response.ok) {
      await response.json()
    } else {
      console.log('Error updating status')
    }
  })

  const handleToggle = async (newValue: boolean) => {
    // Determine the new status
    const newStatus = value === 'Applied' || value === 'Approved' ? 'hold' : 'approved'

    // Update the status in the backend
    await mutation.mutateAsync({ id, status: newStatus })
  }

  return (
    <ToggleButton checked={value === 'Approved' || value === 'Applied'} onToggle={newValue => handleToggle(newValue)} />
  )
}

const operatorColumns = [
  { field: 'username', headerName: 'User Profile', width: 300 },
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
      console.log(`ACTION STAT FROM BE`, params.value)

      return (
        <Box>
          {/* <ToggleButton checked={params.value === 'Approved' || params.value === 'Applied'} /> */}
          <ToggleAction id={params.row.id} value={params.value} />
          <EditBtn modal={OperatorEditModal} />
        </Box>
      )
    }
  }
]

export default operatorColumns
