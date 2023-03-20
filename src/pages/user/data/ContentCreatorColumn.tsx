// ** MUI Imports
import { Box } from '@mui/material'

// ** Other Imports
import ToggleButton from '@/pages/user/components/button/ToggleButton'
import EditBtn from '@/pages/user/components/button/EditButton'
import contentCreatorEditModal from '@/pages/user/components/modal/ContentCreatorEditModal'

// ** Utils Imports
import formatDate from '@/utils/formatDate'

const contentCreatorColumns = [
  { field: 'username', headerName: 'User Name', width: 250 },
  { field: 'mobile', headerName: 'Mobile Number', width: 250 },
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
  {
    field: 'Action',
    headerName: 'Action',
    width: 200,
    renderCell: () => (
      <Box>
        <ToggleButton />
        <EditBtn modal={contentCreatorEditModal} />
      </Box>
    )
  }
]

export default contentCreatorColumns
