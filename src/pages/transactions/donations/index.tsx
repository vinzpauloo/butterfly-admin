import React from 'react'
import Transaction from '@/pages/transactions'
import Translations from '@/layouts/components/Translations'

const rowData = [
  {
    id: 1,
    contentCreator: 'Syaoran Taio',
    customer: '阿蕾克三',
    siteName: 'Sugar Honey Pop',
    amountGold: '2,543 Golds',
    amountCNY: '2,543 RMB',
    dateCreated: '2023-11-18 11:26:13',
    lastUpdate: '2023-02-08 11:26:06'
  },
  {
    id: 2,
    contentCreator: 'Syaoran Taio',
    customer: '阿蕾克三',
    siteName: 'Sugar Honey Pop',
    amountGold: '2,543 Golds',
    amountCNY: '2,543 RMB',
    dateCreated: '2023-11-18 11:26:13',
    lastUpdate: '2023-02-08 11:26:06'
  },
  {
    id: 3,
    contentCreator: 'Syaoran Taio',
    customer: '阿蕾克三',
    siteName: 'Sugar Honey Pop',
    amountGold: '2,543 Golds',
    amountCNY: '2,543 RMB',
    dateCreated: '2023-11-18 11:26:13',
    lastUpdate: '2023-02-08 11:26:06'
  },
  {
    id: 4,
    contentCreator: 'Syaoran Taio',
    customer: '阿蕾克三',
    siteName: 'Sugar Honey Pop',
    amountGold: '2,543 Golds',
    amountCNY: '2,543 RMB',
    dateCreated: '2023-11-18 11:26:13',
    lastUpdate: '2023-02-08 11:26:06'
  },
  {
    id: 5,
    contentCreator: 'Syaoran Taio',
    customer: '阿蕾克三',
    siteName: 'Sugar Honey Pop',
    amountGold: '2,543 Golds',
    amountCNY: '2,543 RMB',
    dateCreated: '2023-11-18 11:26:13',
    lastUpdate: '2023-02-08 11:26:06'
  },
  {
    id: 6,
    contentCreator: 'Syaoran Taio',
    customer: '阿蕾克三',
    siteName: 'Sugar Honey Pop',
    amountGold: '2,543 Golds',
    amountCNY: '2,543 RMB',
    dateCreated: '2023-11-18 11:26:13',
    lastUpdate: '2023-02-08 11:26:06'
  },
  {
    id: 7,
    contentCreator: 'Syaoran Taio',
    customer: '阿蕾克三',
    siteName: 'Sugar Honey Pop',
    amountGold: '2,543 Golds',
    amountCNY: '2,543 RMB',
    dateCreated: '2023-11-18 11:26:13',
    lastUpdate: '2023-02-08 11:26:06'
  },
  {
    id: 8,
    contentCreator: 'Syaoran Taio',
    customer: '阿蕾克三',
    siteName: 'Sugar Honey Pop',
    amountGold: '2,543 Golds',
    amountCNY: '2,543 RMB',
    dateCreated: '2023-11-18 11:26:13',
    lastUpdate: '2023-02-08 11:26:06'
  },
  {
    id: 9,
    contentCreator: 'Syaoran Taio',
    customer: '阿蕾克三',
    siteName: 'Sugar Honey Pop',
    amountGold: '2,543 Golds',
    amountCNY: '2,543 RMB',
    dateCreated: '2023-11-18 11:26:13',
    lastUpdate: '2023-02-08 11:26:06'
  },
  {
    id: 10,
    contentCreator: 'Syaoran Taio',
    customer: '阿蕾克三',
    siteName: 'Sugar Honey Pop',
    amountGold: '2,543 Golds',
    amountCNY: '2,543 RMB',
    dateCreated: '2023-11-18 11:26:13',
    lastUpdate: '2023-02-08 11:26:06'
  }
]
const columnData = [
  { field: 'contentCreator', headerName: <Translations text='Content Creator'/>, width: 193, sortable: false },
  { field: 'customer', headerName: <Translations text='Customer'/>, width: 193, sortable: false },
  { field: 'siteName', headerName: <Translations text='Site Name'/>, width: 193, sortable: false },
  { field: 'amountGold', headerName: <Translations text='Amount (Gold)'/>, width: 193, sortable: false },
  { field: 'amountCNY', headerName: <Translations text='Amount (CNY)'/>, width: 193, sortable: false },
  { field: 'dateCreated', headerName: <Translations text='Date Created'/>, width: 193, sortable: false },
  { field: 'lastUpdate', headerName: <Translations text='Last Update'/>, width: 193, sortable: false }
]

function index() {
  return <Transaction rowData={rowData} columnData={columnData} />
}

export default index
