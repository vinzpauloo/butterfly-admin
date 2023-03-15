import Image from 'next/image'
import { Box } from '@mui/material'

const TemplateColumns = [
  {
    field: 'thumbnail',
    headerName: 'Video Thumbnail',
    width: 200,
    renderCell: (params: any) => (
      <Box>
        <Image src={params.value} width={90} height={90} alt='thumbnail' />
      </Box>
    )
  },
  { field: 'title', headerName: 'Title', width: 200 },
  { field: 'lastUpdate', headerName: 'Last Update', width: 200 }
]

export default TemplateColumns
