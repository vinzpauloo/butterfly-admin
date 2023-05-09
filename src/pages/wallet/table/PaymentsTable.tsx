// ** React Imports
import React, { useState } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import { DataGrid } from '@mui/x-data-grid'

// ** Other Imports
import { PaymentsColumns } from '@/data/PaymentsColumns'

// ** TanStack Query
import { useQuery } from '@tanstack/react-query'

// ** Hooks/Services
import { WalletService } from '@/services/api/WalletService'
import { captureError } from '@/services/Sentry'

type SortType = 'asc' | 'desc' | undefined | null

const PaymentTable = () => {
  const { getAllWallet } = WalletService()
  const { columns } = PaymentsColumns()
  const router = useRouter()
  const currentLocation = router.asPath

  const [rowData, setRowData] = useState<[]>([])

  const [sort] = useState<SortType>('desc')
  const [sortName] = useState<string>('created_at')

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
      console.log(data?.data)
    },
    onError: (e: any) => {
      const {
        data: { error }
      } = e
      for (const key in error) {
        error[key].forEach((value: any) => {
          captureError(currentLocation, `${value} getAllWallet() PaymentsTable`)
        })
      }
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
