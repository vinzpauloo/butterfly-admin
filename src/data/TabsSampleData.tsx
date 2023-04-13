import { Box, Button, Typography } from '@mui/material'
import Icon from 'src/@core/components/icon'

const TabsSampleData = {
  donations: {
    rowData: [
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
    ],
    columnData: [
      { field: 'contentCreator', headerName: 'Content Creator', width: 193, sortable: false },
      { field: 'customer', headerName: 'Customer', width: 193, sortable: false },
      { field: 'siteName', headerName: 'Site Name', width: 193, sortable: false },
      { field: 'amountGold', headerName: 'Amount (Gold)', width: 193, sortable: false },
      { field: 'amountCNY', headerName: 'Amount (CNY)', width: 193, sortable: false },
      { field: 'dateCreated', headerName: 'Date Created', width: 193, sortable: false },
      { field: 'lastUpdate', headerName: 'Last Update', width: 193, sortable: false }
    ]
  },
  commissions: {
    rowData: [
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
    ],
    columnData: [
      { field: 'contentCreator', headerName: 'Content Creator', width: 193, sortable: false },
      { field: 'referenceID', headerName: 'Reference ID', width: 193, sortable: false },
      { field: 'wacthed', headerName: 'Wacthed', width: 193, sortable: false },
      { field: 'amount', headerName: 'Amount ', width: 193, sortable: false },
      { field: 'dateCreated', headerName: 'Date Created', width: 193, sortable: false },
      { field: 'lastUpdate', headerName: 'Last Update', width: 193, sortable: false },
      {
        field: 'notes',
        headerName: 'Notes',
        width: 193,
        sortable: false,
        renderCell: () => (
          <Box display='flex' alignItems='center' justifyContent='center' width='100%'>
            <Button>
              <Icon fontSize={30} icon='game-icons:notebook' color='98A9BC' />
            </Button>
          </Box>
        )
      }
    ]
  },
  withdrawal: {
    rowData: [
      {
        id: 1,
        contentCreator: 'Syaoran Taio',
        siteName: 'Sugar Honey Pop',
        amount: '2,543 Golds',
        paymentMethod: 'Deposit',
        requestDate: '2023-11-18 11:26:13',
        lastUpdate: '2023-02-08 11:26:06',
        status: 'Approved'
      },
      {
        id: 2,
        contentCreator: 'Syaoran Taio',
        siteName: 'Sugar Honey Pop',
        amount: '2,543 Golds',
        paymentMethod: 'Deposit',
        requestDate: '2023-11-18 11:26:13',
        lastUpdate: '2023-02-08 11:26:06',
        status: 'Approved'
      },
      {
        id: 3,
        contentCreator: 'Syaoran Taio',
        siteName: 'Sugar Honey Pop',
        amount: '2,543 Golds',
        paymentMethod: 'Deposit',
        requestDate: '2023-11-18 11:26:13',
        lastUpdate: '2023-02-08 11:26:06',
        status: 'Approved'
      },
      {
        id: 4,
        contentCreator: 'Syaoran Taio',
        siteName: 'Sugar Honey Pop',
        amount: '2,543 Golds',
        paymentMethod: 'Deposit',
        requestDate: '2023-11-18 11:26:13',
        lastUpdate: '2023-02-08 11:26:06',
        status: 'Approved'
      },
      {
        id: 5,
        contentCreator: 'Syaoran Taio',
        siteName: 'Sugar Honey Pop',
        amount: '2,543 Golds',
        paymentMethod: 'Deposit',
        requestDate: '2023-11-18 11:26:13',
        lastUpdate: '2023-02-08 11:26:06',
        status: 'Approved'
      },
      {
        id: 6,
        contentCreator: 'Syaoran Taio',
        siteName: 'Sugar Honey Pop',
        amount: '2,543 Golds',
        paymentMethod: 'Deposit',
        requestDate: '2023-11-18 11:26:13',
        lastUpdate: '2023-02-08 11:26:06',
        status: 'Approved'
      },
      {
        id: 7,
        contentCreator: 'Syaoran Taio',
        siteName: 'Sugar Honey Pop',
        amount: '2,543 Golds',
        paymentMethod: 'Deposit',
        requestDate: '2023-11-18 11:26:13',
        lastUpdate: '2023-02-08 11:26:06',
        status: 'Approved'
      },
      {
        id: 8,
        contentCreator: 'Syaoran Taio',
        siteName: 'Sugar Honey Pop',
        amount: '2,543 Golds',
        paymentMethod: 'Deposit',
        requestDate: '2023-11-18 11:26:13',
        lastUpdate: '2023-02-08 11:26:06',
        status: 'Approved'
      },
      {
        id: 9,
        contentCreator: 'Syaoran Taio',
        siteName: 'Sugar Honey Pop',
        amount: '2,543 Golds',
        paymentMethod: 'Deposit',
        requestDate: '2023-11-18 11:26:13',
        lastUpdate: '2023-02-08 11:26:06',
        status: 'Approved'
      },
      {
        id: 10,
        contentCreator: 'Syaoran Taio',
        siteName: 'Sugar Honey Pop',
        amount: '2,543 Golds',
        paymentMethod: 'Deposit',
        requestDate: '2023-11-18 11:26:13',
        lastUpdate: '2023-02-08 11:26:06',
        status: 'Approved'
      }
    ],
    columnData: [
      { field: 'contentCreator', headerName: 'Content Creator', width: 169, sortable: false },
      { field: 'siteName', headerName: 'Site Name', width: 169, sortable: false },
      { field: 'amount', headerName: 'Amount', width: 169, sortable: false },
      { field: 'paymentMethod', headerName: 'Payment Method', width: 160, sortable: false },
      { field: 'requestDate', headerName: 'Request Date', width: 169, sortable: false },
      { field: 'lastUpdate', headerName: 'Last Update', width: 169, sortable: false },
      {
        field: 'status',
        headerName: 'Status',
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
        headerName: 'Approved By',
        width: 178,
        sortable: false,
        renderCell: () => (
          <Box display='flex' alignItems='center' justifyContent='space-between' width='100%'>
            <Typography component='body'>Operator 1</Typography>
            <Button>
              <Icon fontSize={30} icon='mdi:eye' color='98A9BC' />
            </Button>
          </Box>
        )
      }
    ]
  },
  'security-funds': {
    rowData: [
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
    ],
    columnData: [
      { field: 'contentCreator', headerName: 'Content Creator', width: 225, sortable: false },
      { field: 'amount', headerName: 'Amount', width: 225, sortable: false },
      { field: 'balance', headerName: 'Balance', width: 160, sortable: false },
      { field: 'type', headerName: 'Type (Debit|Credit)', width: 160, sortable: false },
      { field: 'dateCreate', headerName: 'Date Created', width: 225, sortable: false },
      { field: 'lastUpdate', headerName: 'Last Update', width: 225, sortable: false },
      {
        field: 'edit',
        headerName: 'Edit',
        width: 130,
        sortable: false,
        renderCell: () => (
          <Box display='flex' alignItems='center' justifyContent='center' width='100%'>
            <Button>
              <Icon fontSize={30} icon='la:pen' color='98A9BC' />
            </Button>
          </Box>
        )
      }
    ]
  }
}

export default TabsSampleData
