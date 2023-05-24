// ** MUI Imports

// ** Project Imports
import formatDate from '@/utils/formatDate'
import EditButton from '@/pages/user/components/button/AgentEditButton'

// ** TanStack Query

export const agentColumns = [
  {
    field: 'role',
    headerName: 'Role',
    width: 150,
    valueGetter: (params: any) => {
      return params?.row.role ? params?.row.role.name : ''
    }
  },
  { field: 'username', headerName: 'User Profile', width: 180 },
  { field: 'mobile', headerName: 'Mobile Number', width: 150 },
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
    field: 'status',
    headerName: 'Action',
    width: 135,
    renderCell: (params: any) => {
      return <EditButton id={params?.row.id} data={params?.row} />
    }
  }
]
