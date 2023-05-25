import formatDate from '@/utils/formatDate'

export const ActivityLogsColumns = () => {
  const columns = [
    { flex: 0.02, minWidth: 150, field: 'id', headerName: `ID` },
    {
      flex: 0.02,
      minWidth: 150,
      field: 'description',
      headerName: `Description`
    },
    {
      flex: 0.02,
      minWidth: 160,
      field: 'created_at',
      headerName: `Date Created`,
      valueFormatter: (params: any) => {
        return formatDate(params?.value)
      }
    },
    {
      flex: 0.02,
      minWidth: 200,
      field: 'updated_at',
      headerName: `Last Updated`,
      valueFormatter: (params: any) => {
        return formatDate(params?.value)
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 135
    }
  ]

  return { columns }
}
