import { Box } from '@mui/material'
import ToggleButton from '@/pages/user/components/button/ToggleButton'
import EditBtn from '@/pages/user/components/button/EditButton'
import AnnouncementModal from '../components/modal/AnnouncementModal'

const columns = [
  { field: 'title', headerName: 'Title', width: 300 },
  { field: 'MobileNumber', headerName: 'Mobile Number', width: 200 },
  { field: 'Email', headerName: 'Email', width: 200 },
  { field: 'dateCreated', headerName: 'Date Created', width: 200 },
  { field: 'lastLogIn', headerName: 'Last Log In', width: 200 },
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
