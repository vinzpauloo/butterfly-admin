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

const UserTableToolbar = (props: Props) => {
  return (
    <Box
      sx={{
        padding: 5
      }}
    >
      <Box>
        <CardHeader
          title='Search Filters'
          sx={{
            margin: 0,
            padding: 0
          }}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: 'column',
            lg: 'row'
          },
          padding: 0,
          gap: 5
        }}
      >
        <TextField
          size='small'
          value={props.emailValue ?? ''}
          onChange={props.onEmailChange}
          placeholder='Search email…'
          InputProps={{
            startAdornment: (
              <Box sx={{ mr: 2, display: 'flex' }}>
                <Icon icon='mdi:magnify' fontSize={20} />
              </Box>
            ),
            endAdornment: props?.emailValue ? (
              <IconButton size='small' title='Clear' aria-label='Clear' onClick={props.clearSearch}>
                <Icon icon='mdi:close' fontSize={20} />
              </IconButton>
            ) : (
              false
            )
          }}
          sx={{
            width: {
              xs: 1,
              sm: 'auto',
              lg: '100%'
            },
            '& .MuiInputBase-root > svg': {
              mr: 2
            }
          }}
        />

        {/* Add TextField for searching mobile number */}
        <TextField
          size='small'
          value={props.mobileValue ?? ''}
          onChange={props.onMobileChange}
          placeholder='Search mobile number…'
          InputProps={{
            startAdornment: (
              <Box sx={{ mr: 2, display: 'flex' }}>
                <Icon icon='mdi:magnify' fontSize={20} />
              </Box>
            ),
            endAdornment: props?.mobileValue ? (
              <IconButton size='small' title='Clear' aria-label='Clear' onClick={props.clearSearch}>
                <Icon icon='mdi:close' fontSize={20} />
              </IconButton>
            ) : (
              false
            )
          }}
          sx={{
            width: {
              xs: 1,
              sm: 'auto',
              lg: '100%'
            },
            '& .MuiInputBase-root > svg': {
              mr: 2
            }
          }}
        />
        <TextField
          size='small'
          value={props.usernameValue ?? ''}
          onChange={props.onUsernameChange}
          placeholder='Search User…'
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
              xs: 1,
              sm: 'auto',
              lg: '100%'
            },
            '& .MuiInputBase-root > svg': {
              mr: 2
            }
          }}
        />
      </Box>
      <Box
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
          <Button onClick={() => props.toggle(props.role)} variant='contained'>
            Add User
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default UserTableToolbar
