import {Box} from "@mui/material";
import ToggleButton from "@/pages/user/components/button/ToggleButton";
import EditBtn from "@/pages/user/components/button/EditButton";
import contentCreatorEditModal from "@/pages/user/components/modal/ContentCreatorEditModal";

const contentCreatorColumns = [
  { field: 'UserName', headerName: 'User Name', width: 250 },
  { field: 'MobileNumber', headerName: 'Mobile Number', width: 250 },
  { field: 'Email', headerName: 'Email', width: 250 },
  { field: 'DateCreated', headerName: 'Date Created', width: 250 },
  { field: 'LastUpdate', headerName: 'Last Update', width: 250 },
  {
    field: 'Action',
    headerName: 'Action',
    width: 200,
    renderCell: () => (
      <Box>
        <ToggleButton/>
        <EditBtn modal={contentCreatorEditModal}/>
      </Box>
    ),
  },
];

export default contentCreatorColumns
