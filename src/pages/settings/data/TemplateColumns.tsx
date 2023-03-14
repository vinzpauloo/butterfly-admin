import Image from 'next/image'
import { Box } from '@mui/material'

const TemplateColumns = [
  {
    field: 'thumbnail',
    headerName: 'Video Thumbnail',
    width: 150,
    renderCell: (params: any) => (
      <Box>
        <Image src={params.value} width={120} height={80} alt='thumbnail' />
      </Box>
    )
  },
  { field: 'title', headerName: 'Title', width: 300 },
  { field: 'lastUpdate', headerName: 'Last Update', width: 200 }
]

export default TemplateColumns
