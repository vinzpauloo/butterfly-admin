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
import ExportButton from '@/pages/user/components/button/ExportButton'
import { useTranslateString } from '@/utils/TranslateString';

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

  return (
    <Box
      sx={{
        padding: 5
      }}
    >
      <Box>
        <CardHeader
          title={TranslateString("Search") + " " + TranslateString("Filters")}
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
          value={props.titleValue}
          onChange={props.onTitleChange}
          placeholder={TranslateString("Search") + " " + TranslateString("Title") + "..."}
          InputProps={{
            startAdornment: (
              <Box sx={{ mr: 2, display: 'flex' }}>
                <Icon icon='mdi:magnify' fontSize={20} />
              </Box>
            ),
            endAdornment: (
              <IconButton size='small' title='Clear' aria-label='Clear' onClick={props.clearSearch}>
                <Icon icon='mdi:close' fontSize={20} />
              </IconButton>
            )
          }}
          sx={{
            width: {
              xs: 1,
              sm: 'auto',
              lg: '45%'
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
          {/* <ExportButton
            role={props.role}
            emailValue={props.emailValue}
            mobileValue={props.mobileValue}
            usernameValue={props.usernameValue}
            role_id={props.role_id}
            titleValue={props.titleValue}
          /> */}
        </Box>
      </Box>
    </Box>
  )
}

export default AlbumTableToolbar
