import { Box } from '@mui/material'
import ToggleButton from '@/pages/user/components/button/ToggleButton'
import EditBtn from '@/pages/user/components/button/EditButton'
import AnnouncementModal from '../components/modal/AnnouncementModal'

const columns = [
  { field: 'title', headerName: 'Title', width: 400 },
  { field: 'dateCreated', headerName: 'Date Created', width: 350 },
  { field: 'lastLogIn', headerName: 'Last Log In', width: 350 },
  {
    field: 'action',
    headerName: 'Action',
    width: 100,
    renderCell: () => (
      <Box>
        <ToggleButton />
      </Box>
    )
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 100,
    renderCell: () => (
      <Box>
        <EditBtn modal={AnnouncementModal} />
      </Box>
    )
  }
]

export default columns
