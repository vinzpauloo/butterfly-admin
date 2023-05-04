// ** TanStack Imports
import { useQueryClient, useMutation } from '@tanstack/react-query'

// ** Services Imports
import { UserTableService } from '@/services/api/UserTableService'

// ** Project/Other Imports
import ToggleButton from '@/pages/user/components/button/ToggleButton'

export interface ToggleActionProps {
  value: string
  id: any
}

export const useToggleAction = ({ value, id }: ToggleActionProps) => {
  const queryClient = useQueryClient()
  const { updateUser } = UserTableService()
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleToggle = async (newValue: boolean) => {
    // Determine the new status
    const newStatus = value === 'Applied' || value === 'Approved' ? 'Hold' : 'Approved'

    // Update the status in the backend
    await mutation.mutateAsync({ id, data: { status: newStatus, _method: 'put' } })
  }

  return handleToggle
}

export const ToggleAction: React.FC<ToggleActionProps> = ({ value, id }) => {
  const handleToggle = useToggleAction({ value, id })

  return (
    <ToggleButton checked={value === 'Approved' || value === 'Applied'} onToggle={newValue => handleToggle(newValue)} />
  )
}
