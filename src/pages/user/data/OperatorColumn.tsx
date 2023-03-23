// ** MUI Imports
import { Box } from '@mui/material'

// ** Other Imports
import ToggleButton from '@/pages/user/components/button/ToggleButton'
import EditBtn from '@/pages/user/components/button/EditButton'
import OperatorEditModal from '@/pages/user/components/modal/OperatorEditModal'

// ** Utils Imports
import formatDate from '@/utils/formatDate'

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
    field: 'action',
    headerName: 'Action',
    width: 200,
    renderCell: () => (
      <Box>
        <ToggleButton />
        <EditBtn modal={OperatorEditModal} />
      </Box>
    )
  }
]

export default operatorColumns
