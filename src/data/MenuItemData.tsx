// ** Utils Imports
import formatDate from '@/utils/formatDate'

// ** Other Imports
import EditButton from '../pages/versions/components/EditButton'

interface RowProps {
  row: {
    id: number
  }
}

export const MenuItemData = () => {
  const columns = [
    { sortable: false, field: 'os', headerName: 'OS Platform', width: 300 },
    { sortable: false, field: 'version', headerName: 'Version', width: 300 },
    { sortable: false, field: 'name', headerName: 'Site Name', width: 300 },
    {
      sortable: false,
      field: 'created_at',
      headerName: 'Date Created',
      width: 300,
      valueFormatter: (params: any) => {
        return formatDate(params?.value)
      }
    },
    {
      sortable: false,
      field: 'status',
      headerName: 'Action',
      width: 135,
      renderCell: (params: RowProps) => {
        return <EditButton id={params?.row.id} data={params?.row} />
      }
    }
  ]

  return { columns }
}
