/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'

import Transaction from '@/pages/transactions'
import NotesDrawer from './NotesDrawer'
import { Box, Button } from '@mui/material'
import Icon from '@/@core/components/icon'
import Translations from '@/layouts/components/Translations'

const rowData = [
  {
    id: 1,
    contentCreator: 'Syaoran Taio',
    referenceID: '2023-ASFM123',
    wacthed: '28',
    amount: '2,543 Golds',
    dateCreated: '2023-11-18 11:26:13',
    lastUpdate: '2023-02-08 11:26:06'
  },
  {
    id: 2,
    contentCreator: 'Syaoran Taio',
    referenceID: '2023-ASFM123',
    wacthed: '28',
    amount: '2,543 Golds',
    dateCreated: '2023-11-18 11:26:13',
    lastUpdate: '2023-02-08 11:26:06'
  },
  {
    id: 3,
    contentCreator: 'Syaoran Taio',
    referenceID: '2023-ASFM123',
    wacthed: '28',
    amount: '2,543 Golds',
    dateCreated: '2023-11-18 11:26:13',
    lastUpdate: '2023-02-08 11:26:06'
  },
  {
    id: 4,
    contentCreator: 'Syaoran Taio',
    referenceID: '2023-ASFM123',
    wacthed: '28',
    amount: '2,543 Golds',
    dateCreated: '2023-11-18 11:26:13',
    lastUpdate: '2023-02-08 11:26:06'
  },
  {
    id: 5,
    contentCreator: 'Syaoran Taio',
    referenceID: '2023-ASFM123',
    wacthed: '28',
    amount: '2,543 Golds',
    dateCreated: '2023-11-18 11:26:13',
    lastUpdate: '2023-02-08 11:26:06'
  },
  {
    id: 6,
    contentCreator: 'Syaoran Taio',
    referenceID: '2023-ASFM123',
    wacthed: '28',
    amount: '2,543 Golds',
    dateCreated: '2023-11-18 11:26:13',
    lastUpdate: '2023-02-08 11:26:06'
  },
  {
    id: 7,
    contentCreator: 'Syaoran Taio',
    referenceID: '2023-ASFM123',
    wacthed: '28',
    amount: '2,543 Golds',
    dateCreated: '2023-11-18 11:26:13',
    lastUpdate: '2023-02-08 11:26:06'
  },
  {
    id: 8,
    contentCreator: 'Syaoran Taio',
    referenceID: '2023-ASFM123',
    wacthed: '28',
    amount: '2,543 Golds',
    dateCreated: '2023-11-18 11:26:13',
    lastUpdate: '2023-02-08 11:26:06'
  },
  {
    id: 9,
    contentCreator: 'Syaoran Taio',
    referenceID: '2023-ASFM123',
    wacthed: '28',
    amount: '2,543 Golds',
    dateCreated: '2023-11-18 11:26:13',
    lastUpdate: '2023-02-08 11:26:06'
  },
  {
    id: 10,
    contentCreator: 'Syaoran Taio',
    referenceID: '2023-ASFM123',
    wacthed: '28',
    amount: '2,543 Golds',
    dateCreated: '2023-11-18 11:26:13',
    lastUpdate: '2023-02-08 11:26:06'
  }
]

function index() {
  const [open, setOpen] = useState(false)

  const columnData = [
    { field: 'contentCreator', headerName: <Translations text='Content Creator'/>, width: 193, sortable: false },
    { field: 'referenceID', headerName: <><Translations text='Reference' />{" ID"}</>, width: 193, sortable: false },
    { field: 'wacthed', headerName: <Translations text='Watched'/>, width: 193, sortable: false },
    { field: 'amount', headerName: <Translations text='Amount'/>, width: 193, sortable: false },
    { field: 'dateCreated', headerName: <Translations text='Date Created'/>, width: 193, sortable: false },
    { field: 'lastUpdate', headerName: <Translations text='Last Update'/>, width: 193, sortable: false },
    {
      field: 'notes',
      headerName: <Translations text='Notes'/>,
      width: 193,
      sortable: false,
      renderCell: () => {
        const handleClick = () => {
          setOpen(true)
        }

        return (
          <Box display='flex' alignItems='center' justifyContent='center' width='100%'>
            <Button onClick={handleClick}>
              <Icon fontSize={30} icon='game-icons:notebook' color='98A9BC' />
            </Button>
          </Box>
        )
      }
    }
  ]

  return (
    <>
      <Transaction rowData={rowData} columnData={columnData} />
      {open ? <NotesDrawer open={open} setOpen={setOpen} /> : null}
    </>
  )
}

index.acl = {
  action: 'read',
  subject: 'shared-page'
}

export default index
