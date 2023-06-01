// ** React Imports
import { ChangeEvent } from 'react'

// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Imports
import { Box, Button, IconButton, TextField } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useTranslateString } from '@/utils/TranslateString'

import ExportButton from '@/shared-components/ExportButton'
import { CSVExportService } from '@/services/api/CSVExportService'

interface Props {
  usernameValue: string
  emailValue: string
  mobileValue: string
  clearSearch: () => void
  onUsernameChange: (e: ChangeEvent) => void
  onEmailChange: (e: ChangeEvent) => void
  onMobileChange: (e: ChangeEvent) => void
  role: any
  role_id: any
  titleValue: string
  onTitleChange: (e: ChangeEvent) => void
}

const DonationsTableToolbar = (props: Props) => {

  const TranslateString = useTranslateString()
  const router = useRouter()

  const { getDonationDataForCSV } = CSVExportService()
  
  return (
    <Box sx={styles.container}>


      {/* Export Button is commented for now, might be used in the future */}
      <Box
        sx={{
          mb: 4,
        }}
      >
        <Box
          sx={{
            mt: 4,
            mb: 8,
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <ExportButton ApiService={getDonationDataForCSV} csvTitle='Donations' titleValue={props.titleValue} />
        </Box>
      </Box>
    </Box>
  )
}

const styles = {
  container: {
    // display: 'flex',
    // flexDirection: {
    //   xs: 'column',
    //   md: 'column',
    //   lg: 'row'
    // },
    // mb: 2,
    // gap: 5,
    // justifyContent: 'space-between'
  },
  textField: {
    width: {
      xs: 1,
      sm: 'auto',
      lg: '500px'
    },
    '& .MuiInputBase-root > svg': {
      mr: 2
    },
    mr: 2
  },
  button: {
    width: {
      xs: 'auto',
      sm: 'auto',
      md: 'auto',
      lg: 150
    }
  }
}

export default DonationsTableToolbar
