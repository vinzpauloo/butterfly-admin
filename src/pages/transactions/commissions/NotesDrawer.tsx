import { Box, Button, Drawer, Typography } from '@mui/material'
import InputUnstyled from '@mui/base/InputUnstyled'
import { styled } from '@mui/system'
import React from 'react'
import { useTranslateString } from '@/utils/TranslateString';

const blue = {
  100: '#DAECFF',
  200: '#80BFFF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5'
}

const grey = {
  50: '#F3F6F9',
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027'
}

const StyledTextareaElement = styled('textarea', {
  shouldForwardProp: prop => !['ownerState', 'minRows', 'maxRows'].includes(prop.toString())
})(
  ({ theme }) => `
  width: 550px;
  height: 700px;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  border-radius: 12px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
)

function NotesDrawer({ open, setOpen }: any) {
  const handleClose = () => {
    setOpen(false)
  }

  const TranslateString = useTranslateString()

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 600 } } }}
    >
      <Box display='flex' flexDirection='column' alignItems='center' p={5}>
        <Typography mb={5} variant='h5' textTransform="uppercase">
          {TranslateString("Important Notes")}
        </Typography>
        <InputUnstyled
          slots={{ textarea: StyledTextareaElement }}
          multiline
          placeholder={TranslateString("Notes")}
        />
        <Box mt={5}>
          <Button style={{ marginRight: 20, textTransform: "uppercase" }} variant='contained' onClick={handleClose}>
            {TranslateString("Back")}
          </Button>
          <Button style={{ marginLeft: 20, textTransform: "uppercase" }} variant='contained'>
            {TranslateString("Update")}
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}

export default NotesDrawer
