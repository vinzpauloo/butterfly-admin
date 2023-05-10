// ** React Imports
import React, { useState } from 'react'

// ** MUI Imports
import { DataGrid } from '@mui/x-data-grid'

// ** Other Imports
import { PaymentsColumns } from '@/data/PaymentsColumns'

// ** TanStack Query
import { useQuery } from '@tanstack/react-query'

// ** Hooks/Services
import { WalletService } from '@/services/api/WalletService'
import { useErrorHandling } from '@/hooks/useErrorHandling'

type SortType = 'asc' | 'desc' | undefined | null

const PaymentTable = () => {
  // ** Hooks/Services
  const { getAllWallet } = WalletService()
  const { handleError } = useErrorHandling()

  const { columns } = PaymentsColumns()

  // ** State Variables
  const [rowData, setRowData] = useState<[]>([])
  const [sort] = useState<SortType>('desc')
  const [sortName] = useState<string>('created_at')

  // ** Fetch
  const { isLoading, isRefetching } = useQuery({
    queryKey: ['allPayment'],
    queryFn: () =>
      getAllWallet({
        data: {
          sort: sort,
          sort_by: sortName
        }
      }),
    onSuccess: (data: any) => {
      setRowData(data?.data)
    },
    onError: (e: any) => {
      handleError(e, `getAllWallet() Payments Table/Wallet`)
    }
  })

  return (
    <DataGrid
      disableColumnMenu
      loading={isLoading || isRefetching}
      rowsPerPageOptions={[]}
      checkboxSelection={false}
      disableSelectionOnClick
      autoHeight
      columns={columns}
      rows={rowData ?? []}
      pagination
    />
  )
}

export default PaymentTable
