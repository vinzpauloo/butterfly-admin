// ** React Imports
import { ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import { useTranslateString } from '@/utils/TranslateString'

interface Props {
  usernameValue: string
  emailValue: string
  mobileValue: string
  clearSearch: () => void
  onUsernameChange: (e: ChangeEvent) => void
  onEmailChange: (e: ChangeEvent) => void
  onMobileChange: (e: ChangeEvent) => void
  role: any
  toggle: (role: string) => void
  role_id: any
}

const SuperAgentToolbar = (props: Props) => {
  const TranslateString = useTranslateString()

  const handleClear = () => {
    props.clearSearch()
  }

  return (
    <Box
      sx={{
        mx: 2,
        mb: 2
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: 'column',
            lg: 'row'
          },
          justifyContent: 'space-between'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              md: 'column',
              lg: 'row'
            },
            gap: 2
          }}
        >
          <TextField
            size='small'
            value={props.usernameValue ?? ''}
            onChange={props.onUsernameChange}
            placeholder={TranslateString('Search') + ' ' + TranslateString('Agents') + '...'}
            InputProps={{
              startAdornment: (
                <Box sx={{ mr: 2, display: 'flex' }}>
                  <Icon icon='mdi:magnify' fontSize={20} />
                </Box>
              ),
              endAdornment: props?.usernameValue ? (
                <IconButton size='small' title='Clear' aria-label='Clear' onClick={props.clearSearch}>
                  <Icon icon='mdi:close' fontSize={20} />
                </IconButton>
              ) : (
                false
              )
            }}
            sx={{
              width: {
                xs: 'auto',
                sm: 'auto',
                md: 'auto',
                lg: 250
              }
            }}
          />
          <Button
            variant='contained'
            color='error'
            sx={{
              width: {
                xs: 'auto',
                sm: 'auto',
                md: 'auto',
                lg: 150
              }
            }}
            onClick={handleClear}
          >
            {TranslateString('Clear')}
          </Button>
        </Box>
        <Box
          sx={{
            mt: {
              xs: 5,
              sm: 5,
              md: 5,
              lg: 0
            }
          }}
        >
          <Button
            sx={{
              width: {
                xs: 'auto',
                sm: 'auto',
                md: 'auto',
                lg: 150
              },
              float: 'right'
            }}
            onClick={() => props.toggle(props.role)}
            variant='contained'
          >
            {TranslateString('Add') + ' ' + TranslateString('User')}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default SuperAgentToolbar
