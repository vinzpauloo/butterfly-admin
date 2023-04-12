import React from 'react'

import Transaction from '@/pages/transactions'

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
  { field: 'contentCreator', headerName: 'Content Creator', width: 193, sortable: false },
  { field: 'customer', headerName: 'Customer', width: 193, sortable: false },
  { field: 'siteName', headerName: 'Site Name', width: 193, sortable: false },
  { field: 'amountGold', headerName: 'Amount (Gold)', width: 193, sortable: false },
  { field: 'amountCNY', headerName: 'Amount (CNY)', width: 193, sortable: false },
  { field: 'dateCreated', headerName: 'Date Created', width: 193, sortable: false },
  { field: 'lastUpdate', headerName: 'Last Update', width: 193, sortable: false }
]

function index() {
  return <Transaction rowData={rowData} columnData={columnData} />
}

export default index
