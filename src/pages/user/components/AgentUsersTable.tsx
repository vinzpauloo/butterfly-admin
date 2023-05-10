import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Typography, Avatar, Stack, Drawer, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';

// FAKE DATA
const rows = [
  { id: 1, photoURL: 'https://i.pravatar.cc/32?img=23', username: 'Aoki_007', commission: 150, membership: '1 Year', goldDonated: 1500, downloadedVideo: 25, firstLaunch: '2023-03-20 08:26:56', lastLogin: '2023-03-20 08:26:56' },
  { id: 1, photoURL: 'https://i.pravatar.cc/32?img=23', username: 'Aoki_007', commission: 150, membership: '1 Year', goldDonated: 1500, downloadedVideo: 25, firstLaunch: '2023-03-20 08:26:56', lastLogin: '2023-03-20 08:26:56' },
  { id: 1, photoURL: 'https://i.pravatar.cc/32?img=23', username: 'Aoki_007', commission: 150, membership: '1 Year', goldDonated: 1500, downloadedVideo: 25, firstLaunch: '2023-03-20 08:26:56', lastLogin: '2023-03-20 08:26:56' },
  { id: 1, photoURL: 'https://i.pravatar.cc/32?img=23', username: 'Aoki_007', commission: 150, membership: '1 Year', goldDonated: 1500, downloadedVideo: 25, firstLaunch: '2023-03-20 08:26:56', lastLogin: '2023-03-20 08:26:56' },
  { id: 1, photoURL: 'https://i.pravatar.cc/32?img=23', username: 'Aoki_007', commission: 150, membership: '1 Year', goldDonated: 1500, downloadedVideo: 25, firstLaunch: '2023-03-20 08:26:56', lastLogin: '2023-03-20 08:26:56' },
  { id: 1, photoURL: 'https://i.pravatar.cc/32?img=23', username: 'Aoki_007', commission: 150, membership: '1 Year', goldDonated: 1500, downloadedVideo: 25, firstLaunch: '2023-03-20 08:26:56', lastLogin: '2023-03-20 08:26:56' },
  { id: 1, photoURL: 'https://i.pravatar.cc/32?img=23', username: 'Aoki_007', commission: 150, membership: '1 Year', goldDonated: 1500, downloadedVideo: 25, firstLaunch: '2023-03-20 08:26:56', lastLogin: '2023-03-20 08:26:56' },
  { id: 1, photoURL: 'https://i.pravatar.cc/32?img=23', username: 'Aoki_007', commission: 150, membership: '1 Year', goldDonated: 1500, downloadedVideo: 25, firstLaunch: '2023-03-20 08:26:56', lastLogin: '2023-03-20 08:26:56' },
  { id: 1, photoURL: 'https://i.pravatar.cc/32?img=23', username: 'Aoki_007', commission: 150, membership: '1 Year', goldDonated: 1500, downloadedVideo: 25, firstLaunch: '2023-03-20 08:26:56', lastLogin: '2023-03-20 08:26:56' },
  { id: 1, photoURL: 'https://i.pravatar.cc/32?img=23', username: 'Aoki_007', commission: 150, membership: '1 Year', goldDonated: 1500, downloadedVideo: 25, firstLaunch: '2023-03-20 08:26:56', lastLogin: '2023-03-20 08:26:56' },
  { id: 1, photoURL: 'https://i.pravatar.cc/32?img=23', username: 'Aoki_007', commission: 150, membership: '1 Year', goldDonated: 1500, downloadedVideo: 25, firstLaunch: '2023-03-20 08:26:56', lastLogin: '2023-03-20 08:26:56' },
  { id: 1, photoURL: 'https://i.pravatar.cc/32?img=23', username: 'Aoki_007', commission: 150, membership: '1 Year', goldDonated: 1500, downloadedVideo: 25, firstLaunch: '2023-03-20 08:26:56', lastLogin: '2023-03-20 08:26:56' },
  { id: 1, photoURL: 'https://i.pravatar.cc/32?img=23', username: 'Aoki_007', commission: 150, membership: '1 Year', goldDonated: 1500, downloadedVideo: 25, firstLaunch: '2023-03-20 08:26:56', lastLogin: '2023-03-20 08:26:56' },

];

const  AgentUsersTable = () => {
  const [pageSize, setPageSize] = useState<number>(10)
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const columns: GridColDef[] = [
    {
      field: 'username',
      headerName: 'Registered Users',
      minWidth: 150,
      flex: 0.35,
      align: 'left',
      renderCell: (params: GridRenderCellParams) =>
        <Stack direction='row' alignItems='center' gap={2}>
          <Avatar sx={{ width: 32, height: 32 }} src={params.row.photoURL} />
          {params.value}
        </Stack>
    },
    {
      field: 'commission',
      headerName: 'Commission',
      minWidth: 125,
      flex: 0.35,
      align: 'center'
    },
    {
      field: 'membership',
      headerName: 'Membership',
      type: 'number',
      minWidth: 125,
      flex: 0.35,
      align: 'center'
    },
    {
      field: 'goldDonated',
      headerName: 'Gold Donated',
      type: 'number',
      minWidth: 130,
      flex: 0.35,
      align: 'center'
    },
    {
      field: 'downloadedVideo',
      headerName: 'Downloaded Videos',
      type: 'number',
      minWidth: 175,
      flex: 0.5,
      align: 'center'
    },
    {
      field: 'firstLaunch',
      headerName: 'First Launch',
      type: 'string',
      minWidth: 130,
      flex: 1,
    },
    {
      field: 'lastLogin',
      headerName: 'Last Login',
      type: 'string',
      minWidth: 130,
      flex: 1
    },
    {
      field: ' ',
      headerName: 'Action',
      type: 'string',
      minWidth: 80,
      flex: 0.3,
      align: "center",
      sortable: false,
      renderCell: () =>
        <Box onClick={() => setOpenDrawer(true)}>
          <VisibilityIcon
            color='secondary'
            sx={{ cursor: 'pointer', '&:hover': { color: (theme) => theme.palette.primary.main } }}
          />
        </Box>
    },
  ];

  return (
    <>
      <Drawer anchor='right' open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Stack p={6} gap={2} maxWidth={350}>
          <Stack boxShadow={4} bgcolor="white" px={12} py={6} alignItems="center" gap={2}>
            <Typography variant='h6' textTransform="uppercase">User Profile</Typography>
            <Avatar sx={{ width: 150, height: 150 }} />
            <Typography fontWeight={500}>Xinggan Yeshou</Typography>
            <Typography variant='subtitle1' textAlign="center">Followed Content Creators: 100</Typography>
          </Stack>
          <Stack boxShadow={4} px={12} py={6} alignItems="center">
            <Typography variant='subtitle1'>VIP Membership Type</Typography>
            <Typography variant='subtitle1' fontWeight={500}>Platinum - 24 Months</Typography>
          </Stack>
          <Stack boxShadow={4} px={12} py={6} alignItems="center">
            <Typography variant='subtitle1'>Gold Coins Balance</Typography>
            <Typography variant='subtitle1' fontWeight={500}>3,300 G</Typography>
          </Stack>
          <Stack boxShadow={4} px={12} py={6} alignItems="center">
            <Typography variant='subtitle1'>First Launch</Typography>
            <Typography variant='subtitle1' fontWeight={500}>2023-03-10 11:26:10</Typography>
          </Stack>
          <Stack boxShadow={4} px={12} py={6} alignItems="center">
            <Typography variant='subtitle1'>Last Login</Typography>
            <Typography variant='subtitle1' fontWeight={500}>2023-03-18 08:22:24</Typography>
          </Stack>
          <Button variant='outlined' sx={{ textTransform: 'uppercase' }} onClick={() => setOpenDrawer(false)}>Back</Button>
        </Stack>
      </Drawer>
      <Box sx={{ height: 400, width: '100%' }}>
        <Stack direction="row" justifyContent="space-between" mb={4}>
          <Typography variant='h6' fontWeight='bold' textTransform='uppercase'>My Users</Typography>
          <Button variant='outlined' size='small' endIcon={<DownloadIcon/>}>Download List</Button>
        </Stack>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          pagination
          disableSelectionOnClick
          rowsPerPageOptions={[5, 10, 15]}
          pageSize={pageSize}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          getRowId={row => row.id}
        />
      </Box>
    </>
  );
}

export default AgentUsersTable