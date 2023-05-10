import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Typography, Stack, Drawer, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';

// FAKE DATA
const rows = [
  { id: 1, month: 'February 2023', amount: 123456, transactionID: '54234234212', payoutDate: '2023-02-01 08:01:28', status: 'Pending' },
  { id: 2, month: 'February 2023', amount: 123456, transactionID: '54234234212', payoutDate: '2023-02-01 08:01:28', status: 'Cashed' },
  { id: 3, month: 'February 2023', amount: 123456, transactionID: '54234234212', payoutDate: '2023-02-01 08:01:28', status: 'Cashed' },
  { id: 4, month: 'February 2023', amount: 123456, transactionID: '54234234212', payoutDate: '2023-02-01 08:01:28', status: 'Declined' },
  { id: 5, month: 'February 2023', amount: 123456, transactionID: '54234234212', payoutDate: '2023-02-01 08:01:28', status: 'Pending' },
  { id: 6, month: 'February 2023', amount: 123456, transactionID: '54234234212', payoutDate: '2023-02-01 08:01:28', status: 'Cashed' },
  { id: 7, month: 'February 2023', amount: 123456, transactionID: '54234234212', payoutDate: '2023-02-01 08:01:28', status: 'Cashed' },
  { id: 8, month: 'February 2023', amount: 123456, transactionID: '54234234212', payoutDate: '2023-02-01 08:01:28', status: 'Declined' },
  { id: 9, month: 'February 2023', amount: 123456, transactionID: '54234234212', payoutDate: '2023-02-01 08:01:28', status: 'Pending' },
  { id: 10, month: 'February 2023', amount: 123456, transactionID: '54234234212', payoutDate: '2023-02-01 08:01:28', status: 'Cashed' },
  { id: 11, month: 'February 2023', amount: 123456, transactionID: '54234234212', payoutDate: '2023-02-01 08:01:28', status: 'Cashed' },
  { id: 12, month: 'February 2023', amount: 123456, transactionID: '54234234212', payoutDate: '2023-02-01 08:01:28', status: 'Declined' },
  { id: 13, month: 'February 2023', amount: 123456, transactionID: '54234234212', payoutDate: '2023-02-01 08:01:28', status: 'Pending' },
  { id: 14, month: 'February 2023', amount: 123456, transactionID: '54234234212', payoutDate: '2023-02-01 08:01:28', status: 'Cashed' },
  { id: 15, month: 'February 2023', amount: 123456, transactionID: '54234234212', payoutDate: '2023-02-01 08:01:28', status: 'Cashed' },
  { id: 16, month: 'February 2023', amount: 123456, transactionID: '54234234212', payoutDate: '2023-02-01 08:01:28', status: 'Declined' },
];

const AgentTransactions = () => {
  const [pageSize, setPageSize] = useState<number>(10)
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const columns: GridColDef[] = [
    {
      field: 'month',
      headerName: 'Month',
      minWidth: 150,
      flex: 0.2,
      align: 'left',
    },
    {
      field: 'amount',
      headerName: 'Amount',
      minWidth: 90,
      flex: 0.1,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'transactionID',
      headerName: 'Transaction ID',
      type: 'number',
      minWidth: 140,
      flex: 0.2,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'payoutDate',
      headerName: 'Payout Date',
      type: 'number',
      minWidth: 180,
      flex: 0.2,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'status',
      headerName: 'Status',
      type: 'string',
      minWidth: 130,
      flex: 0.1,
      align: 'center',
      headerAlign: 'center',
      sortable: false,
      renderCell: (params: GridRenderCellParams) =>
        <Box width={100} border="1px solid gray" borderRadius={1} p={1} textAlign="center">
          {params?.value}
        </Box>
    },
    {
      field: ' ',
      headerName: 'Action',
      type: 'string',
      minWidth: 80,
      flex: 0.1,
      align: 'center',
      headerAlign: 'center',
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
      <Drawer anchor='right' open={openDrawer} onClose={() => setOpenDrawer(false)} >
        <Stack p={6} gap={4} maxWidth={350}>
          <Typography textTransform="uppercase" fontWeight={500} textAlign="center">Payout For The Month Of December 2022</Typography>
          <Stack boxShadow={4} bgcolor="white" px={12} py={3} textAlign="center">
            <Typography fontWeight={500} textTransform="uppercase">2023-03-15 12:00:01</Typography>
          </Stack>
          <Stack boxShadow={4} bgcolor="white" px={12} py={3} textAlign="center">
            <Typography fontWeight={500} textTransform="uppercase">Cashed Out</Typography>
          </Stack>
          <Stack boxShadow={4} bgcolor="white" px={12} py={8} textAlign="center">
            <Typography fontWeight={500} textTransform="uppercase" variant='h3'>¥900</Typography>
          </Stack>
          <Stack boxShadow={4} bgcolor="white" px={6} py={4}>
            <Typography variant='subtitle1' >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequa.</Typography>
          </Stack>
          <Button variant='outlined' sx={{textTransform:'uppercase'}} onClick={() => setOpenDrawer(false)}>Back</Button>
        </Stack>
      </Drawer>
      <Box sx={{ height: 400, width: '100%' }}>
        <Stack direction="row" justifyContent="space-between" mb={4}>
          <Typography variant='h6' fontWeight='bold' textTransform='uppercase'>My Withdrawal Requests - Commission</Typography>
          <Button variant='outlined' size='small' endIcon={<DownloadIcon />}>Download List</Button>
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

export default AgentTransactions