// ** React Imports
import { ChangeEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import ExportButton from '@/shared-components/ExportButton'

// ** Utils Imports
import { useTranslateString } from '@/utils/TranslateString'

interface Props {
  usernameValue: string
  agentValue: string
  mobileValue: string
  clearUsername: () => void
  clearAgent: () => void
  clearMobile: () => void
  clearAll: () => void
  onUsernameChange: (e: ChangeEvent) => void
  onAgentChange: (e: ChangeEvent) => void
  onMobileChange: (e: ChangeEvent) => void
  role: any
  toggle: (role: string) => void
  role_id: any
}

const CustomersToolbar = (props: Props) => {
  const TranslateString = useTranslateString()

  const handleClear = () => {
    props.clearAll()
  }

  return (
    <Box
      sx={{
        pt: 5,
        pb: 5
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
            placeholder={TranslateString('Search') + ' ' + TranslateString('Username') + '...'}
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
          <TextField
            size='small'
            value={props.agentValue ?? ''}
            onChange={props.onAgentChange}
            placeholder={TranslateString('Search') + ' ' + TranslateString('Agent') + '...'}
            InputProps={{
              startAdornment: (
                <Box sx={{ mr: 2, display: 'flex' }}>
                  <Icon icon='mdi:magnify' fontSize={20} />
                </Box>
              ),
              endAdornment: props?.agentValue ? (
                <IconButton size='small' title='Clear' aria-label='Clear' onClick={props.clearAgent}>
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

          {/* Add TextField for searching action */}
          <TextField
            size='small'
            value={props.mobileValue ?? ''}
            onChange={props.onMobileChange}
            placeholder={TranslateString('Search') + ' ' + TranslateString('Mobile') + '...'}
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
      </Box>

      {/* Export Button is commented for now, might be used in the future */}
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
            ApiService={function (): Promise<any> {
              throw new Error('Throw Error: Export Function not yet implemented.')
            }}
            csvTitle={'Activity Logs'}
            titleValue={''}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default CustomersToolbar
