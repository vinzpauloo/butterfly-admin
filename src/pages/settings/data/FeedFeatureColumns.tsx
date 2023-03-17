import { Box } from '@mui/material'
import ToggleButton from '@/pages/user/components/button/ToggleButton'
import EditBtn from '@/pages/user/components/button/EditButton'
import EditFeedModal from '../components/modal/EditFeedModal'

const columns = [
  { field: 'title', headerName: 'Title', width: 200 },
  { field: 'MobileNumber', headerName: 'Mobile Number', width: 200 },
  { field: 'Email', headerName: 'Email', width: 200 },
  { field: 'dateCreated', headerName: 'Date Created', width: 250 },
  { field: 'lastLogIn', headerName: 'Last Log In', width: 250 },
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
        <EditBtn modal={EditFeedModal} />
      </Box>
    )
  }
]

export default columns
