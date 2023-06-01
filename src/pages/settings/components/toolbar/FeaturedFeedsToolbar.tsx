// ** React Imports
import { ChangeEvent } from 'react'

// ** MUI Imports
import { Box, Button, IconButton, TextField } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Utils Imports
import { useTranslateString } from '@/utils/TranslateString'
import ExportButton from '@/shared-components/ExportButton'

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
  toggleFeedModal: () => void
  search: string
}

const FeaturedFeedsToolbar = (props: Props) => {
  const TranslateString = useTranslateString()

  const handleClear = () => {
    props.clearSearch()
  }

  return (
    <Box sx={styles.container}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
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

        <Box sx={{ mt: { xs: 2, sm: 0 }, width: { xs: '100%', sm: 'auto' } }}>
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
            onClick={props.toggleFeedModal}
          >
            {TranslateString('Select Feeds')}
          </Button>
        </Box>
      </Box>

      {/* <Box
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
          <ExportButton />
        </Box>
      </Box> */}
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
    mt: { xs: 2, sm: 0 },
    width: {
      xs: 'auto',
      sm: 'auto',
      md: 'auto',
      lg: 150
    },
    float: {
      xs: 'right',
      sm: null
    }
  }
}

export default FeaturedFeedsToolbar
