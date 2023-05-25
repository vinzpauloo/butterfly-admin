// ** MUI Imports
import { Box, Button } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { GridCellParams } from '@mui/x-data-grid'

// ** Utils Imports
import formatDate from '@/utils/formatDate'

// ** Project/Other Imports
import ToggleButton from '@/pages/user/components/button/ToggleButton'

// ** Zustand Store
import { useFeaturedFeedStore } from '@/zustand/featuredFeedGlobalStore'

// ** TanStack React Query
import { useMutation, useQueryClient } from '@tanstack/react-query'

// ** Hooks/Services Imports
import { useErrorHandling } from '@/hooks/useErrorHandling'
import FeedsService from '@/services/api/FeedsService'

export const CustomerColumns = () => {
  // ** Store
  const { selectedSite } = useFeaturedFeedStore()

  // ** Error Handling Hook
  const { handleError } = useErrorHandling()

  // ** Services
  const queryClient = useQueryClient()
  const { deleteFeaturedFeeds } = FeedsService()

  // ** API Methods
  const { mutate: mutateDeleteFeaturedFeeds } = useMutation(deleteFeaturedFeeds, {
    onError: (e: any) => {
      handleError(e, `deleteFeaturedFeeds() FeaturedFeedsColumns.tsx`)
    }
  })

  const columns = [
    { flex: 0.02, minWidth: 150, field: 'username', headerName: `Username` },
    {
      flex: 0.02,
      minWidth: 150,

      field: 'is_Vip',
      headerName: `VIP`
    },
    {
      flex: 0.02,
      minWidth: 160,

      field: 'gender',
      headerName: `Gender`
    },
    {
      flex: 0.02,
      minWidth: 200,

      field: 'mobile',
      headerName: `Mobile`
    },
    {
      flex: 0.02,
      minWidth: 150,
      sortable: false,
      field: 'action',
      headerName: `Action`
      //   renderCell: (params: GridCellParams) => {
      //     const handleDeleteFeaturedFeed = () => {
      //       mutateDeleteFeaturedFeeds({
      //         site_id: selectedSite as string,
      //         featured_id: params?.row.featured_id as string
      //       })

      //       setTimeout(() => {
      //         queryClient.invalidateQueries({ queryKey: ['featuredFeeds'] })
      //       }, 500)
      //     }

      //     return (
      //       <Box>
      //         <ToggleAction featured_id={params?.row.featured_id} value={params?.row.active} />
      //         <Button onClick={() => handleDeleteFeaturedFeed()}>
      //           <DeleteOutlineIcon color='secondary' />
      //         </Button>
      //       </Box>
      //     )
      //   }
    }
  ]

  return { columns }
}

interface ToggleActionProps {
  value?: string | boolean
  featured_id?: string
}

function useToggleAction({ value, featured_id }: ToggleActionProps) {
  const queryClient = useQueryClient()
  const { toggleFeaturedFeeds } = FeedsService()
  const { selectedSite } = useFeaturedFeedStore()
  const { handleError } = useErrorHandling()

  const { mutate: mutateEditFeaturedFeeds } = useMutation(toggleFeaturedFeeds, {
    onSuccess: () => {
      queryClient.invalidateQueries(['featuredFeeds'])
    },
    onError: (e: any) => {
      handleError(e, `toggleFeaturedFeeds() FeaturedFeedsColumns.tsx`)
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleToggle = async (newValue: boolean) => {
    // Determine the new status
    const newStatus = value === true ? false : true

    await mutateEditFeaturedFeeds({
      data: {
        _method: 'put',
        active: newStatus
      },
      params: {
        site_id: selectedSite,
        featured_id: featured_id
      }
    })
  }

  return handleToggle
}

function ToggleAction({ value, featured_id }: ToggleActionProps) {
  const handleToggle = useToggleAction({ value, featured_id })

  return <ToggleButton checked={value === true} onToggle={newValue => handleToggle(newValue)} />
}
