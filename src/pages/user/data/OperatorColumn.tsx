import {Box} from "@mui/material";
import ToggleButton from "@/pages/user/components/button/ToggleButton";
import EditBtn from "@/pages/user/components/button/EditButton";
import OperatorEditModal from "@/pages/user/components/modal/OperatorEditModal";

const operatorColumns = [
  { field: 'userProfile', headerName: 'User Profile', width: 250 },
  { field: 'mobileNumber', headerName: 'Mobile Number', width: 250 },
  { field: 'email', headerName: 'Email', width: 250 },
  { field: 'dateCreated', headerName: 'Date Created', width: 250 },
  { field: 'lastLogIn', headerName: 'Last Log In', width: 250 },
  {
    field: 'action',
    headerName: 'Action',
    width: 200,
    renderCell: () => (
      <Box>
        <ToggleButton/>
        <EditBtn modal={OperatorEditModal}/>
      </Box>
    ),
  },
];

export default operatorColumns
