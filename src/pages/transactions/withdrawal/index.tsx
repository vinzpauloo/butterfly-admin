/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'

import Transaction from '@/pages/transactions'
import { Box, Button } from '@mui/material'
import Icon from '@/@core/components/icon'
import ShowWithdrawDrawer from './ShowWithdrawDrawer'
import Translations from '@/layouts/components/Translations'

const rowData = [
  {
    id: 1,
    contentCreator: 'Syaoran Taio',
    siteName: 'Sugar Honey Pop',
    amount: '2,543 Golds',
    paymentMethod: 'Deposit',
    requestDate: '2023-11-18 11:26:13',
    lastUpdate: '2023-02-08 11:26:06',
    status: 'Approved',
    approvedBy: 'Operator 1'
  },
  {
    id: 2,
    contentCreator: 'Syaoran Taio',
    siteName: 'Sugar Honey Pop',
    amount: '2,543 Golds',
    paymentMethod: 'Deposit',
    requestDate: '2023-11-18 11:26:13',
    lastUpdate: '2023-02-08 11:26:06',
    status: 'Approved',
    approvedBy: 'Operator 1'
  },
  {
    id: 3,
    contentCreator: 'Syaoran Taio',
    siteName: 'Sugar Honey Pop',
    amount: '2,543 Golds',
    paymentMethod: 'Deposit',
    requestDate: '2023-11-18 11:26:13',
    lastUpdate: '2023-02-08 11:26:06',
    status: 'Approved',
    approvedBy: 'Operator 1'
  },
  {
    id: 4,
    contentCreator: 'Syaoran Taio',
    siteName: 'Sugar Honey Pop',
    amount: '2,543 Golds',
    paymentMethod: 'Deposit',
    requestDate: '2023-11-18 11:26:13',
    lastUpdate: '2023-02-08 11:26:06',
    status: 'Approved',
    approvedBy: 'Operator 1'
  },
  {
    id: 5,
    contentCreator: 'Syaoran Taio',
    siteName: 'Sugar Honey Pop',
    amount: '2,543 Golds',
    paymentMethod: 'Deposit',
    requestDate: '2023-11-18 11:26:13',
    lastUpdate: '2023-02-08 11:26:06',
    status: 'Approved',
    approvedBy: 'Operator 1'
  },
  {
    id: 6,
    contentCreator: 'Syaoran Taio',
    siteName: 'Sugar Honey Pop',
    amount: '2,543 Golds',
    paymentMethod: 'Deposit',
    requestDate: '2023-11-18 11:26:13',
    lastUpdate: '2023-02-08 11:26:06',
    status: 'Approved',
    approvedBy: 'Operator 1'
  },
  {
    id: 7,
    contentCreator: 'Syaoran Taio',
    siteName: 'Sugar Honey Pop',
    amount: '2,543 Golds',
    paymentMethod: 'Deposit',
    requestDate: '2023-11-18 11:26:13',
    lastUpdate: '2023-02-08 11:26:06',
    status: 'Approved',
    approvedBy: 'Operator 1'
  },
  {
    id: 8,
    contentCreator: 'Syaoran Taio',
    siteName: 'Sugar Honey Pop',
    amount: '2,543 Golds',
    paymentMethod: 'Deposit',
    requestDate: '2023-11-18 11:26:13',
    lastUpdate: '2023-02-08 11:26:06',
    status: 'Approved',
    approvedBy: 'Operator 1'
  },
  {
    id: 9,
    contentCreator: 'Syaoran Taio',
    siteName: 'Sugar Honey Pop',
    amount: '2,543 Golds',
    paymentMethod: 'Deposit',
    requestDate: '2023-11-18 11:26:13',
    lastUpdate: '2023-02-08 11:26:06',
    status: 'Approved',
    approvedBy: 'Operator 1'
  },
  {
    id: 10,
    contentCreator: 'Syaoran Taio',
    siteName: 'Sugar Honey Pop',
    amount: '2,543 Golds',
    paymentMethod: 'Deposit',
    requestDate: '2023-11-18 11:26:13',
    lastUpdate: '2023-02-08 11:26:06',
    status: 'Approved',
    approvedBy: 'Operator 1'
  }
]

function index() {
  const [open, setOpen] = useState(false)

  const columnData = [
    { field: 'contentCreator', headerName: <Translations text='Content Creator'/>, width: 169, sortable: false },
    { field: 'siteName', headerName: <Translations text='Site Name'/>, width: 169, sortable: false },
    { field: 'amount', headerName: <Translations text='Amount'/>, width: 140, sortable: false },
    { field: 'paymentMethod', headerName: <Translations text='Payment Method'/>, width: 160, sortable: false },
    { field: 'requestDate', headerName: <Translations text='Request Date'/>, width: 169, sortable: false },
    { field: 'lastUpdate', headerName: <Translations text='Last Update'/>, width: 169, sortable: false },
    {
      field: 'status',
      headerName: <Translations text='Status'/>,
      width: 169,
      sortable: false,
      renderCell: () => (
        <Box display='flex' alignItems='center' justifyContent='center' width='100%'>
          <Button variant='contained' color='success'>
            Approved
          </Button>
        </Box>
      )
    },
    {
      field: 'approvedBy',
      headerName: <Translations text='Approved By'/>,
      width: 140,
      sortable: false
    },
    {
      field: 'show',
      headerName: '',
      width: 65,
      sortable: false,
      renderCell: () => {
        const handleClick = () => {
          setOpen(true)
        }

        return (
          <Box display='flex' alignItems='center' justifyContent='center' width='100%'>
            <Button onClick={handleClick}>
              <Icon fontSize={30} icon='mdi:eye' color='98A9BC' />
            </Button>
          </Box>
        )
      }
    }
  ]

  return (
    <>
      <Transaction rowData={rowData} columnData={columnData} />
      {open ? <ShowWithdrawDrawer open={open} setOpen={setOpen} /> : null}
    </>
  )
}

index.acl = {
  action: 'read',
  subject: 'shared-page'
}

export default index
