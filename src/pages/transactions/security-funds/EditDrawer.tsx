import { Box, Button, Drawer, Typography } from '@mui/material'
import React from 'react'

function EditDrawer({ open, setOpen }: any) {
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 600 } } }}
    >
      <Box height='100%' display='flex' flexDirection='column' alignItems='center' p={5} sx={{ background: '#3c4b64' }}>
        <Box my={3} display='flex' width='100%'>
          <Typography p={2} mr={2} sx={styles.donation} align='center'>
            LOOP KISSER
          </Typography>
          <Typography p={2} ml={2} sx={styles.donation} align='center'>
            2023-03-09 05:24:26
          </Typography>
        </Box>
        <Typography p={2} variant='h6' mx={2} sx={styles.donation} align='center'>
          DEPOSIT
        </Typography>
        <Typography my={3} py={15} variant='h2' mx={2} sx={styles.donation} align='center'>
          Y41,100 CNY
        </Typography>
        <Box mt={2} p={2} sx={styles.donation}>
          <Typography variant='h6'>IMPORTANT NOTES</Typography>
          <Box mt={2} px={3}>
            <Typography variant='body1' p={2} align='center'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur.
            </Typography>
          </Box>
        </Box>
        <Box mt={5}>
          <Button style={{ marginRight: 20 }} variant='contained' onClick={handleClose}>
            BACK
          </Button>
          <Button style={{ marginLeft: 20 }} variant='contained'>
            UPDATE
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}

const styles = {
  donation: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#FFF',
    width: '100%',
    borderRadius: '5px'
  }
}

export default EditDrawer
