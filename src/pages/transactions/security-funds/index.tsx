/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'

import Transaction from '@/pages/transactions'
import { Box, Button } from '@mui/material'
import Icon from '@/@core/components/icon'
import EditDrawer from './EditDrawer'
import Translations from '@/layouts/components/Translations'

const rowData = [
  {
    id: 1,
    contentCreator: 'Syaoran Taio',
    amount: '330, 000 CNY',
    balance: 'Deposit',
    type: 'Deposit',
    dateCreate: '2023-11-18 11:26:13',
    lastUpdate: '2023-02-08 11:26:06'
  },
  {
    id: 2,
    contentCreator: 'Syaoran Taio',
    amount: '330, 000 CNY',
    balance: 'Deposit',
    type: 'Deposit',
    dateCreate: '2023-11-18 11:26:13',
    lastUpdate: '2023-02-08 11:26:06'
  },
  {
    id: 3,
    contentCreator: 'Syaoran Taio',
    amount: '330, 000 CNY',
    balance: 'Deposit',
    type: 'Deposit',
    dateCreate: '2023-11-18 11:26:13',
    lastUpdate: '2023-02-08 11:26:06'
  },
  {
    id: 4,
    contentCreator: 'Syaoran Taio',
    amount: '330, 000 CNY',
    balance: 'Deposit',
    type: 'Deposit',
    dateCreate: '2023-11-18 11:26:13',
    lastUpdate: '2023-02-08 11:26:06'
  },
  {
    id: 5,
    contentCreator: 'Syaoran Taio',
    amount: '330, 000 CNY',
    balance: 'Deposit',
    type: 'Deposit',
    dateCreate: '2023-11-18 11:26:13',
    lastUpdate: '2023-02-08 11:26:06'
  },
  {
    id: 6,
    contentCreator: 'Syaoran Taio',
    amount: '330, 000 CNY',
    balance: 'Deposit',
    type: 'Deposit',
    dateCreate: '2023-11-18 11:26:13',
    lastUpdate: '2023-02-08 11:26:06'
  },
  {
    id: 7,
    contentCreator: 'Syaoran Taio',
    amount: '330, 000 CNY',
    balance: 'Deposit',
    type: 'Deposit',
    dateCreate: '2023-11-18 11:26:13',
    lastUpdate: '2023-02-08 11:26:06'
  },
  {
    id: 8,
    contentCreator: 'Syaoran Taio',
    amount: '330, 000 CNY',
    balance: 'Deposit',
    type: 'Deposit',
    dateCreate: '2023-11-18 11:26:13',
    lastUpdate: '2023-02-08 11:26:06'
  },
  {
    id: 9,
    contentCreator: 'Syaoran Taio',
    amount: '330, 000 CNY',
    balance: 'Deposit',
    type: 'Deposit',
    dateCreate: '2023-11-18 11:26:13',
    lastUpdate: '2023-02-08 11:26:06'
  },
  {
    id: 10,
    contentCreator: 'Syaoran Taio',
    amount: '330, 000 CNY',
    balance: 'Deposit',
    type: 'Deposit',
    dateCreate: '2023-11-18 11:26:13',
    lastUpdate: '2023-02-08 11:26:06'
  }
]

function index() {
  const [open, setOpen] = useState(false)
  const columnData = [
    { field: 'contentCreator', headerName: <Translations text='Content Creator'/>, width: 225, sortable: false },
    { field: 'amount', headerName: <Translations text='Amount'/>, width: 225, sortable: false },
    { field: 'balance', headerName: <Translations text='Balance'/>, width: 150, sortable: false },
    { field: 'type', headerName: <Translations text='Type (Debit | Credit)'/>, width: 170, sortable: false },
    { field: 'dateCreate', headerName: <Translations text='Date Created'/>, width: 225, sortable: false },
    { field: 'lastUpdate', headerName: <Translations text='Last Update'/>, width: 225, sortable: false },
    {
      field: 'edit',
      headerName: <Translations text='Edit'/>,
      width: 130,
      sortable: false,
      renderCell: () => {
        const handleClick = () => {
          setOpen(true)
        }

        return (
          <Box display='flex' alignItems='center' justifyContent='center' width='100%'>
            <Button onClick={handleClick}>
              <Icon fontSize={30} icon='la:pen' color='98A9BC' />
            </Button>
          </Box>
        )
      }
    }
  ]

  return (
    <>
      <Transaction rowData={rowData} columnData={columnData} />
      {open ? <EditDrawer open={open} setOpen={setOpen} /> : null}
    </>
  )
}

export default index
