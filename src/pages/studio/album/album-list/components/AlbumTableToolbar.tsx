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
import { AlbumService } from '@/services/api/AlbumService'

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

const AlbumTableToolbar = (props: Props) => {
  const TranslateString = useTranslateString()
  const router = useRouter()

  const { getAlbumDataForCSV } = AlbumService()

  const handleClear = () => {
    props.clearSearch()
  }

  return (
    <Box sx={styles.container}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <TextField
            size='small'
            value={props.titleValue ?? ''}
            onChange={props.onTitleChange}
            placeholder={TranslateString('Search') + ' ' + TranslateString('Title') + '...'}
            InputProps={{
              startAdornment: (
                <Box sx={{ mr: 2, display: 'flex' }}>
                  <Icon icon='mdi:magnify' fontSize={20} />
                </Box>
              ),
              endAdornment: props?.titleValue ? (
                <IconButton size='small' title='Clear' aria-label='Clear' onClick={props.clearSearch}>
                  <Icon icon='mdi:close' fontSize={20} />
                </IconButton>
              ) : (
                false
              )
            }}
            sx={styles.textField}
          />
          <Button variant='contained' color='error' sx={styles.button} onClick={handleClear}>
            {TranslateString('Clear')}
          </Button>
        </Box>

        <Box>
          <Button
            variant='contained'
            color='primary'
            sx={{
              width: {
                xs: 'auto',
                sm: 'auto',
                md: 'auto',
                lg: 150
              },
              backgroundColor: '#FF9C00',
              '&:hover': {
                backgroundColor: '#FF7c02'
              }
            }}
            onClick={() => router.push('/studio/album/upload')}
          >
            {TranslateString('Add') + ' ' + TranslateString('Album')}
          </Button>
        </Box>
      </Box>

      {/* Export Button is commented for now, might be used in the future */}
      <Box
        sx={{
          mt: 4,
          borderTop: '1px solid #d3d3d3'
        }}
      >
        <Box
          sx={{
            mt: 4,
            mb: 2,
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <ExportButton ApiService={getAlbumDataForCSV} csvTitle='Albums' titleValue={props.titleValue} />
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

export default AlbumTableToolbar
