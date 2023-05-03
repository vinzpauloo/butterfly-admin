// ** React Imports
import { ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import { CardHeader } from '@mui/material'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import ExportButton from './button/ExportButton'

import { useTranslateString } from '@/utils/TranslateString'

interface Props {
  usernameValue: string
  emailValue: string
  mobileValue: string
  clearUsername: () => void
  clearEmail: () => void
  clearMobile: () => void
  clearAll: () => void
  onUsernameChange: (e: ChangeEvent) => void
  onEmailChange: (e: ChangeEvent) => void
  onMobileChange: (e: ChangeEvent) => void
  role: any
  toggle: (role: string) => void
  role_id: any
}

const UserTableToolbar = (props: Props) => {
  const TranslateString = useTranslateString()

  const handleClear = () => {
    props.clearAll()
  }

  return (
    <Box
      sx={{
        padding: 5
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
            value={props.emailValue ?? ''}
            onChange={props.onEmailChange}
            placeholder={TranslateString('Search') + ' ' + TranslateString('Email') + '...'}
            InputProps={{
              startAdornment: (
                <Box sx={{ mr: 2, display: 'flex' }}>
                  <Icon icon='mdi:magnify' fontSize={20} />
                </Box>
              ),
              endAdornment: props?.emailValue ? (
                <IconButton size='small' title='Clear' aria-label='Clear' onClick={props.clearEmail}>
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

          {/* Add TextField for searching mobile number */}
          <TextField
            size='small'
            value={props.mobileValue ?? ''}
            onChange={props.onMobileChange}
            placeholder={TranslateString('Search') + ' ' + TranslateString('Mobile Number') + '...'}
            InputProps={{
              startAdornment: (
                <Box sx={{ mr: 2, display: 'flex' }}>
                  <Icon icon='mdi:magnify' fontSize={20} />
                </Box>
              ),
              endAdornment: props?.mobileValue ? (
                <IconButton size='small' title='Clear' aria-label='Clear' onClick={props.clearMobile}>
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
          <TextField
            size='small'
            value={props.usernameValue ?? ''}
            onChange={props.onUsernameChange}
            placeholder={TranslateString('Search') + ' ' + TranslateString('Users') + '...'}
            InputProps={{
              startAdornment: (
                <Box sx={{ mr: 2, display: 'flex' }}>
                  <Icon icon='mdi:magnify' fontSize={20} />
                </Box>
              ),
              endAdornment: props?.usernameValue ? (
                <IconButton size='small' title='Clear' aria-label='Clear' onClick={props.clearUsername}>
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

      {/* Export Button is commented for now, might be used in the future */}
      {/* <Box
        sx={{
          mt: 5,
          borderTop: '1px solid #d3d3d3'
        }}
      >
        <Box
          sx={{
            mt: 5,
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <ExportButton
            role={props.role}
            emailValue={props.emailValue}
            mobileValue={props.mobileValue}
            usernameValue={props.usernameValue}
            role_id={props.role_id}
          />
        </Box>
      </Box> */}
    </Box>
  )
}

export default UserTableToolbar
