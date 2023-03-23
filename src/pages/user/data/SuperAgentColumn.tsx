// ** MUI Imports
import { Box } from '@mui/material'

// ** Other Imports
import ToggleButton from '@/pages/user/components/button/ToggleButton'
import EditBtn from '@/pages/user/components/button/EditButton'
import superAgentEditModal from '@/pages/user/components/modal/SuperAgentEditModal'

// ** Utils Imports
import formatDate from '@/utils/formatDate'

const superAgentColumns = [
  { field: 'username', headerName: 'Super Agent', width: 300 },

  // { field: 'SiteName', headerName: 'Site Name', width: 250 },
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

  // { field: 'SecurityFunds', headerName: 'Security Funds', width: 250 },
  {
    field: 'Action',
    headerName: 'Action',
    width: 200,
    renderCell: () => (
      <Box>
        <ToggleButton />
        <EditBtn modal={superAgentEditModal} />
      </Box>
    )
  }
]

export default superAgentColumns
