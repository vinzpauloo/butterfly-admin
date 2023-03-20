// ** MUI Imports
import { Box } from '@mui/material'

// ** Other Imports
import ToggleButton from '@/pages/user/components/button/ToggleButton'
import EditBtn from '@/pages/user/components/button/EditButton'
import superAgentEditModal from "@/pages/user/components/modal/SuperAgentEditModal";

// ** Utils Imports
import formatDate from '@/utils/formatDate'

// interface SuperAgentColumn {
//   id: 'SuperAgent' | 'SiteName' | 'MobileNumber' | 'Email' | 'DateCreated' | 'LastUpdate' | 'SecurityFunds' | 'Action';
//   label: any;
//   format?: (data: number) => string | JSX.Element;
// }
//
// const superAgentColumns: readonly SuperAgentColumn[] = [
//   { id: 'SuperAgent',
//     label: (
//       <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexDirection: {xs: 'column',md: 'row'}}}>
//         <span>Super Agent</span>
//         <UnfoldMoreTwoToneIcon/>
//       </Box>
//     )},
//   { id: 'SiteName',
//     label: (
//       <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexDirection: {xs: 'column',md: 'row'}}}>
//         <span>Site Name</span>
//         <UnfoldMoreTwoToneIcon/>
//       </Box>
//     )},
//   { id: 'MobileNumber',
//     label: (
//       <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexDirection: {xs: 'column',md: 'row'}}}>
//         <span>Mobile Number</span>
//         <UnfoldMoreTwoToneIcon/>
//       </Box>
//     )},
//   { id: 'Email',
//     label: (
//       <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexDirection: {xs: 'column',md: 'row'}}}>
//         <span>Email</span>
//         <UnfoldMoreTwoToneIcon/>
//       </Box>
//     )},
//   { id: 'DateCreated',
//     label: (
//       <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexDirection: {xs: 'column',md: 'row'}}}>
//         <span>Date Created</span>
//         <UnfoldMoreTwoToneIcon/>
//       </Box>
//     )},
//   { id: 'LastUpdate',
//     label: (
//       <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexDirection: {xs: 'column',md: 'row'}}}>
//         <span>Last Update</span>
//         <UnfoldMoreTwoToneIcon/>
//       </Box>
//     )},
//   { id: 'SecurityFunds',
//     label: (
//       <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexDirection: {xs: 'column',md: 'row'}}}>
//         <span>Security Funds</span>
//         <UnfoldMoreTwoToneIcon/>
//       </Box>
//     )},
//   {
//     id: 'Action',
//     label: 'Action',
//   },
// ];

const superAgentColumns = [
  { field: 'username', headerName: 'Super Agent', width: 250 },

  // { field: 'SiteName', headerName: 'Site Name', width: 250 },
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
    ),
  },
];

export default superAgentColumns
