// ** Next Imports
import { useRouter } from 'next/router'

// ** Utils Import
import formatDate from '@/utils/formatDate'

// ** TanStack Import
import { useQueryClient, useMutation } from '@tanstack/react-query'

// ** Project Imports
import ToggleButton from '@/pages/user/components/button/ToggleButton'

// ** Hooks/Services Imports
import { WalletService } from '@/services/api/WalletService'
import { captureError } from '@/services/Sentry'

interface ToggleActionProps {
  value: number
  id: any
}

const ToggleAction = ({ value, id }: ToggleActionProps) => {
  const queryClient = useQueryClient()
  const { editWallet } = WalletService()
  const router = useRouter()
  const currentLocation = router.asPath

  const mutation = useMutation(
    async (data: { id: string; data: any }) => {
      const response = await editWallet(data.id, data.data)
      if (response.ok) {
        await response.json()
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['allPayment']) // Updates the DataGrid
      }
    }
  )

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleToggle = async (newValue: boolean) => {
    // Determine the new status
    const newStatus = value === 1 ? 0 : 1

    try {
      // Update the status in the backend
      await mutation.mutateAsync({ id, data: { active: newStatus, _method: 'put' } })
    } catch (e: any) {
      const {
        data: { error }
      } = e
      for (const key in error) {
        error[key].forEach((value: any) => {
          captureError(currentLocation, `${value}, editWallet() PaymentsColumns`)
        })
      }
    }
  }

  return <ToggleButton checked={value === 1} onToggle={newValue => handleToggle(newValue)} />
}

export const PaymentsColumns = () => {
  const columns = [
    { sortable: false, field: 'bank_code', headerName: 'Provider', width: 300 },
    { sortable: false, field: 'name', headerName: 'Merchants', width: 300 },
    { sortable: false, field: 'logo_path', headerName: 'Logo', width: 300 },
    {
      sortable: false,
      field: 'created_at',
      headerName: 'Date Created',
      width: 300,
      valueFormatter: (params: any) => {
        return formatDate(params?.value)
      }
    },
    {
      sortable: false,
      field: 'active',
      headerName: 'Action',
      width: 135,
      renderCell: (params: any) => {
        return <ToggleAction id={params?.row.id} value={params?.row.active} />
      }
    }
  ]

  return { columns }
}
