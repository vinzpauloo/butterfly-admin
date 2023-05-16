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

export const FeaturedFeedsColumns = () => {
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
    { flex: 0.04, minWidth: 220, sortable: false, field: 'title', headerName: `Title` },
    {
      flex: 0.02,
      minWidth: 150,
      sortable: false,
      field: 'creator',
      headerName: `Username`,
      renderCell: (params: any) => <div>{params?.row.creator.username}</div>
    },
    {
      flex: 0.02,
      minWidth: 160,
      sortable: false,
      field: 'feed_details',
      headerName: `Feed Type`,
      renderCell: (params: any) => <div>{params?.row.feed_details.type} </div>
    },
    {
      flex: 0.02,
      minWidth: 200,
      sortable: false,
      field: 'created_at',
      headerName: `Date Created`,
      valueFormatter: (params: any) => {
        return formatDate(params?.value)
      }
    },
    {
      flex: 0.02,
      minWidth: 150,
      sortable: false,
      field: 'action',
      headerName: `Action`,
      renderCell: (params: GridCellParams) => {
        const handleDeleteFeaturedFeed = () => {
          mutateDeleteFeaturedFeeds({
            site_id: selectedSite as string,
            featured_id: params?.row.featured_id as string
          })

          setTimeout(() => {
            queryClient.invalidateQueries({ queryKey: ['featuredFeeds'] })
          }, 500)
        }

        return (
          <Box>
            <ToggleButton />
            <Button onClick={() => handleDeleteFeaturedFeed()}>
              <DeleteOutlineIcon color='secondary' />
            </Button>
          </Box>
        )
      }
    }
  ]

  return { columns }
}
