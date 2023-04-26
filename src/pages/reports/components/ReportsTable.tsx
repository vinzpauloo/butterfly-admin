import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Typography, Avatar, Stack, Drawer, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// FAKE DATA
const rows = [
  { id: 1, photoURL: 'https://i.pravatar.cc/32?img=23', username: 'Aoki_007', referenceID: '12654235784', watched: 420699, visits: 1700, bytes: '25GB', firstLaunch: '2023-03-20 08:26:56', lastLogin: '2023-03-20 08:26:56' },
  { id: 1, photoURL: 'https://i.pravatar.cc/32?img=23', username: 'Aoki_007', referenceID: '12654235784', watched: 420699, visits: 1700, bytes: '25GB', firstLaunch: '2023-03-20 08:26:56', lastLogin: '2023-03-20 08:26:56' },
  { id: 1, photoURL: 'https://i.pravatar.cc/32?img=23', username: 'Aoki_007', referenceID: '12654235784', watched: 420699, visits: 1700, bytes: '25GB', firstLaunch: '2023-03-20 08:26:56', lastLogin: '2023-03-20 08:26:56' },
  { id: 1, photoURL: 'https://i.pravatar.cc/32?img=23', username: 'Aoki_007', referenceID: '12654235784', watched: 420699, visits: 1700, bytes: '25GB', firstLaunch: '2023-03-20 08:26:56', lastLogin: '2023-03-20 08:26:56' },
  { id: 1, photoURL: 'https://i.pravatar.cc/32?img=23', username: 'Aoki_007', referenceID: '12654235784', watched: 420699, visits: 1700, bytes: '25GB', firstLaunch: '2023-03-20 08:26:56', lastLogin: '2023-03-20 08:26:56' },
  { id: 1, photoURL: 'https://i.pravatar.cc/32?img=23', username: 'Aoki_007', referenceID: '12654235784', watched: 420699, visits: 1700, bytes: '25GB', firstLaunch: '2023-03-20 08:26:56', lastLogin: '2023-03-20 08:26:56' },
  { id: 1, photoURL: 'https://i.pravatar.cc/32?img=23', username: 'Aoki_007', referenceID: '12654235784', watched: 420699, visits: 1700, bytes: '25GB', firstLaunch: '2023-03-20 08:26:56', lastLogin: '2023-03-20 08:26:56' },
  { id: 1, photoURL: 'https://i.pravatar.cc/32?img=23', username: 'Aoki_007', referenceID: '12654235784', watched: 420699, visits: 1700, bytes: '25GB', firstLaunch: '2023-03-20 08:26:56', lastLogin: '2023-03-20 08:26:56' },
  { id: 1, photoURL: 'https://i.pravatar.cc/32?img=23', username: 'Aoki_007', referenceID: '12654235784', watched: 420699, visits: 1700, bytes: '25GB', firstLaunch: '2023-03-20 08:26:56', lastLogin: '2023-03-20 08:26:56' },
  { id: 1, photoURL: 'https://i.pravatar.cc/32?img=23', username: 'Aoki_007', referenceID: '12654235784', watched: 420699, visits: 1700, bytes: '25GB', firstLaunch: '2023-03-20 08:26:56', lastLogin: '2023-03-20 08:26:56' },
  { id: 1, photoURL: 'https://i.pravatar.cc/32?img=23', username: 'Aoki_007', referenceID: '12654235784', watched: 420699, visits: 1700, bytes: '25GB', firstLaunch: '2023-03-20 08:26:56', lastLogin: '2023-03-20 08:26:56' },
  { id: 1, photoURL: 'https://i.pravatar.cc/32?img=23', username: 'Aoki_007', referenceID: '12654235784', watched: 420699, visits: 1700, bytes: '25GB', firstLaunch: '2023-03-20 08:26:56', lastLogin: '2023-03-20 08:26:56' },
  { id: 1, photoURL: 'https://i.pravatar.cc/32?img=23', username: 'Aoki_007', referenceID: '12654235784', watched: 420699, visits: 1700, bytes: '25GB', firstLaunch: '2023-03-20 08:26:56', lastLogin: '2023-03-20 08:26:56' },
];

const ReportsTable = () => {
  const [pageSize, setPageSize] = useState<number>(10)
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const columns: GridColDef[] = [
    {
      field: 'username',
      headerName: 'Username',
      minWidth: 150,
      flex: 0.2,
      align: 'left',
      renderCell: (params: GridRenderCellParams) =>
        <Stack direction='row' alignItems='center' gap={2}>
          <Avatar sx={{ width: 32, height: 32 }} src={params.row.photoURL} />
          {params.value}
        </Stack>
    },
    {
      field: 'referenceID',
      headerName: 'Reference ID',
      minWidth: 125,
      flex: 0.2,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'watched',
      headerName: 'Watched',
      type: 'number',
      minWidth: 100,
      flex: 0.1,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'visits',
      headerName: 'Visits',
      type: 'number',
      minWidth: 100,
      flex: 0.1,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'bytes',
      headerName: 'Bytes',
      type: 'string',
      minWidth: 100,
      flex: 0.1,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'firstLaunch',
      headerName: 'Date Created',
      type: 'string',
      minWidth: 130,
      flex: 0.3,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'lastLogin',
      headerName: 'Last Update',
      type: 'string',
      minWidth: 130,
      flex: 0.3,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: ' ',
      headerName: 'Action',
      type: 'string',
      minWidth: 100,
      flex: 0.15,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      renderCell: () =>
        <Stack direction='row' alignItems='center' justifyContent='center' gap={2}>
          <Box onClick={() => setOpenDrawer(true)}>
            <VisibilityIcon color='secondary' sx={{cursor: 'pointer', '&:hover': {color: (theme) => theme.palette.primary.main}}}/>
          </Box>
          <Box>
            <EditIcon color='secondary' sx={{cursor: 'pointer', '&:hover': {color: (theme) => theme.palette.primary.main}}}/>
          </Box>
          <Box>
            <DeleteOutlineIcon color='secondary' sx={{cursor: 'pointer', '&:hover': {color: (theme) => theme.palette.primary.main}}}/>
          </Box>
        </Stack>
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
            <Typography variant='subtitle1'>VIP watched Type</Typography>
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
          <Button variant='outlined' sx={{ textTransform: 'uppercase', mt: 4 }} onClick={() => setOpenDrawer(false)}>Back</Button>
        </Stack>
      </Drawer>
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
    </>
  );
}

export default ReportsTable