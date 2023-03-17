// ** MUI Imports
import { Box } from '@mui/material'

// ** Custom Components
import CustomAvatar from 'src/@core/components/mui/avatar'

const TemplateColumns = [
  {
    field: 'thumbnail',
    headerName: 'Video Thumbnail',
    flex: 0.1,
    minWidth: 300,
    renderCell: (params: any) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CustomAvatar
            skin='light'
            src={params.value}
            sx={{
              borderRadius: '10px',
              mr: 3,
              fontSize: '.8rem',
              width: '7.875rem',
              height: '4rem'
            }}
          ></CustomAvatar>
        </Box>
      )
    }
  },
  { field: 'title', headerName: 'Title', flex: 0.1, minWidth: 200 },
  { field: 'lastUpdate', headerName: 'Last Update', flex: 0.1, minWidth: 200 }
]

export default TemplateColumns
