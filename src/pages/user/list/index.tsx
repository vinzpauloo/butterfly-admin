// ** React Imports
import { useState, ChangeEvent } from 'react'

// ** MUI Imports
import { Box, TablePagination, IconButton, Typography, Button } from '@mui/material';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import { styled } from '@mui/system';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const ToggleButton = () => {
  const [isOn, setIsOn] = useState(false);

  const handleClick = () => {
    setIsOn(!isOn);
  };

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 5}}>
      <button
        style={{
          display: 'inline-block',
          position: 'relative',
          width: '52px',
          height: '20px',
          border: '1px solid transparent',
          borderRadius: '25px',
          backgroundColor: isOn ? `#60FF00` : `#F03738`,
          cursor: 'pointer'
        }}
        className={`toggle ${isOn ? 'on' : 'off'}`}
        onClick={handleClick}
      >
        <div
          style={{
            position: 'absolute',
            top: '0px',
            left: isOn ? '32px' : '0px',
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            backgroundColor: 'white',
            color: 'black',
            textAlign: 'center',
            lineHeight: '21px',
            fontSize: '12px',
            transition: 'transform 0.2s ease',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {isOn ? (
            <Typography sx={{fontSize: 7}}>ON</Typography>
          ): (
            <Typography sx={{fontSize: 7}}>OFF</Typography>
          )}
        </div>
      </button>
      <button style={{background: 'transparent', border: 'none'}} onClick={()=>alert(`TEST`)}>
        <EditOutlinedIcon sx={{color: '#98A9BC', fontSize: 30}}/>
      </button>
    </div>
  );
}

interface Column {
  id: 'UserProfile' | 'MobileNumber' | 'Email' | 'DateCreated' | 'LastLogin' | 'Action';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (data: {value: any}) => string | JSX.Element;
}

const columns: readonly Column[] = [
  { id: 'UserProfile', label: 'User Profile' },
  { id: 'MobileNumber', label: 'Mobile Number' },
  { id: 'Email', label: 'Email' },
  { id: 'DateCreated', label: 'Data Created' },
  { id: 'LastLogin',label: 'Last Log in' },
  {
    id: 'Action',
    label: 'Action',
    format: ({ value }: { value: any }) => <div>{value}</div>,
  },
];

interface Data {
  UserProfile: string;
  MobileNumber: any;
  Email: string;
  DateCreated: any;
  LastLogin: any;
  Action: JSX.Element
}

function createData(
  UserProfile: string,
  MobileNumber: number,
  Email: string,
  DateCreated: number,
  LastLogin: number,
  Action: JSX.Element,
): Data {
  const formattedMobileNumber = `+${MobileNumber.toString().substring(0, 2)} ${MobileNumber.toString().substring(2, 5)} ${MobileNumber.toString().substring(5, 8)} ${MobileNumber.toString().substring(8)}`
  const date = new Date(DateCreated);
  const lastLog = new Date(LastLogin);
  const hours = date.getHours();
  const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
  const formattedDateCreated = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${formattedHours}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;
  const formattedLastLog = `${lastLog.getFullYear()}-${(lastLog.getMonth() + 1).toString().padStart(2, '0')}-${lastLog.getDate().toString().padStart(2, '0')} ${formattedHours}:${lastLog.getMinutes().toString().padStart(2, '0')}:${lastLog.getSeconds().toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;


  return { UserProfile, MobileNumber: formattedMobileNumber, Email, DateCreated: formattedDateCreated, LastLogin: formattedLastLog, Action};
}

const rows = [
  createData('Mèng yáo', +639176543210, `my@account.com`, 1643620222000, 1643620222000, <ToggleButton/>),
  createData('Xiāng', +639176543210, `my@account.com`, 1641812403000, 1643620222000, <ToggleButton/>),
  createData('Niang Meng', +639176543210, `my@account.com`, 1661640621000, 1643620222000, <ToggleButton/>),
  createData('Yao Wun', +639176543210, `my@account.com`, 1645137632000, 1643620222000, <ToggleButton/>),
  createData('Lee Tok Hee', +639176543210, `my@account.com`, 1648314258000, 1643620222000, <ToggleButton/>),
  createData('Lin Lee yao', +639176543210, `my@account.com`, 1644326766000, 1643620222000, <ToggleButton/>),
  createData('Aoxiang Sy', +639176543210, `my@account.com`, 1643239492000, 1643620222000, <ToggleButton/>),
  createData('Xiao Ma', +639176543210, `my@account.com`, 1695217173000, 1643620222000, <ToggleButton/>),
  createData('Li Mei', +639176543210, `my@account.com`, 1643220692000, 1643620222000, <ToggleButton/>),
  createData('Jun Tao', +639176543210, `my@account.com`, 1695217173000, 1643620222000, <ToggleButton/>),
  createData('Wang Fei', +639176543210, `my@account.com`, 1641811602000, 1643620222000, <ToggleButton/>),
  createData('Chun Lee', +639176543210, `my@account.com`, 1641811602000, 1643620222000, <ToggleButton/>),
  createData('Fei Long', +639176543210, `my@account.com`, 1641811602000, 1643620222000, <ToggleButton/>),
  createData('Jackie Chan', +639176543210, `my@account.com`, 1644326766000, 1643620222000, <ToggleButton/>),
  createData('Pai Long', +639176543210, `my@account.com`, 1644326766000, 1643620222000, <ToggleButton/>),
];

const Root = styled('div')`
  table {
    font-family: arial, sans-serif;
    border-collapse: separate;
    width: 100%;
    border-spacing: 0 15px
  }

  td,
  th {
    padding: 8px;
  }

  th {
    background-color: black;
    color: white;
  }
  tr {
    border: 1px solid black;
    height: 40px;
    text-align: center;
    background: white;
  }
`;

const UserList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column',  height: '100vh' }}>
      <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 5}}>
        <Box sx={{display: 'flex', gap: 5}}>
          <Box sx={{border: 1, height: '56px', width: '224px', display: 'flex', alignItems:'center', justifyContent: 'center'}}>
            <Typography>Operators</Typography>
          </Box>
          <Box sx={{border: 1, height: '56px', width: '224px', display: 'flex', alignItems:'center', justifyContent: 'center'}}>
            <Typography>Super Agent</Typography>
          </Box>
          <Box sx={{border: 1, height: '56px', width: '224px', display: 'flex', alignItems:'center', justifyContent: 'center'}}>
            <Typography>Content Creators</Typography>
          </Box>
        </Box>

        <Box sx={{border: 1, height: '56px', width: '224px', display: 'flex', alignItems:'center', justifyContent: 'center'}}>
          <Typography>Create Account</Typography>
        </Box>
      </Box>
      {/*<Paper sx={{ width: '100%', overflow: 'hidden' }}>*/}
        <Root sx={{ minHeight: 540 }}>
          <table aria-label="custom pagination table" contentEditable={isEditing}>
            <thead>
            <tr>
              {columns.map((column)=>(
                <th key={column.id}>
                  {column.label}
                </th>
              ))}
            </tr>
            </thead>
            <tbody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <tr role="checkbox" tabIndex={-1} key={row.UserProfile}>
                    {columns.map((column) => {
                      const value = row[column.id];

                      return (
                        <td key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Root>
        {/*<TableContainer sx={{ minHeight: 540 }}>*/}
        {/*  <Table stickyHeader aria-label="sticky table">*/}
        {/*    <TableHead>*/}
        {/*      <TableRow>*/}
        {/*        {columns.map((column) => (*/}
        {/*          <TableCell*/}
        {/*            key={column.id}*/}
        {/*            align={column.align}*/}
        {/*            style={{ minWidth: column.minWidth, backgroundColor: 'black', color: 'white' }}*/}
        {/*          >*/}
        {/*            {column.label}*/}
        {/*          </TableCell>*/}
        {/*        ))}*/}
        {/*      </TableRow>*/}
        {/*    </TableHead>*/}
        {/*    <TableBody>*/}
        {/*      {rows*/}
        {/*        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)*/}
        {/*        .map((row) => {*/}
        {/*          return (*/}
        {/*            <TableRow hover role="checkbox" tabIndex={-1} key={row.UserProfile}>*/}
        {/*              {columns.map((column) => {*/}
        {/*                const value = row[column.id];*/}

        {/*              return (*/}
        {/*                <TableCell key={column.id} align={column.align}>*/}
        {/*                  {column.format && typeof value === 'number'*/}
        {/*                    ? column.format(value)*/}
        {/*                    : value}*/}
        {/*                </TableCell>*/}
        {/*                );*/}
        {/*              })}*/}
        {/*            </TableRow>*/}
        {/*          );*/}
        {/*        })}*/}
        {/*    </TableBody>*/}
        {/*  </Table>*/}
        {/*</TableContainer>*/}
      {/*</Paper>*/}
      <Box style={{margin: '0 auto'}}>
        <TablePagination
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelDisplayedRows={({ from, to, count }) => ""}
          labelRowsPerPage=""
          rowsPerPageOptions={[]}
          ActionsComponent={(props) => {
            const { onPageChange, page } = props;

            return (
              <Box style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <IconButton
                  onClick={() => onPageChange(null, page - 1)}
                  disabled={page === 0}
                  aria-label="previous page"
                >
                  <ArrowBackIos sx={{ fontSize: 12, color: 'black' }} />
                  <Typography style={{color: 'black', fontSize: 12, paddingLeft: '4px'}}>Prev</Typography>
                </IconButton>
                {[0, 1].map((pageNumber) => (
                  <Box
                    key={pageNumber}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 24,
                      height: 24,
                      borderRadius: 2,
                      backgroundColor: page === pageNumber ? 'black' : 'white',
                      color: page === pageNumber ? 'white' : 'black',
                      marginLeft: 2,
                      marginRight: 2,
                      cursor: 'pointer',
                    }}
                    onClick={() => onPageChange(null, pageNumber)}
                  >
                    {pageNumber + 1}
                  </Box>
                ))}
                <IconButton
                  onClick={() => onPageChange(null, page + 1)}
                  disabled={page >= Math.ceil(rows.length / rowsPerPage) - 1}
                  aria-label="next page"
                  sx={{ fontSize: 12, color: 'black' }}
                >
                  <Typography sx={{color: 'black', fontSize: 12, paddingRight: '4px'}}>Next</Typography>
                  <ArrowForwardIos sx={{ fontSize: 12, color: 'black' }} />
                </IconButton>
              </Box>
            );
          }}
        />
      </Box>
    </Box>
  );
};

export default UserList
